import React, { useMemo } from "react";
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

export default function DashboardPage() {
  // 1️⃣ Pobranie parametru z URL
  const [location] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get("data");

  // 2️⃣ Dekodowanie danych z URL
  const simulationData = useMemo(() => {
    if (!encoded) return null;
    try {
      return JSON.parse(decodeURIComponent(encoded));
    } catch {
      return null;
    }
  }, [encoded]);

  // 3️⃣ Brak danych -> komunikat
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

  // 4️⃣ Przygotowanie danych do wykresu liniowego
  const lineData = Array.from(
    { length: Number(endYear) - Number(startYear) + 1 },
    (_, i) => {
      const year = Number(startYear) + i;
      const growthRate = 0.05;
      const base = Number(salary);
      const value = base * Math.pow(1 + growthRate, i);
      const adjusted =
        includeSickLeave && gender === "female"
          ? value * 0.95
          : includeSickLeave && gender === "male"
          ? value * 0.96
          : value;

      return {
        year,
        nominal: value,
        real: adjusted / Math.pow(1.03, i),
      };
    }
  );

  return (
    <main className="min-h-screen py-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* === LEWY PANEL (PARAMETRY) === */}
        <aside
          className="col-span-12 lg:col-span-3 flex flex-col gap-6"
          aria-labelledby="form-title"
        >
          <div className="zus-card">
            <h2 id="form-title" className="zus-subheader mb-4">
              Parametry symulacji
            </h2>

            <form className="flex flex-col gap-3 text-[var(--zus-navy)] text-sm">
              <p>
                <b>Wiek:</b> {age}
              </p>
              <p>
                <b>Płeć:</b>{" "}
                {gender === "male" ? "Mężczyzna" : "Kobieta"}
              </p>
              <p>
                <b>Wynagrodzenie brutto:</b> {salary} zł
              </p>
              <p>
                <b>Okres pracy:</b> {startYear} - {endYear}
              </p>
              <p>
                <b>Uwzględnia chorobowe:</b>{" "}
                {includeSickLeave ? "Tak" : "Nie"}
              </p>
            </form>
          </div>

          <div className="zus-card">
            <h3 className="zus-subheader mb-3">Okresy chorobowe</h3>
            <p className="text-sm text-[var(--zus-navy)] mb-3">
              Wprowadź dane dla wybranych lat:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Rok"
                  className="zus-input"
                />
                <input
                  type="number"
                  placeholder="Dni"
                  className="zus-input"
                />
              </div>
              <button className="zus-btn-secondary w-full">Dodaj</button>
            </div>
          </div>
        </aside>

        {/* === PANEL CENTRALNY (WYNIKI + WYKRESY) === */}
        <section
          className="col-span-12 lg:col-span-6 flex flex-col gap-6"
          aria-labelledby="results-title"
        >
          <div className="zus-card">
            <h2 id="results-title" className="zus-subheader mb-4">
              Prognoza wysokości emerytury
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(val: number) => `${val.toFixed(0)} zł`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="nominal"
                  stroke="rgb(63,132,210)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="real"
                  stroke="rgb(0,153,63)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* === KARTY PODSUMOWANIA === */}
          <div className="grid grid-cols-2 gap-4">
            <div className="zus-card-hover text-center">
              <h4 className="text-sm text-[var(--zus-navy)] mb-1">
                Prognozowana emerytura
              </h4>
              <p className="text-2xl font-bold text-[var(--zus-green)]">
                {result.nominalPension.toFixed(0)} zł
              </p>
            </div>
            <div className="zus-card-hover text-center">
              <h4 className="text-sm text-[var(--zus-navy)] mb-1">
                Urealniona emerytura
              </h4>
              <p className="text-2xl font-bold text-[var(--zus-blue)]">
                {result.realPension.toFixed(0)} zł
              </p>
            </div>
            <div className="zus-card text-center">
              <h4 className="text-sm text-[var(--zus-navy)] mb-1">
                Stopa zastąpienia
              </h4>
              <p className="text-2xl font-bold">
                {(result.replacementRate * 100).toFixed(1)}%
              </p>
            </div>
            <div className="zus-card text-center">
              <h4 className="text-sm text-[var(--zus-navy)] mb-1">
                Różnica względem oczekiwań
              </h4>
              <p className="text-2xl font-bold text-[var(--zus-red)]">
                -1 200 zł
              </p>
            </div>
          </div>

          <div className="zus-card">
            <h3 className="zus-subheader mb-3">
              Wzrost środków na koncie i subkoncie
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(val: number) => `${val.toFixed(0)} zł`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="real"
                  stroke="rgb(255,179,79)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* === PANEL PRAWY (SCENARIUSZE + INDEKSACJA) === */}
        <aside
          className="col-span-12 lg:col-span-3 flex flex-col gap-6"
          aria-labelledby="scenario-title"
        >
          <div className="zus-card">
            <h3 id="scenario-title" className="zus-subheader mb-3">
              Scenariusze
            </h3>
            <p className="text-sm text-[var(--zus-navy)] mb-3">
              Zapisz i porównaj różne warianty prognozy.
            </p>

            <div className="flex flex-col gap-2">
              <button className="zus-btn-primary w-full">
                Zapisz scenariusz
              </button>
              <button className="zus-btn-secondary w-full">
                Porównaj scenariusze
              </button>
            </div>
          </div>

          <div className="zus-card">
            <h3 className="zus-subheader mb-3">
              Wskaźnik indeksacji wynagrodzeń
            </h3>
            <p className="text-sm text-[var(--zus-navy)] mb-3">
              Dodaj własne założenia dla wzrostu płac:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Rok"
                  className="zus-input"
                />
                <input
                  type="number"
                  placeholder="% wzrostu"
                  className="zus-input"
                />
              </div>
              <button className="zus-btn-primary w-full">Dodaj</button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
