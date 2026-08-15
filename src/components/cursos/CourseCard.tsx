import Link from "next/link";
import {
  formatCredits,
  formatLevel,
  formatType,
  getCourseLevel,
} from "@/lib/course-format";
import type { CourseDTO } from "@/types/course";

type Props = {
  course: CourseDTO;
};

/** Tag neutro. Sin color propio: la paleta de la app es monocromatica. */
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-zinc-200 px-2 py-0.5 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
      {children}
    </span>
  );
}

export function CourseCard({ course }: Props) {
  const level = getCourseLevel(course.code);

  return (
    <article>
      {/* Toda la tarjeta es el enlace: un area de click completa y un solo
          punto de foco al navegar con teclado. */}
      <Link
        href={`/cursos/${course.code}`}
        className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-900/5 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none active:scale-[0.99] dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:shadow-black/30 dark:focus-visible:ring-zinc-500"
      >
        <span className="font-mono text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {course.code}
        </span>

        <h2 className="mt-1 line-clamp-2 text-base font-medium text-zinc-700 dark:text-zinc-300">
          {course.name}
        </h2>

        <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
          {course.credits !== null && (
            <Tag>
              <span className="font-mono tabular-nums">{course.credits}</span>
              <span className="ml-1">cr</span>
            </Tag>
          )}
          {course.type && <Tag>{formatType(course.type)}</Tag>}
          {level !== null && <Tag>{formatLevel(level)}</Tag>}
        </div>

        {/* Solo para lectores de pantalla: los tags visuales usan abreviaturas. */}
        <span className="sr-only">{formatCredits(course.credits)}</span>
      </Link>
    </article>
  );
}
