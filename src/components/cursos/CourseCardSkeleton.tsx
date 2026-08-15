/**
 * Replica la caja de `CourseCard` (mismo padding, mismas alturas de linea) para
 * que al llegar el contenido real no haya salto de layout.
 */
export function CourseCardSkeleton() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="h-7 w-24 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
      <div className="mt-1 h-6 w-full animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />

      <div className="mt-4 flex gap-1.5 pt-1">
        <div className="h-5 w-12 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-5 w-16 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-5 w-20 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
      </div>
    </div>
  );
}
