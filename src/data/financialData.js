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
  notasDiferencia: "La diferencia de $7.9M entre el mayor y el RCV puede incluir: arriendo Territoria reclasificado como costo directo (~$2.2M), facturas de proveedores menores, y ajustes de cierre de diciembre. Se requiere el auxiliar contable de Account SPA para desglosar.",
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

// ─────────────────────────────────────────
// PREGUNTAS PARA REUNIÓN
// Contadora (Account SPA) + Inspectora de Cuentas + La Tía + Vericosas
// ─────────────────────────────────────────
export const PREGUNTAS_REUNION = [
  {
    tema: "Costo de venta: composición de los $79.1M",
    dirigidaA: "Contadora (Account SPA)",
    prioridad: "ALTA",
    preguntas: [
      "La cuenta 3-01-02-01 registra $79.1M en costo de venta, pero el RCV SII solo muestra $71.2M en liquidaciones a las 7 marcas. \u00bfQu\u00e9 compone los $7.9M de diferencia?",
      "\u00bfSe incluyeron facturas de Territoria Apoquindo en costo de venta? El mayor muestra $5.6M en arriendos (3-01-06-28) pero el RCV tiene $7.84M de Territoria.",
      "Diciembre registra $18.5M en costo de venta, tres veces el promedio mensual. \u00bfQu\u00e9 ajustes de cierre se hicieron?",
      "\u00bfPueden proporcionarnos el auxiliar de la cuenta 3-01-02-01 con detalle de RUT por cada factura?"
    ]
  },
  {
    tema: "Resultado del ejercicio: $4.5M vs $5.2M",
    dirigidaA: "Contadora (Account SPA)",
    prioridad: "ALTA",
    preguntas: [
      "La cuenta 2-03-12-01 muestra resultado de $4.457.903, pero la reconstrucci\u00f3n del EERR desde las cuentas de resultado da $5.183.503. \u00bfQu\u00e9 explica la diferencia de $725.600?",
      "\u00bfSe hicieron ajustes de cierre adicionales que no est\u00e1n en las cuentas de clase 3?",
      "\u00bfCu\u00e1l es la cifra definitiva que ir\u00e1 al F22 AT2026?"
    ]
  },
  {
    tema: "Multas fiscales: $106.755",
    dirigidaA: "Contadora (Account SPA)",
    prioridad: "ALTA",
    preguntas: [
      "La cuenta 3-02-07-06 registra $106.755 en multas fiscales. \u00bfCu\u00e1l fue el origen de estas multas?",
      "\u00bfFueron por declaraciones fuera de plazo, diferencias en F29, u otra causa?",
      "\u00bfSe tomaron medidas para evitar reincidencia?"
    ]
  },
  {
    tema: "Excedentes distribuidos con CPTS negativo",
    dirigidaA: "Inspectora de Cuentas / La T\u00eda",
    prioridad: "CR\u00cdTICA",
    preguntas: [
      "Se distribuyeron aproximadamente $3.4M como excedentes a socias durante per\u00edodos en que el CPTS era negativo (-$3.599.473). \u00bfSe hizo con acuerdo de asamblea?",
      "Art. 36 de la Ley General de Cooperativas proh\u00edbe distribuir excedentes sin utilidades reales. \u00bfC\u00f3mo se propone regularizar esta situaci\u00f3n?",
      "\u00bfSe pueden reclasificar como pr\u00e9stamos a socias o anticipos a cuenta de futuros excedentes?"
    ]
  },
  {
    tema: "CPTS proyectado y distribuci\u00f3n futura",
    dirigidaA: "Contadora / Inspectora",
    prioridad: "MEDIA",
    preguntas: [
      "Si el resultado de AC2025 es positivo (~$4.5M a $5.2M), el CPTS pasar\u00eda a positivo por primera vez. \u00bfConfirma Account SPA esta proyecci\u00f3n?",
      "\u00bfCu\u00e1ndo se presentar\u00e1 el F22 AT2026? \u00bfAntes de la asamblea ordinaria?",
      "Con CPTS positivo, \u00bfcu\u00e1l ser\u00eda el monto m\u00e1ximo distribuible como excedentes seg\u00fan estatutos?"
    ]
  },
  {
    tema: "Honorarios por pagar al cierre: $772.734",
    dirigidaA: "La T\u00eda",
    prioridad: "MEDIA",
    preguntas: [
      "Al 31/dic/2025 quedan $772.734 en honorarios pendientes de pago (cuenta 2-01-06-04). \u00bfA qui\u00e9n corresponden?",
      "\u00bfSe pagaron en enero 2026?"
    ]
  },
  {
    tema: "F29 febrero 2026 no declarado",
    dirigidaA: "Contadora (Account SPA)",
    prioridad: "MEDIA",
    preguntas: [
      "La carpeta tributaria al 04/03/2026 no registra F29 de febrero 2026. \u00bfSe present\u00f3 despu\u00e9s de esa fecha?",
      "\u00bfHay riesgo de multa por declaraci\u00f3n tard\u00eda?"
    ]
  },
  {
    tema: "Clasificaci\u00f3n socias vs terceros (Art. 17 DL 824)",
    dirigidaA: "Contadora / Inspectora",
    prioridad: "MEDIA",
    preguntas: [
      "Las operaciones con socias (Aptiqa, Savia, Florence) deber\u00edan ser exentas de IVA seg\u00fan Art. 17 DL 824. \u00bfSe est\u00e1 aplicando correctamente esta distinci\u00f3n en la facturaci\u00f3n?",
      "En noviembre 2025 se emitieron facturas afectas a socias que luego se anularon con NC. \u00bfQu\u00e9 ocurri\u00f3?"
    ]
  }
];
