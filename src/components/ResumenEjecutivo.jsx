// ============================================
// COOM - Resumen Ejecutivo (ACTUALIZADO)
// ============================================

import { Card, KPI, Alert, DataTable, Badge } from './ui';
import { formatCLP, formatPct, sumBy } from '../utils/format';
import { KPI as KPI_DATA, EERR_MENSUAL, ALERTAS, EMPRESA } from '../data/financialData';

export function ResumenEjecutivo() {
  // Calcular totales EERR con nuevos campos
  const totales = {
    ingresos: sumBy(EERR_MENSUAL, 'ingresos'),
    liquidaciones: sumBy(EERR_MENSUAL, 'liquidaciones'),
    gastos: sumBy(EERR_MENSUAL, 'gastos'),
    resultado: sumBy(EERR_MENSUAL, 'resultado')
  };

  const eerrColumns = [
    { key: 'mes', label: 'Mes' },
    { key: 'ingresos', label: 'Ingresos', align: 'right', render: v => formatCLP(v) },
    { key: 'liquidaciones', label: 'Liquidaciones', align: 'right', render: v => formatCLP(v), className: () => 'fin-costo' },
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
    ingresos: formatCLP(totales.ingresos),
    liquidaciones: formatCLP(totales.liquidaciones),
    gastos: formatCLP(totales.gastos),
    resultado: formatCLP(totales.resultado)
  };

  const alertasCriticas = ALERTAS.filter(a => a.nivel === 'CRITICO' || a.nivel === 'ALTO');

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
          label="Ingresos Totales" 
          value={KPI_DATA.ingresosTotales}
          detail={`Boletas: ${formatCLP(KPI_DATA.ingresosBoletas)} · Facturas: ${formatCLP(KPI_DATA.ingresosFacturas)}`}
        />
        <KPI 
          label="Margen Bruto" 
          value={KPI_DATA.margenBruto}
          detail={`${formatPct(KPI_DATA.margenPct)} sobre ingresos`}
        />
        <KPI 
          label="Resultado Operacional" 
          value={KPI_DATA.resultadoOperacional}
          detail={`Rentabilidad ${formatPct(KPI_DATA.rentabilidadPct)}`}
          className={KPI_DATA.resultadoOperacional >= 0 ? '' : 'negative'}
        />
        <KPI 
          label="IVA Posición" 
          value={KPI_DATA.ivaPosicion}
          detail={KPI_DATA.ivaPosicion < 0 ? 'Crédito a favor' : 'A pagar'}
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
            {/* Barra de composición - Boletas */}
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <div style={{ display: 'flex', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                <span>Ventas Boletas</span>
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)' }}>
                  {formatPct((KPI_DATA.ingresosBoletas / KPI_DATA.ingresosTotales) * 100)}
                </span>
              </div>
              <div style={{ 
                height: '8px', 
                background: 'var(--bg-subtle)', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${(KPI_DATA.ingresosBoletas / KPI_DATA.ingresosTotales) * 100}%`,
                  height: '100%',
                  background: 'var(--brand-beige-dark)'
                }} />
              </div>
            </div>

            {/* Barra de composición - Facturas */}
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <div style={{ display: 'flex', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                <span>Ventas Facturas (a terceros)</span>
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)' }}>
                  {formatPct((KPI_DATA.ingresosFacturas / KPI_DATA.ingresosTotales) * 100)}
                </span>
              </div>
              <div style={{ 
                height: '8px', 
                background: 'var(--bg-subtle)', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${(KPI_DATA.ingresosFacturas / KPI_DATA.ingresosTotales) * 100}%`,
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
                <span>Boletas (venta directa)</span>
                <span className="font-mono">{formatCLP(KPI_DATA.ingresosBoletas)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span>Facturas (liquidaciones)</span>
                <span className="font-mono">{formatCLP(KPI_DATA.ingresosFacturas)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-2)', fontWeight: 'var(--font-semibold)' }}>
                <span>TOTAL INGRESOS</span>
                <span className="font-mono">{formatCLP(KPI_DATA.ingresosTotales)}</span>
              </div>
            </div>

            <p style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--text-muted)', 
              marginTop: 'var(--space-4)',
              lineHeight: 1.5
            }}>
              Fuente: Libros de Compras y Ventas SII (RCV). Las facturas corresponden a liquidaciones 
              a marcas terceras y generan IVA débito fiscal.
            </p>
          </div>
        </Card>
      </div>

      {/* Composición de Costos */}
      <Card title="Estructura de Costos y Gastos" style={{ marginTop: 'var(--space-5)' }}>
        <div className="grid-2">
          {/* Liquidaciones */}
          <div style={{ padding: 'var(--space-4)' }}>
            <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-3)' }}>
              Liquidaciones a Marcas
            </h4>
            <div style={{ marginBottom: 'var(--space-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                <span><Badge variant="socia">SOCIAS</Badge> Art. 17 exento</span>
                <span className="font-mono">{formatCLP(KPI_DATA.liquidacionesSocias)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                <span><Badge variant="tercero">TERCEROS</Badge> Gravado</span>
                <span className="font-mono">{formatCLP(KPI_DATA.liquidacionesTerceros)}</span>
              </div>
            </div>
            <div style={{ 
              background: 'var(--bg-subtle)', 
              padding: 'var(--space-3)', 
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-semibold)'
            }}>
              <span>Total Liquidaciones</span>
              <span className="font-mono">{formatCLP(KPI_DATA.totalLiquidaciones)}</span>
            </div>
          </div>

          {/* Gastos */}
          <div style={{ padding: 'var(--space-4)' }}>
            <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-3)' }}>
              Gastos Operacionales
            </h4>
            <div style={{ marginBottom: 'var(--space-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                <span>Arriendo Territoria</span>
                <span className="font-mono">{formatCLP(KPI_DATA.arriendoTerritoria)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                <span>Comisiones Transbank</span>
                <span className="font-mono">{formatCLP(KPI_DATA.comisionesTransbank)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                <span>Contabilidad (Account)</span>
                <span className="font-mono">{formatCLP(KPI_DATA.contabilidadAccount)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                <span>Otros gastos</span>
                <span className="font-mono">{formatCLP(KPI_DATA.otrosGastos)}</span>
              </div>
            </div>
            <div style={{ 
              background: 'var(--bg-subtle)', 
              padding: 'var(--space-3)', 
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-semibold)'
            }}>
              <span>Total Gastos</span>
              <span className="font-mono">{formatCLP(KPI_DATA.totalGastos)}</span>
            </div>
          </div>
        </div>
      </Card>

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
              Rentabilidad Operacional
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', fontFamily: 'var(--font-mono)', color: 'var(--color-success)' }}>
              {formatCLP(Math.abs(KPI_DATA.ivaPosicion))}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 'var(--space-1)' }}>
              Crédito Fiscal IVA
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
        </div>
      </Card>
    </div>
  );
}
