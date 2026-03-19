// ============================================
// COOM - Cartola Bancaria
// ============================================

import { Card, KPI, DataTable, Button } from './ui';
import { formatCLP, sumBy, exportToCSV } from '../utils/format';
import { CARTOLA_MENSUAL, EMPRESA, LIQUIDEZ } from '../data/financialData';

export function CartolaBancaria() {
  const totales = {
    abonos: sumBy(CARTOLA_MENSUAL, 'abonos'),
    cargos: sumBy(CARTOLA_MENSUAL, 'cargos'),
    movimientos: sumBy(CARTOLA_MENSUAL, 'movimientos')
  };

  const flujoNeto = totales.abonos - totales.cargos;
  const saldoInicial = CARTOLA_MENSUAL[0].saldoInicial;
  const saldoFinal = CARTOLA_MENSUAL[CARTOLA_MENSUAL.length - 1].saldoFinal;

  const columns = [
    { key: 'mes', label: 'Mes' },
    { key: 'saldoInicial', label: 'Saldo Inicial', align: 'right', render: v => formatCLP(v) },
    { 
      key: 'abonos', 
      label: 'Abonos', 
      align: 'right', 
      render: v => formatCLP(v),
      className: () => 'fin-resultado-positivo'
    },
    { 
      key: 'cargos', 
      label: 'Cargos', 
      align: 'right', 
      render: v => formatCLP(v),
      className: () => 'fin-costo'
    },
    { key: 'saldoFinal', label: 'Saldo Final', align: 'right', render: v => formatCLP(v) },
    { key: 'movimientos', label: 'Movs.', align: 'right' }
  ];

  const footer = {
    mes: 'TOTALES',
    saldoInicial: formatCLP(saldoInicial),
    abonos: formatCLP(totales.abonos),
    cargos: formatCLP(totales.cargos),
    saldoFinal: formatCLP(saldoFinal),
    movimientos: totales.movimientos
  };

  const handleExport = () => {
    exportToCSV(CARTOLA_MENSUAL, [
      { key: 'mes', label: 'Mes' },
      { key: 'saldoInicial', label: 'Saldo Inicial' },
      { key: 'abonos', label: 'Abonos' },
      { key: 'cargos', label: 'Cargos' },
      { key: 'saldoFinal', label: 'Saldo Final' },
      { key: 'movimientos', label: 'Movimientos' }
    ], 'COOM_Cartola_2025');
  };

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
          Cartola Bancaria
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          {EMPRESA.banco} · Cuenta {EMPRESA.cuenta} · Año 2025
        </p>
      </div>

      {/* KPIs */}
      <div className="kpi-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <KPI 
          label="Saldo Actual" 
          value={saldoFinal}
          detail={`${LIQUIDEZ.diasCaja} días de caja`}
        />
        <KPI 
          label="Total Abonos" 
          value={totales.abonos}
          detail="Ingresos del período"
        />
        <KPI 
          label="Total Cargos" 
          value={totales.cargos}
          detail="Egresos del período"
        />
        <KPI 
          label="Flujo Neto" 
          value={flujoNeto}
          detail={flujoNeto >= 0 ? "Superávit" : "Déficit"}
        />
      </div>

      {/* Tabla */}
      <Card 
        title="Movimientos Mensuales"
        actions={
          <Button variant="secondary" size="sm" onClick={handleExport}>
            ↓ Exportar CSV
          </Button>
        }
      >
        <DataTable 
          columns={columns}
          data={CARTOLA_MENSUAL}
          footer={footer}
        />
      </Card>

      {/* Análisis */}
      <div className="grid-2" style={{ marginTop: 'var(--space-5)' }}>
        <Card title="Evolución del Saldo">
          <div style={{ padding: 'var(--space-2)' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-end', 
              justifyContent: 'space-between',
              height: '160px',
              padding: '0 var(--space-2)'
            }}>
              {CARTOLA_MENSUAL.map((m, idx) => {
                const maxSaldo = Math.max(...CARTOLA_MENSUAL.map(x => x.saldoFinal));
                const height = (m.saldoFinal / maxSaldo) * 100;
                return (
                  <div key={idx} style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    flex: 1
                  }}>
                    <div style={{ 
                      width: '80%',
                      height: `${height}%`,
                      background: m.saldoFinal >= saldoInicial ? 'var(--brand-beige)' : 'var(--bg-hover)',
                      borderRadius: '3px 3px 0 0',
                      minHeight: '4px'
                    }} />
                    <span style={{ 
                      fontSize: '0.6rem', 
                      color: 'var(--text-muted)',
                      marginTop: 'var(--space-1)'
                    }}>
                      {m.mes}
                    </span>
                  </div>
                );
              })}
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginTop: 'var(--space-4)',
              padding: 'var(--space-3)',
              background: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)'
            }}>
              <span>
                <span style={{ color: 'var(--text-muted)' }}>Inicio:</span>{' '}
                <span className="font-mono">{formatCLP(saldoInicial)}</span>
              </span>
              <span>
                <span style={{ color: 'var(--text-muted)' }}>Fin:</span>{' '}
                <span className="font-mono">{formatCLP(saldoFinal)}</span>
              </span>
            </div>
          </div>
        </Card>

        <Card title="Indicadores de Liquidez">
          <div style={{ padding: 'var(--space-2)' }}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-4)'
            }}>
              <div style={{ 
                background: 'var(--bg-subtle)', 
                padding: 'var(--space-4)', 
                borderRadius: 'var(--radius-md)',
                textAlign: 'center'
              }}>
                <div style={{ 
                  fontSize: 'var(--text-2xl)', 
                  fontWeight: 'var(--font-bold)',
                  fontFamily: 'var(--font-mono)',
                  color: LIQUIDEZ.diasCaja >= 30 ? 'var(--semantic-positive)' : 'var(--semantic-warning)'
                }}>
                  {LIQUIDEZ.diasCaja}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                  Días de Caja
                </div>
              </div>
              <div style={{ 
                background: 'var(--bg-subtle)', 
                padding: 'var(--space-4)', 
                borderRadius: 'var(--radius-md)',
                textAlign: 'center'
              }}>
                <div style={{ 
                  fontSize: 'var(--text-2xl)', 
                  fontWeight: 'var(--font-bold)',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {LIQUIDEZ.razonCorriente}x
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                  Razón Corriente
                </div>
              </div>
            </div>

            <div style={{ 
              background: 'var(--bg-subtle)', 
              padding: 'var(--space-4)', 
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-4)'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                fontSize: 'var(--text-sm)',
                marginBottom: 'var(--space-2)'
              }}>
                <span>Burn Rate Mensual</span>
                <span className="font-mono">{formatCLP(LIQUIDEZ.burnRate)}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                fontSize: 'var(--text-sm)'
              }}>
                <span>Runway</span>
                <span className="font-mono">{LIQUIDEZ.runway} meses</span>
              </div>
            </div>

            <p style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--text-muted)', 
              lineHeight: 1.5 
            }}>
              Los {LIQUIDEZ.diasCaja} días de caja representan un colchón 
              de liquidez {LIQUIDEZ.diasCaja >= 30 ? 'adecuado' : 'ajustado'} para 
              las operaciones mensuales de la cooperativa.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
