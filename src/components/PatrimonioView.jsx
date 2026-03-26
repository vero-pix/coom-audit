// ============================================
// COOM - Patrimonio (v2 - Account SPA)
// ============================================
import { Card, KPI as KPIWidget, Alert, Badge } from './ui';
import { formatCLP, formatPct } from '../utils/format';
import { PATRIMONIO, BALANCE, EMPRESA, EERR } from '../data/financialData';

export function PatrimonioView() {
  const { capitalPagado, perdidasAcumuladas, resultadoAC2025, cptsProyectado, cptsAT2025, puedeDistribuir, excedentesDistribuidos } = PATRIMONIO;

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
          Patrimonio
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          Se pueden repartir excedentes o no · {EMPRESA.periodo}
        </p>
      </div>

      {/* Alerta principal */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <Alert
          nivel="CRITICO"
          titulo="Excedentes distribuidos con CPTS negativo"
          descripcion={`Se distribuyeron ~${formatCLP(excedentesDistribuidos)} como excedentes durante períodos con pérdidas tributarias acumuladas. Potencial infracción al Art. 36 Ley General de Cooperativas.`}
          accion="Regularizar con asamblea extraordinaria o reclasificar como préstamos a socias."
        />
      </div>

      {/* KPIs */}
      <div className="kpi-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <KPIWidget label="CPTS AT2025" value={cptsAT2025} detail="Cierre AC2024 (negativo)" className="negative" />
        <KPIWidget label="Resultado AC2025" value={resultadoAC2025} detail={`${formatPct(EERR.resultadoPct)} rentabilidad`} />
        <KPIWidget label="CPTS proyectado" value={cptsProyectado} detail={puedeDistribuir ? 'Positivo — habilita excedentes' : 'Negativo — no habilita'} />
        <KPIWidget label="Capital pagado" value={capitalPagado} detail="Confirmado en mayor" />
      </div>

      {/* Evolución CPTS */}
      <Card title="Evolución del patrimonio" subtitle="Capital Propio Tributario Simplificado">
        <div style={{ padding: 'var(--space-4)' }}>
          {[
            { label: 'Capital aportado', value: capitalPagado, nota: 'Cta 2-03-01-01' },
            { label: 'Pérdidas acumuladas (AT2024)', value: perdidasAcumuladas, nota: 'F22 AT2024' },
            { label: 'CPTS al cierre AC2024', value: cptsAT2025, bold: true, border: true },
            { label: 'Resultado AC2025 (estimado)', value: resultadoAC2025, nota: 'Libro Mayor' },
            { label: 'CPTS proyectado', value: cptsProyectado, bold: true, border: true, highlight: true },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', padding: '10px 0',
              borderTop: item.border ? '1px solid var(--border-light)' : 'none',
              fontWeight: item.bold ? 'var(--font-bold)' : 'normal',
              fontSize: 'var(--text-sm)',
            }}>
              <span>
                {item.label}
                {item.nota && <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', marginLeft: '8px' }}>({item.nota})</span>}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                color: item.highlight ? (item.value >= 0 ? 'var(--color-success)' : 'var(--color-danger)') : item.value < 0 ? 'var(--color-danger)' : 'var(--text-primary)'
              }}>
                {formatCLP(item.value)}
              </span>
            </div>
          ))}

          <div style={{ background: 'var(--bg-subtle)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            {puedeDistribuir
              ? 'Si el resultado de $5.2M se confirma en el F22 AT2026, el CPTS pasa a positivo por primera vez. Esto habilita la distribución legal de excedentes (Art. 36 LGC). Los ~$3.4M ya distribuidos en períodos de CPTS negativo siguen siendo un riesgo pendiente.'
              : 'El CPTS se mantiene negativo. No es posible distribuir excedentes legalmente (Art. 36 LGC).'}
          </div>
        </div>
      </Card>

      {/* Balance simplificado */}
      <Card title="Balance simplificado" subtitle="Cuentas principales del mayor al 31/dic/2025" style={{ marginTop: 'var(--space-5)' }}>
        <div className="grid-2">
          <div style={{ padding: 'var(--space-4)' }}>
            <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-3)' }}>Activos</h4>
            {Object.entries(BALANCE.activo).map(([key, val], i) => {
              const labels = { banco: 'Banco BancoEstado', clientesVentas: 'Clientes por cobrar', ppm: 'PPM a favor', ivaCF: 'IVA crédito fiscal' };
              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 'var(--text-sm)', borderBottom: '1px solid var(--border-light)' }}>
                  <span>{labels[key] || key}</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCLP(val)}</span>
                </div>
              );
            })}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontWeight: 'var(--font-bold)', fontSize: 'var(--text-sm)' }}>
              <span>Total activos</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCLP(Object.values(BALANCE.activo).reduce((a, b) => a + b, 0))}</span>
            </div>
          </div>
          <div style={{ padding: 'var(--space-4)' }}>
            <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-3)' }}>Pasivos y patrimonio</h4>
            {Object.entries(BALANCE.pasivo).map(([key, val], i) => {
              const labels = { proveedores: 'Proveedores', honorariosPorPagar: 'Honorarios por pagar', ivaDF: 'IVA débito fiscal', impuesto2cat: 'Impuesto 2a cat.', ppmPorPagar: 'PPM por pagar' };
              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 'var(--text-sm)', borderBottom: '1px solid var(--border-light)' }}>
                  <span>{labels[key] || key}</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCLP(val)}</span>
                </div>
              );
            })}
            {Object.entries(BALANCE.patrimonio).map(([key, val], i) => {
              const labels = { capitalPagado: 'Capital pagado', resultadoNeto: 'Resultado del ejercicio' };
              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 'var(--text-sm)', borderBottom: '1px solid var(--border-light)', color: 'var(--color-success)' }}>
                  <span>{labels[key] || key}</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCLP(val)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}
