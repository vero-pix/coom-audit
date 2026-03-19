// ============================================
// COOM - Componentes Base
// ============================================

import { formatCLP, formatPct, getValueClass } from '../utils/format';

// ─────────────────────────────────────────
// CARD
// ─────────────────────────────────────────
export function Card({ title, subtitle, children, actions, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {(title || actions) && (
        <div className="card-header">
          <div>
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {actions && <div className="card-actions">{actions}</div>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// KPI
// ─────────────────────────────────────────
export function KPI({ label, value, format = 'currency', detail, trend, className = '' }) {
  const formattedValue = format === 'currency' 
    ? formatCLP(value) 
    : format === 'percent' 
      ? formatPct(value) 
      : value;
  
  const valueClass = format === 'currency' ? getValueClass(value) : '';

  return (
    <div className={`kpi ${className}`}>
      <div className="kpi-label">{label}</div>
      <div className={`kpi-value ${valueClass}`}>{formattedValue}</div>
      {detail && <div className="kpi-detail">{detail}</div>}
      {trend && (
        <div className={`kpi-trend ${trend.direction}`}>
          {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────
// BADGE
// ─────────────────────────────────────────
export function Badge({ children, variant = 'default' }) {
  const variantClass = {
    socia: 'badge-socia',
    tercero: 'badge-tercero',
    ok: 'badge-ok',
    warning: 'badge-warning',
    error: 'badge-error',
    default: ''
  }[variant] || '';

  return (
    <span className={`badge ${variantClass}`}>
      {children}
    </span>
  );
}

// ─────────────────────────────────────────
// ALERT
// ─────────────────────────────────────────
export function Alert({ nivel, titulo, descripcion, accion }) {
  const nivelClass = {
    CRITICO: 'alert-critical',
    ALTO: 'alert-warning',
    MEDIO: 'alert-info'
  }[nivel] || 'alert-info';

  const icon = {
    CRITICO: '!',
    ALTO: '!',
    MEDIO: 'i'
  }[nivel] || 'i';

  return (
    <div className={`alert ${nivelClass}`}>
      <div className="alert-icon">{icon}</div>
      <div className="alert-content">
        <h4>{titulo}</h4>
        <p>{descripcion}</p>
        {accion && <p style={{ marginTop: '8px', fontWeight: 500 }}>→ {accion}</p>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// TABS
// ─────────────────────────────────────────
export function Tabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="tabs">
      {tabs.map(tab => (
        <div
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────
// BUTTON
// ─────────────────────────────────────────
export function Button({ children, variant = 'primary', size = 'md', onClick, disabled }) {
  const variantClass = `btn-${variant}`;
  const sizeClass = size === 'sm' ? 'btn-sm' : '';

  return (
    <button 
      className={`btn ${variantClass} ${sizeClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────
// SELECT
// ─────────────────────────────────────────
export function Select({ label, value, options, onChange }) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <select 
        className="form-select" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─────────────────────────────────────────
// DATA TABLE
// ─────────────────────────────────────────
export function DataTable({ columns, data, footer }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} className={col.align === 'right' ? 'text-right' : ''}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map(col => (
                <td 
                  key={col.key} 
                  className={`${col.align === 'right' ? 'col-number' : ''} ${col.className ? col.className(row) : ''}`}
                >
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {footer && (
          <tfoot>
            <tr className="row-total">
              {columns.map(col => (
                <td key={col.key} className={col.align === 'right' ? 'col-number' : ''}>
                  {footer[col.key] || ''}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
