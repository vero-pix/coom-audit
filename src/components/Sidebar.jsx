// ============================================
// COOM - Sidebar Navigation
// ============================================

import { ALERTAS } from '../data/financialData';

const NAV_SECTIONS = [
  {
    title: 'General',
    items: [
      { id: 'resumen', label: 'Resumen Ejecutivo', icon: '◎' },
      { id: 'alertas', label: 'Alertas Auditoría', icon: '⚠', badge: ALERTAS.filter(a => a.nivel === 'CRITICO').length }
    ]
  },
  {
    title: 'Operaciones',
    items: [
      { id: 'ventas', label: 'Ventas por Marca', icon: '◈' },
      { id: 'costos', label: 'Costos y Gastos', icon: '◇' },
      { id: 'excedentes', label: 'Excedentes Socias', icon: '◆' },
      { id: 'honorarios', label: 'Honorarios BHE', icon: '◇' }
    ]
  },
  {
    title: 'Tributario',
    items: [
      { id: 'iva', label: 'IVA / F29', icon: '▣' },
      { id: 'f22', label: 'Simulador F22', icon: '▤' }
    ]
  },
  {
    title: 'Tesorería',
    items: [
      { id: 'banco', label: 'Cartola Bancaria', icon: '▥' },
      { id: 'conciliacion', label: 'Conciliación', icon: '▦' },
      { id: 'flujo', label: 'Flujo de Caja', icon: '▧' }
    ]
  },
  {
    title: 'Configuración',
    items: [
      { id: 'cuentas', label: 'Plan de Cuentas', icon: '▨' },
      { id: 'documentos', label: 'Documentos', icon: '▩' }
    ]
  }
];

export function Sidebar({ activeSection, onSectionChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">CO</div>
          <div>
            <div className="sidebar-logo-text">COOM</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
              Sistema de Apoyo Fzas
            </div>
          </div>
        </div>
      </div>

      {NAV_SECTIONS.map(section => (
        <div key={section.title} className="sidebar-section">
          <div className="sidebar-section-title">{section.title}</div>
          <ul className="sidebar-nav">
            {section.items.map(item => (
              <li
                key={item.id}
                className={`sidebar-nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => onSectionChange(item.id)}
              >
                <span style={{ fontSize: '0.9rem' }}>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge > 0 && <span className="badge">{item.badge}</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div style={{ 
        padding: '1rem 1.25rem', 
        fontSize: '0.7rem', 
        color: 'var(--text-muted)',
        borderTop: '1px solid var(--border-light)',
        marginTop: 'auto'
      }}>
        <div>RUT 65.220.032-K</div>
        <div>Pro Pyme General 14D</div>
        <div style={{ marginTop: '0.5rem' }}>Período: Ene - Dic 2025</div>
      </div>
    </aside>
  );
}
