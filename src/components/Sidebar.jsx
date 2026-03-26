// ============================================
// COOM - Sidebar (v2 - 6 módulos)
// ============================================
import { ALERTAS } from '../data/financialData';

const NAV = [
  { id: 'resumen', label: 'Resumen', icon: '○' },
  { id: 'marca', label: 'Mi marca', icon: '◆' },
  { id: 'gastos', label: 'Gastos', icon: '◇' },
  { id: 'patrimonio', label: 'Patrimonio', icon: '□' },
  { id: 'alertas', label: 'Alertas', icon: '△', badge: ALERTAS.filter(a => a.nivel === 'CRITICO' || a.nivel === 'ALTO').length },
  { id: 'documentos', label: 'Documentos', icon: '▪' },
];

export function Sidebar({ activeSection, onSectionChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">CO</div>
        <div>
          <div className="sidebar-title">COOM</div>
          <div className="sidebar-subtitle">Sistema de Apoyo Fzas</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV.map(item => (
          <button
            key={item.id}
            className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => onSectionChange(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.badge > 0 && (
              <span className="sidebar-badge">{item.badge}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          RUT 65.220.032-K<br />
          Pro Pyme General 14D<br />
          Período: Ene - Dic 2025
        </div>
      </div>
    </aside>
  );
}
