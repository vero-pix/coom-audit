// ============================================
// COOM - Mi Marca (v2 - Account SPA)
// ============================================
import { Card, KPI as KPIWidget, DataTable, Badge } from './ui';
import { formatCLP, formatPct, sumBy } from '../utils/format';
import { VENTAS_MARCA, EERR, EMPRESA, COSTO_VENTA_RESUMEN } from '../data/financialData';

export function VentasMarca() {
  const totalVentas = sumBy(VENTAS_MARCA, 'ventas');
  const totalLiq = sumBy(VENTAS_MARCA, 'liquidacion');
  const totalComision = totalVentas - totalLiq;
  const comisionPct = (totalComision / totalVentas) * 100;

  const marcas = VENTAS_MARCA.map(m => ({
    ...m,
    comision: m.ventas - m.liquidacion,
    comisionPct: ((m.ventas - m.liquidacion) / m.ventas * 100),
  })).sort((a, b) => b.ventas - a.ventas);

  const maxVenta = marcas[0]?.ventas || 1;

  const columns = [
    {
      key: 'marca', label: 'Marca',
      render: (v, row) => (
        <div>
          <span style={{ fontWeight: 'var(--font-semibold)' }}>{v}</span>
          <Badge variant={row.tipo === 'SOCIA' ? 'socia' : 'tercero'} style={{ marginLeft: '8px' }}>{row.tipo}</Badge>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{row.persona}</div>
        </div>
      )
    },
    { key: 'ventas', label: 'Ventas', align: 'right', render: v => formatCLP(v) },
    { key: 'liquidacion', label: 'Liquidación', align: 'right', render: v => formatCLP(v), className: () => 'fin-costo' },
    { key: 'comision', label: 'Comisión COOM', align: 'right', render: v => formatCLP(v), className: () => 'fin-resultado-positivo' },
    { key: 'comisionPct', label: '% Comisión', align: 'right', render: v => formatPct(v) },
  ];

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
          Mi marca
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          Ventas, liquidaciones y comisión por marca · {EMPRESA.periodo}
        </p>
      </div>

      <div className="kpi-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <KPIWidget label="Ventas totales (boletas)" value={totalVentas} detail="ventasmarcas.xlsx" />
        <KPIWidget label="Liquidaciones pagadas" value={totalLiq} detail="Libro compras RCV" />
        <KPIWidget label="Comisión cooperativa" value={totalComision} detail={`${formatPct(comisionPct)} promedio`} />
        <KPIWidget label="Marcas activas" value="7" format="text" detail="3 socias + 4 terceros" />
      </div>

      {/* Ranking visual */}
      <Card title="Ranking por ventas" subtitle="Ventas totales por marca (boletas + registros internos)">
        <div style={{ padding: 'var(--space-4)' }}>
          {marcas.map((m, i) => (
            <div key={i} style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 'var(--font-semibold)' }}>{m.marca}</span>
                  <Badge variant={m.tipo === 'SOCIA' ? 'socia' : 'tercero'}>{m.tipo}</Badge>
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-semibold)' }}>
                  {formatCLP(m.ventas)}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '2px', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${(m.liquidacion / maxVenta) * 100}%`,
                  background: m.tipo === 'SOCIA' ? '#185FA5' : 'var(--brand-beige-dark)',
                  borderRadius: '4px 0 0 4px'
                }} />
                <div style={{
                  width: `${(m.comision / maxVenta) * 100}%`,
                  background: 'var(--color-success)',
                  borderRadius: '0 4px 4px 0',
                  opacity: 0.6
                }} />
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
                <span>{m.persona}</span>
                <span>Comisión {formatPct(m.comisionPct)}</span>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: '16px', marginTop: 'var(--space-4)', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '8px', borderRadius: '2px', background: 'var(--brand-beige-dark)' }}></span>
              Liquidación (va a la marca)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '8px', borderRadius: '2px', background: 'var(--color-success)', opacity: 0.6 }}></span>
              Comisión (queda en COOM)
            </span>
          </div>
        </div>
      </Card>

      {/* Tabla detalle */}
      <Card title="Detalle por marca" style={{ marginTop: 'var(--space-5)' }}>
        <DataTable
          columns={columns}
          data={marcas}
          footer={{
            marca: 'TOTAL',
            ventas: formatCLP(totalVentas),
            liquidacion: formatCLP(totalLiq),
            comision: formatCLP(totalComision),
            comisionPct: formatPct(comisionPct),
          }}
        />
      </Card>
    </div>
  );
}
