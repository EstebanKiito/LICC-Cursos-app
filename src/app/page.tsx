import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { SignInButton } from "@/components/SignInButton";

export default async function HomePage() {
  const session = await auth();

  return (
    <section className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-7xl items-center px-6 pt-16 pb-24 md:pt-24">
      <div className="grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h1 className="text-4xl leading-[1.05] font-semibold tracking-tighter text-balance text-zinc-900 md:text-5xl lg:text-6xl dark:text-zinc-50">
            Todo tu semestre, ordenado en un solo lugar.
          </h1>

          <p className="mt-6 max-w-[55ch] text-base leading-relaxed text-zinc-600 md:text-lg dark:text-zinc-400">
            Reúne los materiales, apuntes y tareas de tus cursos de la UC. Sin
            carpetas dispersas ni archivos perdidos.
          </p>

          <div className="mt-10">
            {session?.user ? (
              <Link
                href="/cursos"
                className="inline-flex h-11 items-center rounded-lg bg-zinc-900 px-5 text-[15px] font-medium text-zinc-50 transition-colors duration-150 hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 focus-visible:outline-none active:scale-[0.98] dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-950"
              >
                Mis cursos
              </Link>
            ) : (
              <SignInButton size="lg" />
            )}
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            {/* TODO: reemplazar por fotografia propia del campus o de estudiantes
                y quitar picsum.photos de images.remotePatterns en next.config.ts. */}
            <Image
              src="https://picsum.photos/seed/preparate-uc-estudio/1200/900"
              alt="Estudiantes trabajando con sus materiales de curso"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover grayscale-[0.35] dark:opacity-90 dark:grayscale-[0.5]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
