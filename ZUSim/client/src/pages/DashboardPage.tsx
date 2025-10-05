import React, { useMemo, useState } from "react";
import { useLocation } from "wouter";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type SickEntry = { year: number; days: number };
type WageIdxEntry = { year: number; pct: number };
type Scenario = {
  id: string;
  name: string;
  sick: SickEntry[];
  wage: WageIdxEntry[];
  lineData: Array<{ year: number; nominal: number; real: number }>;
  color: string;
};

const fmt = (n: number) =>
  new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 }).format(n);
const fmtZl = (n: number) => `${fmt(n)} zł`;

const SC_COLORS = Array.from({ length: 12 }).map(
  (_, i) => `hsl(${(i * 67) % 360} 60% 45%)`
);

const Chart = React.memo(function ChartBase({
  data,
  lines,
  scenarioOverlays,
}: {
  data: any[];
  lines: { key: "nominal" | "real"; name: string; color: string }[];
  scenarioOverlays?: Array<{ id: string; name: string; color: string; data: any[] }>;
}) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 56 }}>
        <XAxis dataKey="year" tickMargin={12} />
        <YAxis tickFormatter={(v) => fmt(Number(v))} />
        <Tooltip
          labelFormatter={(label: any) => `Rok ${label}`}
          formatter={(val: any, name: any) => [fmtZl(Number(val)), name]}
        />
        <Legend
          verticalAlign="bottom"
          align="center"
          height={32}
          wrapperStyle={{ paddingTop: 8 }}
        />

        {lines.map((l) => (
          <Line
            key={l.key}
            type="monotone"
            dataKey={l.key}
            name={l.name}
            stroke={l.color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        ))}

        {scenarioOverlays?.map((s) => (
          <Line
            key={`sc-${s.id}`}
            data={s.data}
            dataKey="real"
            name={s.name}
            stroke={s.color}
            strokeWidth={2}
            dot={false}
            strokeDasharray="5 5"
            isAnimationActive={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}, (prev, next) =>
  prev.data === next.data &&
  prev.lines === next.lines &&
  prev.scenarioOverlays === next.scenarioOverlays
);

const ScenariosChart = React.memo(function ScenariosChartBase({
  scenarios,
}: {
  scenarios: Scenario[];
}) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart margin={{ top: 10, right: 10, left: 0, bottom: 48 }}>
        <XAxis dataKey="year" type="number" domain={["dataMin", "dataMax"]} tickMargin={8} />
        <YAxis tickFormatter={(v) => fmt(Number(v))} />
        <Legend verticalAlign="bottom" align="center" height={32} />
        {scenarios.map((s) => (
          <Line
            key={s.id}
            data={s.lineData}
            dataKey="real"
            name={s.name}
            stroke={s.color}
            dot={false}
            isAnimationActive={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}, (prev, next) => prev.scenarios === next.scenarios);

export default function DashboardPage() {
  const [location] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get("data");

  const simulationData = useMemo(() => {
    if (!encoded) return null;
    try {
      return JSON.parse(decodeURIComponent(encoded));
    } catch {
      return null;
    }
  }, [encoded]);

  const [sick, setSick] = useState<SickEntry[]>([]);
  const [wage, setWage] = useState<WageIdxEntry[]>([]);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [scenarioName, setScenarioName] = useState("Scenariusz 1");
  const [showScenariosOnMain, setShowScenariosOnMain] = useState(false);

  const [sickYear, setSickYear] = useState<number | "">("");
  const [sickDays, setSickDays] = useState<number | "">("");
  const [wageYear, setWageYear] = useState<number | "">("");
  const [wagePct, setWagePct] = useState<number | "">("");

  if (!simulationData) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center text-[var(--zus-navy)] px-6">
        <h2 className="zus-header mb-2">Brak danych symulacji</h2>
        <p className="text-gray-600 mb-6">
          Wróć na stronę główną i wykonaj symulację, aby zobaczyć wyniki.
        </p>
        <a href="/" className="zus-btn-primary inline-block">
          Wróć do strony głównej
        </a>
      </main>
    );
  }

  const {
    age,
    gender,
    salary,
    startYear,
    endYear,
    includeSickLeave,
    result,
  } = simulationData;

  const sickByYear = useMemo(() => {
    const m = new Map<number, number>();
    sick.forEach((s) => m.set(s.year, Math.max(0, Math.min(365, s.days))));
    return m;
  }, [sick]);

  const wageByYear = useMemo(() => {
    const m = new Map<number, number>();
    wage.forEach((w) => m.set(w.year, Math.max(0, w.pct)));
    return m;
  }, [wage]);

  const lineData = useMemo(() => {
    const years = Number(endYear) - Number(startYear) + 1;
    const arr: Array<{ year: number; nominal: number; real: number }> = [];
    let current = Number(salary);

    for (let i = 0; i < years; i++) {
      const year = Number(startYear) + i;
      const growth = wageByYear.has(year)
        ? 1 + (Number(wageByYear.get(year)) || 0) / 100
        : 1.05;

      current = current * growth;

      let adjusted = current;
      if (includeSickLeave && sickByYear.has(year)) {
        const days = Number(sickByYear.get(year)) || 0;
        const factor = Math.max(0, 1 - days / 365);
        adjusted = adjusted * factor;
      }

      arr.push({
        year,
        nominal: adjusted,
        real: adjusted / Math.pow(1.03, i),
      });
    }
    return arr;
  }, [startYear, endYear, salary, includeSickLeave, sickByYear, wageByYear]);

  const mainLines = useMemo(
    () => [
      { key: "nominal" as const, name: "Emerytura nominalna", color: "rgb(63,132,210)" },
      { key: "real" as const, name: "Emerytura realna (dzisiejsze ceny)", color: "rgb(0,153,63)" },
    ],
    []
  );
  const fundsLines = useMemo(
    () => [{ key: "real" as const, name: "Środki w cenach stałych", color: "rgb(255,179,79)" }],
    []
  );

  const addSick = () => {
    if (sickYear === "" || sickDays === "") return;
    const y = Math.max(Number(startYear), Number(sickYear));
    const d = Math.max(0, Math.min(365, Number(sickDays)));
    setSick((prev) => {
      const filtered = prev.filter((e) => e.year !== y);
      return [...filtered, { year: y, days: d }].sort((a, b) => a.year - b.year);
    });
    setSickYear("");
    setSickDays("");
  };

  const addWage = () => {
    if (wageYear === "" || wagePct === "") return;
    const y = Math.max(Number(startYear), Number(wageYear));
    const p = Math.max(0, Number(wagePct));
    setWage((prev) => {
      const filtered = prev.filter((e) => e.year !== y);
      return [...filtered, { year: y, pct: p }].sort((a, b) => a.year - b.year);
    });
    setWageYear("");
    setWagePct("");
  };

  const saveScenario = () => {
    if (scenarios.length >= 10) return;
    const id = `${Date.now()}`;
    const sc: Scenario = {
      id,
      name: scenarioName || `Scenariusz ${scenarios.length + 1}`,
      sick: [...sick],
      wage: [...wage],
      lineData: lineData,
      color: SC_COLORS[scenarios.length % SC_COLORS.length],
    };
    setScenarios((s) => [...s, sc]);
    setScenarioName(`Scenariusz ${scenarios.length + 2}`);
  };

  const clearScenario = (id: string) => {
    setScenarios((s) => s.filter((x) => x.id !== id));
  };

  const overlays = useMemo(
    () =>
      showScenariosOnMain
        ? scenarios.slice(0, 5).map((s) => ({
            id: s.id,
            name: s.name,
            color: s.color,
            data: s.lineData,
          }))
        : undefined,
    [showScenariosOnMain, scenarios]
  );

  return (
    <main className="min-h-screen py-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6" aria-labelledby="form-title">
          <div className="zus-card no-hover">
            <h2 id="form-title" className="zus-subheader mb-4">Parametry symulacji</h2>
            <form className="flex flex-col gap-3 text-[var(--zus-navy)] text-sm">
              <p><b>Wiek:</b> {age}</p>
              <p><b>Płeć:</b> {gender === "male" ? "Mężczyzna" : "Kobieta"}</p>
              <p><b>Wynagrodzenie brutto:</b> {fmtZl(Number(salary))}</p>
              <p><b>Okres pracy:</b> {startYear} - {endYear}</p>
              <p><b>Uwzględnia chorobowe:</b> {includeSickLeave ? "Tak" : "Nie"}</p>
            </form>
          </div>

          <div className="zus-card no-hover">
            <h3 className="zus-subheader mb-3">Okresy chorobowe</h3>
            <p className="text-sm text-[var(--zus-navy)] mb-3">Dodaj dni chorobowe dla lat.</p>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="number"
                placeholder="Rok"
                className="zus-input"
                min={startYear}
                value={sickYear}
                onChange={(e) => {
                  const v = e.target.value ? Number(e.target.value) : "";
                  setSickYear(v === "" ? "" : Math.max(Number(startYear), v));
                }}
              />
              <input
                type="number"
                placeholder="Dni (0–365)"
                className="zus-input"
                min={0}
                max={365}
                value={sickDays}
                onChange={(e) => {
                  const v = e.target.value ? Number(e.target.value) : "";
                  if (v === "") return setSickDays("");
                  setSickDays(Math.max(0, Math.min(365, v)));
                }}
              />
            </div>
            <div className="flex gap-2">
              <button type="button" className="zus-btn-secondary w-full" onClick={addSick}>Dodaj</button>
              <button type="button" className="zus-btn-primary w-full" onClick={() => setSick([])}>Wyczyść</button>
            </div>
            {sick.length > 0 && (
              <ul className="mt-3 text-sm text-[var(--zus-navy)]">
                {sick.map((s) => (
                  <li key={s.year} className="flex justify-between py-1">
                    <span>{s.year}</span>
                    <span>{s.days} dni</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        <section className="col-span-12 lg:col-span-6 flex flex-col gap-6" aria-labelledby="results-title">
          <div className="zus-card no-hover">
            <div className="flex items-center justify-between mb-4">
              <h2 id="results-title" className="zus-subheader">Prognoza wysokości emerytury</h2>
              <label className="flex items-center gap-2 text-sm text-[var(--zus-navy)]">
                <input
                  type="checkbox"
                  checked={showScenariosOnMain}
                  onChange={(e) => setShowScenariosOnMain(e.target.checked)}
                />
                Pokaż scenariusze na wykresie
              </label>
            </div>

            <Chart data={lineData} lines={mainLines} scenarioOverlays={overlays} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="zus-card-hover text-center">
              <h4 className="text-sm text-[var(--zus-navy)] mb-1">Prognozowana emerytura</h4>
              <p className="text-2xl font-bold text-[var(--zus-green)]">{fmt(Number(result.nominalPension))} zł</p>
            </div>
            <div className="zus-card-hover text-center">
              <h4 className="text-sm text-[var(--zus-navy)] mb-1">Urealniona emerytura</h4>
              <p className="text-2xl font-bold text-[var(--zus-blue)]">{fmt(Number(result.realPension))} zł</p>
            </div>
            <div className="zus-card-hover text-center">
              <h4 className="text-sm text-[var(--zus-navy)] mb-1">Stopa zastąpienia</h4>
              <p className="text-2xl font-bold">{(result.replacementRate * 100).toFixed(1)}%</p>
            </div>
            <div className="zus-card-hover text-center">
              <h4 className="text-sm text-[var(--zus-navy)] mb-1">Różnica względem oczekiwań</h4>
              <p className="text-2xl font-bold text-[var(--zus-red)]">-1 200 zł</p>
            </div>
          </div>

          <div className="zus-card no-hover">
            <h3 className="zus-subheader mb-3">Wzrost środków na koncie i subkoncie</h3>
            <Chart data={lineData} lines={fundsLines} />
          </div>
        </section>

        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6" aria-labelledby="scenario-title">
          <div className="zus-card no-hover">
            <h3 id="scenario-title" className="zus-subheader mb-3">Scenariusze</h3>
            <p className="text-sm text-[var(--zus-navy)] mb-3">Zapisz i porównaj warianty.</p>
            <input
              className="zus-input mb-2"
              placeholder="Nazwa scenariusza"
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
            />
            <div className="flex flex-col gap-2">
              <button
                className={`zus-btn-primary w-full ${scenarios.length >= 10 ? "opacity-60 cursor-not-allowed" : ""}`}
                onClick={saveScenario}
                disabled={scenarios.length >= 10}
                title={scenarios.length >= 10 ? "Maksymalnie 10 scenariuszy" : ""}
              >
                Zapisz scenariusz <br/> (bieżące dane)
              </button>
            </div>

            {scenarios.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-semibold text-[var(--zus-navy)] mb-2">Porównanie:</p>
                <ScenariosChart scenarios={scenarios} />
                <ul className="mt-2 text-sm space-y-1">
                  {scenarios.map((s) => (
                    <li key={s.id} className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span
                          aria-hidden
                          style={{
                            display: "inline-block",
                            width: 10,
                            height: 10,
                            borderRadius: 9999,
                            background: s.color,
                          }}
                        />
                        {s.name}
                      </span>
                      <button className="text-red-600 hover:underline" onClick={() => clearScenario(s.id)}>
                        Usuń
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="zus-card no-hover">
            <h3 className="zus-subheader mb-3">Wskaźnik indeksacji wynagrodzeń</h3>
            <p className="text-sm text-[var(--zus-navy)] mb-3">
              Ustaw % wzrostu płac dla konkretnych lat (zastępuje domyślne 5%).
            </p>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="number"
                placeholder="Rok"
                className="zus-input"
                min={startYear}
                value={wageYear}
                onChange={(e) => {
                  const v = e.target.value ? Number(e.target.value) : "";
                  setWageYear(v === "" ? "" : Math.max(Number(startYear), v));
                }}
              />
              <input
                type="number"
                placeholder="% wzrostu"
                className="zus-input"
                min={0}
                value={wagePct}
                onChange={(e) => {
                  const v = e.target.value ? Number(e.target.value) : "";
                  if (v === "") return setWagePct("");
                  setWagePct(Math.max(0, v));
                }}
              />
            </div>
            <div className="flex gap-2">
              <button type="button" className="zus-btn-primary w-full" onClick={addWage}>Dodaj</button>
              <button type="button" className="zus-btn-secondary w-full" onClick={() => setWage([])}>Wyczyść</button>
            </div>
            {wage.length > 0 && (
              <ul className="mt-3 text-sm text-[var(--zus-navy)]">
                {wage.map((w) => (
                  <li key={w.year} className="flex justify-between py-1">
                    <span>{w.year}</span>
                    <span>{w.pct}%</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
