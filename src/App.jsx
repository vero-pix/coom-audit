// ============================================
// COOM - App Principal (v2 - 6 módulos)
// ============================================
import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ResumenEjecutivo } from './components/ResumenEjecutivo';
import { VentasMarca } from './components/VentasMarca';
import { CostosGastos } from './components/CostosGastos';
import { PatrimonioView } from './components/PatrimonioView';
import { Alertas } from './components/Alertas';
import { Documentos } from './components/Documentos';
import { EMPRESA } from './data/financialData';

export default function App() {
  const [activeSection, setActiveSection] = useState('resumen');

  const renderContent = () => {
    switch (activeSection) {
      case 'resumen': return <ResumenEjecutivo />;
      case 'marca': return <VentasMarca />;
      case 'gastos': return <CostosGastos />;
      case 'patrimonio': return <PatrimonioView />;
      case 'alertas': return <Alertas />;
      case 'documentos': return <Documentos />;
      default: return <ResumenEjecutivo />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="main-content">
        <header className="header">
          <div>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
              {EMPRESA.nombre}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {EMPRESA.rut}
            </span>
            <span style={{ fontSize: 'var(--text-xs)', padding: '4px 8px', background: 'var(--brand-beige-light)', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)' }}>
              {EMPRESA.regimen}
            </span>
          </div>
        </header>
        <div className="page-content">
          {renderContent()}
        </div>
        <footer style={{ padding: 'var(--space-4) var(--space-6)', borderTop: '1px solid var(--border-light)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
          <span>COOM Sistema de Apoyo Fzas · Fuente: {EMPRESA.fuente}</span>
          <span>{EMPRESA.periodo}</span>
        </footer>
      </main>
    </div>
  );
}
