// ============================================
// COOM - Documentos (v2)
// ============================================
import { Card } from './ui';
import { DOCUMENTOS, EMPRESA } from '../data/financialData';

export function Documentos() {
  return (
    <div>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
          Documentos
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          Descarga de respaldos · {EMPRESA.periodo}
        </p>
      </div>
      <Card title="Archivos disponibles">
        <div style={{ padding: 'var(--space-4)' }}>
          {DOCUMENTOS.map((doc, i) => (
            <a
              key={i}
              href={`/${doc.archivo}`}
              download
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 0',
                borderBottom: i < DOCUMENTOS.length - 1 ? '1px solid var(--border-light)' : 'none',
                textDecoration: 'none', color: 'var(--text-primary)', fontSize: 'var(--text-sm)',
              }}
            >
              <span>{doc.nombre}</span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', background: 'var(--bg-subtle)', padding: '4px 8px', borderRadius: '4px' }}>
                {doc.tipo}
              </span>
            </a>
          ))}
        </div>
      </Card>
    </div>
  );
}
