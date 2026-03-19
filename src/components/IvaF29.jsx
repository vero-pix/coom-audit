// ============================================
// COOM - IVA / F29
// ============================================

import { Card, KPI, DataTable, Badge, Button } from './ui';
import { formatCLP, sumBy, exportToCSV } from '../utils/format';
import { IVA_MENSUAL } from '../data/financialData';

export function IvaF29() {
  const totales = {
    debito: sumBy(IVA_MENSUAL, 'debito'),
    credito: sumBy(IVA_MENSUAL, 'credito'),
    diferencia: sumBy(IVA_MENSUAL, 'diferencia'),
    ppm: sumBy(IVA_MENSUAL, 'ppm'),
    retencion: sumBy(IVA_MENSUAL, 'retencion'),
    total: sumBy(IVA_MENSUAL, 'total')
  };

  const columns = [
    { key: 'mes', label: 'Período' },
    { key: 'debito', label: 'IVA Débito', align: 'right', render: v => formatCLP(v) },
    { key: 'credito', label: 'IVA Crédito', align: 'right', render: v => formatCLP(v) },
    { 
      key: 'diferencia', 
      label: 'Diferencia', 
      align: 'right', 
      render: v => formatCLP(v),
      className: (row) => row.diferencia > 0 ? 'fin-resultado-negativo' : 'fin-resultado-positivo'
    },
    { key: 'ppm', label: 'PPM', align: 'right', render: v => formatCLP(v), className: () => 'fin-costo' },
    { key: 'retencion', label: 'Retención', align: 'right', render: v => formatCLP(v), className: () => 'fin-costo' },
    { key: 'total', label: 'Total F29', align: 'right', render: v => formatCLP(v) },
    { 
      key: 'estado', 
      label: 'Estado',
      render: v => <Badge variant={v === 'PAGADO' ? 'ok' : 'warning'}>{v}</Badge>
    }
  ];

  const footer = {
    mes: 'TOTAL ANUAL',
    debito: formatCLP(totales.debito),
    credito: formatCLP(totales.credito),
    diferencia: formatCLP(totales.diferencia),
    ppm: formatCLP(totales.ppm),
    retencion: formatCLP(totales.retencion),
    total: formatCLP(totales.total),
    estado: ''
  };

  const handleExport = () => {
    exportToCSV(IVA_MENSUAL, [
      { key: 'mes', label: 'Período' },
      { key: 'debito', label: 'IVA Débito' },
      { key: 'credito', label: 'IVA Crédito' },
      { key: 'diferencia', label: 'Diferencia' },
      { key: 'ppm', label: 'PPM' },
      { key: 'retencion', label: 'Retención' },
      { key: 'total', label: 'Total F29' },
      { key: 'estado', label: 'Estado' }
    ], 'COOM_IVA_F29_2025');
  };

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
          IVA / Formulario 29
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          Declaración mensual de IVA · Año Tributario 2025
        </p>
      </div>

      {/* KPIs */}
      <div className="kpi-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <KPI 
          label="IVA Débito Total" 
          value={totales.debito}
          detail="19% sobre ventas afectas"
        />
        <KPI 
          label="IVA Crédito Total" 
          value={totales.credito}
          detail="Compras con derecho a crédito"
        />
        <KPI 
          label="IVA Neto a Pagar" 
          value={totales.diferencia}
          detail="Débito - Crédito"
        />
        <KPI 
          label="Total F29 Pagado" 
          value={totales.total}
          detail="Incluye PPM y retenciones"
        />
      </div>

      {/* Tabla F29 */}
      <Card 
        title="Detalle Mensual F29"
        actions={
          <Button variant="secondary" size="sm" onClick={handleExport}>
            ↓ Exportar CSV
          </Button>
        }
      >
        <DataTable 
          columns={columns}
          data={IVA_MENSUAL}
          footer={footer}
        />
      </Card>

      {/* Análisis */}
      <div className="grid-2" style={{ marginTop: 'var(--space-5)' }}>
        <Card title="Composición F29">
          <div style={{ padding: 'var(--space-2)' }}>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--text-sm)' }}>IVA Diferencia</span>
                <span className="font-mono" style={{ fontSize: 'var(--text-sm)' }}>{formatCLP(totales.diferencia)}</span>
              </div>
              <div style={{ 
                height: '8px', 
                background: 'var(--semantic-negative-soft)', 
                borderRadius: '4px'
              }}>
                <div style={{ 
                  width: `${(totales.diferencia / totales.total) * 100}%`,
                  height: '100%',
                  background: 'var(--semantic-negative)',
                  borderRadius: '4px'
                }} />
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--text-sm)' }}>PPM (Pagos Provisionales)</span>
                <span className="font-mono" style={{ fontSize: 'var(--text-sm)' }}>{formatCLP(totales.ppm)}</span>
              </div>
              <div style={{ 
                height: '8px', 
                background: 'var(--bg-subtle)', 
                borderRadius: '4px'
              }}>
                <div style={{ 
                  width: `${(totales.ppm / totales.total) * 100}%`,
                  height: '100%',
                  background: 'var(--text-muted)',
                  borderRadius: '4px'
                }} />
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--text-sm)' }}>Retenciones Ley 21.133</span>
                <span className="font-mono" style={{ fontSize: 'var(--text-sm)' }}>{formatCLP(totales.retencion)}</span>
              </div>
              <div style={{ 
                height: '8px', 
                background: 'var(--brand-beige-light)', 
                borderRadius: '4px'
              }}>
                <div style={{ 
                  width: `${(totales.retencion / totales.total) * 100}%`,
                  height: '100%',
                  background: 'var(--brand-beige-dark)',
                  borderRadius: '4px'
                }} />
              </div>
            </div>
          </div>
        </Card>

        <Card title="Notas Tributarias">
          <div style={{ padding: 'var(--space-2)' }}>
            <div style={{ 
              background: 'var(--bg-subtle)', 
              padding: 'var(--space-4)', 
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-4)',
              fontSize: 'var(--text-sm)',
              lineHeight: 1.6
            }}>
              <strong>Régimen Pro Pyme 14D:</strong> La cooperativa tributa bajo el régimen 
              simplificado con tasa preferencial de 10% sobre base imponible (vs. 27% régimen general).
            </div>

            <div style={{ 
              background: 'var(--semantic-warning-soft)', 
              padding: 'var(--space-4)', 
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-4)',
              fontSize: 'var(--text-sm)',
              lineHeight: 1.6
            }}>
              <strong>Art. 17 DL 824:</strong> Operaciones con socias exentas de IVA. 
              Es crítico mantener correcta separación entre ventas a socias vs. terceros 
              para optimización tributaria.
            </div>

            <div style={{ 
              background: 'var(--semantic-info-soft)', 
              padding: 'var(--space-4)', 
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)',
              lineHeight: 1.6
            }}>
              <strong>Retención Ley 21.133:</strong> 13.25% sobre honorarios brutos 
              de prestadores de servicios (BHE). Total retenido en 2025: {formatCLP(totales.retencion)}.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
