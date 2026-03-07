import { useState } from "react";

// ============ DATA ============
const MESES = [
  "Jul-24","Ago-24","Sep-24","Oct-24","Nov-24","Dic-24",
  "Ene-25","Feb-25","Mar-25","Abr-25","May-25","Jun-25",
  "Jul-25","Ago-25","Sep-25","Oct-25","Nov-25","Dic-25","Ene-26"
];

const ventasF29 = [
  { m: "May-24", v: 5832247 }, { m: "Jun-24", v: 2119342 },
  { m: "Jul-24", v: 2706379 }, { m: "Ago-24", v: 2937147 },
  { m: "Sep-24", v: 2284179 }, { m: "Oct-24", v: 4672779 },
  { m: "Nov-24", v: 4127411 }, { m: "Dic-24", v: 13371926 },
  { m: "Ene-25", v: 5358953 }, { m: "Feb-25", v: 5726242 },
  { m: "Mar-25", v: 8628337 }, { m: "Abr-25", v: 7223477 },
  { m: "May-25", v: 9037566 }, { m: "Jun-25", v: 7286549 },
  { m: "Jul-25", v: 8490890 }, { m: "Ago-25", v: 9555747 },
  { m: "Sep-25", v: 8749032 }, { m: "Oct-25", v: 7296032 },
  { m: "Nov-25", v: 11407900 }, { m: "Dic-25", v: 16717537 },
  { m: "Ene-26", v: 9776211 },
];

const saldoFinal = [711665, 237125, 127276, 332370, 191603, 54801, 452826, 521955, -626293, -431664, -336835];

const aporte12 = {
  "SurOrigen":    [43282,0,0,0,13250,13250,13250,0,0,0,0,0,0,0,0,0,0,0,0],
  "La Margot":    [40437,9882,14622,9882,13250,13250,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "Savia Textil": [31846,8218,28992,53990,31664,192071,110471,89285,89285,166527,184134,54212,98218,159928,123519,80410,117277,272198,173138],
  "Aptiqa":       [61886,67515,56260,86178,77264,200692,133311,75550,75550,102889,98299,182874,145845,180851,134975,168478,119203,287816,149657],
  "Florence":     [0,46689,39299,53173,54010,60504,51711,22810,22810,64094,103059,74118,156000,84151,66867,54887,46598,158864,136966],
};

// COOM income sources - expanded to full available period
const m5 = ["Mar-25", "Abr-25", "May-25", "Jun-25", "Jul-25", "Ago-25", "Sep-25", "Oct-25", "Nov-25", "Dic-25", "Ene-26"];
const coomIngRows = [
  { label: "Arriendos percheros", data: [1094800,1094800,1094800,1094800,1094800,1094800,1094800,1094800,1094800,1142400,1142400] },
  { label: "Comisiones 14-15%", data: [715669,630155,656339,467528,672855,803439,792946,567315,877261,1298369,1120845] },
  { label: "Aporte 12% socias", data: [187645,333510,385492,311204,400063,424930,325361,303775,283078,718878,459761] },
  { label: "Sueldos fijos (ret.)", data: [0,687132,701754,628656,730995,0,672516,730995,687135,808773,824562] },
  { label: "Sueldos variables", data: [0,106429,99218,80271,168581,159447,166235,147303,128784,260662,179020] },
  { label: "Com. Transbank", data: [20230,0,0,0,83346,88527,67784,63287,58975,149767,95784] },
];
const coomGasRows = [
  { label: "Territoria variable", data: [525980,919100,707413,577423,682910,748711,757209,756944,778154,1523700,1068647] },
  { label: "Territoria fijo", data: [270642,320031,273574,327286,274253,274219,276400,277183,277505,278096,277363] },
  { label: "Boletas honorarios", data: [813256,757146,822303,717989,872547,852547,838398,843568,838884,1118507,1012933] },
  { label: "Contabilidad", data: [115844,116000,114725,229770,229770,115455,115455,115887,231814,117955,117089] },
  { label: "Transbank", data: [209244,176659,191754,178899,170801,211003,315316,86823,282979,1523700,324908] },
  { label: "Google/Shopify", data: [42196,40365,40365,40365,36481,38865,37885,37885,37885,37885,37885] },
  { label: "Impuestos F29", data: [730928,191451,815234,267090,684568,724728,303383,267230,1309105,210670,1320382] },
];

const f22Rows = [
  { l: "Ingresos del giro percibidos", a: 16494779, b: 50956346 },
  { l: "Otros ingresos percibidos", a: 25045795, b: 3273533 },
  { l: "Total ingresos anuales", a: 41540574, b: 54229879, bold: true },
  { l: "Existencias/insumos/servicios", a: 30877743, b: 44475854 },
  { l: "Remuneraciones pagadas", a: 0, b: 3451700 },
  { l: "Honorarios pagados", a: 15762304, b: 6017822 },
  { l: "Otros gastos deducibles", a: 0, b: 284503 },
  { l: "Perdida tributaria anterior", a: 0, b: 1137370 },
  { l: "Total egresos anuales", a: 46640047, b: 55367249, bold: true },
  { l: "Base Imponible / Perdida", a: -5099473, b: -1137370, bold: true, hl: true },
];

const f29Monthly = [
  { m:"Ene", base:5358953, deb:1018201, cred:583136, ppm:13397, ret:88707, pag:537169 },
  { m:"Feb", base:5726242, deb:1087986, cred:873954, ppm:14316, ret:34517, pag:262865 },
  { m:"Mar", base:8628337, deb:1663577, cred:1095877, ppm:21571, ret:141657, pag:730928 },
  { m:"Abr", base:7223477, deb:1381881, cred:1370101, ppm:18059, ret:161612, pag:197206 },
  { m:"May", base:9037566, deb:1717139, cred:1079084, ppm:22594, ret:154585, pag:815234 },
  { m:"Jun", base:7286549, deb:1384444, cred:1252083, ppm:18216, ret:116513, pag:267090 },
  { m:"Jul", base:8490890, deb:1613268, cred:1093118, ppm:42454, ret:148044, pag:710648 },
  { m:"Ago", base:9555747, deb:1815592, cred:1271516, ppm:23889, ret:156763, pag:724728 },
  { m:"Sep", base:8749032, deb:1662316, cred:1511375, ppm:10936, ret:144506, pag:306383 },
  { m:"Oct", base:7296032, deb:1386247, cred:1298558, ppm:36480, ret:143061, pag:267230 },
  { m:"Nov", base:11407900, deb:1771823, cred:1049582, ppm:57040, ret:134146, pag:913427 },
  { m:"Dic", base:16717537, deb:3176332, cred:3645013, ppm:20897, ret:189773, pag:210670 },
];

// ============ HELPERS ============
function fmt(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return "-";
  const neg = n < 0;
  const abs = Math.abs(Math.round(n));
  const s = abs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return neg ? `($${s})` : `$${s}`;
}
function fmtM(n) {
  if (n === null || n === undefined) return "-";
  return `${(n / 1000000).toFixed(1)}M`;
}
function sumArr(arr) {
  return arr.reduce((a, b) => a + (Number(b) || 0), 0);
}

const SOCIAS = ["Savia Textil", "Aptiqa", "Florence", "La Margot", "SurOrigen"];
const SOCIA_COLORS = {
  "Savia Textil": "#4ade80", "Aptiqa": "#60a5fa", "Florence": "#c084fc",
  "La Margot": "#f97316", "SurOrigen": "#6b7280",
};

const TABS = [
  "Panorama", "Aporte 12%", "Ingresos/Gastos", "F22 / F29", "Sim. AT2026", "Marco Legal"
];

// ============ STYLES ============
const box = { background: "#16171d", border: "1px solid #2a2a2f", borderRadius: 8, padding: 16, marginBottom: 16 };
const alertBox = { background: "#1a1520", border: "1px solid #3d2a2a", borderRadius: 8, padding: 16, marginBottom: 16 };
const mono = { fontFamily: "'JetBrains Mono', monospace" };

function TH({ children, right }) {
  return (
    <th style={{ textAlign: right ? "right" : "left", padding: "6px 8px", color: "#8b8a88", fontWeight: 500, fontSize: 11, whiteSpace: "nowrap" }}>
      {children}
    </th>
  );
}

function TD({ children, right, isMono, bold, color, indent }) {
  return (
    <td style={{
      textAlign: right ? "right" : "left",
      padding: indent ? "5px 8px 5px 24px" : "5px 8px",
      fontFamily: isMono ? "'JetBrains Mono', monospace" : "inherit",
      fontSize: isMono ? 10 : 11,
      fontWeight: bold ? 700 : 400,
      color: color || "#c4c2bf",
      whiteSpace: "nowrap",
    }}>
      {children}
    </td>
  );
}

// ============ COMPONENT ============
export default function AuditoriaCOOM() {
  const [tab, setTab] = useState(0);
  const [scenario, setScenario] = useState(0);
  const [showF29, setShowF29] = useState(false);

  // AT2026 simulation
  const atIng = 105478262;
  const atRem = 8176764;
  const atHon = 11910581;
  const atOtros = 328103;
  const atPerd = 1137370;
  const atPPM = 299849 + 1613884;

  const scenarios = [
    { name: "Escenario Base", desc: "Liquidaciones reales reconstruidas", color: "#c9a84c", exist: 68666691 },
    { name: "Pesimista", desc: "Compras 85% ventas (ratio AT2025)", color: "#ff6b6b", exist: Math.round(atIng * 0.85) },
    { name: "Optimista", desc: "Compras 75% ventas", color: "#4ade80", exist: Math.round(atIng * 0.75) },
  ];

  const S = scenarios[scenario];
  const atEg = S.exist + atRem + atHon + atOtros + atPerd;
  const atBase = atIng - atEg;
  const atImp = atBase > 0 ? Math.round(atBase * 0.25) : 0;
  const atSaldo = atBase > 0 ? atImp - atPPM : 0;

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#0f1117", color: "#e8e6e3", minHeight: "100vh", padding: "16px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#f5f5f5", margin: 0 }}>
          AUDITORIA CONTABLE - COOM
        </h1>
        <p style={{ color: "#6b6a68", fontSize: 11, margin: "2px 0 14px" }}>
          Cooperativa de Trabajo Moda y Diseno - RUT 65.220.032-K - Jul 2024 a Ene 2026
        </p>

        {/* TABS */}
        <div style={{ display: "flex", gap: 2, marginBottom: 16, borderBottom: "1px solid #2a2a2f", flexWrap: "wrap" }}>
          {TABS.map((t, i) => (
            <button
              key={i}
              onClick={() => setTab(i)}
              style={{
                padding: "7px 12px", border: "none",
                borderBottom: tab === i ? "2px solid #c9a84c" : "2px solid transparent",
                background: "transparent",
                color: tab === i ? "#c9a84c" : "#6b6a68",
                cursor: "pointer", fontSize: 11, fontWeight: tab === i ? 600 : 400,
                fontFamily: "inherit",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ===== TAB 0: PANORAMA ===== */}
        {tab === 0 && (
          <div>
            <div style={alertBox}>
              <h3 style={{ color: "#e85d5d", fontSize: 12, fontWeight: 600, margin: "0 0 8px" }}>ALERTAS</h3>
              {[
                ["ALTA", "Perdida tributaria acumulada $6.2M (AT2024+AT2025)"],
                ["ALTA", "Postergacion IVA Ene 2026: $1.125.893"],
                ["MEDIA", "Tasa PPM fluctuante (0.125%-0.5%). Indica ajustes de regimen."],
                ["MEDIA", "Saldo COOM negativo Nov-25 y Ene-26."],
                ["MEDIA", "Cambio de contador entre AT2024 y AT2025."],
              ].map(([p, t], i) => (
                <div key={i} style={{ display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 4 }}>
                  <span style={{
                    fontSize: 8, fontWeight: 700, padding: "2px 5px", borderRadius: 3,
                    background: p === "ALTA" ? "#3d1a1a" : "#3d3a1a",
                    color: p === "ALTA" ? "#ff6b6b" : "#d4a849", whiteSpace: "nowrap",
                  }}>{p}</span>
                  <span style={{ fontSize: 11, color: "#c4c2bf" }}>{t}</span>
                </div>
              ))}
            </div>

            <div style={box}>
              <h3 style={{ color: "#c9a84c", fontSize: 12, fontWeight: 600, margin: "0 0 10px" }}>
                VENTAS NETAS F29 (May-24 a Ene-26)
              </h3>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 160, padding: "0 0 18px" }}>
                {ventasF29.map((v, i) => {
                  const max = Math.max(...ventasF29.map((x) => x.v));
                  const h = (v.v / max) * 130;
                  const yr = v.m.slice(-2);
                  const bg = yr === "24" ? "#2a3a4a" : yr === "25" ? (v.v > 10000000 ? "#c9a84c" : "#3a5a3a") : "#5a3a5a";
                  return (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                      <div style={{ fontSize: 7, color: "#8b8a88", ...mono }}>{fmtM(v.v)}</div>
                      <div style={{ width: "100%", height: h, borderRadius: "2px 2px 0 0", background: bg }} />
                      <div style={{ fontSize: 6, color: "#6b6a68", writingMode: "vertical-rl", transform: "rotate(180deg)", height: 28 }}>{v.m}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {[
                ["Total 2024 (F29)", fmt(ventasF29.filter(x => x.m.includes("-24")).reduce((a, b) => a + b.v, 0))],
                ["Total 2025 (F29)", fmt(f29Monthly.reduce((a, r) => a + r.base, 0))],
                ["Crecimiento", "+107%"],
                ["Pagado F29 2025", fmt(f29Monthly.reduce((a, r) => a + r.pag, 0))],
              ].map(([l, v], i) => (
                <div key={i} style={{ background: "#1e1f26", borderRadius: 6, padding: 10, textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: "#8b8a88" }}>{l}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#e8e6e3", marginTop: 2, ...mono }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== TAB 1: APORTE 12% ===== */}
        {tab === 1 && (
          <div>
            <div style={box}>
              <h3 style={{ color: "#c9a84c", fontSize: 12, fontWeight: 600, margin: "0 0 10px" }}>
                APORTE 12% POR SOCIA - Jul-24 a Ene-26
              </h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #2a2a2f" }}>
                      <TH>Socia</TH>
                      {MESES.map((m) => <TH key={m} right>{m}</TH>)}
                      <TH right>Total</TH>
                    </tr>
                  </thead>
                  <tbody>
                    {SOCIAS.map((s) => {
                      const data = aporte12[s];
                      const total = sumArr(data);
                      const inactive = s === "La Margot" || s === "SurOrigen";
                      return (
                        <tr key={s} style={{ borderBottom: "1px solid #1e1e23" }}>
                          <td style={{ padding: "4px 8px", fontSize: 10, color: SOCIA_COLORS[s], fontWeight: 600, whiteSpace: "nowrap" }}>{s}</td>
                          {data.map((v, j) => (
                            <TD key={j} right isMono color={v === 0 && j > 6 ? "#ff6b6b33" : v === 0 ? "#444" : undefined}>
                              {v > 0 ? fmt(v) : "-"}
                            </TD>
                          ))}
                          <TD right isMono bold color={inactive ? "#ff6b6b" : "#c9a84c"}>{fmt(total)}</TD>
                        </tr>
                      );
                    })}
                    <tr style={{ borderTop: "2px solid #2a2a2f" }}>
                      <td style={{ padding: "5px 8px", fontSize: 10, fontWeight: 700 }}>TOTAL MES</td>
                      {MESES.map((_, j) => {
                        const total = SOCIAS.reduce((a, s) => a + (aporte12[s][j] || 0), 0);
                        return <TD key={j} right isMono bold color="#4ade80">{fmt(total)}</TD>;
                      })}
                      <TD right isMono bold color="#4ade80">
                        {fmt(SOCIAS.reduce((a, s) => a + sumArr(aporte12[s]), 0))}
                      </TD>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginTop: 12 }}>
                {SOCIAS.map((s) => {
                  const total = sumArr(aporte12[s]);
                  const inactive = s === "La Margot" || s === "SurOrigen";
                  return (
                    <div key={s} style={{ background: "#1e1f26", borderRadius: 6, padding: 10, textAlign: "center", border: `1px solid ${inactive ? "#3d2a2a" : "#1e1e23"}` }}>
                      <div style={{ fontSize: 10, color: SOCIA_COLORS[s], fontWeight: 600 }}>{s}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: inactive ? "#ff6b6b" : "#4ade80", ...mono }}>{fmt(total)}</div>
                      <div style={{ fontSize: 9, color: "#6b6a68" }}>total acumulado</div>
                      {inactive && <div style={{ fontSize: 8, color: "#ff6b6b", marginTop: 2 }}>INACTIVA</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===== TAB 2: INGRESOS / GASTOS COOM ===== */}
        {tab === 2 && (
          <div>
            <div style={box}>
              <h3 style={{ color: "#c9a84c", fontSize: 12, fontWeight: 600, margin: "0 0 10px" }}>
                INGRESOS COOM (Mar-25 a Ene-26)
              </h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #2a2a2f" }}>
                      <TH>Fuente</TH>
                      {m5.map((m) => <TH key={m} right>{m}</TH>)}
                      <TH right>Total</TH>
                    </tr>
                  </thead>
                  <tbody>
                    {coomIngRows.map((row, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #1e1e23" }}>
                        <td style={{ padding: "4px 8px", fontSize: 11, color: "#c4c2bf" }}>{row.label}</td>
                        {row.data.map((v, j) => <TD key={j} right isMono>{fmt(v)}</TD>)}
                        <TD right isMono bold color="#c9a84c">{fmt(sumArr(row.data))}</TD>
                      </tr>
                    ))}
                    <tr style={{ borderTop: "2px solid #2a2a2f" }}>
                      <td style={{ padding: "5px 8px", fontSize: 11, fontWeight: 700 }}>TOTAL INGRESOS</td>
                      {m5.map((_, j) => {
                        const total = coomIngRows.reduce((a, row) => a + (row.data[j] || 0), 0);
                        return <TD key={j} right isMono bold color="#4ade80">{fmt(total)}</TD>;
                      })}
                      <TD right isMono bold color="#4ade80">
                        {fmt(coomIngRows.reduce((a, row) => a + sumArr(row.data), 0))}
                      </TD>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div style={box}>
              <h3 style={{ color: "#c9a84c", fontSize: 12, fontWeight: 600, margin: "0 0 10px" }}>
                GASTOS COOM (Mar-25 a Ene-26)
              </h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #2a2a2f" }}>
                      <TH>Gasto</TH>
                      {m5.map((m) => <TH key={m} right>{m}</TH>)}
                      <TH right>Total</TH>
                    </tr>
                  </thead>
                  <tbody>
                    {coomGasRows.map((row, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #1e1e23" }}>
                        <td style={{ padding: "4px 8px", fontSize: 11, color: "#c4c2bf" }}>{row.label}</td>
                        {row.data.map((v, j) => <TD key={j} right isMono>{fmt(v)}</TD>)}
                        <TD right isMono bold color="#ff6b6b">{fmt(sumArr(row.data))}</TD>
                      </tr>
                    ))}
                    <tr style={{ borderTop: "2px solid #2a2a2f" }}>
                      <td style={{ padding: "5px 8px", fontSize: 11, fontWeight: 700 }}>TOTAL GASTOS</td>
                      {m5.map((_, j) => {
                        const total = coomGasRows.reduce((a, row) => a + (row.data[j] || 0), 0);
                        return <TD key={j} right isMono bold color="#ff6b6b">{fmt(total)}</TD>;
                      })}
                      <TD right isMono bold color="#ff6b6b">
                        {fmt(coomGasRows.reduce((a, row) => a + sumArr(row.data), 0))}
                      </TD>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: `repeat(${m5.length}, 1fr)`, gap: 6, overflowX: "auto" }}>
              {saldoFinal.map((v, i) => (
                <div key={i} style={{ background: "#1e1f26", borderRadius: 6, padding: 8, textAlign: "center", border: `1px solid ${v < 0 ? "#3d2a2a" : "#1a3d2a"}`, minWidth: 70 }}>
                  <div style={{ fontSize: 8, color: "#8b8a88" }}>{m5[i]}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: v < 0 ? "#ff6b6b" : "#4ade80", ...mono }}>{fmt(v)}</div>
                  <div style={{ fontSize: 7, color: "#6b6a68" }}>saldo</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== TAB 3: F22 / F29 ===== */}
        {tab === 3 && (
          <div>
            <div style={box}>
              <h3 style={{ color: "#c9a84c", fontSize: 12, fontWeight: 600, margin: "0 0 10px" }}>
                F22 COMPARATIVO AT2024 vs AT2025
              </h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #2a2a2f" }}>
                    <TH>Concepto</TH><TH right>AT2024</TH><TH right>AT2025</TH><TH right>Var</TH>
                  </tr>
                </thead>
                <tbody>
                  {f22Rows.map((r, i) => (
                    <tr key={i} style={{ borderBottom: r.bold ? "2px solid #2a2a2f" : "1px solid #1e1e23", background: r.hl ? "#1a1520" : "transparent" }}>
                      <td style={{ padding: "5px 8px", fontSize: 11, fontWeight: r.bold ? 600 : 400, color: r.hl ? "#ff6b6b" : "#c4c2bf" }}>{r.l}</td>
                      <TD right isMono>{fmt(r.a)}</TD>
                      <TD right isMono>{fmt(r.b)}</TD>
                      <TD right isMono color={r.b > r.a ? "#4ade80" : "#ff6b6b"}>
                        {r.a !== 0 ? `${(((r.b - r.a) / Math.abs(r.a)) * 100).toFixed(0)}%` : "n/a"}
                      </TD>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={box}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: showF29 ? 10 : 0 }}>
                <h3 style={{ color: "#c9a84c", fontSize: 12, fontWeight: 600, margin: 0 }}>DETALLE F29 MENSUAL 2025</h3>
                <button onClick={() => setShowF29(!showF29)} style={{ background: "#2a2a2f", border: "none", borderRadius: 4, padding: "3px 10px", color: "#c9a84c", cursor: "pointer", fontSize: 10, fontFamily: "inherit" }}>
                  {showF29 ? "Ocultar" : "Mostrar"}
                </button>
              </div>
              {showF29 && (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #2a2a2f" }}>
                      <TH>Mes</TH><TH right>Base</TH><TH right>Deb IVA</TH><TH right>Cred IVA</TH>
                      <TH right>PPM</TH><TH right>Ret 21.133</TH><TH right>Pagado</TH>
                    </tr>
                  </thead>
                  <tbody>
                    {f29Monthly.map((r, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #1e1e23" }}>
                        <TD>{r.m}</TD><TD right isMono>{fmt(r.base)}</TD><TD right isMono>{fmt(r.deb)}</TD>
                        <TD right isMono>{fmt(r.cred)}</TD><TD right isMono>{fmt(r.ppm)}</TD>
                        <TD right isMono>{fmt(r.ret)}</TD><TD right isMono bold>{fmt(r.pag)}</TD>
                      </tr>
                    ))}
                    <tr style={{ borderTop: "2px solid #2a2a2f" }}>
                      <TD bold>TOTAL</TD>
                      <TD right isMono bold color="#c9a84c">{fmt(f29Monthly.reduce((a, r) => a + r.base, 0))}</TD>
                      <TD right isMono bold>{fmt(f29Monthly.reduce((a, r) => a + r.deb, 0))}</TD>
                      <TD right isMono bold>{fmt(f29Monthly.reduce((a, r) => a + r.cred, 0))}</TD>
                      <TD right isMono bold color="#60a5fa">{fmt(f29Monthly.reduce((a, r) => a + r.ppm, 0))}</TD>
                      <TD right isMono bold color="#60a5fa">{fmt(f29Monthly.reduce((a, r) => a + r.ret, 0))}</TD>
                      <TD right isMono bold color="#ff6b6b">{fmt(f29Monthly.reduce((a, r) => a + r.pag, 0))}</TD>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ===== TAB 4: SIMULACION AT2026 ===== */}
        {tab === 4 && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 16 }}>
              {scenarios.map((s, i) => {
                const eg = s.exist + atRem + atHon + atOtros + atPerd;
                const base = atIng - eg;
                return (
                  <button key={i} onClick={() => setScenario(i)} style={{
                    background: scenario === i ? "#1e1f26" : "#16171d",
                    border: `1px solid ${scenario === i ? s.color : "#2a2a2f"}`,
                    borderRadius: 8, padding: 12, cursor: "pointer", textAlign: "left",
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: s.color }}>{s.name}</div>
                    <div style={{ fontSize: 9, color: "#6b6a68", marginBottom: 6 }}>{s.desc}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: base > 0 ? "#4ade80" : "#ff6b6b", ...mono }}>
                      {base > 0 ? "Utilidad" : "Perdida"}: {fmt(Math.abs(base))}
                    </div>
                  </button>
                );
              })}
            </div>

            <div style={box}>
              <h3 style={{ color: S.color, fontSize: 12, fontWeight: 600, margin: "0 0 10px" }}>
                {S.name.toUpperCase()} - F22 AT2026 (AC 2025)
              </h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  <tr style={{ background: "#1a2a1a" }}>
                    <TD bold color="#4ade80">INGRESOS</TD><TD /><TD />
                  </tr>
                  <tr style={{ borderBottom: "1px solid #1e1e23" }}>
                    <TD indent>Ingresos del giro (ventas netas F29)</TD>
                    <TD right isMono>{fmt(atIng)}</TD>
                    <TD right isMono color="#6b6a68">100%</TD>
                  </tr>
                  <tr style={{ borderBottom: "2px solid #2a2a2f", background: "#0f1117" }}>
                    <TD bold>TOTAL INGRESOS</TD>
                    <TD right isMono bold color="#4ade80">{fmt(atIng)}</TD><TD />
                  </tr>

                  <tr style={{ background: "#2a1a1a" }}>
                    <TD bold color="#ff6b6b">EGRESOS</TD><TD /><TD />
                  </tr>
                  <tr style={{ borderBottom: "1px solid #1e1e23" }}>
                    <TD indent>Existencias/insumos/servicios</TD>
                    <TD right isMono>{fmt(S.exist)}</TD>
                    <TD right isMono color="#6b6a68">{(S.exist / atIng * 100).toFixed(1)}%</TD>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #1e1e23" }}>
                    <TD indent>Remuneraciones</TD>
                    <TD right isMono>{fmt(atRem)}</TD>
                    <TD right isMono color="#6b6a68">{(atRem / atIng * 100).toFixed(1)}%</TD>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #1e1e23" }}>
                    <TD indent>Honorarios (vendedoras + contab)</TD>
                    <TD right isMono>{fmt(atHon)}</TD>
                    <TD right isMono color="#6b6a68">{(atHon / atIng * 100).toFixed(1)}%</TD>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #1e1e23" }}>
                    <TD indent>Otros gastos</TD>
                    <TD right isMono>{fmt(atOtros)}</TD><TD />
                  </tr>
                  <tr style={{ borderBottom: "1px solid #1e1e23" }}>
                    <TD indent>Perdida anterior (AT2025)</TD>
                    <TD right isMono>{fmt(atPerd)}</TD><TD />
                  </tr>
                  <tr style={{ borderBottom: "2px solid #2a2a2f", background: "#0f1117" }}>
                    <TD bold>TOTAL EGRESOS</TD>
                    <TD right isMono bold color="#ff6b6b">{fmt(atEg)}</TD>
                    <TD right isMono color="#6b6a68">{(atEg / atIng * 100).toFixed(1)}%</TD>
                  </tr>

                  <tr style={{ background: atBase > 0 ? "#1a2a1a" : "#2a1a1a" }}>
                    <TD bold color={atBase > 0 ? "#4ade80" : "#ff6b6b"}>
                      {atBase > 0 ? "BASE IMPONIBLE" : "PERDIDA TRIBUTARIA"}
                    </TD>
                    <TD right isMono bold color={atBase > 0 ? "#4ade80" : "#ff6b6b"}>
                      {fmt(Math.abs(atBase))}
                    </TD>
                    <TD />
                  </tr>

                  {atBase > 0 && (
                    <>
                      <tr style={{ borderBottom: "1px solid #1e1e23" }}>
                        <TD indent>Impuesto 1ra Cat. (25%)</TD>
                        <TD right isMono>{fmt(atImp)}</TD><TD />
                      </tr>
                      <tr style={{ borderBottom: "1px solid #1e1e23" }}>
                        <TD indent>PPM + Retenciones a favor</TD>
                        <TD right isMono color="#60a5fa">({fmt(atPPM)})</TD><TD />
                      </tr>
                      <tr style={{ background: "#0f1117" }}>
                        <TD bold color={atSaldo > 0 ? "#ff6b6b" : "#4ade80"}>
                          {atSaldo > 0 ? "SALDO A PAGAR" : "DEVOLUCION"}
                        </TD>
                        <TD right isMono bold color={atSaldo > 0 ? "#ff6b6b" : "#4ade80"}>
                          {fmt(Math.abs(atSaldo))}
                        </TD>
                        <TD />
                      </tr>
                    </>
                  )}
                  {atBase <= 0 && (
                    <>
                      <tr style={{ borderBottom: "1px solid #1e1e23" }}>
                        <TD indent>PPM + Retenciones pagadas</TD>
                        <TD right isMono color="#60a5fa">{fmt(atPPM)}</TD><TD />
                      </tr>
                      <tr style={{ background: "#0f1117" }}>
                        <TD bold color="#4ade80">DEVOLUCION PPM</TD>
                        <TD right isMono bold color="#4ade80">{fmt(atPPM)}</TD><TD />
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>

            <div style={{ ...alertBox, border: "1px solid #3d2a3d" }}>
              <h3 style={{ color: "#d4a849", fontSize: 12, fontWeight: 600, margin: "0 0 8px" }}>NOTA CRITICA</h3>
              <p style={{ fontSize: 11, color: "#c4c2bf", lineHeight: 1.6, margin: 0 }}>
                El resultado depende de como se clasifiquen las facturas de compra. Ademas, las operaciones con socias (Savia, Aptiqa, Florence) estan exentas de 1ra Categoria (Art. 51 LGC). Solo tributa el remanente de operaciones con terceros (disenadoras + venta al publico). El contador debe separar ambos flujos.
              </p>
            </div>
          </div>
        )}

        {/* ===== TAB 5: MARCO LEGAL ===== */}
        {tab === 5 && (
          <div>
            <div style={box}>
              <h3 style={{ color: "#c9a84c", fontSize: 13, fontWeight: 600, margin: "0 0 14px" }}>
                EL APORTE DEL 12%: QUE ES, DONDE ESTA, COMO FUNCIONA
              </h3>
              <div style={{ fontSize: 12, color: "#c4c2bf", lineHeight: 1.8 }}>

                <p style={{ margin: "0 0 14px" }}>
                  <strong style={{ color: "#f5f5f5" }}>1. Naturaleza juridica del 12%.</strong>{" "}
                  No es un impuesto, ni una cuota de participacion, ni un deposito reembolsable.
                  Es una retencion operativa interna que la cooperativa aplica a las ventas netas de cada socia
                  para financiar gastos comunes. Contablemente se registra como ingreso de la cooperativa
                  por servicio de comercializacion. No incrementa el capital social ni las cuotas de participacion.
                </p>

                <p style={{ margin: "0 0 14px" }}>
                  <strong style={{ color: "#f5f5f5" }}>2. Donde esta ese dinero hoy.</strong>{" "}
                  No existe como fondo separado. Se mezcla con la caja operativa (cuenta BancoEstado)
                  y se consume mes a mes para cubrir: Territoria (~$1M/mes), sueldos vendedoras (~$850K/mes),
                  contabilidad (~$120K/mes), impuestos F29, Transbank, Google/Shopify, patentes.
                  El 12% se gasta integramente en la operacion. No se acumula ni se capitaliza.
                </p>

                <p style={{ margin: "0 0 14px" }}>
                  <strong style={{ color: "#f5f5f5" }}>3. Se retira? Se devuelve?</strong>{" "}
                  No. A diferencia de los "excedentes" (que si se distribuyen), la retencion del 12% no se devuelve.
                  Es un costo del servicio de comercializacion. Lo que si se puede distribuir son los excedentes
                  al cierre del ejercicio, pero COOM lleva dos anos con perdida tributaria: no hay excedentes.
                </p>

                <div style={{ background: "#0f1117", borderRadius: 6, padding: 14, marginBottom: 14 }}>
                  <p style={{ margin: "0 0 8px", color: "#e8e6e3" }}>
                    <strong>4. Remanente vs Excedente (Art. 36 LGC / DFL 5-2003):</strong>
                  </p>
                  <p style={{ margin: "0 0 6px" }}>
                    El saldo favorable del ejercicio se llama <strong style={{ color: "#c9a84c" }}>remanente</strong>.
                    Primero absorbe perdidas acumuladas. Luego va a reservas legales/voluntarias.
                    El saldo final se denomina <strong style={{ color: "#4ade80" }}>excedente</strong> y se distribuye
                    entre socios a prorrata de sus cuotas de participacion (o se emiten cuotas liberadas).
                  </p>
                  <p style={{ margin: "0 0 6px" }}>
                    <strong style={{ color: "#c9a84c" }}>Patrimonio cooperativo</strong> = aportes de capital +
                    reservas legales/voluntarias + excedentes (o menos perdidas).
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong style={{ color: "#ff6b6b" }}>COOM hoy:</strong> con perdida acumulada de $1.1M (AT2025),
                    no hay remanente positivo. No hay excedentes distribuibles.
                    Capital inicial $1.5M menos perdidas = patrimonio cercano a cero.
                  </p>
                </div>

                <div style={{ background: "#0f1117", borderRadius: 6, padding: 14, marginBottom: 14 }}>
                  <p style={{ margin: "0 0 8px", color: "#e8e6e3" }}>
                    <strong>5. Tributacion especial cooperativa (Art. 17 DL 824):</strong>
                  </p>
                  <p style={{ margin: "0 0 6px" }}>
                    <strong style={{ color: "#4ade80" }}>Operaciones con socios:</strong> El remanente originado en
                    operaciones con las socias (Savia, Aptiqa, Florence, La Margot, SurOrigen) esta exento de
                    Impuesto de 1ra Categoria (Art. 51 LGC). Los excedentes distribuidos por estas operaciones
                    son ingreso no renta para las socias.
                  </p>
                  <p style={{ margin: "0 0 6px" }}>
                    <strong style={{ color: "#ff6b6b" }}>Operaciones con terceros:</strong> El remanente de operaciones
                    con NO socias (Monoco, Casakiro, VM, Endemica, venta al publico) SI tributa con 1ra Categoria.
                  </p>
                  <p style={{ margin: 0, color: "#d4a849" }}>
                    <strong>Implicancia AT2026:</strong> El contador debe separar el remanente entre operaciones con
                    socias (exento) y con terceros (gravado). Si el 50%+ de las ventas proviene de disenadoras
                    externas, la porcion gravable es significativa. Punto critico de planificacion.
                  </p>
                </div>

                <div style={{ background: "#0f1117", borderRadius: 6, padding: 14 }}>
                  <p style={{ margin: "0 0 8px", color: "#e8e6e3" }}>
                    <strong>6. Que deberia hacer COOM con el 12%:</strong>
                  </p>
                  <p style={{ margin: "0 0 6px" }}>
                    El mecanismo funciona pero es insuficiente. Con gastos fijos de ~$2.6M/mes y el 12%
                    generando ~$300-700K/mes, el deficit se cubre con arriendos ($1.1M) y comisiones ($0.6-1.3M)
                    de disenadoras.
                  </p>
                  <p style={{ margin: "0 0 4px" }}>Recomendaciones:</p>
                  <p style={{ margin: "0 0 4px", paddingLeft: 12 }}>
                    a) Formalizar en estatutos que el 12% es aporte operativo no reembolsable.
                  </p>
                  <p style={{ margin: "0 0 4px", paddingLeft: 12 }}>
                    b) Registrar como "ingreso por administracion", diferenciado de ventas.
                  </p>
                  <p style={{ margin: "0 0 4px", paddingLeft: 12 }}>
                    c) Definir en asamblea el tratamiento de socias inactivas (La Margot, SurOrigen).
                  </p>
                  <p style={{ margin: 0, paddingLeft: 12 }}>
                    d) Evaluar si el 12% es suficiente o requiere ajuste dado el deficit operativo recurrente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
