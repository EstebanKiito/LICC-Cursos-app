import type { Icon } from "@phosphor-icons/react";

type Props = {
  icon: Icon;
  title: string;
  description: string;
  /** Accion opcional: normalmente un boton o un enlace de vuelta. */
  children?: React.ReactNode;
};

/**
 * Estado vacio componible. Sin `"use client"`: tambien lo usan `loading.tsx` y
 * `not-found.tsx`, que son Server Components.
 */
export function EmptyState({ icon: Icon, title, description, children }: Props) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-zinc-200 bg-white px-6 py-16 text-center dark:border-zinc-800 dark:bg-zinc-900">
      <Icon
        weight="bold"
        aria-hidden
        className="h-6 w-6 text-zinc-400 dark:text-zinc-500"
      />

      <p className="mt-4 text-base font-medium text-zinc-900 dark:text-zinc-50">
        {title}
      </p>
      <p className="mt-2 max-w-[45ch] text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </p>

      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
