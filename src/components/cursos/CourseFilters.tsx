import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react/ssr";
import { formatLevel, formatParity, formatType } from "@/lib/course-format";

export type Filters = {
  query: string;
  /** Multi-seleccion: OR entre los valores elegidos, [] = sin filtro. */
  types: string[];
  /** Multi-seleccion: OR entre los valores elegidos, [] = sin filtro. */
  levels: number[];
  /** Seleccion unica: los valores son mutuamente excluyentes. */
  parity: string | null;
};

export const NO_FILTERS: Filters = {
  query: "",
  types: [],
  levels: [],
  parity: null,
};

/** Agrega o quita un valor devolviendo SIEMPRE un array nuevo. */
export function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export function hasActiveFilters(filters: Filters): boolean {
  return (
    filters.query.trim() !== "" ||
    filters.types.length > 0 ||
    filters.levels.length > 0 ||
    filters.parity !== null
  );
}

const chipBase =
  "inline-flex h-8 items-center rounded-lg px-3 text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none active:scale-[0.98] dark:focus-visible:ring-zinc-500";

const chipActive = "bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900";

const chipIdle =
  "border border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50";

type ChipProps = {
  label: string;
  pressed: boolean;
  onToggle: () => void;
};

function Chip({ label, pressed, onToggle }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onToggle}
      className={`${chipBase} ${pressed ? chipActive : chipIdle}`}
    >
      {label}
    </button>
  );
}

function FacetGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      <div
        role="group"
        aria-label={label}
        className="mt-2 flex flex-wrap gap-2"
      >
        {children}
      </div>
    </div>
  );
}

type Props = {
  filters: Filters;
  options: {
    types: string[];
    levels: number[];
    parities: string[];
  };
  onChange: (next: Filters) => void;
};

/**
 * Barra de buscador + chips. Presentacional puro: no tiene estado propio, todo
 * llega por props desde `CourseBrowser`.
 *
 * Se usan toggles inline en vez de dropdowns porque con seis tipos, tres
 * paridades y dos niveles todo cabe a la vista, y ademas evita reimplementar un
 * popover con manejo de foco.
 */
export function CourseFilters({ filters, options, onChange }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <label
          htmlFor="course-search"
          className="text-xs font-medium text-zinc-500 dark:text-zinc-400"
        >
          Buscar
        </label>

        <div className="relative mt-2 max-w-md">
          <MagnifyingGlassIcon
            weight="bold"
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400"
          />

          <input
            id="course-search"
            type="search"
            value={filters.query}
            onChange={(event) =>
              onChange({ ...filters, query: event.target.value })
            }
            placeholder="IIC1103, cálculo, bases de datos"
            className="h-11 w-full rounded-lg border border-zinc-200 bg-white pr-10 pl-10 text-sm text-zinc-900 transition-colors duration-150 placeholder:text-zinc-400 focus-visible:border-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus-visible:border-zinc-600 dark:focus-visible:ring-zinc-500"
          />

          {filters.query !== "" && (
            <button
              type="button"
              aria-label="Limpiar búsqueda"
              onClick={() => onChange({ ...filters, query: "" })}
              className="absolute top-1/2 right-2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-zinc-500 transition-colors duration-150 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500"
            >
              <XIcon weight="bold" className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-5">
        <FacetGroup label="Tipo">
          {options.types.map((type) => (
            <Chip
              key={type}
              label={formatType(type)}
              pressed={filters.types.includes(type)}
              onToggle={() =>
                onChange({ ...filters, types: toggle(filters.types, type) })
              }
            />
          ))}
        </FacetGroup>

        <FacetGroup label="Paridad">
          {options.parities.map((parity) => (
            <Chip
              key={parity}
              label={formatParity(parity)}
              pressed={filters.parity === parity}
              // Click sobre el chip activo lo desactiva: no hace falta un
              // chip extra de "Todos".
              onToggle={() =>
                onChange({
                  ...filters,
                  parity: filters.parity === parity ? null : parity,
                })
              }
            />
          ))}
        </FacetGroup>

        <FacetGroup label="Nivel">
          {options.levels.map((level) => (
            <Chip
              key={level}
              label={formatLevel(level)}
              pressed={filters.levels.includes(level)}
              onToggle={() =>
                onChange({ ...filters, levels: toggle(filters.levels, level) })
              }
            />
          ))}
        </FacetGroup>
      </div>
    </div>
  );
}
