// ============================================
// COOM - Resumen Ejecutivo
// ============================================

import { Card, KPI, Alert, DataTable, Badge } from './ui';
import { formatCLP, formatPct, sumBy } from '../utils/format';
import { KPI as KPI_DATA, EERR_MENSUAL, ALERTAS, EMPRESA } from '../data/financialData';

export function ResumenEjecutivo() {
  // Calcular totales EERR
  const totales = {
    ventas: sumBy(EERR_MENSUAL, 'ventas'),
    costos: sumBy(EERR_MENSUAL, 'costos'),
    gastos: sumBy(EERR_MENSUAL, 'gastos'),
    resultado: sumBy(EERR_MENSUAL, 'resultado')
  };

  const eerrColumns = [
    { key: 'mes', label: 'Mes' },
    { key: 'ventas', label: 'Ventas', align: 'right', render: v => formatCLP(v) },
    { key: 'costos', label: 'Costos', align: 'right', render: v => formatCLP(v), className: () => 'fin-costo' },
    { key: 'gastos', label: 'Gastos', align: 'right', render: v => formatCLP(v), className: () => 'fin-costo' },
    { 
      key: 'resultado', 
      label: 'Resultado', 
      align: 'right', 
      render: v => formatCLP(v),
      className: (row) => row.resultado >= 0 ? 'fin-resultado-positivo' : 'fin-resultado-negativo'
    }
  ];

  const eerrFooter = {
    mes: 'TOTAL',
    ventas: formatCLP(totales.ventas),
    costos: formatCLP(totales.costos),
    gastos: formatCLP(totales.gastos),
    resultado: formatCLP(totales.resultado)
  };

  const alertasCriticas = ALERTAS.filter(a => a.nivel === 'CRITICO');

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
          Resumen Ejecutivo
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          {EMPRESA.nombre} · {EMPRESA.periodo}
        </p>
      </div>

      {/* Alertas Críticas */}
      {alertasCriticas.length > 0 && (
        <div style={{ marginBottom: 'var(--space-6)' }}>
          {alertasCriticas.map((alerta, idx) => (
            <Alert key={idx} {...alerta} />
          ))}
        </div>
      )}

      {/* KPIs principales */}
      <div className="kpi-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <KPI 
          label="Ventas Totales" 
          value={KPI_DATA.ventasTotales}
          detail={`Socias: ${formatCLP(KPI_DATA.ventasSocias)} · Terceros: ${formatCLP(KPI_DATA.ventasTerceros)}`}
        />
        <KPI 
          label="Margen Bruto" 
          value={KPI_DATA.margenBruto}
          detail={`${formatPct(KPI_DATA.margenPct)} sobre ventas`}
        />
        <KPI 
          label="Resultado Neto" 
          value={KPI_DATA.resultadoNeto}
          detail={`Rentabilidad ${formatPct(KPI_DATA.rentabilidadPct)}`}
          className={KPI_DATA.resultadoNeto >= 0 ? '' : 'negative'}
        />
        <KPI 
          label="Costo de Ventas" 
          value={KPI_DATA.costoVentas}
          detail={`${formatPct((KPI_DATA.costoVentas / KPI_DATA.ventasTotales) * 100)} de las ventas`}
        />
      </div>

      {/* Estado de Resultados */}
      <div className="grid-2">
        <Card title="Estado de Resultados Mensual" subtitle="Año Comercial 2025">
          <DataTable 
            columns={eerrColumns}
            data={EERR_MENSUAL}
            footer={eerrFooter}
          />
        </Card>

        <Card title="Composición de Ingresos">
          <div style={{ padding: 'var(--space-4)' }}>
            {/* Barra de composición */}
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <div style={{ display: 'flex', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                <span>Socias (exento Art. 17)</span>
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)' }}>
                  {formatPct((KPI_DATA.ventasSocias / KPI_DATA.ventasTotales) * 100)}
                </span>
              </div>
              <div style={{ 
                height: '8px', 
                background: 'var(--bg-subtle)', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${(KPI_DATA.ventasSocias / KPI_DATA.ventasTotales) * 100}%`,
                  height: '100%',
                  background: 'var(--brand-beige-dark)'
                }} />
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-5)' }}>
              <div style={{ display: 'flex', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                <span>Terceros (gravado IVA)</span>
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)' }}>
                  {formatPct((KPI_DATA.ventasTerceros / KPI_DATA.ventasTotales) * 100)}
                </span>
              </div>
              <div style={{ 
                height: '8px', 
                background: 'var(--bg-subtle)', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${(KPI_DATA.ventasTerceros / KPI_DATA.ventasTotales) * 100}%`,
                  height: '100%',
                  background: 'var(--text-secondary)'
                }} />
              </div>
            </div>

            {/* Detalle */}
            <div style={{ 
              background: 'var(--bg-subtle)', 
              padding: 'var(--space-4)', 
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span>
                  <Badge variant="socia">SOCIA</Badge> Ventas exentas
                </span>
                <span className="font-mono">{formatCLP(KPI_DATA.ventasSocias)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>
                  <Badge variant="tercero">TERCERO</Badge> Ventas gravadas
                </span>
                <span className="font-mono">{formatCLP(KPI_DATA.ventasTerceros)}</span>
              </div>
            </div>

            <p style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--text-muted)', 
              marginTop: 'var(--space-4)',
              lineHeight: 1.5
            }}>
              Art. 17 DL 824: Las operaciones entre cooperativa y sus socias están exentas de IVA. 
              La correcta separación de estos flujos es clave para optimización tributaria.
            </p>
          </div>
        </Card>
      </div>

      {/* Indicadores adicionales */}
      <Card title="Indicadores de Gestión" style={{ marginTop: 'var(--space-5)' }}>
        <div className="grid-4">
          <div style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', fontFamily: 'var(--font-mono)' }}>
              {formatPct(KPI_DATA.margenPct)}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 'var(--space-1)' }}>
              Margen Bruto
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', fontFamily: 'var(--font-mono)' }}>
              {formatPct(KPI_DATA.rentabilidadPct)}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 'var(--space-1)' }}>
              Rentabilidad Neta
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', fontFamily: 'var(--font-mono)' }}>
              7
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 'var(--space-1)' }}>
              Centros de Costo
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', fontFamily: 'var(--font-mono)' }}>
              12
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 'var(--space-1)' }}>
              Meses Operativos
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
