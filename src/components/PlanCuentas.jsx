// ============================================
// COOM - Plan de Cuentas
// ============================================

import { useState } from 'react';
import { Card, DataTable, Badge, Tabs } from './ui';
import { PLAN_CUENTAS, CENTROS_COSTO } from '../data/financialData';

export function PlanCuentas() {
  const [vista, setVista] = useState('cuentas');

  const tabs = [
    { id: 'cuentas', label: 'Plan de Cuentas' },
    { id: 'centros', label: 'Centros de Costo' }
  ];

  const columnasCuentas = [
    { key: 'codigo', label: 'Código', render: v => <span className="font-mono">{v}</span> },
    { key: 'nombre', label: 'Nombre' },
    { 
      key: 'tipo', 
      label: 'Tipo',
      render: v => {
        const variant = {
          'Activo Corriente': 'ok',
          'Pasivo Corriente': 'warning',
          'Patrimonio': 'socia',
          'Ingresos': 'ok',
          'Costos': 'error',
          'Gastos': 'tercero'
        }[v] || 'default';
        return <Badge variant={variant}>{v}</Badge>;
      }
    }
  ];

  const columnasCentros = [
    { key: 'codigo', label: 'Código', render: v => <span className="font-mono">{v}</span> },
    { key: 'nombre', label: 'Marca / Centro' },
    { 
      key: 'tipo', 
      label: 'Tipo',
      render: v => <Badge variant={v === 'SOCIA' ? 'socia' : v === 'TERCERO' ? 'tercero' : 'default'}>{v}</Badge>
    },
    { key: 'responsable', label: 'Responsable' }
  ];

  // Agrupar cuentas por tipo
  const cuentasAgrupadas = PLAN_CUENTAS.reduce((acc, cuenta) => {
    if (!acc[cuenta.tipo]) acc[cuenta.tipo] = [];
    acc[cuenta.tipo].push(cuenta);
    return acc;
  }, {});

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
          Plan de Cuentas
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          Estructura contable y centros de costo COOM
        </p>
      </div>

      <Card>
        <div style={{ padding: 'var(--space-4) var(--space-5) 0' }}>
          <Tabs tabs={tabs} activeTab={vista} onTabChange={setVista} />
        </div>

        <div style={{ padding: 'var(--space-5)' }}>
          {vista === 'cuentas' ? (
            <div>
              {Object.entries(cuentasAgrupadas).map(([tipo, cuentas]) => (
                <div key={tipo} style={{ marginBottom: 'var(--space-5)' }}>
                  <h4 style={{ 
                    fontSize: 'var(--text-sm)', 
                    fontWeight: 'var(--font-semibold)',
                    color: 'var(--text-secondary)',
                    marginBottom: 'var(--space-3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em'
                  }}>
                    {tipo}
                  </h4>
                  <div style={{ 
                    background: 'var(--bg-subtle)', 
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden'
                  }}>
                    {cuentas.map((cuenta, idx) => (
                      <div 
                        key={cuenta.codigo}
                        style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          padding: 'var(--space-3) var(--space-4)',
                          borderBottom: idx < cuentas.length - 1 ? '1px solid var(--border-light)' : 'none',
                          background: idx % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-subtle)'
                        }}
                      >
                        <span className="font-mono" style={{ 
                          width: '80px',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-muted)'
                        }}>
                          {cuenta.codigo}
                        </span>
                        <span style={{ fontSize: 'var(--text-sm)' }}>
                          {cuenta.nombre}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <DataTable 
              columns={columnasCentros}
              data={CENTROS_COSTO}
            />
          )}
        </div>
      </Card>

      {/* Notas */}
      <div className="grid-2" style={{ marginTop: 'var(--space-5)' }}>
        <Card title="Estructura del Plan">
          <div style={{ padding: 'var(--space-2)' }}>
            <div style={{ fontSize: 'var(--text-sm)', lineHeight: 1.8 }}>
              <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                <span className="font-mono" style={{ color: 'var(--text-muted)', width: '60px' }}>1.X.XX</span>
                <span>Activos</span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                <span className="font-mono" style={{ color: 'var(--text-muted)', width: '60px' }}>2.X.XX</span>
                <span>Pasivos</span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                <span className="font-mono" style={{ color: 'var(--text-muted)', width: '60px' }}>3.X.XX</span>
                <span>Patrimonio</span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                <span className="font-mono" style={{ color: 'var(--text-muted)', width: '60px' }}>4.X.XX</span>
                <span>Ingresos</span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                <span className="font-mono" style={{ color: 'var(--text-muted)', width: '60px' }}>5.X.XX</span>
                <span>Costos</span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <span className="font-mono" style={{ color: 'var(--text-muted)', width: '60px' }}>6.X.XX</span>
                <span>Gastos</span>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Centros de Costo">
          <div style={{ padding: 'var(--space-2)' }}>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
              Los centros de costo permiten asignar ingresos y gastos a cada marca 
              o unidad de negocio dentro de la cooperativa.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--space-2)',
                fontSize: 'var(--text-sm)'
              }}>
                <Badge variant="socia">SOCIA</Badge>
                <span>3 marcas</span>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--space-2)',
                fontSize: 'var(--text-sm)'
              }}>
                <Badge variant="tercero">TERCERO</Badge>
                <span>4 marcas</span>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--space-2)',
                fontSize: 'var(--text-sm)'
              }}>
                <Badge>COMUN</Badge>
                <span>1 centro</span>
              </div>
            </div>

            <p style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--text-muted)', 
              marginTop: 'var(--space-4)',
              lineHeight: 1.5 
            }}>
              La distinción SOCIA/TERCERO es crítica para el tratamiento 
              tributario según Art. 17 DL 824.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
