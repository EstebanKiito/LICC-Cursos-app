import { CourseCardSkeleton } from "@/components/cursos/CourseCardSkeleton";

/** Replica la silueta de `/cursos` para que no haya salto al llegar la data. */
export default function CursosLoading() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-16 pb-24">
      <div className="h-10 w-80 max-w-full animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
      <div className="mt-4 h-6 w-96 max-w-full animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />

      <div className="mt-10">
        <div className="h-11 w-full max-w-md animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />

        <div className="mt-6 flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-8 w-24 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800"
            />
          ))}
        </div>

        <div className="mt-8 border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <div className="h-5 w-32 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <CourseCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
