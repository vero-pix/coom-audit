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
                <span>Honorarios Vendedoras (BHE)</span>
                <span className="font-mono">{formatCLP(KPI_DATA.honorariosVendedoras)}</span>
              </div>
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

      {/* De cada $100 que entran */}
      <Card title="De cada $100 que entran" style={{ marginTop: 'var(--space-5)' }}>
        <div style={{ padding: 'var(--space-4)' }}>
          {(() => {
            const total = KPI_DATA.ingresosTotales;
            const items = [
              { label: 'Marcas', value: KPI_DATA.totalLiquidaciones, color: 'var(--text-primary)' },
              { label: 'Vendedoras', value: KPI_DATA.honorariosVendedoras, color: '#534AB7' },
              { label: 'Arriendo', value: KPI_DATA.arriendoTerritoria, color: 'var(--text-secondary)' },
              { label: 'Transbank', value: KPI_DATA.comisionesTransbank, color: '#888780' },
              { label: 'Otros', value: KPI_DATA.contabilidadAccount + KPI_DATA.otrosGastos, color: '#B0ADA6' },
              { label: 'Resultado', value: KPI_DATA.resultadoOperacional, color: 'var(--color-success)' }
            ];
            return (
              <>
                {/* Barra apilada */}
                <div style={{
                  display: 'flex',
                  height: '40px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginBottom: 'var(--space-4)'
                }}>
                  {items.map((item, idx) => {
                    const pct = Math.round(item.value / total * 100);
                    return (
                      <div key={idx} style={{
                        width: `${pct}%`,
                        background: item.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: pct >= 5 ? '13px' : '10px',
                        fontWeight: 'var(--font-bold)',
                        color: 'white',
                        minWidth: pct >= 2 ? 'auto' : '0'
                      }}>
                        {pct >= 3 ? pct : ''}
                      </div>
                    );
                  })}
                </div>
                {/* Leyenda */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: 'var(--text-sm)' }}>
                  {items.map((item, idx) => {
                    const pct = Math.round(item.value / total * 100);
                    return (
                      <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: item.color }}></span>
                        ${pct} → {item.label}
                      </span>
                    );
                  })}
                </div>
              </>
            );
          })()}
        </div>
      </Card>

      {/* Situación Patrimonial */}
      <Card title="Situación Patrimonial" style={{ marginTop: 'var(--space-5)' }}>
        <div style={{ padding: 'var(--space-4)' }}>
          {(() => {
            const capital = 1500000;
            const perdidasAcum = 5099473;
            const resultadoAC2025 = KPI_DATA.resultadoOperacional;
            const cpts = capital - perdidasAcum + resultadoAC2025;
            const items = [
              { label: 'Capital Aportado', value: capital },
              { label: 'Pérdidas Acumuladas (AT2024)', value: -perdidasAcum },
              { label: 'Resultado AC2025 (estimado)', value: resultadoAC2025 },
            ];
            return (
              <>
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  {items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)', fontSize: 'var(--text-sm)' }}>
                      <span>{item.label}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', color: item.value < 0 ? 'var(--color-danger)' : 'var(--text-primary)' }}>
                        {formatCLP(item.value)}
                      </span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)' }}>
                    <span>CPTS Estimado</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: cpts >= 0 ? 'var(--color-success)' : 'var(--color-danger)' }}>
                      {formatCLP(cpts)}
                    </span>
                  </div>
                </div>
                <div style={{ background: 'var(--bg-subtle)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  El CPTS (Capital Propio Tributario Simplificado) cerró en -$3.599.473 según F22 AT2025.
                  Con el resultado estimado de AC2025, el CPTS se proyecta en {formatCLP(cpts)}.
                  {cpts > 0 ? ' Esto permitiría salir de la zona de CPTS negativo.' : ' Se mantiene negativo — no es posible distribuir excedentes legalmente (Art. 36 LGC).'}
                </div>
              </>
            );
          })()}
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
