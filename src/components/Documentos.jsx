// ============================================
// COOM - Centro de Documentos
// ============================================

import { Card, Badge } from './ui';
import { EMPRESA } from '../data/financialData';

export function Documentos() {
  const documentos = [
    {
      categoria: 'Informes de Auditoría',
      items: [
        { 
          nombre: 'Informe Auditoría COOM 2025', 
          descripcion: 'Análisis completo período Enero-Diciembre 2025',
          tipo: 'PDF',
          estado: 'disponible',
          fecha: '15-Ene-2026'
        },
        { 
          nombre: 'Resumen Ejecutivo Auditoría', 
          descripcion: 'Hallazgos críticos y recomendaciones',
          tipo: 'DOCX',
          estado: 'disponible',
          fecha: '15-Ene-2026'
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
          estado: 'disponible',
          fecha: '20-Ene-2026'
        },
        { 
          nombre: 'Liquidaciones Terceros', 
          descripcion: 'Pagos a diseñadoras externas',
          tipo: 'XLSX',
          estado: 'disponible',
          fecha: '20-Ene-2026'
        },
        { 
          nombre: 'Estado de Resultados 2025', 
          descripcion: 'EERR mensual consolidado',
          tipo: 'XLSX',
          estado: 'disponible',
          fecha: '10-Ene-2026'
        },
        { 
          nombre: 'Flujo de Caja Proyectado', 
          descripcion: 'Proyección 6 meses con escenarios',
          tipo: 'XLSX',
          estado: 'disponible',
          fecha: '22-Ene-2026'
        }
      ]
    },
    {
      categoria: 'Documentos Tributarios',
      items: [
        { 
          nombre: 'Resumen F29 Anual', 
          descripcion: 'Consolidado IVA mensual 2025',
          tipo: 'PDF',
          estado: 'disponible',
          fecha: '05-Ene-2026'
        },
        { 
          nombre: 'Simulación F22 AT2026', 
          descripcion: 'Escenarios de impuesto renta',
          tipo: 'PDF',
          estado: 'disponible',
          fecha: '18-Ene-2026'
        },
        { 
          nombre: 'Carpeta Tributaria SII', 
          descripcion: 'Documento oficial descargado del SII',
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
          descripcion: 'Movimientos consolidados del año',
          tipo: 'XLSX',
          estado: 'disponible',
          fecha: '02-Ene-2026'
        },
        { 
          nombre: 'Conciliación Bancaria', 
          descripcion: 'Cruce libro banco vs cartola',
          tipo: 'XLSX',
          estado: 'pendiente',
          fecha: '—'
        }
      ]
    }
  ];

  const getIcono = (tipo) => {
    switch(tipo) {
      case 'PDF': return '📄';
      case 'XLSX': return '📊';
      case 'DOCX': return '📝';
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
    if (doc.estado === 'disponible') {
      // Simular descarga
      alert(`Descargando: ${doc.nombre}.${doc.tipo.toLowerCase()}\n\nEsta funcionalidad requiere backend para generar los archivos dinámicamente.`);
    } else if (doc.estado === 'externo') {
      alert('Este documento debe descargarse directamente desde el SII o la fuente original.');
    } else {
      alert('Este documento aún no está disponible.');
    }
  };

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
          background: 'var(--bg-subtle)', 
          padding: 'var(--space-4)', 
          borderRadius: 'var(--radius-md)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', fontFamily: 'var(--font-mono)' }}>
            {documentos.reduce((acc, cat) => acc + cat.items.filter(i => i.estado === 'disponible').length, 0)}
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
            {documentos.reduce((acc, cat) => acc + cat.items.filter(i => i.estado === 'pendiente').length, 0)}
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
            4
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>
            Categorías
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
        <strong>Nota:</strong> Los documentos marcados como "Disponible" pueden descargarse directamente. 
        Los documentos "Externos" deben obtenerse desde la fuente original (SII, banco, etc.). 
        Los documentos "Pendientes" están en proceso de elaboración.
        <br /><br />
        Para solicitar reportes adicionales o personalizados, contacta al equipo de auditoría.
      </div>
    </div>
  );
}
