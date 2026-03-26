// ============================================
// COOM - Sidebar (v2 - corregido)
// ============================================
import { ALERTAS } from '../data/financialData';

const NAV_PRINCIPAL = [
  { id: 'resumen', label: 'Resumen', icon: '○' },
  { id: 'marca', label: 'Mi marca', icon: '◆' },
  { id: 'gastos', label: 'Gastos', icon: '◇' },
  { id: 'patrimonio', label: 'Patrimonio', icon: '□' },
];

const NAV_OTROS = [
  { id: 'alertas', label: 'Alertas financieras', icon: '△', badge: ALERTAS.filter(a => a.nivel === 'CRITICO' || a.nivel === 'ALTO').length },
  { id: 'preguntas', label: 'Preguntas reunión', icon: '?' },
  { id: 'documentos', label: 'Documentos', icon: '▪' },
];

export function Sidebar({ activeSection, onSectionChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">CO</div>
          <div>
            <div className="sidebar-logo-text">COOM</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Sistema de Apoyo Fzas</div>
          </div>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">General</div>
        <nav className="sidebar-nav">
          {NAV_PRINCIPAL.map(item => (
            <div
              key={item.id}
              className={`sidebar-nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => onSectionChange(item.id)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Otros</div>
        <nav className="sidebar-nav">
          {NAV_OTROS.map(item => (
            <div
              key={item.id}
              className={`sidebar-nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => onSectionChange(item.id)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
              {item.badge > 0 && (
                <span className="badge">{item.badge}</span>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'var(--space-4) var(--space-5)', borderTop: '1px solid var(--border-light)', fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
        RUT 65.220.032-K<br />
        Pro Pyme General 14D<br />
        Período: Ene - Dic 2025
      </div>
    </aside>
  );
}
