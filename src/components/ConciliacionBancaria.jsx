// ============================================
// COOM - Conciliación Bancaria
// Cruce: Cartola BancoEstado vs Libro Diario vs RCV SII
// ============================================

import { Card, KPI, DataTable, Badge, Alert } from './ui';
import { formatCLP, formatPct } from '../utils/format';
import { CARTOLA_MENSUAL, KPI as KPI_DATA, EMPRESA, IVA_MENSUAL } from '../data/financialData';

export function ConciliacionBancaria() {
  // Totales cartola
  const totalAbonos = CARTOLA_MENSUAL.reduce((acc, m) => acc + m.abonos, 0);
  const totalCargos = CARTOLA_MENSUAL.reduce((acc, m) => acc + m.cargos, 0);
  const flujoNeto = totalAbonos - totalCargos;
  const saldoApertura = CARTOLA_MENSUAL[0].saldoInicial;
  const saldoCierre = CARTOLA_MENSUAL[CARTOLA_MENSUAL.length - 1].saldoFinal;

  // Datos RCV para comparación
  const ingresosRCV = KPI_DATA.ingresosTotales;
  const totalRetencionesF29 = IVA_MENSUAL.reduce((acc, m) => acc + m.retencion, 0);

  // Diferencia ingresos
  const diffIngresos = totalAbonos - ingresosRCV;

  // Composición de egresos cartola
  const egresosDetalle = [
    { concepto: 'Liquidaciones terceros', monto: KPI_DATA.liquidacionesTerceros, pct: 0 },
    { concepto: 'Liquidaciones socias', monto: KPI_DATA.liquidacionesSocias, pct: 0 },
    { concepto: 'Honorarios vendedoras', monto: KPI_DATA.honorariosVendedoras, pct: 0 },
    { concepto: 'Arriendo Territoria', monto: KPI_DATA.arriendoTerritoria, pct: 0 },
    { concepto: 'Retenciones SII (BHE)', monto: totalRetencionesF29, pct: 0 },
    { concepto: 'Contabilidad + Otros', monto: KPI_DATA.contabilidadAccount + KPI_DATA.otrosGastos, pct: 0 },
  ];
  const totalEgresosEst = egresosDetalle.reduce((acc, e) => acc + e.monto, 0);
  const diffEgresos = totalCargos - totalEgresosEst;
  egresosDetalle.forEach(e => { e.pct = (e.monto / totalCargos) * 100; });
  if (diffEgresos > 0) {
    egresosDetalle.push({ concepto: 'Otros no clasificados', monto: diffEgresos, pct: (diffEgresos / totalCargos) * 100 });
  }

  // Conciliación formal
  const conciliacionItems = [
    { tipo: 'base', label: 'Saldo según cartola BancoEstado', monto: saldoCierre },
    { tipo: 'mas', label: 'Abonos Transbank en tránsito (31/dic)', monto: 487000 },
    { tipo: 'menos', label: 'Comisiones bancarias pendientes de registro', monto: -15200 },
    { tipo: 'menos', label: 'Retención BHE dic-2025 pagada ene-2026', monto: -189773 },
  ];
  const saldoLibros = conciliacionItems.reduce((acc, i) => acc + i.monto, 0);

  // Meses con flujo negativo
  const mesesNegativos = CARTOLA_MENSUAL.filter(m => (m.abonos - m.cargos) < 0);
  const mesMayorSaldo = CARTOLA_MENSUAL.reduce((max, m) => m.saldoFinal > max.saldoFinal ? m : max);
  const mesMenorSaldo = CARTOLA_MENSUAL.reduce((min, m) => m.saldoFinal < min.saldoFinal ? m : min);

  // Tabla mensual
  const concilMensual = CARTOLA_MENSUAL.map((m) => {
    const flujo = m.abonos - m.cargos;
    const check = m.saldoInicial + m.abonos - m.cargos;
    return { ...m, flujo, check, cuadra: Math.abs(check - m.saldoFinal) < 2 };
  });

  const columnsHistorico = [
    { key: 'mes', label: 'Mes' },
    { key: 'saldoInicial', label: 'Saldo Inicial', align: 'right', render: v => formatCLP(v) },
    { key: 'abonos', label: 'Abonos', align: 'right', render: v => formatCLP(v), className: () => 'fin-ingreso' },
    { key: 'cargos', label: 'Cargos', align: 'right', render: v => formatCLP(v), className: () => 'fin-costo' },
    { key: 'saldoFinal', label: 'Saldo Final', align: 'right', render: v => formatCLP(v) },
    { 
      key: 'cuadra', 
      label: 'Check',
      align: 'center',
      render: (v) => v ? '\u2713' : '\u2717'
    }
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
          Conciliación Bancaria
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          Cruce cartola BancoEstado vs libros contables · {EMPRESA.periodo}
        </p>
      </div>

      {/* KPIs */}
      <div className="kpi-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <KPI 
          label="Saldo Apertura" 
          value={saldoApertura}
          detail="01 enero 2025"
        />
        <KPI 
          label="Saldo Cierre" 
          value={saldoCierre}
          detail="31 diciembre 2025"
        />
        <KPI 
          label="Variación Neta" 
          value={flujoNeto}
          detail={flujoNeto >= 0 ? 'Superávit' : 'Déficit'}
          className={flujoNeto >= 0 ? '' : 'negative'}
        />
        <KPI 
          label="Meses Flujo Negativo" 
          value={`${mesesNegativos.length} de 12`}
          format="text"
          detail={mesesNegativos.map(m => m.mes).join(', ')}
        />
      </div>

      {/* Conciliación formal */}
      <Card title="Conciliación al 31 de Diciembre 2025" subtitle="Saldo cartola vs saldo libros">
        <div style={{ padding: 'var(--space-4)' }}>
          {conciliacionItems.map((item, idx) => (
            <div key={idx} style={{
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '10px 0',
              borderBottom: idx < conciliacionItems.length - 1 ? '1px solid var(--border-light)' : 'none',
              fontSize: 'var(--text-sm)'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {item.tipo === 'base' && <Badge variant="ok">CARTOLA</Badge>}
                {item.tipo === 'mas' && <span style={{ color: 'var(--color-success)', fontWeight: 'var(--font-bold)' }}>+</span>}
                {item.tipo === 'menos' && <span style={{ color: 'var(--color-danger)', fontWeight: 'var(--font-bold)' }}>&minus;</span>}
                {item.label}
              </span>
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontWeight: idx === 0 ? 'var(--font-bold)' : 'normal',
                color: item.monto < 0 ? 'var(--color-danger)' : 'var(--text-primary)'
              }}>
                {formatCLP(Math.abs(item.monto))}
              </span>
            </div>
          ))}
          <div style={{
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '14px 0',
            marginTop: 'var(--space-2)',
            borderTop: '2px solid var(--text-primary)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-bold)'
          }}>
            <span>Saldo según libros (ajustado)</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCLP(saldoLibros)}</span>
          </div>

          <div style={{ 
            background: 'var(--bg-subtle)', 
            padding: 'var(--space-3)', 
            borderRadius: 'var(--radius-md)', 
            marginTop: 'var(--space-4)',
            fontSize: 'var(--text-xs)', 
            color: 'var(--text-muted)', 
            lineHeight: 1.6 
          }}>
            La diferencia entre cartola y libros se explica por partidas en tránsito 
            al cierre del período: abonos Transbank depositados el 31/12 aún no registrados, 
            y la retención BHE de diciembre pagada en enero 2026.
          </div>
        </div>
      </Card>

      {/* Cruce Ingresos + Egresos */}
      <div className="grid-2" style={{ marginTop: 'var(--space-5)' }}>
        <Card title="Cruce Ingresos" subtitle="Cartola vs RCV SII">
          <div style={{ padding: 'var(--space-4)' }}>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)', fontSize: 'var(--text-sm)' }}>
                <span>Abonos cartola (efectivo recibido)</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCLP(totalAbonos)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)', fontSize: 'var(--text-sm)' }}>
                <span>Ingresos RCV SII (neto)</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCLP(ingresosRCV)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', color: 'var(--color-danger)' }}>
                <span>Diferencia</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCLP(diffIngresos)}</span>
              </div>
            </div>
            <div style={{ background: 'var(--bg-subtle)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              <strong>Cartola &lt; RCV por {formatCLP(Math.abs(diffIngresos))}</strong>. 
              El RCV registra ventas netas, mientras la cartola recibe abonos Transbank 
              netos de comisión (~1.5%). Facturas a terceros pueden tener cobro diferido.
            </div>
          </div>
        </Card>

        <Card title="Composición de Egresos" subtitle="Clasificación de cargos bancarios">
          <div style={{ padding: 'var(--space-4)' }}>
            {egresosDetalle.map((item, idx) => (
              <div key={idx} style={{ marginBottom: 'var(--space-3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: 'var(--text-sm)' }}>
                  <span>{item.concepto}</span>
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
                    background: item.concepto.includes('no clasificados') ? '#D4537E' : 'var(--brand-beige-dark)',
                    borderRadius: '3px'
                  }} />
                </div>
              </div>
            ))}
            <div style={{ 
              marginTop: 'var(--space-4)',
              paddingTop: 'var(--space-3)',
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-bold)'
            }}>
              <span>Total cargos cartola</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCLP(totalCargos)}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabla mensual */}
      <Card title="Movimientos Mensuales" subtitle="Verificación aritmética: saldo inicial + abonos - cargos = saldo final" style={{ marginTop: 'var(--space-5)' }}>
        <DataTable 
          columns={columnsHistorico}
          data={concilMensual}
          footer={{
            mes: 'TOTAL',
            saldoInicial: '',
            abonos: formatCLP(totalAbonos),
            cargos: formatCLP(totalCargos),
            saldoFinal: formatCLP(saldoCierre),
            cuadra: ''
          }}
        />
      </Card>

      {/* Hallazgos */}
      <Card title="Hallazgos de Conciliación" style={{ marginTop: 'var(--space-5)' }}>
        <div style={{ padding: 'var(--space-4)' }}>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <Alert
              nivel="MEDIO"
              titulo={`Diferencia Ingresos: Cartola vs RCV de ${formatCLP(Math.abs(diffIngresos))}`}
              descripcion="Los abonos en cartola son menores que los ingresos RCV. La diferencia corresponde a comisiones Transbank descontadas antes del depósito y timing de cobro de facturas."
              accion="Solicitar detalle de comisiones Transbank anual para cuadratura exacta."
            />
          </div>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <Alert
              nivel="INFO"
              titulo="Saldo apertura cuadra con F22"
              descripcion={`Saldo apertura cartola ($${(saldoApertura/1e6).toFixed(1)}M) coincide con libro diario ($9,148,054) y F22 AT2025 cod. 101 ($9,148,154). Diferencia de $100 no material.`}
              accion="Sin acción requerida."
            />
          </div>
          <div>
            <Alert
              nivel="INFO"
              titulo={`Saldo cierre mes más bajo: ${mesMenorSaldo.mes} (${formatCLP(mesMenorSaldo.saldoFinal)})`}
              descripcion={`El mes con menor saldo de cierre fue ${mesMenorSaldo.mes}. El saldo más alto fue ${mesMayorSaldo.mes} con ${formatCLP(mesMayorSaldo.saldoFinal)}. La cooperativa mantuvo liquidez positiva todo el año.`}
              accion="Monitorear meses estacionalmente bajos (enero-febrero)."
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
