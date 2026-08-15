"use client";

import { useState } from "react";
import { BroomIcon, GraduationCapIcon } from "@phosphor-icons/react/ssr";
import { CourseCard } from "@/components/cursos/CourseCard";
import {
  CourseFilters,
  hasActiveFilters,
  NO_FILTERS,
  type Filters,
} from "@/components/cursos/CourseFilters";
import { EmptyState } from "@/components/cursos/EmptyState";
import { getCourseLevel, normalizeText } from "@/lib/course-format";
import type { CourseDTO } from "@/types/course";

type Props = {
  courses: CourseDTO[];
};

/**
 * Unico componente con estado de la vista. Recibe el catalogo ya serializado
 * (`CourseDTO[]`) y filtra en cliente: son decenas de filas, asi que no vale la
 * pena volver al servidor por cada click.
 *
 * Importante: este archivo nunca debe importar `@/lib/courses`, o Sequelize
 * terminaria en el bundle de cliente. Los helpers puros viven en
 * `@/lib/course-format`.
 */
export function CourseBrowser({ courses }: Props) {
  // Un solo objeto de estado en vez de cuatro `useState` sueltos: simplifica el
  // reset y el calculo de "hay filtros activos".
  const [filters, setFilters] = useState<Filters>(NO_FILTERS);

  // Las opciones se derivan de la data, no se hardcodean: si manana el seed
  // trae un tipo nuevo o un nivel 3000, el chip aparece solo.
  const typeOptions = [...new Set(courses.map((course) => course.type))]
    .filter((type): type is string => type !== null)
    .sort();

  const parityOptions = [...new Set(courses.map((course) => course.parity))]
    .filter((parity): parity is string => parity !== null)
    .sort();

  const levelOptions = [
    ...new Set(courses.map((course) => getCourseLevel(course.code))),
  ]
    .filter((level): level is number => level !== null)
    .sort((a, b) => a - b);

  // OR dentro de cada faceta, AND entre facetas.
  const query = normalizeText(filters.query.trim());

  const visible = courses.filter((course) => {
    if (query !== "") {
      const haystack = normalizeText(`${course.code} ${course.name}`);
      if (!haystack.includes(query)) return false;
    }

    if (filters.types.length > 0) {
      if (course.type === null || !filters.types.includes(course.type)) {
        return false;
      }
    }

    if (filters.parity !== null && course.parity !== filters.parity) {
      return false;
    }

    if (filters.levels.length > 0) {
      const level = getCourseLevel(course.code);
      if (level === null || !filters.levels.includes(level)) return false;
    }

    return true;
  });

  const isFiltered = hasActiveFilters(filters);

  return (
    <div className="mt-10">
      <CourseFilters
        filters={filters}
        options={{
          types: typeOptions,
          levels: levelOptions,
          parities: parityOptions,
        }}
        onChange={setFilters}
      />

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-zinc-200 pt-4 dark:border-zinc-800">
        <p
          aria-live="polite"
          className="text-sm text-zinc-600 dark:text-zinc-400"
        >
          <span className="font-mono tabular-nums text-zinc-900 dark:text-zinc-50">
            {visible.length}
          </span>{" "}
          de{" "}
          <span className="font-mono tabular-nums">{courses.length}</span> cursos
        </p>

        {isFiltered && (
          <button
            type="button"
            onClick={() => setFilters(NO_FILTERS)}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-zinc-600 transition-colors duration-150 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none active:scale-[0.98] dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500"
          >
            <BroomIcon weight="bold" aria-hidden className="h-4 w-4" />
            Limpiar filtros
          </button>
        )}
      </div>

      {visible.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          {courses.length === 0 ? (
            <EmptyState
              icon={GraduationCapIcon}
              title="Aún no hay cursos cargados"
              description="Cuando se pueble el catálogo de ramos, van a aparecer acá."
            />
          ) : (
            <EmptyState
              icon={GraduationCapIcon}
              title="Ningún curso coincide"
              description="Prueba con otra sigla o quita alguno de los filtros activos."
            >
              <button
                type="button"
                onClick={() => setFilters(NO_FILTERS)}
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-zinc-900 px-4 text-sm font-medium text-zinc-50 transition-colors duration-150 hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 focus-visible:outline-none active:scale-[0.98] dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-950"
              >
                <BroomIcon weight="bold" aria-hidden className="h-4 w-4" />
                Limpiar filtros
              </button>
            </EmptyState>
          )}
        </div>
      )}
    </div>
  );
}
