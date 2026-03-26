// ============================================
// COOM - Alertas (v2)
// ============================================
import { Card, Alert } from './ui';
import { ALERTAS, EMPRESA } from '../data/financialData';

export function Alertas() {
  const niveles = ['CRITICO', 'ALTO', 'MEDIO', 'INFO'];
  return (
    <div>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
          Alertas de auditoría
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          Hallazgos que requieren atención · {EMPRESA.periodo}
        </p>
      </div>
      {niveles.map(nivel => {
        const alertas = ALERTAS.filter(a => a.nivel === nivel);
        if (alertas.length === 0) return null;
        return (
          <div key={nivel} style={{ marginBottom: 'var(--space-4)' }}>
            {alertas.map((a, i) => <Alert key={i} {...a} />)}
          </div>
        );
      })}
    </div>
  );
}
