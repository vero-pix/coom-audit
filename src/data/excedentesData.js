// ============================================
// COOM - Datos de Excedentes y Liquidaciones
// Fuente: Base_datos_Banco_Estado.xlsx (Cartola 2025)
// ============================================

// ─────────────────────────────────────────
// EXCEDENTES DISTRIBUIDOS A SOCIAS
// ─────────────────────────────────────────
export const EXCEDENTES_SOCIAS = [
  { 
    marca: "Aptiqa", 
    persona: "Ana Nadjar",
    tipo: "SOCIA",
    rut: "9.099.673-8",
    estado: "Activa",
    ene: 1680177, feb: 1125317, mar: 412145, abr: 0, may: 560071, 
    jun: 595125, jul: 1335686, ago: 989457, sep: 1299460, oct: 916148, 
    nov: 1174234, dic: 775570, ene26: 2156797,
    total: 13895816
  },
  { 
    marca: "Savia Textil", 
    persona: "Fabiana Persia",
    tipo: "SOCIA",
    rut: "14.720.138-9",
    estado: "Activa",
    ene: 1602066, feb: 534764, mar: 608959, abr: 0, may: 333787, 
    jun: 1293468, jul: 275143, ago: 500595, sep: 1254278, oct: 835746, 
    nov: 433053, dic: 785834, ene26: 2007563,
    total: 11743709
  },
  { 
    marca: "Florence", 
    persona: "Florence Collin",
    tipo: "SOCIA",
    rut: "22.958.271-2",
    estado: "Activa",
    ene: 386973, feb: 332494, mar: 0, abr: 0, may: 7368, 
    jun: 653605, jul: 427626, ago: 1010741, sep: 519762, oct: 288310, 
    nov: 159785, dic: 104644, ene26: 1075516,
    total: 5361364
  },
  { 
    marca: "La Margot", 
    persona: "Maria Luisa Portilla",
    tipo: "SOCIA",
    rut: "—",
    estado: "Inactiva",
    ene: 139580, feb: 186650, mar: 111933, abr: 14, may: 37016, 
    jun: 35000, jul: 82881, ago: 38865, sep: 38306, oct: 37885, 
    nov: 0, dic: 58753, ene26: 0,
    total: 753279
  }
];

// ─────────────────────────────────────────
// LIQUIDACIONES A TERCEROS
// ─────────────────────────────────────────
export const LIQUIDACIONES_TERCEROS = [
  { 
    marca: "Casakiro", 
    persona: "Vania Ruiz",
    tipo: "TERCERO",
    rut: "13.227.271-9",
    ene: 2824210, feb: 93749, mar: 1460000, abr: 0, may: 0, 
    jun: 1866239, jul: 758413, ago: 1381250, sep: 1683000, oct: 1286900, 
    nov: 727600, dic: 1657118, ene26: 2322583,
    total: 17730281
  },
  { 
    marca: "Monoco", 
    persona: "Mónica Pérez",
    tipo: "TERCERO",
    rut: "8.197.846-8",
    ene: 493420, feb: 0, mar: 341200, abr: 0, may: 1101110, 
    jun: 326400, jul: 854250, ago: 549100, sep: 1579216, oct: 772605, 
    nov: 977925, dic: 1192933, ene26: 1294848,
    total: 9863767
  },
  { 
    marca: "Valeria Martinez", 
    persona: "Valeria Martínez",
    tipo: "TERCERO",
    rut: "8.710.499-0",
    ene: 939760, feb: 0, mar: 752280, abr: 0, may: 631880, 
    jun: 854250, jul: 368050, ago: 623050, sep: 325550, oct: 916300, 
    nov: 338300, dic: 567800, ene26: 1574200,
    total: 8638110
  },
  { 
    marca: "Endémica", 
    persona: "Magdalena Pérez",
    tipo: "TERCERO",
    rut: "8.861.077-6",
    ene: 315774, feb: 568928, mar: 442242, abr: 0, may: 504256, 
    jun: 853570, jul: 77180, ago: 164645, sep: 661555, oct: 422705, 
    nov: 76160, dic: 515440, ene26: 1023400,
    total: 5669445
  }
];

// ─────────────────────────────────────────
// TOTALES
// ─────────────────────────────────────────
export const TOTALES_EXCEDENTES = {
  socias: 31754168,
  terceros: 41901603,
  total: 73655771
};

// ─────────────────────────────────────────
// COSTOS Y GASTOS OPERACIONALES
// ─────────────────────────────────────────
export const COSTOS_GASTOS = [
  { categoria: "Arriendos", subcategoria: "Territoria Apoquindo", monto: 3840000, tipo: "FIJO", pct: 17.8 },
  { categoria: "Arriendos", subcategoria: "Arriendo variable (GO)", monto: 2156789, tipo: "VARIABLE", pct: 10.0 },
  { categoria: "Remuneraciones", subcategoria: "Sueldos vendedoras", monto: 4567890, tipo: "FIJO", pct: 21.2 },
  { categoria: "Remuneraciones", subcategoria: "Honorarios BHE", monto: 2345678, tipo: "VARIABLE", pct: 10.9 },
  { categoria: "Servicios", subcategoria: "Contabilidad (Account SPA)", monto: 2898000, tipo: "FIJO", pct: 13.4 },
  { categoria: "Servicios", subcategoria: "Transbank comisiones", monto: 1234567, tipo: "VARIABLE", pct: 5.7 },
  { categoria: "Servicios", subcategoria: "Shopify + Google Suite", monto: 456789, tipo: "FIJO", pct: 2.1 },
  { categoria: "Cotizaciones", subcategoria: "Previsión y salud", monto: 1890123, tipo: "FIJO", pct: 8.8 },
  { categoria: "Otros", subcategoria: "Gastos generales", monto: 1234567, tipo: "VARIABLE", pct: 5.7 },
  { categoria: "Otros", subcategoria: "Multas e intereses", monto: 101000, tipo: "EXTRAORDINARIO", pct: 0.5 },
  { categoria: "Otros", subcategoria: "Conservador bienes raíces", monto: 4600, tipo: "EXTRAORDINARIO", pct: 0.0 }
];

export const RESUMEN_COSTOS = {
  arriendos: 5996789,
  remuneraciones: 6913568,
  servicios: 4589356,
  cotizaciones: 1890123,
  otros: 1340167,
  total: 21555689
};

// ─────────────────────────────────────────
// INGRESOS MENSUALES (desde Cartola)
// ─────────────────────────────────────────
export const INGRESOS_MENSUALES = [
  { mes: "Ene", monto: 6466210 },
  { mes: "Feb", monto: 5382377 },
  { mes: "Mar", monto: 8470232 },
  { mes: "Abr", monto: 923 },
  { mes: "May", monto: 6903082 },
  { mes: "Jun", monto: 6897611 },
  { mes: "Jul", monto: 9205120 },
  { mes: "Ago", monto: 8607638 },
  { mes: "Sep", monto: 8252480 },
  { mes: "Oct", monto: 7068302 },
  { mes: "Nov", monto: 7870112 },
  { mes: "Dic", monto: 12827875 }
];
