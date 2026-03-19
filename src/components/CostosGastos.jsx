// ============================================
// COOM - Costos y Gastos
// ============================================

import { Card, KPI, DataTable, Badge } from './ui';
import { formatCLP, formatPct } from '../utils/format';
import { COSTOS_GASTOS, RESUMEN_COSTOS } from '../data/excedentesData';
import { EMPRESA } from '../data/financialData';

export function CostosGastos() {
  const columns = [
    { key: 'categoria', label: 'Categoría' },
    { key: 'subcategoria', label: 'Detalle' },
    { 
      key: 'tipo', 
      label: 'Tipo',
      render: (v) => (
        <Badge variant={v === 'FIJO' ? 'socia' : v === 'VARIABLE' ? 'tercero' : 'warning'}>
          {v}
        </Badge>
      )
    },
    { key: 'monto', label: 'Monto Anual', align: 'right', render: v => formatCLP(v) },
    { key: 'pct', label: '% Total', align: 'right', render: v => formatPct(v) }
  ];

  // Agrupar por categoría para el gráfico
  const categorias = [
    { nombre: 'Remuneraciones', monto: RESUMEN_COSTOS.remuneraciones, color: '#185FA5', pct: 32.1 },
    { nombre: 'Arriendos', monto: RESUMEN_COSTOS.arriendos, color: '#0F6E56', pct: 27.8 },
    { nombre: 'Servicios', monto: RESUMEN_COSTOS.servicios, color: '#534AB7', pct: 21.3 },
    { nombre: 'Cotizaciones', monto: RESUMEN_COSTOS.cotizaciones, color: '#D4537E', pct: 8.8 },
    { nombre: 'Otros', monto: RESUMEN_COSTOS.otros, color: '#888780', pct: 6.2 }
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
          Costos y Gastos
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          Distribución de gastos operacionales · {EMPRESA.periodo}
        </p>
      </div>

      {/* KPIs */}
      <div className="kpi-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <KPI 
          label="Gastos Totales" 
          value={RESUMEN_COSTOS.total}
          detail="Período anual 2025"
        />
        <KPI 
          label="Gastos Fijos" 
          value={RESUMEN_COSTOS.arriendos + RESUMEN_COSTOS.cotizaciones + 2898000 + 456789 + 4567890}
          detail={`${formatPct(63.4)} del total`}
        />
        <KPI 
          label="Gastos Variables" 
          value={2156789 + 2345678 + 1234567 + 1234567}
          detail={`${formatPct(32.3)} del total`}
        />
        <KPI 
          label="Gasto Mensual Prom." 
          value={Math.round(RESUMEN_COSTOS.total / 12)}
          detail="Promedio 12 meses"
        />
      </div>

      <div className="grid-2">
        {/* Distribución por categoría */}
        <Card title="Distribución por Categoría">
          <div style={{ padding: 'var(--space-4)' }}>
            {categorias.map((cat, idx) => (
              <div key={idx} style={{ marginBottom: 'var(--space-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: cat.color }}></span>
                    {cat.nombre}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCLP(cat.monto)}</span>
                </div>
                <div style={{ 
                  height: '8px', 
                  background: 'var(--bg-subtle)', 
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: `${cat.pct}%`,
                    height: '100%',
                    background: cat.color,
                    borderRadius: '4px'
                  }} />
                </div>
              </div>
            ))}

            <div style={{ 
              marginTop: 'var(--space-5)',
              paddingTop: 'var(--space-4)',
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-bold)'
            }}>
              <span>Total Gastos</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCLP(RESUMEN_COSTOS.total)}</span>
            </div>
          </div>
        </Card>

        {/* Composición Fijo vs Variable */}
        <Card title="Composición de Gastos">
          <div style={{ padding: 'var(--space-4)' }}>
            {/* Barra de composición */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{ 
                height: '32px', 
                background: 'var(--bg-subtle)', 
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex'
              }}>
                <div style={{ 
                  width: '63.4%',
                  height: '100%',
                  background: 'var(--brand-beige-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--text-xs)',
                  color: 'white',
                  fontWeight: 'var(--font-bold)'
                }}>
                  FIJOS 63%
                </div>
                <div style={{ 
                  width: '32.3%',
                  height: '100%',
                  background: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--text-xs)',
                  color: 'white',
                  fontWeight: 'var(--font-bold)'
                }}>
                  VAR 32%
                </div>
                <div style={{ 
                  width: '4.3%',
                  height: '100%',
                  background: '#D4537E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--text-xs)',
                  color: 'white'
                }}>
                </div>
              </div>
            </div>

            {/* Detalle */}
            <div style={{ 
              background: 'var(--bg-subtle)', 
              padding: 'var(--space-4)', 
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                <span><Badge variant="socia">FIJO</Badge> Arriendos, sueldos, servicios</span>
                <span className="font-mono">{formatCLP(13652679)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                <span><Badge variant="tercero">VARIABLE</Badge> Comisiones, honorarios</span>
                <span className="font-mono">{formatCLP(6971601)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span><Badge variant="warning">EXTRA</Badge> Multas, otros</span>
                <span className="font-mono">{formatCLP(105600)}</span>
              </div>
            </div>

            <p style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--text-muted)', 
              marginTop: 'var(--space-4)',
              lineHeight: 1.5
            }}>
              Los gastos fijos representan compromisos mensuales ineludibles. 
              El arriendo fijo con Territoria ($320K/mes) es el componente más relevante.
            </p>
          </div>
        </Card>
      </div>

      {/* Detalle de gastos */}
      <Card title="Detalle de Gastos Operacionales" style={{ marginTop: 'var(--space-5)' }}>
        <DataTable 
          columns={columns}
          data={COSTOS_GASTOS}
          footer={{
            categoria: 'TOTAL',
            subcategoria: '',
            tipo: '',
            monto: formatCLP(RESUMEN_COSTOS.total),
            pct: '100.0%'
          }}
        />
      </Card>

      {/* Top 3 gastos */}
      <Card title="Principales Centros de Costo" style={{ marginTop: 'var(--space-5)' }}>
        <div className="grid-3">
          <div style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', fontFamily: 'var(--font-mono)', color: 'var(--brand-beige-dark)' }}>
              #1
            </div>
            <div style={{ fontSize: 'var(--text-md)', fontWeight: 'var(--font-semibold)', marginTop: 'var(--space-2)' }}>
              Sueldos Vendedoras
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>
              {formatCLP(4567890)}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 'var(--space-1)' }}>
              21.2% del total
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', fontFamily: 'var(--font-mono)', color: 'var(--brand-beige-dark)' }}>
              #2
            </div>
            <div style={{ fontSize: 'var(--text-md)', fontWeight: 'var(--font-semibold)', marginTop: 'var(--space-2)' }}>
              Arriendo Fijo Territoria
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>
              {formatCLP(3840000)}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 'var(--space-1)' }}>
              17.8% del total
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', fontFamily: 'var(--font-mono)', color: 'var(--brand-beige-dark)' }}>
              #3
            </div>
            <div style={{ fontSize: 'var(--text-md)', fontWeight: 'var(--font-semibold)', marginTop: 'var(--space-2)' }}>
              Contabilidad Account
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>
              {formatCLP(2898000)}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 'var(--space-1)' }}>
              13.4% del total
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
