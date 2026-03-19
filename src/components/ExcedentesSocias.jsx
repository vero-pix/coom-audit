// ============================================
// COOM - Excedentes y Liquidaciones
// ============================================

import { useState } from 'react';
import { Card, KPI, DataTable, Badge, Tabs, Alert } from './ui';
import { formatCLP, formatPct } from '../utils/format';
import { EXCEDENTES_SOCIAS, LIQUIDACIONES_TERCEROS, TOTALES_EXCEDENTES } from '../data/excedentesData';
import { EMPRESA } from '../data/financialData';

export function ExcedentesSocias() {
  const [activeTab, setActiveTab] = useState('socias');

  const tabs = [
    { id: 'socias', label: 'Socias' },
    { id: 'terceros', label: 'Terceros' }
  ];

  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene-26'];
  const mesKeys = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic', 'ene26'];

  const columnsSocias = [
    { 
      key: 'marca', 
      label: 'Marca',
      render: (v, row) => (
        <div>
          <div style={{ fontWeight: 'var(--font-semibold)' }}>{v}</div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{row.persona}</div>
        </div>
      )
    },
    { 
      key: 'estado', 
      label: 'Estado',
      render: (v) => (
        <Badge variant={v === 'Activa' ? 'ok' : 'warning'}>
          {v}
        </Badge>
      )
    },
    ...mesKeys.map((key, idx) => ({
      key,
      label: meses[idx],
      align: 'right',
      render: v => v > 0 ? formatCLP(v) : '-',
      className: () => 'col-number'
    })),
    { 
      key: 'total', 
      label: 'Total', 
      align: 'right', 
      render: v => formatCLP(v),
      className: () => 'font-bold'
    }
  ];

  const columnsTerceros = [
    { 
      key: 'marca', 
      label: 'Marca',
      render: (v, row) => (
        <div>
          <div style={{ fontWeight: 'var(--font-semibold)' }}>{v}</div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{row.persona}</div>
        </div>
      )
    },
    { 
      key: 'rut', 
      label: 'RUT',
      render: (v) => <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)' }}>{v}</span>
    },
    ...mesKeys.map((key, idx) => ({
      key,
      label: meses[idx],
      align: 'right',
      render: v => v > 0 ? formatCLP(v) : '-',
      className: () => 'col-number'
    })),
    { 
      key: 'total', 
      label: 'Total', 
      align: 'right', 
      render: v => formatCLP(v),
      className: () => 'font-bold'
    }
  ];

  // Calcular totales para footer
  const totalSocias = EXCEDENTES_SOCIAS.reduce((acc, s) => acc + s.total, 0);
  const totalTerceros = LIQUIDACIONES_TERCEROS.reduce((acc, t) => acc + t.total, 0);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
          Excedentes y Liquidaciones
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          Distribución de resultados a socias y terceros · {EMPRESA.periodo}
        </p>
      </div>

      {/* Alerta CPTS */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <Alert 
          nivel="CRITICO"
          titulo="Excedentes distribuidos con CPTS negativo"
          descripcion="Se distribuyeron ~$3.4M como excedentes durante períodos con pérdidas tributarias acumuladas. Potencial infracción al Art. 36 Ley General de Cooperativas."
          accion="Regularizar con asamblea extraordinaria o reclasificar como préstamos a socias."
        />
      </div>

      {/* KPIs */}
      <div className="kpi-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <KPI 
          label="Total Distribuido" 
          value={TOTALES_EXCEDENTES.total}
          detail="Excedentes + Liquidaciones"
        />
        <KPI 
          label="Excedentes Socias" 
          value={TOTALES_EXCEDENTES.socias}
          detail={`${formatPct((TOTALES_EXCEDENTES.socias / TOTALES_EXCEDENTES.total) * 100)} del total`}
        />
        <KPI 
          label="Liquidaciones Terceros" 
          value={TOTALES_EXCEDENTES.terceros}
          detail={`${formatPct((TOTALES_EXCEDENTES.terceros / TOTALES_EXCEDENTES.total) * 100)} del total`}
        />
        <KPI 
          label="Promedio Mensual" 
          value={Math.round(TOTALES_EXCEDENTES.total / 13)}
          detail="13 meses operativos"
        />
      </div>

      {/* Rankings lado a lado */}
      <div className="grid-2" style={{ marginBottom: 'var(--space-5)' }}>
        <Card title="Excedentes por Socia" subtitle="Total período">
          <div style={{ padding: 'var(--space-4)' }}>
            {EXCEDENTES_SOCIAS.map((s, idx) => (
              <div key={idx} style={{ marginBottom: 'var(--space-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {s.marca}
                    {s.estado === 'Inactiva' && (
                      <Badge variant="warning">Inactiva</Badge>
                    )}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-semibold)' }}>
                    {formatCLP(s.total)}
                  </span>
                </div>
                <div style={{ 
                  height: '8px', 
                  background: 'var(--bg-subtle)', 
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: `${(s.total / EXCEDENTES_SOCIAS[0].total) * 100}%`,
                    height: '100%',
                    background: s.estado === 'Activa' ? '#185FA5' : '#888780',
                    borderRadius: '4px'
                  }} />
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {s.persona}
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
              <span>Total Socias</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCLP(totalSocias)}</span>
            </div>
          </div>
        </Card>

        <Card title="Liquidaciones Terceros" subtitle="Total período">
          <div style={{ padding: 'var(--space-4)' }}>
            {LIQUIDACIONES_TERCEROS.map((t, idx) => (
              <div key={idx} style={{ marginBottom: 'var(--space-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                  <span>{t.marca}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-semibold)' }}>
                    {formatCLP(t.total)}
                  </span>
                </div>
                <div style={{ 
                  height: '8px', 
                  background: 'var(--bg-subtle)', 
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: `${(t.total / LIQUIDACIONES_TERCEROS[0].total) * 100}%`,
                    height: '100%',
                    background: '#534AB7',
                    borderRadius: '4px'
                  }} />
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {t.persona} · {t.rut}
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
              <span>Total Terceros</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCLP(totalTerceros)}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs para detalle mensual */}
      <Card 
        title="Detalle Mensual" 
        subtitle="Desglose de transferencias por mes"
        actions={<Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />}
      >
        {activeTab === 'socias' ? (
          <div style={{ overflowX: 'auto' }}>
            <DataTable 
              columns={columnsSocias}
              data={EXCEDENTES_SOCIAS}
              footer={{
                marca: 'TOTAL',
                estado: '',
                ...Object.fromEntries(mesKeys.map(k => [k, formatCLP(EXCEDENTES_SOCIAS.reduce((acc, s) => acc + (s[k] || 0), 0))])),
                total: formatCLP(totalSocias)
              }}
            />
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <DataTable 
              columns={columnsTerceros}
              data={LIQUIDACIONES_TERCEROS}
              footer={{
                marca: 'TOTAL',
                rut: '',
                ...Object.fromEntries(mesKeys.map(k => [k, formatCLP(LIQUIDACIONES_TERCEROS.reduce((acc, t) => acc + (t[k] || 0), 0))])),
                total: formatCLP(totalTerceros)
              }}
            />
          </div>
        )}
      </Card>

      {/* Nota sobre La Margot */}
      <Card title="Nota: La Margot (Socia Inactiva)" style={{ marginTop: 'var(--space-5)' }}>
        <div style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
          <p style={{ marginBottom: 'var(--space-3)' }}>
            <strong>Maria Luisa Portilla</strong> figura como socia inactiva de la cooperativa. 
            Durante el período analizado recibió transferencias por un total de <strong>{formatCLP(753279)}</strong>.
          </p>
          <p style={{ marginBottom: 'var(--space-3)' }}>
            Estas transferencias corresponden principalmente a:
          </p>
          <ul style={{ paddingLeft: 'var(--space-4)', color: 'var(--text-secondary)' }}>
            <li>Gastos administrativos (Shopify, Google Suite)</li>
            <li>Cotizaciones previsionales</li>
            <li>Reembolsos varios</li>
          </ul>
          <p style={{ marginTop: 'var(--space-4)', color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
            Como socia inactiva, no opera una marca propia ni genera liquidaciones de ventas. 
            Los montos corresponden a gestiones administrativas de la cooperativa.
          </p>
        </div>
      </Card>
    </div>
  );
}
