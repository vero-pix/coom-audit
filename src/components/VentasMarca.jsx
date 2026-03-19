// ============================================
// COOM - Ventas por Marca
// ============================================

import { Card, KPI, DataTable, Badge, Button } from './ui';
import { formatCLP, formatPct, sumBy, exportToCSV } from '../utils/format';
import { VENTAS_MARCA } from '../data/financialData';

export function VentasMarca() {
  const totales = {
    ventas: sumBy(VENTAS_MARCA, 'ventas'),
    costo: sumBy(VENTAS_MARCA, 'costo'),
    margen: sumBy(VENTAS_MARCA, 'margen')
  };

  const ventasSocias = sumBy(VENTAS_MARCA.filter(m => m.tipo === 'SOCIA'), 'ventas');
  const ventasTerceros = sumBy(VENTAS_MARCA.filter(m => m.tipo === 'TERCERO'), 'ventas');

  const columns = [
    { 
      key: 'marca', 
      label: 'Marca / CC',
      render: (v, row) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          {v}
          <Badge variant={row.tipo === 'SOCIA' ? 'socia' : 'tercero'}>
            {row.tipo}
          </Badge>
        </span>
      )
    },
    { key: 'ventas', label: 'Ventas', align: 'right', render: v => formatCLP(v) },
    { key: 'costo', label: 'Costo', align: 'right', render: v => formatCLP(v), className: () => 'fin-costo' },
    { 
      key: 'margen', 
      label: 'Margen', 
      align: 'right', 
      render: v => formatCLP(v),
      className: (row) => row.margen >= 0 ? 'fin-resultado-positivo' : 'fin-resultado-negativo'
    },
    { key: 'pct', label: 'Margen %', align: 'right', render: v => formatPct(v) }
  ];

  const footer = {
    marca: 'TOTAL',
    ventas: formatCLP(totales.ventas),
    costo: formatCLP(totales.costo),
    margen: formatCLP(totales.margen),
    pct: formatPct((totales.margen / totales.ventas) * 100)
  };

  const handleExport = () => {
    exportToCSV(VENTAS_MARCA, [
      { key: 'marca', label: 'Marca' },
      { key: 'tipo', label: 'Tipo' },
      { key: 'ventas', label: 'Ventas' },
      { key: 'costo', label: 'Costo' },
      { key: 'margen', label: 'Margen' },
      { key: 'pct', label: 'Margen %' }
    ], 'COOM_Ventas_Marca_2025');
  };

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
          Ventas por Marca
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          Rentabilidad por centro de costo · Año Comercial 2025
        </p>
      </div>

      {/* KPIs */}
      <div className="kpi-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <KPI 
          label="Ventas Totales" 
          value={totales.ventas}
        />
        <KPI 
          label="Margen Total" 
          value={totales.margen}
          detail={formatPct((totales.margen / totales.ventas) * 100)}
        />
        <KPI 
          label="Ventas Socias" 
          value={ventasSocias}
          detail="Exento Art. 17"
        />
        <KPI 
          label="Ventas Terceros" 
          value={ventasTerceros}
          detail="Gravado IVA"
        />
      </div>

      {/* Tabla principal */}
      <Card 
        title="Detalle por Marca"
        actions={
          <Button variant="secondary" size="sm" onClick={handleExport}>
            ↓ Exportar CSV
          </Button>
        }
      >
        <DataTable 
          columns={columns}
          data={VENTAS_MARCA}
          footer={footer}
        />
      </Card>

      {/* Distribución visual */}
      <div className="grid-2" style={{ marginTop: 'var(--space-5)' }}>
        <Card title="Participación por Marca">
          <div style={{ padding: 'var(--space-2)' }}>
            {VENTAS_MARCA.map((marca, idx) => {
              const pct = (marca.ventas / totales.ventas) * 100;
              return (
                <div key={idx} style={{ marginBottom: 'var(--space-4)' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: 'var(--text-sm)',
                    marginBottom: 'var(--space-1)'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      {marca.marca}
                      <Badge variant={marca.tipo === 'SOCIA' ? 'socia' : 'tercero'}>
                        {marca.tipo}
                      </Badge>
                    </span>
                    <span className="font-mono">{formatPct(pct)}</span>
                  </div>
                  <div style={{ 
                    height: '6px', 
                    background: 'var(--bg-subtle)', 
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${pct}%`,
                      height: '100%',
                      background: marca.tipo === 'SOCIA' ? 'var(--brand-beige-dark)' : 'var(--text-muted)'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="Análisis de Rentabilidad">
          <div style={{ padding: 'var(--space-2)' }}>
            <div style={{ 
              background: 'var(--semantic-positive-soft)', 
              padding: 'var(--space-4)', 
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-4)'
            }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-1)' }}>
                Mayor Rentabilidad
              </div>
              <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)' }}>
                Endémica — {formatPct(36.7)}
              </div>
            </div>

            <div style={{ 
              background: 'var(--bg-subtle)', 
              padding: 'var(--space-4)', 
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-4)'
            }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-1)' }}>
                Mayor Volumen
              </div>
              <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)' }}>
                Casakiro — {formatCLP(21345678)}
              </div>
            </div>

            <p style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--text-muted)', 
              lineHeight: 1.5 
            }}>
              El margen promedio de {formatPct((totales.margen / totales.ventas) * 100)} es consistente 
              con el modelo de comisiones de la cooperativa. Las variaciones menores entre marcas 
              reflejan diferencias en mix de productos.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
