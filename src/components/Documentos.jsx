// ============================================
// COOM - Centro de Documentos
// ============================================

import { Card, Badge, Button } from './ui';
import { EMPRESA } from '../data/financialData';

export function Documentos() {
  const documentos = [
    {
      categoria: 'Documentos de Auditoría - Descargables',
      items: [
        { 
          nombre: 'Cuadratura SII 2025', 
          descripcion: 'Libro Ventas, Compras, EERR, IVA/F29 consolidado',
          tipo: 'XLSX',
          estado: 'disponible',
          archivo: 'COOM_Cuadratura_SII_2025.xlsx',
          fecha: '19-Mar-2026'
        },
        { 
          nombre: 'Flujo de Caja y Conciliación', 
          descripcion: 'Flujo mensual, categorías, liquidaciones, conciliación bancaria',
          tipo: 'XLSX',
          estado: 'disponible',
          archivo: 'COOM_FlujoCaja_Conciliacion_2025.xlsx',
          fecha: '19-Mar-2026'
        }
      ]
    },
    {
      categoria: 'Reportes Financieros',
      items: [
        { 
          nombre: 'Excedentes por Socia', 
          descripcion: 'Distribución mensual de excedentes a socias',
          tipo: 'XLSX',
          estado: 'pendiente',
          fecha: '—'
        },
        { 
          nombre: 'Estado de Resultados 2025', 
          descripcion: 'EERR mensual consolidado',
          tipo: 'XLSX',
          estado: 'disponible',
          archivo: 'COOM_Cuadratura_SII_2025.xlsx',
          fecha: '19-Mar-2026'
        }
      ]
    },
    {
      categoria: 'Documentos Tributarios',
      items: [
        { 
          nombre: 'Resumen F29 Anual', 
          descripcion: 'Consolidado IVA mensual 2025 - Hoja IVA_F29',
          tipo: 'XLSX',
          estado: 'disponible',
          archivo: 'COOM_Cuadratura_SII_2025.xlsx',
          fecha: '19-Mar-2026'
        },
        { 
          nombre: 'Simulación F22 AT2026', 
          descripcion: 'Ver sección Simulador en el menú lateral',
          tipo: 'APP',
          estado: 'disponible',
          fecha: '—'
        },
        { 
          nombre: 'Carpeta Tributaria SII', 
          descripcion: 'Documento oficial - descargar desde SII',
          tipo: 'PDF',
          estado: 'externo',
          fecha: '—'
        }
      ]
    },
    {
      categoria: 'Cartolas y Bancos',
      items: [
        { 
          nombre: 'Cartola BancoEstado 2025', 
          descripcion: 'Movimientos consolidados - Hoja Detalle_Movimientos',
          tipo: 'XLSX',
          estado: 'disponible',
          archivo: 'COOM_FlujoCaja_Conciliacion_2025.xlsx',
          fecha: '19-Mar-2026'
        },
        { 
          nombre: 'Conciliación Bancaria', 
          descripcion: 'Cruce libro banco vs cartola - Hoja Conciliacion',
          tipo: 'XLSX',
          estado: 'disponible',
          archivo: 'COOM_FlujoCaja_Conciliacion_2025.xlsx',
          fecha: '19-Mar-2026'
        }
      ]
    }
  ];

  const getIcono = (tipo) => {
    switch(tipo) {
      case 'PDF': return '📄';
      case 'XLSX': return '📊';
      case 'DOCX': return '📝';
      case 'APP': return '⚙️';
      default: return '📁';
    }
  };

  const getEstadoBadge = (estado) => {
    switch(estado) {
      case 'disponible': return <Badge variant="ok">Disponible</Badge>;
      case 'pendiente': return <Badge variant="warning">Pendiente</Badge>;
      case 'externo': return <Badge variant="tercero">Externo</Badge>;
      default: return null;
    }
  };

  const handleDownload = (doc) => {
    if (doc.estado === 'disponible' && doc.archivo) {
      // Descargar desde /public
      const link = document.createElement('a');
      link.href = `/${doc.archivo}`;
      link.download = doc.archivo;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (doc.tipo === 'APP') {
      alert('Esta funcionalidad está disponible en el menú lateral del dashboard.');
    } else if (doc.estado === 'externo') {
      alert('Este documento debe descargarse directamente desde el SII o la fuente original.');
    } else {
      alert('Este documento aún no está disponible.');
    }
  };

  const disponibles = documentos.reduce((acc, cat) => acc + cat.items.filter(i => i.estado === 'disponible').length, 0);
  const pendientes = documentos.reduce((acc, cat) => acc + cat.items.filter(i => i.estado === 'pendiente').length, 0);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
          Documentos
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          Centro de descarga de reportes · {EMPRESA.periodo}
        </p>
      </div>

      {/* Resumen rápido */}
      <div className="kpi-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ 
          background: 'var(--semantic-positive-soft)', 
          padding: 'var(--space-4)', 
          borderRadius: 'var(--radius-md)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', fontFamily: 'var(--font-mono)' }}>
            {disponibles}
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>
            Documentos disponibles
          </div>
        </div>
        <div style={{ 
          background: 'var(--bg-subtle)', 
          padding: 'var(--space-4)', 
          borderRadius: 'var(--radius-md)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', fontFamily: 'var(--font-mono)' }}>
            {pendientes}
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>
            Pendientes
          </div>
        </div>
        <div style={{ 
          background: 'var(--bg-subtle)', 
          padding: 'var(--space-4)', 
          borderRadius: 'var(--radius-md)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', fontFamily: 'var(--font-mono)' }}>
            2
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>
            Archivos Excel
          </div>
        </div>
        <div style={{ 
          background: 'var(--bg-subtle)', 
          padding: 'var(--space-4)', 
          borderRadius: 'var(--radius-md)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', fontFamily: 'var(--font-mono)' }}>
            2025
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>
            Año fiscal
          </div>
        </div>
      </div>

      {/* Categorías de documentos */}
      {documentos.map((categoria, idx) => (
        <Card 
          key={idx}
          title={categoria.categoria}
          style={{ marginBottom: 'var(--space-4)' }}
        >
          <div style={{ padding: 'var(--space-2)' }}>
            {categoria.items.map((doc, docIdx) => (
              <div 
                key={docIdx}
                onClick={() => handleDownload(doc)}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  cursor: doc.estado === 'pendiente' ? 'not-allowed' : 'pointer',
                  opacity: doc.estado === 'pendiente' ? 0.6 : 1,
                  transition: 'background 0.15s',
                  marginBottom: '4px'
                }}
                onMouseEnter={(e) => {
                  if (doc.estado !== 'pendiente') {
                    e.currentTarget.style.background = 'var(--bg-subtle)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <span style={{ fontSize: '24px', marginRight: 'var(--space-3)' }}>
                  {getIcono(doc.tipo)}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontWeight: 'var(--font-semibold)', 
                    fontSize: 'var(--text-sm)',
                    marginBottom: '2px'
                  }}>
                    {doc.nombre}
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                    {doc.descripcion}
                  </div>
                </div>
                <div style={{ textAlign: 'right', marginLeft: 'var(--space-4)' }}>
                  {getEstadoBadge(doc.estado)}
                  <div style={{ 
                    fontSize: 'var(--text-xs)', 
                    color: 'var(--text-muted)',
                    marginTop: '4px'
                  }}>
                    {doc.tipo} · {doc.fecha}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}

      {/* Nota */}
      <div style={{ 
        background: 'var(--bg-subtle)', 
        padding: 'var(--space-4)', 
        borderRadius: 'var(--radius-md)',
        fontSize: 'var(--text-xs)',
        color: 'var(--text-muted)',
        lineHeight: 1.6
      }}>
        <strong>Archivos disponibles para descarga:</strong>
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li><strong>COOM_Cuadratura_SII_2025.xlsx</strong> - 5 hojas: Resumen, Libro Ventas, Libro Compras, EERR, IVA/F29</li>
          <li><strong>COOM_FlujoCaja_Conciliacion_2025.xlsx</strong> - 5 hojas: Flujo mensual, Categorías, Liquidaciones, Conciliación, Detalle</li>
        </ul>
        Los documentos "Externos" deben obtenerse desde la fuente original (SII, banco).
      </div>
    </div>
  );
}
