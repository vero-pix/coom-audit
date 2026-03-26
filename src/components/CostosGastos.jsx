// ============================================
// COOM - Gastos (v2 - Account SPA)
// ============================================
import { Card, KPI as KPIWidget, Badge } from './ui';
import { formatCLP, formatPct } from '../utils/format';
import { EERR, GASTOS_OP, GASTOS_NO_OP, EMPRESA } from '../data/financialData';

export function CostosGastos() {
  const totalOp = GASTOS_OP.reduce((a, g) => a + g.monto, 0);
  const totalNoOp = GASTOS_NO_OP.reduce((a, g) => a + g.monto, 0);
  const totalGastos = totalOp + totalNoOp;

  const allGastos = [...GASTOS_OP, ...GASTOS_NO_OP].sort((a, b) => b.monto - a.monto);
  const maxGasto = allGastos[0]?.monto || 1;

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
          Gastos
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          En qué se gasta la plata que no va a las marcas · {EMPRESA.periodo}
        </p>
      </div>

      <div className="kpi-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <KPIWidget label="Gastos operacionales" value={totalOp} detail={`${formatPct(totalOp / EERR.totalIngresos * 100)} de ingresos`} />
        <KPIWidget label="Gastos no operacionales" value={totalNoOp} detail={`${formatPct(totalNoOp / EERR.totalIngresos * 100)} de ingresos`} />
        <KPIWidget label="Total gastos" value={totalGastos} detail={`${formatPct(totalGastos / EERR.totalIngresos * 100)} de ingresos`} />
        <KPIWidget label="Gasto mensual promedio" value={Math.round(totalGastos / 12)} detail="Promedio 12 meses" />
      </div>

      {/* Ranking completo */}
      <Card title="Todos los gastos ordenados de mayor a menor" subtitle={`${allGastos.length} cuentas del libro mayor · Total ${formatCLP(totalGastos)}`}>
        <div style={{ padding: 'var(--space-4)' }}>
          {allGastos.map((g, i) => {
            const pct = (g.monto / totalGastos) * 100;
            const isNoOp = g.cuenta.startsWith('3-02');
            return (
              <div key={i} style={{ marginBottom: 'var(--space-3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: 'var(--text-sm)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {g.nombre}
                    {isNoOp && <Badge variant="warning">no op.</Badge>}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', display: 'flex', gap: '12px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', minWidth: '40px', textAlign: 'right' }}>{formatPct(pct)}</span>
                    {formatCLP(g.monto)}
                  </span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${(g.monto / maxGasto) * 100}%`,
                    height: '100%',
                    background: isNoOp ? '#D4537E' : 'var(--brand-beige-dark)',
                    borderRadius: '3px'
                  }} />
                </div>
              </div>
            );
          })}
          <div style={{
            marginTop: 'var(--space-4)', paddingTop: 'var(--space-3)',
            borderTop: '2px solid var(--text-primary)',
            display: 'flex', justifyContent: 'space-between',
            fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)'
          }}>
            <span>Total</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCLP(totalGastos)}</span>
          </div>
        </div>
      </Card>

      {/* Fijo vs Variable */}
      <Card title="Estructura de gastos" style={{ marginTop: 'var(--space-5)' }}>
        <div style={{ padding: 'var(--space-4)' }}>
          {(() => {
            const fijos = [5610955, 490436, 92938, 1398801, 31100, 46951, 41417, 24640].reduce((a, b) => a + b, 0);
            const variables = [10891789, 2139937, 747082, 32703, 10656, 359599, 106755, 426997].reduce((a, b) => a + b, 0);
            const pctFijo = Math.round(fijos / totalGastos * 100);
            const pctVar = 100 - pctFijo;
            return (
              <>
                <div style={{ display: 'flex', height: '32px', borderRadius: '8px', overflow: 'hidden', marginBottom: 'var(--space-4)' }}>
                  <div style={{ width: `${pctFijo}%`, background: 'var(--brand-beige-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'white', fontWeight: '600' }}>
                    Fijos {pctFijo}%
                  </div>
                  <div style={{ width: `${pctVar}%`, background: '#534AB7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'white', fontWeight: '600' }}>
                    Variables {pctVar}%
                  </div>
                </div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  <strong>Fijos ({formatCLP(fijos)}):</strong> Arriendos, sueldos, contabilidad, seguros, gastos básicos, aseo.
                  <br />
                  <strong>Variables ({formatCLP(variables)}):</strong> Honorarios vendedoras, Transbank, Daes, multas, ajuste CM, otros.
                </div>
              </>
            );
          })()}
        </div>
      </Card>
    </div>
  );
}
