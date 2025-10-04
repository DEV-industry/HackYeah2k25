import React from "react";

export default function DashboardPage() {
  return (
    <main className="min-h-screen py-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* === LEWY PANEL (FORMULARZ) === */}
        <aside
          className="col-span-12 lg:col-span-3 flex flex-col gap-6"
          aria-labelledby="form-title"
        >
          <div className="zus-card-static">
            <h2 id="form-title" className="zus-subheader mb-4">
              Parametry symulacji
            </h2>

            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--zus-navy)] mb-1">
                  Wiek
                </label>
                <input
                  type="number"
                  className="zus-input"
                  placeholder="np. 30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--zus-navy)] mb-1">
                  Wynagrodzenie brutto (zł)
                </label>
                <input
                  type="number"
                  className="zus-input"
                  placeholder="np. 8000"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[var(--zus-navy)] mb-1">
                    Rok rozpoczęcia
                  </label>
                  <input
                    type="number"
                    className="zus-input"
                    placeholder="np. 2015"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--zus-navy)] mb-1">
                    Rok zakończenia
                  </label>
                  <input
                    type="number"
                    className="zus-input"
                    placeholder="np. 2060"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="sick"
                  className="accent-[var(--zus-green)]"
                />
                <label
                  htmlFor="sick"
                  className="text-sm text-[var(--zus-navy)]"
                >
                  Uwzględniaj okresy chorobowe
                </label>
              </div>

              <button
                type="button"
                className="zus-btn-primary w-full mt-2"
              >
                Zaprognozuj moją przyszłą emeryturę
              </button>
            </form>
          </div>

          <div className="zus-card-static">
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
          <div className="zus-card-static">
            <h2 id="results-title" className="zus-subheader mb-4">
              Prognoza wysokości emerytury
            </h2>
            <div className="h-72 bg-[var(--zus-gray)] rounded-md flex items-center justify-center text-gray-600 italic">
              (Wykres: rzeczywista vs urealniona vs oczekiwana)
            </div>
          </div>

          {/* KARTY PODSUMOWANIA */}
          <div className="grid grid-cols-2 gap-4">
            <div className="zus-card-hover text-center">
              <h4 className="text-sm text-[var(--zus-navy)] mb-1">
                Prognozowana emerytura
              </h4>
              <p className="text-2xl font-bold text-[var(--zus-green)]">
                4 200 zł
              </p>
            </div>
            <div className="zus-card-hover text-center">
              <h4 className="text-sm text-[var(--zus-navy)] mb-1">
                Urealniona emerytura
              </h4>
              <p className="text-2xl font-bold text-[var(--zus-blue)]">
                3 600 zł
              </p>
            </div>
            <div className="zus-card-hover text-center">
              <h4 className="text-sm text-[var(--zus-navy)] mb-1">
                Stopa zastąpienia
              </h4>
              <p className="text-2xl font-bold">54%</p>
            </div>
            <div className="zus-card-hover text-center">
              <h4 className="text-sm text-[var(--zus-navy)] mb-1">
                Różnica względem oczekiwań
              </h4>
              <p className="text-2xl font-bold text-[var(--zus-red)]">
                -1 200 zł
              </p>
            </div>
          </div>

          <div className="zus-card-static">
            <h3 className="zus-subheader mb-3">
              Wzrost środków na koncie i subkoncie
            </h3>
            <div className="h-64 bg-[var(--zus-gray)] rounded-md flex items-center justify-center text-gray-600 italic">
              (Wykres akumulacji środków w czasie)
            </div>
          </div>
        </section>

        {/* === PANEL PRAWY (SCENARIUSZE + INDEKSACJA) === */}
        <aside
          className="col-span-12 lg:col-span-3 flex flex-col gap-6"
          aria-labelledby="scenario-title"
        >
          <div className="zus-card-static">
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

          <div className="zus-card-static">
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
