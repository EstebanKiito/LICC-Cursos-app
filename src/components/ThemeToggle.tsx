"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@phosphor-icons/react/ssr";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Ambos iconos se renderizan y la variante `dark:` decide cual se ve. Como
  // next-themes pone la clase en <html> antes de hidratar, el icono correcto
  // aparece en el primer paint: sin guard de montaje ni salto de layout.
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Cambiar tema"
      title="Cambiar tema"
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-colors duration-150 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none active:scale-[0.98] dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500"
    >
      <SunIcon weight="bold" className="h-4 w-4 dark:hidden" />
      <MoonIcon weight="bold" className="hidden h-4 w-4 dark:block" />
    </button>
  );
}
