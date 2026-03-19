// ============================================
// COOM - Honorarios BHE
// ============================================

import { Card, KPI, DataTable, Button } from './ui';
import { formatCLP, sumBy, exportToCSV } from '../utils/format';
import { HONORARIOS } from '../data/financialData';

export function HonorariosBHE() {
  const totales = {
    boletas: sumBy(HONORARIOS, 'boletas'),
    bruto: sumBy(HONORARIOS, 'bruto'),
    retencion: sumBy(HONORARIOS, 'retencion'),
    liquido: sumBy(HONORARIOS, 'liquido')
  };

  const columns = [
    { key: 'nombre', label: 'Prestador' },
    { key: 'boletas', label: 'Boletas', align: 'right' },
    { key: 'bruto', label: 'Bruto', align: 'right', render: v => formatCLP(v) },
    { 
      key: 'retencion', 
      label: 'Retención 13.25%', 
      align: 'right', 
      render: v => formatCLP(v),
      className: () => 'fin-costo'
    },
    { 
      key: 'liquido', 
      label: 'Líquido', 
      align: 'right', 
      render: v => formatCLP(v),
      className: () => 'fin-resultado-positivo'
    }
  ];

  const footer = {
    nombre: 'TOTAL',
    boletas: totales.boletas,
    bruto: formatCLP(totales.bruto),
    retencion: formatCLP(totales.retencion),
    liquido: formatCLP(totales.liquido)
  };

  const handleExport = () => {
    exportToCSV(HONORARIOS, [
      { key: 'nombre', label: 'Prestador' },
      { key: 'boletas', label: 'Boletas' },
      { key: 'bruto', label: 'Bruto' },
      { key: 'retencion', label: 'Retención' },
      { key: 'liquido', label: 'Líquido' }
    ], 'COOM_Honorarios_BHE_2025');
  };

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
          Honorarios BHE
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          Boletas de Honorarios Electrónicas · Año 2025
        </p>
      </div>

      {/* KPIs */}
      <div className="kpi-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <KPI 
          label="Total Bruto" 
          value={totales.bruto}
          detail={`${totales.boletas} boletas emitidas`}
        />
        <KPI 
          label="Retención Total" 
          value={totales.retencion}
          detail="Ley 21.133 (13.25%)"
        />
        <KPI 
          label="Total Líquido" 
          value={totales.liquido}
          detail="Pagado a prestadores"
        />
        <KPI 
          label="Prestadores" 
          value={HONORARIOS.length}
          format="number"
          detail="Personas naturales"
        />
      </div>

      {/* Tabla */}
      <Card 
        title="Detalle por Prestador"
        actions={
          <Button variant="secondary" size="sm" onClick={handleExport}>
            ↓ Exportar CSV
          </Button>
        }
      >
        <DataTable 
          columns={columns}
          data={HONORARIOS}
          footer={footer}
        />
      </Card>

      {/* Notas */}
      <div className="grid-2" style={{ marginTop: 'var(--space-5)' }}>
        <Card title="Distribución de Honorarios">
          <div style={{ padding: 'var(--space-2)' }}>
            {HONORARIOS.slice(0, 5).map((h, idx) => {
              const pct = (h.bruto / totales.bruto) * 100;
              return (
                <div key={idx} style={{ marginBottom: 'var(--space-4)' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: 'var(--text-sm)',
                    marginBottom: 'var(--space-1)'
                  }}>
                    <span>{h.nombre}</span>
                    <span className="font-mono">{pct.toFixed(1)}%</span>
                  </div>
                  <div style={{ 
                    height: '6px', 
                    background: 'var(--bg-subtle)', 
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${pct}%`,
                      height: '100%',
                      background: 'var(--brand-beige-dark)'
                    }} />
                  </div>
                </div>
              );
            })}
            <p style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--text-muted)', 
              marginTop: 'var(--space-3)' 
            }}>
              Top 5 prestadores por monto bruto
            </p>
          </div>
        </Card>

        <Card title="Información Tributaria">
          <div style={{ padding: 'var(--space-2)' }}>
            <div style={{ 
              background: 'var(--bg-subtle)', 
              padding: 'var(--space-4)', 
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-4)',
              fontSize: 'var(--text-sm)',
              lineHeight: 1.6
            }}>
              <strong>Retención Ley 21.133:</strong> Desde 2019, las boletas de 
              honorarios tienen retención de 13.25% (2025). Esta retención se 
              declara en F29 y se entera al Fisco mensualmente.
            </div>

            <div style={{ 
              background: 'var(--semantic-warning-soft)', 
              padding: 'var(--space-4)', 
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-4)',
              fontSize: 'var(--text-sm)',
              lineHeight: 1.6
            }}>
              <strong>Alerta:</strong> Las 59 boletas registradas no aparecen 
              en Factronica. Se recomienda ingresar BHE al sistema contable 
              para cuadrar retenciones con declaración F29.
            </div>

            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-3)',
              fontSize: 'var(--text-sm)'
            }}>
              <div style={{ 
                background: 'var(--bg-subtle)', 
                padding: 'var(--space-3)', 
                borderRadius: 'var(--radius-md)',
                textAlign: 'center'
              }}>
                <div style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>Tasa Retención</div>
                <div style={{ fontWeight: 'var(--font-bold)', fontFamily: 'var(--font-mono)' }}>13.25%</div>
              </div>
              <div style={{ 
                background: 'var(--bg-subtle)', 
                padding: 'var(--space-3)', 
                borderRadius: 'var(--radius-md)',
                textAlign: 'center'
              }}>
                <div style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>Promedio/Boleta</div>
                <div style={{ fontWeight: 'var(--font-bold)', fontFamily: 'var(--font-mono)' }}>
                  {formatCLP(Math.round(totales.bruto / totales.boletas))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
