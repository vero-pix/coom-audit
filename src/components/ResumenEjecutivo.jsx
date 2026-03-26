// ============================================
// COOM - Resumen Ejecutivo (v2 - Account SPA)
// ============================================
import { Card, KPI as KPIWidget, DataTable, Badge } from './ui';
import { formatCLP, formatPct } from '../utils/format';
import { EERR, CADA100, EMPRESA, COSTO_VENTA_MARCAS, COSTO_VENTA_RESUMEN, COSTO_VENTA_MENSUAL } from '../data/financialData';

export function ResumenEjecutivo() {
  return (
    <div>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
          Resumen ejecutivo
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          {EMPRESA.nombre} · {EMPRESA.periodo} · Fuente: {EMPRESA.fuente}
        </p>
      </div>

      {/* KPIs */}
      <div className="kpi-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <KPIWidget label="Ingresos totales" value={EERR.totalIngresos} detail={`Ventas ${formatCLP(EERR.ventasProductos)} + Otros ${formatCLP(EERR.otrosIngresos)}`} />
        <KPIWidget label="Costo de venta" value={EERR.costoVenta} detail={`${formatPct(EERR.costoVenta / EERR.totalIngresos * 100)} de ingresos`} />
        <KPIWidget label="Margen bruto" value={EERR.margenBruto} detail={`${formatPct(EERR.margenPct)} sobre ingresos`} />
        <KPIWidget label="Resultado neto" value={EERR.resultadoNeto} detail={`${formatPct(EERR.resultadoPct)} rentabilidad`} />
      </div>

      {/* EERR simplificado */}
      <Card title="Estado de resultados" subtitle="Libro Mayor Account SPA">
        <div style={{ padding: 'var(--space-4)' }}>
          {[
            { label: 'Ventas de productos', value: EERR.ventasProductos, indent: false },
            { label: 'Otros ingresos', value: EERR.otrosIngresos, indent: false },
            { label: 'TOTAL INGRESOS', value: EERR.totalIngresos, bold: true, border: true },
            { label: 'Costo de venta (liquidaciones)', value: -EERR.costoVenta, indent: false },
            { label: 'MARGEN BRUTO', value: EERR.margenBruto, bold: true, border: true },
            { label: 'Gastos operacionales', value: -EERR.totalGastosOp, indent: false },
            { label: 'Gastos no operacionales', value: -EERR.totalGastosNoOp, indent: false },
            { label: 'RESULTADO NETO', value: EERR.resultadoNeto, bold: true, border: true, highlight: true },
          ].map((row, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', padding: '8px 0',
              borderTop: row.border ? '1px solid var(--border-light)' : 'none',
              fontWeight: row.bold ? 'var(--font-bold)' : 'normal',
              fontSize: 'var(--text-sm)',
              paddingLeft: row.indent ? '16px' : '0',
            }}>
              <span>{row.label}</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                color: row.highlight ? 'var(--color-success)' : row.value < 0 ? 'var(--color-danger)' : 'var(--text-primary)'
              }}>
                {formatCLP(row.value)}
              </span>
            </div>
          ))}
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 'var(--space-3)' }}>
            Resultado según mayor (cta 2-03-12-01): {formatCLP(EERR.resultadoMayor)}. Diferencia de {formatCLP(EERR.resultadoNeto - EERR.resultadoMayor)} por ajustes de cierre.
          </div>
        </div>
      </Card>

      {/* De cada $100 */}
      <Card title="De cada $100 que entran" style={{ marginTop: 'var(--space-5)' }}>
        <div style={{ padding: 'var(--space-4)' }}>
          <div style={{ display: 'flex', height: '40px', borderRadius: '8px', overflow: 'hidden', marginBottom: 'var(--space-4)' }}>
            {CADA100.map((item, i) => {
              const pct = Math.round(item.monto / EERR.totalIngresos * 100);
              return (
                <div key={i} style={{
                  width: `${pct}%`, background: item.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: pct >= 5 ? '13px' : '10px', fontWeight: '600', color: 'white',
                }}>
                  {pct >= 3 ? pct : ''}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: 'var(--text-sm)' }}>
            {CADA100.map((item, i) => {
              const pct = Math.round(item.monto / EERR.totalIngresos * 100);
              return (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: item.color }}></span>
                  ${pct} → {item.label}
                </span>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Desglose costo de venta */}
      <Card title="Desglose costo de venta por marca" subtitle={`Total ${formatCLP(COSTO_VENTA_RESUMEN.totalMayor)} · Fuente: RCV SII cruzado con Mayor`} style={{ marginTop: 'var(--space-5)' }}>
        <div style={{ padding: 'var(--space-4)' }}>
          {COSTO_VENTA_MARCAS.map((m, i) => {
            const pct = (m.liquidacionRCV / COSTO_VENTA_RESUMEN.totalMayor) * 100;
            return (
              <div key={i} style={{ marginBottom: 'var(--space-3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: 'var(--text-sm)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {m.marca}
                    <Badge variant={m.tipo === 'SOCIA' ? 'socia' : 'tercero'}>{m.tipo}</Badge>
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCLP(m.liquidacionRCV)}</span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: m.tipo === 'SOCIA' ? '#185FA5' : 'var(--brand-beige-dark)', borderRadius: '3px' }} />
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {m.persona} · {formatPct(pct)}
                </div>
              </div>
            );
          })}

          {/* Diferencia */}
          <div style={{
            marginTop: 'var(--space-4)', paddingTop: 'var(--space-3)',
            borderTop: '1px solid var(--border-light)',
            display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)'
          }}>
            <span style={{ fontWeight: 'var(--font-semibold)' }}>Subtotal identificado (RCV)</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-semibold)' }}>{formatCLP(COSTO_VENTA_RESUMEN.totalRCV)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', padding: '4px 0', color: 'var(--color-danger)' }}>
            <span>Diferencia vs Mayor (ajustes, NC, timing)</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCLP(COSTO_VENTA_RESUMEN.diferencia)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', padding: '6px 0', fontWeight: 'var(--font-bold)', borderTop: '2px solid var(--text-primary)' }}>
            <span>Total costo de venta (Mayor)</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCLP(COSTO_VENTA_RESUMEN.totalMayor)}</span>
          </div>

          <div style={{ background: 'var(--bg-subtle)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            {COSTO_VENTA_RESUMEN.notasDiferencia}
          </div>
        </div>
      </Card>

      {/* Costo mensual */}
      <Card title="Costo de venta mensual" style={{ marginTop: 'var(--space-5)' }}>
        <DataTable
          columns={[
            { key: 'mes', label: 'Mes' },
            { key: 'debitos', label: 'Facturas', align: 'right', render: v => formatCLP(v) },
            { key: 'creditos', label: 'NC', align: 'right', render: v => v > 0 ? formatCLP(-v) : '-', className: () => v => 'fin-costo' },
            { key: 'neto', label: 'Neto', align: 'right', render: v => formatCLP(v), className: () => 'font-bold' },
          ]}
          data={COSTO_VENTA_MENSUAL}
          footer={{
            mes: 'TOTAL',
            debitos: formatCLP(COSTO_VENTA_RESUMEN.debitosBrutos),
            creditos: formatCLP(-COSTO_VENTA_RESUMEN.creditosNC),
            neto: formatCLP(COSTO_VENTA_RESUMEN.totalMayor),
          }}
        />
        <div style={{ padding: '0 var(--space-4) var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
          Sep/Oct combinados en el mayor. Diciembre incluye ajustes de cierre anual.
        </div>
      </Card>
    </div>
  );
}
