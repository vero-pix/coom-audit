// ============================================
// COOM - Flujo de Caja
// ============================================

import { useState } from 'react';
import { Card, KPI, DataTable, Badge, Tabs, Alert } from './ui';
import { formatCLP, formatPct, formatNumber } from '../utils/format';
import { CARTOLA_MENSUAL, LIQUIDEZ, EMPRESA } from '../data/financialData';
import { RESUMEN_COSTOS } from '../data/excedentesData';

export function FlujoCaja() {
  const [vistaProyeccion, setVistaProyeccion] = useState('normal');

  // Calcular métricas de flujo
  const totalAbonos = CARTOLA_MENSUAL.reduce((acc, m) => acc + m.abonos, 0);
  const totalCargos = CARTOLA_MENSUAL.reduce((acc, m) => acc + m.cargos, 0);
  const flujoNeto = totalAbonos - totalCargos;
  const promedioAbonos = Math.round(totalAbonos / 12);
  const promedioCargos = Math.round(totalCargos / 12);

  // Datos para proyección
  const saldoActual = CARTOLA_MENSUAL[CARTOLA_MENSUAL.length - 1].saldoFinal;
  const gastoFijoMensual = 4500000; // Estimado basado en datos
  const ingresoPromedio = promedioAbonos;

  // Proyección 6 meses
  const proyeccion = [];
  const mesesFuturos = ['Ene-26', 'Feb-26', 'Mar-26', 'Abr-26', 'May-26', 'Jun-26'];
  let saldoProyectado = saldoActual;
  
  // Escenarios
  const escenarios = {
    pesimista: { ingresos: ingresoPromedio * 0.7, gastos: promedioCargos * 1.1 },
    normal: { ingresos: ingresoPromedio, gastos: promedioCargos },
    optimista: { ingresos: ingresoPromedio * 1.2, gastos: promedioCargos * 0.9 }
  };

  mesesFuturos.forEach((mes, idx) => {
    const escenario = escenarios[vistaProyeccion];
    const ingresos = Math.round(escenario.ingresos);
    const gastos = Math.round(escenario.gastos);
    saldoProyectado = saldoProyectado + ingresos - gastos;
    proyeccion.push({
      mes,
      ingresos,
      gastos,
      flujo: ingresos - gastos,
      saldo: saldoProyectado
    });
  });

  // Columnas tabla histórico
  const columnsHistorico = [
    { key: 'mes', label: 'Mes' },
    { key: 'saldoInicial', label: 'Saldo Inicial', align: 'right', render: v => formatCLP(v) },
    { key: 'abonos', label: 'Ingresos', align: 'right', render: v => formatCLP(v), className: () => 'fin-ingreso' },
    { key: 'cargos', label: 'Egresos', align: 'right', render: v => formatCLP(v), className: () => 'fin-costo' },
    { 
      key: 'flujo', 
      label: 'Flujo Neto', 
      align: 'right',
      render: (v, row) => {
        const flujo = row.abonos - row.cargos;
        return formatCLP(flujo);
      },
      className: (row) => (row.abonos - row.cargos) >= 0 ? 'fin-resultado-positivo' : 'fin-resultado-negativo'
    },
    { key: 'saldoFinal', label: 'Saldo Final', align: 'right', render: v => formatCLP(v) }
  ];

  // Columnas tabla proyección
  const columnsProyeccion = [
    { key: 'mes', label: 'Mes' },
    { key: 'ingresos', label: 'Ingresos Est.', align: 'right', render: v => formatCLP(v), className: () => 'fin-ingreso' },
    { key: 'gastos', label: 'Egresos Est.', align: 'right', render: v => formatCLP(v), className: () => 'fin-costo' },
    { 
      key: 'flujo', 
      label: 'Flujo Neto', 
      align: 'right',
      render: v => formatCLP(v),
      className: (row) => row.flujo >= 0 ? 'fin-resultado-positivo' : 'fin-resultado-negativo'
    },
    { key: 'saldo', label: 'Saldo Proyectado', align: 'right', render: v => formatCLP(v) }
  ];

  // Calcular días de caja
  const diasCaja = Math.round((saldoActual / promedioCargos) * 30);
  const runway = (saldoActual / promedioCargos).toFixed(1);

  // Determinar estado de liquidez
  const estadoLiquidez = diasCaja >= 45 ? 'ok' : diasCaja >= 30 ? 'warning' : 'error';
  const estadoTexto = diasCaja >= 45 ? 'Saludable' : diasCaja >= 30 ? 'Ajustado' : 'Crítico';

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
          Flujo de Caja
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          Proyección de liquidez y análisis de tesorería · {EMPRESA.periodo}
        </p>
      </div>

      {/* Alerta si liquidez ajustada */}
      {diasCaja < 45 && (
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <Alert 
            nivel={diasCaja < 30 ? 'CRITICO' : 'MEDIO'}
            titulo={`Liquidez ${estadoTexto.toLowerCase()}: ${diasCaja} días de caja`}
            descripcion={`El saldo actual de ${formatCLP(saldoActual)} cubre aproximadamente ${runway} meses de operación al ritmo actual de gastos (${formatCLP(promedioCargos)}/mes).`}
            accion={diasCaja < 30 ? 'Priorizar cobros y diferir pagos no críticos.' : 'Monitorear ingresos de las próximas semanas.'}
          />
        </div>
      )}

      {/* KPIs */}
      <div className="kpi-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <KPI 
          label="Saldo Actual" 
          value={saldoActual}
          detail={`Al cierre de Diciembre 2025`}
        />
        <KPI 
          label="Días de Caja" 
          value={diasCaja}
          format="number"
          detail={<Badge variant={estadoLiquidez}>{estadoTexto}</Badge>}
        />
        <KPI 
          label="Runway" 
          value={`${runway} meses`}
          format="text"
          detail="Cobertura de gastos operacionales"
        />
        <KPI 
          label="Flujo Neto Anual" 
          value={flujoNeto}
          detail={flujoNeto >= 0 ? 'Superávit' : 'Déficit'}
          className={flujoNeto >= 0 ? '' : 'negative'}
        />
      </div>

      {/* Gráfico de evolución */}
      <Card title="Evolución de Saldo Bancario" subtitle="Histórico mensual 2025">
        <div style={{ padding: 'var(--space-4)' }}>
          {/* Gráfico simple con barras */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-end', 
            gap: '8px', 
            height: '200px',
            padding: '0 var(--space-2)',
            borderBottom: '1px solid var(--border-light)'
          }}>
            {CARTOLA_MENSUAL.map((m, idx) => {
              const maxSaldo = Math.max(...CARTOLA_MENSUAL.map(x => x.saldoFinal));
              const altura = (m.saldoFinal / maxSaldo) * 160;
              const flujoMes = m.abonos - m.cargos;
              return (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div 
                    style={{ 
                      width: '100%', 
                      height: `${altura}px`,
                      background: flujoMes >= 0 ? 'var(--brand-beige-dark)' : '#D4537E',
                      borderRadius: '4px 4px 0 0',
                      minHeight: '20px',
                      position: 'relative'
                    }}
                    title={`${m.mes}: ${formatCLP(m.saldoFinal)}`}
                  >
                    <span style={{
                      position: 'absolute',
                      top: '-20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '10px',
                      color: 'var(--text-muted)',
                      whiteSpace: 'nowrap'
                    }}>
                      {(m.saldoFinal / 1000000).toFixed(1)}M
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Labels */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            {CARTOLA_MENSUAL.map((m, idx) => (
              <div key={idx} style={{ flex: 1, textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)' }}>
                {m.mes}
              </div>
            ))}
          </div>
          {/* Leyenda */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '2px', background: 'var(--brand-beige-dark)' }}></span>
              Flujo positivo
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#D4537E' }}></span>
              Flujo negativo
            </span>
          </div>
        </div>
      </Card>

      {/* Grid 2 columnas */}
      <div className="grid-2" style={{ marginTop: 'var(--space-5)' }}>
        {/* Indicadores de liquidez */}
        <Card title="Indicadores de Liquidez">
          <div style={{ padding: 'var(--space-4)' }}>
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                <span>Ingreso mensual promedio</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-semibold)', color: 'var(--color-success)' }}>
                  {formatCLP(promedioAbonos)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                <span>Egreso mensual promedio</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-semibold)', color: 'var(--color-danger)' }}>
                  {formatCLP(promedioCargos)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                <span>Flujo neto promedio</span>
                <span style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontWeight: 'var(--font-semibold)',
                  color: (promedioAbonos - promedioCargos) >= 0 ? 'var(--color-success)' : 'var(--color-danger)'
                }}>
                  {formatCLP(promedioAbonos - promedioCargos)}
                </span>
              </div>
            </div>

            <div style={{ 
              background: 'var(--bg-subtle)', 
              padding: 'var(--space-4)', 
              borderRadius: 'var(--radius-md)'
            }}>
              <div style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>
                <strong>Burn Rate:</strong> {formatCLP(promedioCargos)}/mes
              </div>
              <div style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>
                <strong>Gastos Fijos:</strong> ~{formatCLP(gastoFijoMensual)}/mes
              </div>
              <div style={{ fontSize: 'var(--text-sm)' }}>
                <strong>Cobertura Fijos:</strong> {(saldoActual / gastoFijoMensual).toFixed(1)} meses
              </div>
            </div>

            <p style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--text-muted)', 
              marginTop: 'var(--space-4)',
              lineHeight: 1.5
            }}>
              El saldo actual permite cubrir {(saldoActual / gastoFijoMensual).toFixed(0)} meses de gastos fijos 
              (arriendos, sueldos, servicios) sin considerar nuevos ingresos.
            </p>
          </div>
        </Card>

        {/* Composición de flujos */}
        <Card title="Composición de Egresos Fijos">
          <div style={{ padding: 'var(--space-4)' }}>
            {[
              { nombre: 'Liquidaciones socias/terceros', monto: 6130000, pct: 72 },
              { nombre: 'Arriendos Territoria', monto: 590000, pct: 7 },
              { nombre: 'Sueldos vendedoras', monto: 680000, pct: 8 },
              { nombre: 'Servicios (Account, Transbank)', monto: 510000, pct: 6 },
              { nombre: 'Otros gastos', monto: 600000, pct: 7 }
            ].map((item, idx) => (
              <div key={idx} style={{ marginBottom: 'var(--space-3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: 'var(--text-sm)' }}>
                  <span>{item.nombre}</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCLP(item.monto)}</span>
                </div>
                <div style={{ 
                  height: '6px', 
                  background: 'var(--bg-subtle)', 
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: `${item.pct}%`,
                    height: '100%',
                    background: 'var(--brand-beige-dark)',
                    borderRadius: '3px'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Proyección */}
      <Card 
        title="Proyección 6 Meses" 
        subtitle="Estimación basada en promedios históricos"
        style={{ marginTop: 'var(--space-5)' }}
        actions={
          <div style={{ display: 'flex', gap: '8px' }}>
            {['pesimista', 'normal', 'optimista'].map(esc => (
              <button
                key={esc}
                onClick={() => setVistaProyeccion(esc)}
                style={{
                  padding: '4px 12px',
                  fontSize: '12px',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  background: vistaProyeccion === esc ? 'var(--brand-beige-dark)' : 'transparent',
                  color: vistaProyeccion === esc ? 'white' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {esc}
              </button>
            ))}
          </div>
        }
      >
        <DataTable 
          columns={columnsProyeccion}
          data={proyeccion}
        />
        <div style={{ padding: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
          <strong>Escenario {vistaProyeccion}:</strong>{' '}
          {vistaProyeccion === 'pesimista' && 'Ingresos -30%, Gastos +10% vs promedio histórico'}
          {vistaProyeccion === 'normal' && 'Mantiene promedios históricos de ingresos y gastos'}
          {vistaProyeccion === 'optimista' && 'Ingresos +20%, Gastos -10% vs promedio histórico'}
        </div>
      </Card>

      {/* Histórico */}
      <Card title="Histórico Mensual 2025" style={{ marginTop: 'var(--space-5)' }}>
        <DataTable 
          columns={columnsHistorico}
          data={CARTOLA_MENSUAL}
          footer={{
            mes: 'TOTAL',
            saldoInicial: '',
            abonos: formatCLP(totalAbonos),
            cargos: formatCLP(totalCargos),
            flujo: formatCLP(flujoNeto),
            saldoFinal: formatCLP(saldoActual)
          }}
        />
      </Card>
    </div>
  );
}
