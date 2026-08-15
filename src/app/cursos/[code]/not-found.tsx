import Link from "next/link";
import { ArrowLeftIcon, GraduationCapIcon } from "@phosphor-icons/react/ssr";
import { EmptyState } from "@/components/cursos/EmptyState";

/** 404 propia del segmento: la dispara `notFound()` cuando la sigla no existe. */
export default function CourseNotFound() {
  return (
    <section className="mx-auto max-w-2xl px-6 pt-24 pb-24">
      <EmptyState
        icon={GraduationCapIcon}
        title="No encontramos ese ramo"
        description="Puede que la sigla esté mal escrita o que el curso todavía no esté en el catálogo."
      >
        <Link
          href="/cursos"
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-zinc-900 px-5 text-[15px] font-medium text-zinc-50 transition-colors duration-150 hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 focus-visible:outline-none active:scale-[0.98] dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-950"
        >
          <ArrowLeftIcon weight="bold" aria-hidden className="h-4 w-4" />
          Volver al catálogo
        </Link>
      </EmptyState>
    </section>
  );
}
