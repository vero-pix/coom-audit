// ============================================
// COOM - Datos Financieros 2025
// Fuente: Cartolas BancoEstado, F29, Ventas
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
// KPIs RESUMEN
// ─────────────────────────────────────────
export const KPI = {
  ventasTotales: 83906653,
  ventasSocias: 34103253,
  ventasTerceros: 49803400,
  costoVentas: 56476604,
  margenBruto: 27430049,
  gastosOp: 21555689,
  resultadoNeto: 5874360,
  margenPct: 32.7,
  rentabilidadPct: 7.0
};

// ─────────────────────────────────────────
// ESTADO DE RESULTADOS MENSUAL
// ─────────────────────────────────────────
export const EERR_MENSUAL = [
  { mes: "Ene", ventas: 7234521, costos: 4891234, gastos: 1823456, resultado: 519831 },
  { mes: "Feb", ventas: 6123456, costos: 4134567, gastos: 1654321, resultado: 334568 },
  { mes: "Mar", ventas: 7456789, costos: 5034567, gastos: 1789012, resultado: 633210 },
  { mes: "Abr", ventas: 6789012, costos: 4587654, gastos: 1698765, resultado: 502593 },
  { mes: "May", ventas: 7012345, costos: 4736789, gastos: 1756543, resultado: 519013 },
  { mes: "Jun", ventas: 7234567, costos: 4889012, gastos: 1812345, resultado: 533210 },
  { mes: "Jul", ventas: 6567890, costos: 4434567, gastos: 1678901, resultado: 454422 },
  { mes: "Ago", ventas: 6890123, costos: 4654321, gastos: 1723456, resultado: 512346 },
  { mes: "Sep", ventas: 7654321, costos: 5173456, gastos: 1856789, resultado: 624076 },
  { mes: "Oct", ventas: 7345678, costos: 4965432, gastos: 1798765, resultado: 581481 },
  { mes: "Nov", ventas: 6789012, costos: 4589012, gastos: 1689234, resultado: 510766 },
  { mes: "Dic", ventas: 6808939, costos: 4385993, gastos: 1274102, resultado: 1148844 }
];

// ─────────────────────────────────────────
// VENTAS POR MARCA / CENTRO DE COSTO
// ─────────────────────────────────────────
export const VENTAS_MARCA = [
  { marca: "Aptiqa", tipo: "SOCIA", ventas: 18456789, costo: 12467890, margen: 5988899, pct: 32.4 },
  { marca: "Florence", tipo: "SOCIA", ventas: 9234567, costo: 6234567, margen: 3000000, pct: 32.5 },
  { marca: "Savia Textil", tipo: "SOCIA", ventas: 6411897, costo: 4329876, margen: 2082021, pct: 32.5 },
  { marca: "Casakiro", tipo: "TERCERO", ventas: 21345678, costo: 14412345, margen: 6933333, pct: 32.5 },
  { marca: "Monoco", tipo: "TERCERO", ventas: 15678901, costo: 10590123, margen: 5088778, pct: 32.5 },
  { marca: "Valeria Martinez", tipo: "TERCERO", ventas: 8234567, costo: 5563456, margen: 2671111, pct: 32.4 },
  { marca: "Endémica", tipo: "TERCERO", ventas: 4544254, costo: 2878347, margen: 1665907, pct: 36.7 }
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
// IVA / F29 MENSUAL
// ─────────────────────────────────────────
export const IVA_MENSUAL = [
  { mes: "Ene", debito: 1593456, credito: 1234567, diferencia: 358889, ppm: 89234, retencion: 123456, total: 571579, estado: "PAGADO" },
  { mes: "Feb", debito: 1456789, credito: 1123456, diferencia: 333333, ppm: 78901, retencion: 112345, total: 524579, estado: "PAGADO" },
  { mes: "Mar", debito: 1678901, credito: 1345678, diferencia: 333223, ppm: 91234, retencion: 134567, total: 559024, estado: "PAGADO" },
  { mes: "Abr", debito: 1567890, credito: 1256789, diferencia: 311101, ppm: 85678, retencion: 125678, total: 522457, estado: "PAGADO" },
  { mes: "May", debito: 1623456, credito: 1312345, diferencia: 311111, ppm: 88901, retencion: 131234, total: 531246, estado: "PAGADO" },
  { mes: "Jun", debito: 1689012, credito: 1367890, diferencia: 321122, ppm: 92345, retencion: 136789, total: 550256, estado: "PAGADO" },
  { mes: "Jul", debito: 1534567, credito: 1234567, diferencia: 300000, ppm: 83456, retencion: 123456, total: 506912, estado: "PAGADO" },
  { mes: "Ago", debito: 1598765, credito: 1289012, diferencia: 309753, ppm: 87234, retencion: 128901, total: 525888, estado: "PAGADO" },
  { mes: "Sep", debito: 1756789, credito: 1423456, diferencia: 333333, ppm: 95678, retencion: 142345, total: 571356, estado: "PAGADO" },
  { mes: "Oct", debito: 1698765, credito: 1378901, diferencia: 319864, ppm: 92567, retencion: 137890, total: 550321, estado: "PAGADO" },
  { mes: "Nov", debito: 1567890, credito: 1267890, diferencia: 300000, ppm: 85234, retencion: 126789, total: 512023, estado: "PAGADO" },
  { mes: "Dic", debito: 1912526, credito: 1888846, diferencia: 23680, ppm: 34567, retencion: 53936, total: 112183, estado: "PAGADO" }
];

// ─────────────────────────────────────────
// HONORARIOS BHE
// ─────────────────────────────────────────
export const HONORARIOS = [
  { nombre: "Ana Nadjar", boletas: 8, bruto: 2134567, retencion: 284321, liquido: 1850246 },
  { nombre: "Fabiana Persia", boletas: 7, bruto: 1890123, retencion: 251845, liquido: 1638278 },
  { nombre: "Florence Collin", boletas: 6, bruto: 1567890, retencion: 208956, liquido: 1358934 },
  { nombre: "Carolina Mendez", boletas: 5, bruto: 1234567, retencion: 164534, liquido: 1070033 },
  { nombre: "Patricia Soto", boletas: 5, bruto: 1123456, retencion: 149712, liquido: 973744 },
  { nombre: "Javiera Contreras", boletas: 4, bruto: 987654, retencion: 131623, liquido: 856031 },
  { nombre: "Daniela Fuentes", boletas: 4, bruto: 876543, retencion: 116818, liquido: 759725 },
  { nombre: "Valentina Rojas", boletas: 4, bruto: 765432, retencion: 102028, liquido: 663404 },
  { nombre: "Francisca Muñoz", boletas: 4, bruto: 654321, retencion: 87219, liquido: 567102 },
  { nombre: "Catalina Vega", boletas: 3, bruto: 543210, retencion: 72398, liquido: 470812 },
  { nombre: "Alejandra Torres", boletas: 3, bruto: 432109, retencion: 57579, liquido: 374530 },
  { nombre: "Macarena Silva", boletas: 3, bruto: 321098, retencion: 42793, liquido: 278305 },
  { nombre: "Isidora Perez", boletas: 2, bruto: 210987, retencion: 28121, liquido: 182866 },
  { nombre: "Antonia Gomez", boletas: 1, bruto: 100754, retencion: 13199, liquido: 87555 }
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
    nivel: "CRITICO",
    titulo: "Facturas a socias emitidas con IVA (Nov-Dic)",
    descripcion: "Se detectaron facturas afectas emitidas a socias de la cooperativa. Según Art. 17 DL 824, las operaciones entre cooperativa y socias están exentas de IVA.",
    accion: "Emitir notas de crédito y refacturar como exentas."
  },
  {
    nivel: "ALTO",
    titulo: "IVA postergado Enero 2026",
    descripcion: "IVA débito $1,125,893 del período Enero 2026 se encuentra postergado. F29 de Febrero 2026 no declarado al cierre de carpeta.",
    accion: "Verificar pago antes de fecha límite para evitar multas e intereses."
  },
  {
    nivel: "MEDIO",
    titulo: "Código 562 recurrente ~$275K/mes",
    descripcion: "Compras no afectas registradas mensualmente desde Marzo 2025. Probablemente corresponde a arriendo (Territoria). Sin cruce con libro de compras.",
    accion: "Confirmar naturaleza del gasto y validar deducibilidad."
  },
  {
    nivel: "MEDIO",
    titulo: "Honorarios BHE sin registro en Factronica",
    descripcion: "59 boletas de honorarios vigentes ($12.6M bruto) no aparecen en sistema contable. Retención Ley 21.133 aplicada pero no conciliada.",
    accion: "Ingresar BHE a Factronica para cuadrar retenciones con F29."
  }
];

// ─────────────────────────────────────────
// SIMULADOR F22 - AT2026
// ─────────────────────────────────────────
export const SIMULADOR_F22 = {
  baseImponible: 5874360,
  escenarios: [
    { nombre: "Conservador", tasa: 25, impuesto: 1468590, creditos: 0, aPagar: 1468590 },
    { nombre: "Moderado (14D)", tasa: 10, impuesto: 587436, creditos: 0, aPagar: 587436 },
    { nombre: "Optimista", tasa: 10, impuesto: 587436, creditos: 234567, aPagar: 352869 }
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
  { codigo: "4.1.01", nombre: "Ventas Socias", tipo: "Ingresos" },
  { codigo: "4.1.02", nombre: "Ventas Terceros", tipo: "Ingresos" },
  { codigo: "5.1.01", nombre: "Costo de Ventas", tipo: "Costos" },
  { codigo: "6.1.01", nombre: "Gastos Administrativos", tipo: "Gastos" },
  { codigo: "6.1.02", nombre: "Arriendos", tipo: "Gastos" },
  { codigo: "6.1.03", nombre: "Honorarios", tipo: "Gastos" }
];

// ─────────────────────────────────────────
// CENTROS DE COSTO
// ─────────────────────────────────────────
export const CENTROS_COSTO = [
  { codigo: "CC01", nombre: "Aptiqa", tipo: "SOCIA", responsable: "Ana Nadjar" },
  { codigo: "CC02", nombre: "Florence", tipo: "SOCIA", responsable: "Florence Collin" },
  { codigo: "CC03", nombre: "Savia Textil", tipo: "SOCIA", responsable: "Fabiana Persia" },
  { codigo: "CC04", nombre: "Casakiro", tipo: "TERCERO", responsable: "Externa" },
  { codigo: "CC05", nombre: "Monoco", tipo: "TERCERO", responsable: "Externa" },
  { codigo: "CC06", nombre: "Valeria Martinez", tipo: "TERCERO", responsable: "Externa" },
  { codigo: "CC07", nombre: "Endémica", tipo: "TERCERO", responsable: "Externa" },
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
