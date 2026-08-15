/** Misma silueta que la ficha del ramo: encabezado, barra lateral y placeholder. */
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
          <div className="h-[260px] animate-pulse rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-800" />
        </div>
      </div>
    </section>
  );
}
