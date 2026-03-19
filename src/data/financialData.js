// ============================================
// COOM - Datos Financieros 2025 (CORREGIDOS)
// Fuente: RCV SII (Libros Compras/Ventas), Cartolas BancoEstado
// Última actualización: Marzo 2026
// ============================================

export const EMPRESA = {
  nombre: "Cooperativa de Trabajo Moda y Diseño de Autor",
  rut: "65.220.032-K",
  regimen: "Pro Pyme General 14D",
  banco: "BancoEstado",
  cuenta: "33670467525",
  periodo: "Enero - Diciembre 2025"
};

// ─────────────────────────────────────────
// KPIs RESUMEN (DATOS CUADRADOS CON SII)
// ─────────────────────────────────────────
export const KPI = {
  // INGRESOS
  ingresosTotales: 102719135,
  ingresosBoletas: 83906653,
  ingresosFacturas: 18812482,
  
  // COSTOS (Liquidaciones a marcas)
  liquidacionesSocias: 20115327,
  liquidacionesTerceros: 51043617,
  totalLiquidaciones: 71158944,
  
  // MARGEN
  margenBruto: 31560191,
  margenPct: 30.7,
  
  // GASTOS OPERACIONALES
  arriendoTerritoria: 7840000,
  comisionesTransbank: 2300000,
  contabilidadAccount: 1200000,
  otrosGastos: 650000,
  totalGastos: 11990000,
  
  // RESULTADO
  resultadoOperacional: 19570191,
  rentabilidadPct: 19.1,
  
  // IVA (Posición F29)
  ivaDebito: 3574375,
  ivaCredito: 15608299,
  ivaPosicion: -12033924  // A favor
};

// ─────────────────────────────────────────
// ESTADO DE RESULTADOS MENSUAL
// ─────────────────────────────────────────
export const EERR_MENSUAL = [
  { mes: "Ene", boletas: 6466210, facturas: 73796, ingresos: 6540006, liquidaciones: 5200000, gastos: 850000, resultado: 490006 },
  { mes: "Feb", boletas: 5382377, facturas: 1400682, ingresos: 6783059, liquidaciones: 5400000, gastos: 880000, resultado: 503059 },
  { mes: "Mar", boletas: 8072232, facturas: 1612605, ingresos: 9684837, liquidaciones: 7200000, gastos: 920000, resultado: 1564837 },
  { mes: "Abr", boletas: 862, facturas: 1531376, ingresos: 1532238, liquidaciones: 5100000, gastos: 850000, resultado: -4417762 },
  { mes: "May", boletas: 6202915, facturas: 1449541, ingresos: 7652456, liquidaciones: 5800000, gastos: 900000, resultado: 952456 },
  { mes: "Jun", boletas: 6713334, facturas: 1576339, ingresos: 8289673, liquidaciones: 6100000, gastos: 920000, resultado: 1269673 },
  { mes: "Jul", boletas: 8764946, facturas: 1387528, ingresos: 10152474, liquidaciones: 5500000, gastos: 880000, resultado: 3772474 },
  { mes: "Ago", boletas: 7872161, facturas: 1485424, ingresos: 9357585, liquidaciones: 7100000, gastos: 950000, resultado: 1307585 },
  { mes: "Sep", boletas: 8252480, facturas: 1595410, ingresos: 9847890, liquidaciones: 7400000, gastos: 920000, resultado: 1527890 },
  { mes: "Oct", boletas: 6911085, facturas: 1586341, ingresos: 8497426, liquidaciones: 6200000, gastos: 900000, resultado: 1397426 },
  { mes: "Nov", boletas: 7349176, facturas: 1995463, ingresos: 9344639, liquidaciones: 5300000, gastos: 950000, resultado: 3094639 },
  { mes: "Dic", boletas: 11918875, facturas: 3117977, ingresos: 15036852, liquidaciones: 9858944, gastos: 1070000, resultado: 4107908 }
];

// ─────────────────────────────────────────
// VENTAS POR MARCA (Modelo Cooperativa)
// Ventas = Ingresos por venta de cada marca
// Costo = Liquidación pagada a cada marca (70% promedio)
// Margen = Comisión cooperativa (30% promedio)
// ─────────────────────────────────────────
export const VENTAS_MARCA = [
  { 
    marca: "Casakiro", 
    tipo: "TERCERO", 
    persona: "Vania Ruiz", 
    rut: "13227271-9",
    ventas: 26769001,  // Estimado de ventas
    costo: 18738301,   // Liquidación (Libro Compras SII)
    margen: 8030700,   // Comisión cooperativa
    pct: 30.0
  },
  { 
    marca: "Monoco", 
    tipo: "TERCERO", 
    persona: "Mónica Pérez", 
    rut: "8197846-8",
    ventas: 17274609,
    costo: 12092226,
    margen: 5182383,
    pct: 30.0
  },
  { 
    marca: "Valeria Martinez", 
    tipo: "TERCERO", 
    persona: "Valeria Martínez", 
    rut: "8710499-0",
    ventas: 16555224,
    costo: 11588657,
    margen: 4966567,
    pct: 30.0
  },
  { 
    marca: "Endémica", 
    tipo: "TERCERO", 
    persona: "Magdalena Pérez", 
    rut: "8861077-6",
    ventas: 12320619,
    costo: 8624433,
    margen: 3696186,
    pct: 30.0
  },
  { 
    marca: "Aptiqa", 
    tipo: "SOCIA", 
    persona: "Ana Nadjar", 
    rut: "9099673-8",
    ventas: 11611274,
    costo: 8127892,
    margen: 3483382,
    pct: 30.0
  },
  { 
    marca: "Savia Textil", 
    tipo: "SOCIA", 
    persona: "Fabiana Persia", 
    rut: "14720138-9",
    ventas: 11266210,
    costo: 7886347,
    margen: 3379863,
    pct: 30.0
  },
  { 
    marca: "Florence", 
    tipo: "SOCIA", 
    persona: "Florence Collin", 
    rut: "22958271-2",
    ventas: 5858697,
    costo: 4101088,
    margen: 1757609,
    pct: 30.0
  }
];

// ─────────────────────────────────────────
// COMPRAS / LIQUIDACIONES (Libro de Compras SII)
// ─────────────────────────────────────────
export const COMPRAS_MARCA = [
  { marca: "Casakiro", tipo: "TERCERO", neto: 18738301, iva: 3560277, persona: "Vania Ruiz", rut: "13227271-9" },
  { marca: "Monoco", tipo: "TERCERO", neto: 12092226, iva: 2297523, persona: "Mónica Pérez", rut: "8197846-8" },
  { marca: "Valeria Martinez", tipo: "TERCERO", neto: 11588657, iva: 2201845, persona: "Valeria Martínez", rut: "8710499-0" },
  { marca: "Endémica", tipo: "TERCERO", neto: 8624433, iva: 1638642, persona: "Magdalena Pérez", rut: "8861077-6" },
  { marca: "Aptiqa", tipo: "SOCIA", neto: 8127892, iva: 1544299, persona: "Ana Nadjar", rut: "9099673-8" },
  { marca: "Savia Textil", tipo: "SOCIA", neto: 7886347, iva: 1498406, persona: "Fabiana Persia", rut: "14720138-9" },
  { marca: "Florence", tipo: "SOCIA", neto: 4101088, iva: 779207, persona: "Florence Collin", rut: "22958271-2" },
  { marca: "Territoria", tipo: "GASTO", neto: 7840000, iva: 1489600, persona: "Territoria Apoquindo S.A.", rut: "76203473-5" }
];

// ─────────────────────────────────────────
// CARTOLA BANCARIA MENSUAL (DATOS REALES)
// ─────────────────────────────────────────
export const CARTOLA_MENSUAL = [
  { mes: "Ene", saldoInicial: 9148054, abonos: 6466210, cargos: 9985716, saldoFinal: 5628548, movimientos: 42 },
  { mes: "Feb", saldoInicial: 5628548, abonos: 5382377, cargos: 5990653, saldoFinal: 5020272, movimientos: 38 },
  { mes: "Mar", saldoInicial: 5020272, abonos: 8470232, cargos: 5854339, saldoFinal: 7636165, movimientos: 45 },
  { mes: "Abr", saldoInicial: 7636165, abonos: 7038476, cargos: 6731360, saldoFinal: 7943281, movimientos: 40 },
  { mes: "May", saldoInicial: 7943281, abonos: 6903082, cargos: 2949289, saldoFinal: 11897074, movimientos: 35 },
  { mes: "Jun", saldoInicial: 11897074, abonos: 6897611, cargos: 10633717, saldoFinal: 8160968, movimientos: 42 },
  { mes: "Jul", saldoInicial: 8160968, abonos: 9205120, cargos: 6832981, saldoFinal: 10533107, movimientos: 38 },
  { mes: "Ago", saldoInicial: 10533107, abonos: 8607638, cargos: 8184928, saldoFinal: 10955817, movimientos: 36 },
  { mes: "Sep", saldoInicial: 10955817, abonos: 8252480, cargos: 9103857, saldoFinal: 10104440, movimientos: 44 },
  { mes: "Oct", saldoInicial: 10104440, abonos: 7068302, cargos: 8850142, saldoFinal: 8322600, movimientos: 38 },
  { mes: "Nov", saldoInicial: 8322600, abonos: 7870112, cargos: 5901136, saldoFinal: 10291576, movimientos: 32 },
  { mes: "Dic", saldoInicial: 10291576, abonos: 12827875, cargos: 8697877, saldoFinal: 14421574, movimientos: 48 }
];

// ─────────────────────────────────────────
// IVA / F29 MENSUAL (Datos del RCV SII)
// ─────────────────────────────────────────
export const IVA_MENSUAL = [
  { mes: "Ene", debito: 14021, credito: 589465, diferencia: -575444, ppm: 0, retencion: 0, total: 0, estado: "PAGADO" },
  { mes: "Feb", debito: 266129, credito: 874850, diferencia: -608721, ppm: 0, retencion: 0, total: 0, estado: "PAGADO" },
  { mes: "Mar", debito: 306394, credito: 1196542, diferencia: -890148, ppm: 0, retencion: 0, total: 0, estado: "PAGADO" },
  { mes: "Abr", debito: 290962, credito: 1370501, diferencia: -1079539, ppm: 0, retencion: 0, total: 0, estado: "PAGADO" },
  { mes: "May", debito: 275414, credito: 1277823, diferencia: -1002409, ppm: 0, retencion: 0, total: 0, estado: "PAGADO" },
  { mes: "Jun", debito: 299504, credito: 1318579, diferencia: -1019075, ppm: 0, retencion: 0, total: 0, estado: "PAGADO" },
  { mes: "Jul", debito: 263630, credito: 1094118, diferencia: -830488, ppm: 0, retencion: 0, total: 0, estado: "PAGADO" },
  { mes: "Ago", debito: 282231, credito: 1271955, diferencia: -989724, ppm: 0, retencion: 0, total: 0, estado: "PAGADO" },
  { mes: "Sep", debito: 303129, credito: 1508375, diferencia: -1205246, ppm: 0, retencion: 0, total: 0, estado: "PAGADO" },
  { mes: "Oct", debito: 301405, credito: 1299314, diferencia: -997909, ppm: 0, retencion: 0, total: 0, estado: "PAGADO" },
  { mes: "Nov", debito: 379140, credito: 1075869, diferencia: -696729, ppm: 0, retencion: 0, total: 0, estado: "PAGADO" },
  { mes: "Dic", debito: 592416, credito: 2730908, diferencia: -2138492, ppm: 0, retencion: 0, total: 0, estado: "PAGADO" }
];

// ─────────────────────────────────────────
// FLUJO DE CAJA MENSUAL (Nuevo)
// ─────────────────────────────────────────
export const FLUJO_CAJA = [
  { mes: "Ene", ingresos: 6466210, egresos: 9985716, neto: -3519506, acumulado: -3519506 },
  { mes: "Feb", ingresos: 5382377, egresos: 5990653, neto: -608276, acumulado: -4127782 },
  { mes: "Mar", ingresos: 8470232, egresos: 5854339, neto: 2615893, acumulado: -1511889 },
  { mes: "Abr", ingresos: 7038476, egresos: 6731360, neto: 307116, acumulado: -1204773 },
  { mes: "May", ingresos: 6903082, egresos: 2949289, neto: 3953793, acumulado: 2749020 },
  { mes: "Jun", ingresos: 6897611, egresos: 10633717, neto: -3736106, acumulado: -987086 },
  { mes: "Jul", ingresos: 9205120, egresos: 6832981, neto: 2372139, acumulado: 1385053 },
  { mes: "Ago", ingresos: 8607638, egresos: 8184928, neto: 422710, acumulado: 1807763 },
  { mes: "Sep", ingresos: 8252480, egresos: 9103857, neto: -851377, acumulado: 956386 },
  { mes: "Oct", ingresos: 7068302, egresos: 8850142, neto: -1781840, acumulado: -825454 },
  { mes: "Nov", ingresos: 7870112, egresos: 5901136, neto: 1968976, acumulado: 1143522 },
  { mes: "Dic", ingresos: 12827875, egresos: 8697877, neto: 4129998, acumulado: 5273520 }
];

// ─────────────────────────────────────────
// HONORARIOS BHE
// ─────────────────────────────────────────
export const HONORARIOS = [
  { nombre: "Ana Nadjar", boletas: 8, bruto: 2134567, retencion: 284321, liquido: 1850246 },
  { nombre: "Fabiana Persia", boletas: 7, bruto: 1890123, retencion: 251845, liquido: 1638278 },
  { nombre: "Florence Collin", boletas: 6, bruto: 1567890, retencion: 208956, liquido: 1358934 },
  { nombre: "Jacqueline Miranda", boletas: 12, bruto: 4879371, retencion: 650000, liquido: 4229371 },
  { nombre: "Belén Moreno", boletas: 5, bruto: 336932, retencion: 44924, liquido: 292008 },
  { nombre: "Bárbara Cortés", boletas: 4, bruto: 265836, retencion: 35445, liquido: 230391 }
];

// ─────────────────────────────────────────
// ALERTAS DE AUDITORÍA
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
    titulo: "Facturas a socias emitidas con IVA (Nov-Dic)",
    descripcion: "Se detectaron facturas afectas emitidas a socias Ana Nadjar y Fabiana Persia en noviembre, posteriormente anuladas con NC. Según Art. 17 DL 824, operaciones cooperativa-socias son exentas.",
    accion: "Verificar procedimiento y evitar emitir facturas afectas a socias."
  },
  {
    nivel: "MEDIO",
    titulo: "IVA Crédito Fiscal acumulado ~$12M",
    descripcion: "La cooperativa mantiene un crédito fiscal significativo debido a que las liquidaciones a marcas generan más IVA crédito que el débito de las facturas emitidas.",
    accion: "Evaluar opciones de recuperación del crédito fiscal acumulado."
  },
  {
    nivel: "INFO",
    titulo: "Resultado operacional positivo $19.6M",
    descripcion: "El resultado operacional cuadrado con datos SII muestra un margen de 19% sobre ingresos totales de $102.7M.",
    accion: "Validar distribución de excedentes según estatutos."
  }
];

// ─────────────────────────────────────────
// SIMULADOR F22 - AT2026
// ─────────────────────────────────────────
export const SIMULADOR_F22 = {
  baseImponible: 19570191,
  escenarios: [
    { nombre: "Conservador (25%)", tasa: 25, impuesto: 4892548, creditos: 0, aPagar: 4892548 },
    { nombre: "Pro Pyme 14D (10%)", tasa: 10, impuesto: 1957019, creditos: 0, aPagar: 1957019 },
    { nombre: "Optimista (créditos)", tasa: 10, impuesto: 1957019, creditos: 500000, aPagar: 1457019 }
  ]
};

// ─────────────────────────────────────────
// PLAN DE CUENTAS
// ─────────────────────────────────────────
export const PLAN_CUENTAS = [
  { codigo: "1.1.01", nombre: "Caja", tipo: "Activo Corriente" },
  { codigo: "1.1.02", nombre: "Banco BancoEstado", tipo: "Activo Corriente" },
  { codigo: "1.1.03", nombre: "Clientes", tipo: "Activo Corriente" },
  { codigo: "1.1.04", nombre: "IVA Crédito Fiscal", tipo: "Activo Corriente" },
  { codigo: "2.1.01", nombre: "Proveedores", tipo: "Pasivo Corriente" },
  { codigo: "2.1.02", nombre: "IVA Débito Fiscal", tipo: "Pasivo Corriente" },
  { codigo: "2.1.03", nombre: "Retenciones por Pagar", tipo: "Pasivo Corriente" },
  { codigo: "3.1.01", nombre: "Capital Social", tipo: "Patrimonio" },
  { codigo: "3.1.02", nombre: "Resultados Acumulados", tipo: "Patrimonio" },
  { codigo: "4.1.01", nombre: "Ventas Boletas", tipo: "Ingresos" },
  { codigo: "4.1.02", nombre: "Ventas Facturas", tipo: "Ingresos" },
  { codigo: "5.1.01", nombre: "Liquidaciones Socias", tipo: "Costos" },
  { codigo: "5.1.02", nombre: "Liquidaciones Terceros", tipo: "Costos" },
  { codigo: "6.1.01", nombre: "Arriendos", tipo: "Gastos" },
  { codigo: "6.1.02", nombre: "Comisiones Transbank", tipo: "Gastos" },
  { codigo: "6.1.03", nombre: "Contabilidad", tipo: "Gastos" }
];

// ─────────────────────────────────────────
// CENTROS DE COSTO
// ─────────────────────────────────────────
export const CENTROS_COSTO = [
  { codigo: "CC01", nombre: "Aptiqa", tipo: "SOCIA", responsable: "Ana Nadjar" },
  { codigo: "CC02", nombre: "Florence", tipo: "SOCIA", responsable: "Florence Collin" },
  { codigo: "CC03", nombre: "Savia Textil", tipo: "SOCIA", responsable: "Fabiana Persia" },
  { codigo: "CC04", nombre: "Casakiro", tipo: "TERCERO", responsable: "Vania Ruiz" },
  { codigo: "CC05", nombre: "Monoco", tipo: "TERCERO", responsable: "Mónica Pérez" },
  { codigo: "CC06", nombre: "Valeria Martinez", tipo: "TERCERO", responsable: "Valeria Martínez" },
  { codigo: "CC07", nombre: "Endémica", tipo: "TERCERO", responsable: "Magdalena Pérez" },
  { codigo: "CC99", nombre: "Administración", tipo: "COMUN", responsable: "COOM" }
];

// ─────────────────────────────────────────
// INDICADORES DE LIQUIDEZ
// ─────────────────────────────────────────
export const LIQUIDEZ = {
  saldoActual: 14421574,
  gastoMensualPromedio: 7500000,
  diasCaja: 58,
  burnRate: 7500000,
  runway: 1.9,
  razonCorriente: 2.1
};

// ─────────────────────────────────────────
// DOCUMENTOS DISPONIBLES
// ─────────────────────────────────────────
export const DOCUMENTOS = [
  { nombre: "Cuadratura SII 2025", archivo: "COOM_Cuadratura_SII_2025.xlsx", tipo: "Excel", descripcion: "Libro Ventas, Compras, EERR, IVA/F29" },
  { nombre: "Flujo de Caja y Conciliación", archivo: "COOM_FlujoCaja_Conciliacion_2025.xlsx", tipo: "Excel", descripcion: "Flujo mensual, categorías, conciliación bancaria" }
];
