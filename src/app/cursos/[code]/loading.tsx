/** Misma silueta que la ficha del ramo: encabezado, barra lateral y materiales. */
export default function CourseLoading() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-16 pb-24">
      <div className="h-5 w-20 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />

      <div className="mt-8">
        <div className="h-5 w-24 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
        <div className="mt-2 h-12 w-full max-w-2xl animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
        <div className="mt-5 h-6 w-full max-w-lg animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:order-2 lg:col-span-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="h-5 w-36 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />

            <div className="mt-5 flex flex-col gap-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index}>
                  <div className="h-4 w-24 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
                  <div className="mt-1 h-5 w-32 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:order-1 lg:col-span-8">
          {/* Formulario de subida: tarjeta solida con la zona de drop adentro. */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="h-5 w-32 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
            <div className="mt-1 h-5 w-64 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
            <div className="mt-5 h-38 animate-pulse rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-800" />
            <div className="mt-5 flex items-end justify-between gap-4">
              <div className="h-14.5 w-32 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-9 w-36 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
            </div>
          </div>

          {/* Listado: tres filas, el largo tipico antes de que el curso crezca. */}
          <div className="mt-6">
            <div className="h-5 w-24 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
            <div className="mt-3 divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4 px-4 py-3.5">
                  <div className="min-w-0 flex-1">
                    <div className="h-4 w-48 max-w-full animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
                    <div className="mt-1.5 h-3 w-32 max-w-full animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
                  </div>
                  <div className="h-8 w-28 shrink-0 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
