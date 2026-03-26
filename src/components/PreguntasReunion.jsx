// ============================================
// COOM - Preguntas para reunión
// ============================================
import { Card, Badge } from './ui';
import { PREGUNTAS_REUNION, EMPRESA } from '../data/financialData';

export function PreguntasReunion() {
  const prioridadColor = {
    'CRÍTICA': 'error',
    'ALTA': 'warning',
    'MEDIA': 'socia',
  };

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
          Preguntas para reunión
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          Contadora (Account SPA) + Inspectora de Cuentas + Administración · {EMPRESA.periodo}
        </p>
      </div>

      <div style={{ background: 'var(--bg-subtle)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
        Estas preguntas surgen del cruce entre el Libro Mayor entregado por Account SPA, 
        la carpeta tributaria del SII y los registros internos de la cooperativa. 
        Están ordenadas por prioridad y dirigidas al interlocutor que puede resolverlas.
      </div>

      {PREGUNTAS_REUNION.map((bloque, i) => (
        <Card key={i} title={bloque.tema} style={{ marginBottom: 'var(--space-4)' }}>
          <div style={{ padding: 'var(--space-4)' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
              <Badge variant={prioridadColor[bloque.prioridad] || 'socia'}>{bloque.prioridad}</Badge>
              <span style={{ color: 'var(--text-muted)' }}>Dirigida a: {bloque.dirigidaA}</span>
            </div>
            <ol style={{ margin: 0, paddingLeft: '20px' }}>
              {bloque.preguntas.map((p, j) => (
                <li key={j} style={{ 
                  fontSize: 'var(--text-sm)', 
                  color: 'var(--text-primary)', 
                  lineHeight: 1.6, 
                  marginBottom: 'var(--space-3)',
                  paddingLeft: '4px'
                }}>
                  {p}
                </li>
              ))}
            </ol>
          </div>
        </Card>
      ))}
    </div>
  );
}
