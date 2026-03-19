// ============================================
// COOM - App Principal
// ============================================

import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ResumenEjecutivo } from './components/ResumenEjecutivo';
import { VentasMarca } from './components/VentasMarca';
import { CostosGastos } from './components/CostosGastos';
import { ExcedentesSocias } from './components/ExcedentesSocias';
import { IvaF29 } from './components/IvaF29';
import { HonorariosBHE } from './components/HonorariosBHE';
import { CartolaBancaria } from './components/CartolaBancaria';
import { Alertas } from './components/Alertas';
import { SimuladorF22 } from './components/SimuladorF22';
import { PlanCuentas } from './components/PlanCuentas';
import { FlujoCaja } from './components/FlujoCaja';
import { Documentos } from './components/Documentos';
import { EMPRESA } from './data/financialData';

// Componentes placeholder para secciones pendientes
function PlaceholderPage({ title, description }) {
  return (
    <div>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
          {title}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          {description}
        </p>
      </div>
      <div style={{ 
        background: 'var(--bg-subtle)', 
        padding: 'var(--space-8)', 
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center'
      }}>
        <p style={{ color: 'var(--text-muted)' }}>
          Sección en desarrollo
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('resumen');

  const renderContent = () => {
    switch (activeSection) {
      case 'resumen':
        return <ResumenEjecutivo />;
      case 'alertas':
        return <Alertas />;
      case 'ventas':
        return <VentasMarca />;
      case 'costos':
        return <CostosGastos />;
      case 'excedentes':
        return <ExcedentesSocias />;
      case 'honorarios':
        return <HonorariosBHE />;
      case 'iva':
        return <IvaF29 />;
      case 'f22':
        return <SimuladorF22 />;
      case 'banco':
        return <CartolaBancaria />;
      case 'conciliacion':
        return <PlaceholderPage title="Conciliación Bancaria" description="Cruce libro banco vs cartola" />;
      case 'flujo':
        return <FlujoCaja />;
      case 'cuentas':
        return <PlanCuentas />;
      case 'documentos':
        return <Documentos />;
      default:
        return <ResumenEjecutivo />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <main className="main-content">
        <header className="header">
          <div>
            <span style={{ 
              fontSize: 'var(--text-sm)', 
              color: 'var(--text-secondary)' 
            }}>
              {EMPRESA.nombre}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <span style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)'
            }}>
              {EMPRESA.rut}
            </span>
            <span style={{ 
              fontSize: 'var(--text-xs)',
              padding: '4px 8px',
              background: 'var(--brand-beige-light)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-secondary)'
            }}>
              {EMPRESA.regimen}
            </span>
          </div>
        </header>

        <div className="page-content">
          {renderContent()}
        </div>

        <footer style={{ 
          padding: 'var(--space-4) var(--space-6)',
          borderTop: '1px solid var(--border-light)',
          fontSize: 'var(--text-xs)',
          color: 'var(--text-muted)',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>COOM Sistema de Apoyo Fzas</span>
          <span>Período: {EMPRESA.periodo}</span>
        </footer>
      </main>
    </div>
  );
}
