// ============================================
// COOM - Utilidades de Formato
// ============================================

/**
 * Suma valores de un array por key
 */
export function sumBy(arr, key) {
  return arr.reduce((acc, item) => acc + (item[key] || 0), 0);
}

/**
 * Formatea número como moneda chilena (CLP)
 * @param {number} value - Valor a formatear
 * @param {boolean} showSign - Mostrar signo +/-
 */
export function formatCLP(value, showSign = false) {
  if (value === null || value === undefined) return '-';
  
  const formatted = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.abs(value));

  if (showSign && value > 0) return '+' + formatted;
  if (value < 0) return '-' + formatted.replace('$', '$');
  return formatted;
}

/**
 * Formatea número con separador de miles
 * @param {number} value - Valor a formatear
 */
export function formatNumber(value) {
  if (value === null || value === undefined) return '-';
  return new Intl.NumberFormat('es-CL').format(value);
}

/**
 * Formatea porcentaje
 * @param {number} value - Valor a formatear (ej: 32.5)
 * @param {number} decimals - Decimales a mostrar
 */
export function formatPct(value, decimals = 1) {
  if (value === null || value === undefined) return '-';
  return `${value.toFixed(decimals)}%`;
}

/**
 * Determina clase CSS según valor positivo/negativo
 * @param {number} value - Valor a evaluar
 */
export function getValueClass(value) {
  if (value > 0) return 'positive';
  if (value < 0) return 'negative';
  return '';
}

/**
 * Determina clase CSS financiera según tipo
 * @param {string} type - 'ingreso', 'costo', 'resultado'
 * @param {number} value - Para resultado, determina color
 */
export function getFinClass(type, value = 0) {
  switch (type) {
    case 'ingreso':
      return 'fin-ingreso';
    case 'costo':
      return 'fin-costo';
    case 'resultado':
      return value >= 0 ? 'fin-resultado-positivo' : 'fin-resultado-negativo';
    default:
      return '';
  }
}

/**
 * Exporta tabla a CSV
 * @param {Array} data - Datos a exportar
 * @param {Array} columns - Columnas [{key, label}]
 * @param {string} filename - Nombre del archivo
 */
export function exportToCSV(data, columns, filename) {
  const headers = columns.map(c => c.label).join(';');
  const rows = data.map(row => 
    columns.map(c => {
      const val = row[c.key];
      if (typeof val === 'number') return val;
      return `"${val || ''}"`;
    }).join(';')
  );
  
  const csv = [headers, ...rows].join('\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  
  URL.revokeObjectURL(url);
}
