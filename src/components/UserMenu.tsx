"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CaretDownIcon, SignOutIcon } from "@phosphor-icons/react/ssr";
import { signOutAction } from "@/app/actions/auth";

type Props = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export function UserMenu({ name, email, image }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const displayName = name ?? "Mi cuenta";
  const initial = displayName.trim().charAt(0).toUpperCase() || "U";

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Abrir menú de cuenta"
        className="flex items-center gap-1.5 rounded-full p-0.5 transition-colors duration-150 hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none dark:hover:bg-zinc-800 dark:focus-visible:ring-zinc-500"
      >
        {image ? (
          <Image
            src={image}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {initial}
          </span>
        )}
        <CaretDownIcon
          weight="bold"
          className={`h-3 w-3 text-zinc-500 transition-transform duration-150 dark:text-zinc-400 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/30">
          <div className="px-4 py-3">
            <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-50">
              {displayName}
            </p>
            {email && (
              <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                {email}
              </p>
            )}
          </div>

          <form action={signOutAction} className="border-t border-zinc-200 dark:border-zinc-800">
            <button
              type="submit"
              className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-zinc-600 transition-colors duration-150 hover:bg-zinc-50 hover:text-zinc-900 focus-visible:bg-zinc-50 focus-visible:outline-none dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:bg-zinc-800"
            >
              <SignOutIcon weight="bold" className="h-4 w-4" />
              Cerrar sesión
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
