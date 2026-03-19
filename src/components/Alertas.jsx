// ============================================
// COOM - Alertas de Auditoría
// ============================================

import { useState } from 'react';
import { Card, Alert, Tabs } from './ui';
import { ALERTAS } from '../data/financialData';

export function Alertas() {
  const [filtro, setFiltro] = useState('todos');

  const alertasFiltradas = filtro === 'todos' 
    ? ALERTAS 
    : ALERTAS.filter(a => a.nivel === filtro);

  const conteo = {
    critico: ALERTAS.filter(a => a.nivel === 'CRITICO').length,
    alto: ALERTAS.filter(a => a.nivel === 'ALTO').length,
    medio: ALERTAS.filter(a => a.nivel === 'MEDIO').length
  };

  const tabs = [
    { id: 'todos', label: `Todas (${ALERTAS.length})` },
    { id: 'CRITICO', label: `Críticas (${conteo.critico})` },
    { id: 'ALTO', label: `Altas (${conteo.alto})` },
    { id: 'MEDIO', label: `Medias (${conteo.medio})` }
  ];

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
          Alertas de Auditoría
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          Hallazgos y observaciones del proceso de auditoría
        </p>
      </div>

      {/* Resumen */}
      <div className="grid-3" style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ 
          background: 'var(--semantic-negative-soft)', 
          padding: 'var(--space-5)', 
          borderRadius: 'var(--radius-lg)',
          borderLeft: '4px solid var(--semantic-negative)'
        }}>
          <div style={{ 
            fontSize: 'var(--text-3xl)', 
            fontWeight: 'var(--font-bold)',
            color: 'var(--semantic-negative)'
          }}>
            {conteo.critico}
          </div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Alertas Críticas
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 'var(--space-2)' }}>
            Requieren acción inmediata
          </p>
        </div>

        <div style={{ 
          background: 'var(--semantic-warning-soft)', 
          padding: 'var(--space-5)', 
          borderRadius: 'var(--radius-lg)',
          borderLeft: '4px solid var(--semantic-warning)'
        }}>
          <div style={{ 
            fontSize: 'var(--text-3xl)', 
            fontWeight: 'var(--font-bold)',
            color: 'var(--semantic-warning)'
          }}>
            {conteo.alto}
          </div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Alertas Altas
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 'var(--space-2)' }}>
            Atención prioritaria
          </p>
        </div>

        <div style={{ 
          background: 'var(--semantic-info-soft)', 
          padding: 'var(--space-5)', 
          borderRadius: 'var(--radius-lg)',
          borderLeft: '4px solid var(--semantic-info)'
        }}>
          <div style={{ 
            fontSize: 'var(--text-3xl)', 
            fontWeight: 'var(--font-bold)',
            color: 'var(--semantic-info)'
          }}>
            {conteo.medio}
          </div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Alertas Medias
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 'var(--space-2)' }}>
            Seguimiento recomendado
          </p>
        </div>
      </div>

      {/* Lista de alertas */}
      <Card>
        <div style={{ padding: 'var(--space-4) var(--space-5) 0' }}>
          <Tabs tabs={tabs} activeTab={filtro} onTabChange={setFiltro} />
        </div>
        <div style={{ padding: 'var(--space-5)' }}>
          {alertasFiltradas.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 'var(--space-6)' }}>
              No hay alertas en esta categoría
            </p>
          ) : (
            alertasFiltradas.map((alerta, idx) => (
              <Alert key={idx} {...alerta} />
            ))
          )}
        </div>
      </Card>

      {/* Contexto */}
      <Card title="Contexto de Auditoría" style={{ marginTop: 'var(--space-5)' }}>
        <div style={{ padding: 'var(--space-2)' }}>
          <div className="grid-2" style={{ gap: 'var(--space-4)' }}>
            <div style={{ 
              background: 'var(--bg-subtle)', 
              padding: 'var(--space-4)', 
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)',
              lineHeight: 1.6
            }}>
              <strong style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
                Art. 36 Ley General de Cooperativas
              </strong>
              Los excedentes solo pueden distribuirse cuando existan utilidades 
              líquidas y realizadas. La distribución durante períodos con CPTS 
              negativo constituye una irregularidad que debe regularizarse.
            </div>

            <div style={{ 
              background: 'var(--bg-subtle)', 
              padding: 'var(--space-4)', 
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)',
              lineHeight: 1.6
            }}>
              <strong style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
                Art. 17 DL 824
              </strong>
              Las operaciones entre cooperativas y sus socias están exentas de IVA. 
              La emisión de facturas afectas a socias genera un cobro indebido que 
              debe corregirse mediante notas de crédito.
            </div>
          </div>

          <p style={{ 
            fontSize: 'var(--text-xs)', 
            color: 'var(--text-muted)', 
            marginTop: 'var(--space-5)',
            lineHeight: 1.5 
          }}>
            Las alertas se generan a partir del análisis de carpeta tributaria, 
            libro de compras/ventas, cartola bancaria y documentación contable. 
            Se recomienda abordar las alertas críticas con prioridad para evitar 
            contingencias tributarias o legales.
          </p>
        </div>
      </Card>
    </div>
  );
}
