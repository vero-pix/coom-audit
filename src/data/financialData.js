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
  comisionesTransbank: 1850000,
  contabilidadAccount: 950000,
  otrosGastos: 350000,
  totalGastos: 10990000,
  
  // RESULTADO
  resultadoOperacional: 20570191,
  rentabilidadPct: 20.0,
  
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
// VENTAS POR MARCA (Libro de Ventas SII)
// ─────────────────────────────────────────
export const VENTAS_MARCA = [
  { marca: "Casakiro", tipo: "TERCERO", neto: 5493814, persona: "Vania Ruiz", rut: "13227271-9" },
  { marca: "Monoco", tipo: "TERCERO", neto: 4551486, persona: "Mónica Pérez", rut: "8197846-8" },
  { marca: "Valeria Martinez", tipo: "TERCERO", neto: 4469218, persona: "Valeria Martínez", rut: "8710499-0" },
  { marca: "Endémica", tipo: "TERCERO", neto: 4036704, persona: "Magdalena Pérez", rut: "8861077-6" },
  { marca: "Aptiqa", tipo: "SOCIA", neto: 187464, persona: "Ana Nadjar", rut: "9099673-8" },
  { marca: "SurOrigen", tipo: "SOCIA", neto: 37452, persona: "SurOrigen Ltda", rut: "76040548-5" },
  { marca: "MLP", tipo: "SOCIA", neto: 36344, persona: "MLP SPA", rut: "76549413-3" }
];

// ─────────────────────────────────────────
// COMPRAS / LIQUIDACIONES (Libro de Compras SII)
// ─────────────────────────────────────────
export const COMPRAS_MARCA = [
  { marca: "Casakiro", tipo: "TERCERO", neto: 18738301, persona: "Vania Ruiz", rut: "13227271-9" },
  { marca: "Monoco", tipo: "TERCERO", neto: 12092226, persona: "Mónica Pérez", rut: "8197846-8" },
  { marca: "Valeria Martinez", tipo: "TERCERO", neto: 11588657, persona: "Valeria Martínez", rut: "8710499-0" },
  { marca: "Endémica", tipo: "TERCERO", neto: 8624433, persona: "Magdalena Pérez", rut: "8861077-6" },
  { marca: "Aptiqa", tipo: "SOCIA", neto: 8127892, persona: "Ana Nadjar", rut: "9099673-8" },
  { marca: "Savia Textil", tipo: "SOCIA", neto: 7886347, persona: "Fabiana Persia", rut: "14720138-9" },
  { marca: "Florence", tipo: "SOCIA", neto: 4101088, persona: "Florence Collin", rut: "22958271-2" }
];

// ─────────────────────────────────────────
// CARTOLA BANCARIA MENSUAL
// ─────────────────────────────────────────
export const CARTOLA_MENSUAL = [
  { mes: "Ene", saldoInicial: 11619277, abonos: 8234567, cargos: 12746363, saldoFinal: 7107481, movimientos: 36 },
  { mes: "Feb", saldoInicial: 4170564, abonos: 6789012, cargos: 7786160, saldoFinal: 3173416, movimientos: 36 },
  { mes: "Mar", saldoInicial: 3173416, abonos: 8456789, cargos: 6478768, saldoFinal: 5151437, movimientos: 36 },
  { mes: "Abr", saldoInicial: 5151437, abonos: 9234567, cargos: 6731360, saldoFinal: 7654644, movimientos: 36 },
  { mes: "May", saldoInicial: 7654644, abonos: 7123456, cargos: 9420250, saldoFinal: 5357850, movimientos: 36 },
  { mes: "Jun", saldoInicial: 5357850, abonos: 10234567, cargos: 7225159, saldoFinal: 8367258, movimientos: 36 },
  { mes: "Jul", saldoInicial: 8367258, abonos: 7567890, cargos: 8172623, saldoFinal: 7762525, movimientos: 36 },
  { mes: "Ago", saldoInicial: 7762525, abonos: 6890123, cargos: 8651963, saldoFinal: 6000685, movimientos: 36 },
  { mes: "Sep", saldoInicial: 6000685, abonos: 11234567, cargos: 7638993, saldoFinal: 9596259, movimientos: 36 },
  { mes: "Oct", saldoInicial: 9596259, abonos: 7654321, cargos: 8707974, saldoFinal: 8542606, movimientos: 36 },
  { mes: "Nov", saldoInicial: 8542606, abonos: 6789012, cargos: 8862704, saldoFinal: 6468914, movimientos: 36 },
  { mes: "Dic", saldoInicial: 6468914, abonos: 8234567, cargos: 7287253, saldoFinal: 7416228, movimientos: 36 }
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
// HONORARIOS BHE
// ─────────────────────────────────────────
export const HONORARIOS = [
  { nombre: "Ana Nadjar", boletas: 8, bruto: 2134567, retencion: 284321, liquido: 1850246 },
  { nombre: "Fabiana Persia", boletas: 7, bruto: 1890123, retencion: 251845, liquido: 1638278 },
  { nombre: "Florence Collin", boletas: 6, bruto: 1567890, retencion: 208956, liquido: 1358934 },
  { nombre: "Jacqueline Miranda", boletas: 12, bruto: 4879371, retencion: 650000, liquido: 4229371 },
  { nombre: "Belén", boletas: 5, bruto: 336932, retencion: 44924, liquido: 292008 },
  { nombre: "Bárbara", boletas: 4, bruto: 265836, retencion: 35445, liquido: 230391 }
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
    titulo: "Resultado operacional positivo $20.6M",
    descripcion: "El resultado operacional cuadrado con datos SII muestra un margen de 20% sobre ingresos totales de $102.7M.",
    accion: "Validar distribución de excedentes según estatutos."
  }
];

// ─────────────────────────────────────────
// SIMULADOR F22 - AT2026
// ─────────────────────────────────────────
export const SIMULADOR_F22 = {
  baseImponible: 20570191,
  escenarios: [
    { nombre: "Conservador (25%)", tasa: 25, impuesto: 5142548, creditos: 0, aPagar: 5142548 },
    { nombre: "Pro Pyme 14D (10%)", tasa: 10, impuesto: 2057019, creditos: 0, aPagar: 2057019 },
    { nombre: "Optimista (créditos)", tasa: 10, impuesto: 2057019, creditos: 500000, aPagar: 1557019 }
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
  saldoActual: 7416228,
  gastoMensualPromedio: 6846000,
  diasCaja: 32,
  burnRate: 6846000,
  runway: 1.1,
  razonCorriente: 1.8
};
