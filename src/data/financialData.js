// ============================================
// COOM - Datos Financieros 2025
// Fuente: Libro Mayor Account SPA (Thomson Reuters, 98pp)
// Cruce: RCV SII, ventasmarcas.xlsx, F22 AT2024/AT2025
// Actualización: 26 marzo 2026
// ============================================

export const EMPRESA = {
  nombre: "Cooperativa de Trabajo Moda y Diseño de Autor",
  rut: "65.220.032-K",
  regimen: "Pro Pyme General 14D",
  periodo: "Enero - Diciembre 2025",
  fuente: "Libro Mayor Account SPA"
};

// ─────────────────────────────────────────
// EERR (Account SPA - Libro Mayor)
// ─────────────────────────────────────────
export const EERR = {
  ventasProductos: 104006298,
  otrosIngresos: 2720105,
  totalIngresos: 106726403,

  costoVenta: 79090144,
  margenBruto: 27636259,
  margenPct: 25.9,

  totalGastosOp: 19419468,
  totalGastosNoOp: 3033288,
  totalGastos: 22452756,

  resultadoNeto: 5183503,
  resultadoPct: 4.9,
  resultadoMayor: 4457903,
};

// ─────────────────────────────────────────
// GASTOS OPERACIONALES (detalle Mayor)
// ─────────────────────────────────────────
export const GASTOS_OP = [
  { cuenta: "3-01-06-09", nombre: "Honorarios vendedoras", monto: 10891789 },
  { cuenta: "3-01-06-28", nombre: "Arriendos", monto: 5610955 },
  { cuenta: "3-01-06-37", nombre: "Contabilidad", monto: 1398801 },
  { cuenta: "3-01-06-45", nombre: "Gastos Daes", monto: 747082 },
  { cuenta: "3-01-05-01", nombre: "Sueldos base", monto: 490436 },
  { cuenta: "3-01-06-32", nombre: "Gastos básicos", monto: 46951 },
  { cuenta: "3-01-06-13", nombre: "Gastos de aseo", monto: 41417 },
  { cuenta: "3-01-03-03", nombre: "Bonos de producción", monto: 32703 },
  { cuenta: "3-01-06-27", nombre: "Seguros", monto: 31100 },
  { cuenta: "3-01-03-14", nombre: "Aporte patronal", monto: 24640 },
  { cuenta: "3-01-06-26", nombre: "Fletes y embalajes", monto: 10656 },
  { cuenta: "3-01-05-15", nombre: "Finiquitos", monto: 92938 },
];

// ─────────────────────────────────────────
// GASTOS NO OPERACIONALES (detalle Mayor)
// ─────────────────────────────────────────
export const GASTOS_NO_OP = [
  { cuenta: "3-02-06-01", nombre: "Comisiones Transbank", monto: 2139937 },
  { cuenta: "3-02-10-01", nombre: "Ajuste monetario CM", monto: 426997 },
  { cuenta: "3-02-07-07", nombre: "Otros gastos", monto: 359599 },
  { cuenta: "3-02-07-06", nombre: "Multas fiscales", monto: 106755 },
];

// ─────────────────────────────────────────
// COSTO DE VENTA - DESGLOSE POR MARCA
// Fuente: RCV SII (por RUT proveedor)
// Nota: RCV total $71.2M vs Mayor $79.1M
// Diferencia de $7.9M incluye NC, ajustes y timing
// ─────────────────────────────────────────
export const COSTO_VENTA_MARCAS = [
  { marca: "Casakiro", persona: "Vania Ruiz", rut: "13.227.271-9", tipo: "TERCERO", liquidacionRCV: 18738301 },
  { marca: "Monoco", persona: "Mónica Pérez", rut: "8.197.846-8", tipo: "TERCERO", liquidacionRCV: 12092226 },
  { marca: "Valeria Martinez", persona: "Valeria Martínez", rut: "8.710.499-0", tipo: "TERCERO", liquidacionRCV: 11588657 },
  { marca: "Endémica", persona: "Magdalena Pérez", rut: "8.861.077-6", tipo: "TERCERO", liquidacionRCV: 8624433 },
  { marca: "Aptiqa", persona: "Ana Nadjar", rut: "9.099.673-8", tipo: "SOCIA", liquidacionRCV: 8127892 },
  { marca: "Savia Textil", persona: "Fabiana Persia", rut: "14.720.138-9", tipo: "SOCIA", liquidacionRCV: 7886347 },
  { marca: "Florence", persona: "Florence Collin", rut: "22.958.271-2", tipo: "SOCIA", liquidacionRCV: 4101088 },
];

export const COSTO_VENTA_RESUMEN = {
  totalMayor: 79090144,
  totalRCV: 71158944,
  diferencia: 7931200,
  notasDiferencia: "Incluye NC ($1.4M), ajustes de cierre, y posible timing entre facturación y registro.",
  debitosBrutos: 80485369,
  creditosNC: 1395225,
};

// ─────────────────────────────────────────
// COSTO DE VENTA MENSUAL (Mayor)
// Nota: Septiembre no aparece; Oct incluye ambos meses
// ─────────────────────────────────────────
export const COSTO_VENTA_MENSUAL = [
  { mes: "Ene", debitos: 2724623, creditos: 0, neto: 2724623 },
  { mes: "Feb", debitos: 4149760, creditos: 0, neto: 4149760 },
  { mes: "Mar", debitos: 5646985, creditos: 151518, neto: 5495467 },
  { mes: "Abr", debitos: 6941379, creditos: 0, neto: 6941379 },
  { mes: "May", debitos: 6401246, creditos: 1002521, neto: 5398725 },
  { mes: "Jun", debitos: 6731319, creditos: 241186, neto: 6490133 },
  { mes: "Jul", debitos: 5597426, creditos: 0, neto: 5597426 },
  { mes: "Ago", debitos: 6028027, creditos: 0, neto: 6028027 },
  { mes: "Sep/Oct", debitos: 13033505, creditos: 0, neto: 13033505 },
  { mes: "Nov", debitos: 4717554, creditos: 0, neto: 4717554 },
  { mes: "Dic", debitos: 18513545, creditos: 0, neto: 18513545 },
];

// ─────────────────────────────────────────
// VENTAS POR MARCA (ventasmarcas.xlsx)
// Ventas = ingreso bruto registrado en boletas por marca
// Comisión = Ventas - Liquidación RCV
// ─────────────────────────────────────────
export const VENTAS_MARCA = [
  { marca: "Casakiro", tipo: "TERCERO", persona: "Vania Ruiz", ventas: 26769001, liquidacion: 18738301 },
  { marca: "Monoco", tipo: "TERCERO", persona: "Mónica Pérez", ventas: 17274609, liquidacion: 12092226 },
  { marca: "Valeria Martinez", tipo: "TERCERO", persona: "Valeria Martínez", ventas: 16555224, liquidacion: 11588657 },
  { marca: "Endémica", tipo: "TERCERO", persona: "Magdalena Pérez", ventas: 12320619, liquidacion: 8624433 },
  { marca: "Aptiqa", tipo: "SOCIA", persona: "Ana Nadjar", ventas: 11611274, liquidacion: 8127892 },
  { marca: "Savia Textil", tipo: "SOCIA", persona: "Fabiana Persia", ventas: 11266210, liquidacion: 7886347 },
  { marca: "Florence", tipo: "SOCIA", persona: "Florence Collin", ventas: 5858697, liquidacion: 4101088 },
];

// ─────────────────────────────────────────
// DE CADA $100 QUE ENTRAN
// ─────────────────────────────────────────
export const CADA100 = [
  { label: "Marcas", monto: 79090144, color: "var(--color-text-primary)" },
  { label: "Vendedoras", monto: 10891789, color: "#534AB7" },
  { label: "Arriendo", monto: 5610955, color: "var(--color-text-secondary)" },
  { label: "Transbank", monto: 2139937, color: "#888780" },
  { label: "Otros gastos", monto: 3810075, color: "#B0ADA6" },
  { label: "Resultado", monto: 5183503, color: "#0F6E56" },
];

// ─────────────────────────────────────────
// SITUACIÓN PATRIMONIAL
// ─────────────────────────────────────────
export const PATRIMONIO = {
  capitalPagado: 1500000,          // 2-03-01-01 confirmado en mayor
  capitalPagadoMayor: 1500000,
  perdidasAcumuladas: -5099473,    // F22 AT2024
  resultadoAC2025: 5183503,
  cptsProyectado: 1584030,         // 1.5M - 5.1M + 5.2M
  cptsAT2025: -3599473,            // F22 AT2025 (cierre AC2024)
  puedeDistribuir: true,           // CPTS proyectado > 0
  excedentesDistribuidos: 3400000, // estimado distribuido con CPTS negativo
  riesgoArt36: true,
};

// ─────────────────────────────────────────
// BALANCE SIMPLIFICADO (Mayor)
// ─────────────────────────────────────────
export const BALANCE = {
  activo: {
    banco: 13871173,               // 1-01-01-04
    clientesVentas: 1930747,       // 1-01-04-01
    ppm: 298509,                   // 1-01-09-01
    ivaCF: 3645013,                // 1-01-09-02
  },
  pasivo: {
    proveedores: 14098863,         // 2-01-06-01
    honorariosPorPagar: 772734,    // 2-01-06-04
    ivaDF: 3176332,                // 2-01-12-01
    impuesto2cat: 137061,          // 2-01-12-02
    ppmPorPagar: 20897,            // 2-01-12-04
  },
  patrimonio: {
    capitalPagado: 1500000,        // 2-03-01-01
    resultadoNeto: 4457903,        // 2-03-12-01
  }
};

// ─────────────────────────────────────────
// ALERTAS
// ─────────────────────────────────────────
export const ALERTAS = [
  {
    nivel: "CRITICO",
    titulo: "Excedentes distribuidos con CPTS negativo",
    descripcion: "Se distribuyeron ~$3.4M como excedentes durante períodos con pérdidas tributarias acumuladas. Potencial infracción al Art. 36 Ley General de Cooperativas.",
    accion: "Regularizar con asamblea extraordinaria o reclasificar como préstamos a socias."
  },
  {
    nivel: "ALTO",
    titulo: "Multas fiscales por $106.755",
    descripcion: "Cuenta 3-02-07-06 del mayor registra multas fiscales pagadas durante 2025.",
    accion: "Identificar origen de las multas y corregir causa raíz."
  },
  {
    nivel: "ALTO",
    titulo: "Diferencia costo venta Mayor vs RCV: $7.931.200",
    descripcion: "El mayor registra $79.1M en costo de venta vs $71.2M en liquidaciones del RCV SII. Diferencia de 10%.",
    accion: "Cruzar facturas T1 del mayor con libro de compras SII para identificar las partidas faltantes."
  },
  {
    nivel: "MEDIO",
    titulo: "Honorarios por pagar al cierre: $772.734",
    descripcion: "Pasivo pendiente al 31/dic/2025 en cuenta 2-01-06-04.",
    accion: "Verificar si fue pagado en enero 2026."
  },
  {
    nivel: "INFO",
    titulo: "CPTS se proyecta positivo por primera vez",
    descripcion: "Con resultado de $5.2M, el CPTS pasaría de -$3.6M a +$1.6M. Esto habilitaría la distribución legal de excedentes futuros.",
    accion: "Confirmar en F22 AT2026 (abril 2026)."
  },
  {
    nivel: "INFO",
    titulo: "F22 AT2026 y F29 feb-2026 pendientes",
    descripcion: "La carpeta tributaria al 04/03/2026 no registra declaración de renta AT2026 ni F29 de febrero 2026.",
    accion: "Gestionar declaración oportuna."
  }
];

// ─────────────────────────────────────────
// DOCUMENTOS
// ─────────────────────────────────────────
export const DOCUMENTOS = [
  { nombre: "Cuadratura SII 2025", archivo: "COOM_Cuadratura_SII_2025.xlsx", tipo: "Excel" },
  { nombre: "Flujo de Caja y Conciliación", archivo: "COOM_FlujoCaja_Conciliacion_2025.xlsx", tipo: "Excel" },
];
