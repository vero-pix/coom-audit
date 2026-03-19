// ============================================
// COOM - Simulador F22 AT2026
// ============================================

import { useState } from 'react';
import { Card, KPI, Badge, Button } from './ui';
import { formatCLP, formatPct } from '../utils/format';
import { SIMULADOR_F22, KPI as KPI_DATA } from '../data/financialData';

export function SimuladorF22() {
  const [escenarioActivo, setEscenarioActivo] = useState(1); // Moderado por defecto

  const escenario = SIMULADOR_F22.escenarios[escenarioActivo];

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
          Simulador F22 — AT2026
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          Proyección de Impuesto a la Renta · Año Comercial 2025
        </p>
      </div>

      {/* KPIs base */}
      <div className="kpi-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <KPI 
          label="Resultado Neto" 
          value={KPI_DATA.resultadoNeto}
          detail="Base imponible estimada"
        />
        <KPI 
          label="Tasa Aplicable" 
          value={`${escenario.tasa}%`}
          format="text"
          detail={escenario.nombre}
        />
        <KPI 
          label="Impuesto Estimado" 
          value={escenario.aPagar}
          detail="Según escenario seleccionado"
        />
      </div>

      {/* Selector de escenarios */}
      <Card title="Escenarios de Tributación">
        <div style={{ padding: 'var(--space-2)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
            {SIMULADOR_F22.escenarios.map((esc, idx) => (
              <button
                key={idx}
                onClick={() => setEscenarioActivo(idx)}
                style={{
                  flex: 1,
                  padding: 'var(--space-4)',
                  background: escenarioActivo === idx ? 'var(--bg-subtle)' : 'var(--bg-card)',
                  border: `2px solid ${escenarioActivo === idx ? 'var(--brand-beige-dark)' : 'var(--border-light)'}`,
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'var(--transition-fast)'
                }}
              >
                <div style={{ 
                  fontSize: 'var(--text-sm)', 
                  fontWeight: 'var(--font-semibold)',
                  marginBottom: 'var(--space-2)'
                }}>
                  {esc.nombre}
                </div>
                <div style={{ 
                  fontSize: 'var(--text-2xl)', 
                  fontWeight: 'var(--font-bold)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--semantic-negative)'
                }}>
                  {formatCLP(esc.aPagar)}
                </div>
                <div style={{ 
                  fontSize: 'var(--text-xs)', 
                  color: 'var(--text-muted)',
                  marginTop: 'var(--space-1)'
                }}>
                  Tasa {esc.tasa}%
                </div>
              </button>
            ))}
          </div>

          {/* Detalle del escenario seleccionado */}
          <div style={{ 
            background: 'var(--bg-subtle)', 
            padding: 'var(--space-5)', 
            borderRadius: 'var(--radius-md)'
          }}>
            <h4 style={{ 
              fontSize: 'var(--text-base)', 
              fontWeight: 'var(--font-semibold)',
              marginBottom: 'var(--space-4)'
            }}>
              Cálculo — {escenario.nombre}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                <span>Base Imponible</span>
                <span className="font-mono">{formatCLP(SIMULADOR_F22.baseImponible)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                <span>Tasa Primera Categoría</span>
                <span className="font-mono">{escenario.tasa}%</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: 'var(--text-sm)',
                padding: 'var(--space-2) 0',
                borderTop: '1px solid var(--border-light)'
              }}>
                <span>Impuesto Determinado</span>
                <span className="font-mono">{formatCLP(escenario.impuesto)}</span>
              </div>
              {escenario.creditos > 0 && (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: 'var(--text-sm)',
                  color: 'var(--semantic-positive)'
                }}>
                  <span>(-) Créditos</span>
                  <span className="font-mono">-{formatCLP(escenario.creditos)}</span>
                </div>
              )}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-bold)',
                padding: 'var(--space-3) 0',
                borderTop: '2px solid var(--border-medium)'
              }}>
                <span>Impuesto a Pagar</span>
                <span className="font-mono" style={{ color: 'var(--semantic-negative)' }}>
                  {formatCLP(escenario.aPagar)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Notas */}
      <div className="grid-2" style={{ marginTop: 'var(--space-5)' }}>
        <Card title="Supuestos por Escenario">
          <div style={{ padding: 'var(--space-2)' }}>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--space-2)',
                marginBottom: 'var(--space-2)'
              }}>
                <Badge variant="error">Conservador</Badge>
                <span style={{ fontSize: 'var(--text-sm)' }}>Tasa 25%</span>
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Asume pérdida de beneficio 14D por incumplimiento de requisitos. 
                Aplica tasa general de Primera Categoría.
              </p>
            </div>

            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--space-2)',
                marginBottom: 'var(--space-2)'
              }}>
                <Badge variant="warning">Moderado</Badge>
                <span style={{ fontSize: 'var(--text-sm)' }}>Tasa 10%</span>
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Mantiene régimen Pro Pyme 14D con tasa preferencial. 
                Sin créditos adicionales disponibles.
              </p>
            </div>

            <div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--space-2)',
                marginBottom: 'var(--space-2)'
              }}>
                <Badge variant="ok">Optimista</Badge>
                <span style={{ fontSize: 'var(--text-sm)' }}>Tasa 10% + Créditos</span>
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Régimen 14D más imputación de créditos por capacitación 
                u otros beneficios tributarios aplicables.
              </p>
            </div>
          </div>
        </Card>

        <Card title="Consideraciones">
          <div style={{ padding: 'var(--space-2)' }}>
            <div style={{ 
              background: 'var(--semantic-warning-soft)', 
              padding: 'var(--space-4)', 
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-4)',
              fontSize: 'var(--text-sm)',
              lineHeight: 1.6
            }}>
              <strong>Importante:</strong> Esta simulación es referencial. 
              El cálculo definitivo debe realizarse sobre la base imponible 
              determinada en el Balance Tributario.
            </div>

            <div style={{ 
              background: 'var(--bg-subtle)', 
              padding: 'var(--space-4)', 
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-4)',
              fontSize: 'var(--text-sm)',
              lineHeight: 1.6
            }}>
              <strong>Art. 17 DL 824:</strong> La correcta separación de 
              operaciones con socias (exentas) vs. terceros (gravadas) 
              impacta directamente en la base imponible.
            </div>

            <div style={{ 
              background: 'var(--bg-subtle)', 
              padding: 'var(--space-4)', 
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)',
              lineHeight: 1.6
            }}>
              <strong>Fecha límite F22:</strong> Abril 2026. Se recomienda 
              tener el balance cerrado y revisado al menos 30 días antes.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
