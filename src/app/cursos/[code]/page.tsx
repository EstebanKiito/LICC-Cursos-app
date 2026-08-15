import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";
import { auth } from "@/auth";
import { MaterialList } from "@/components/cursos/MaterialList";
import { UploadMaterialForm } from "@/components/cursos/UploadMaterialForm";
import {
  formatCredits,
  formatLevel,
  formatParity,
  formatType,
  getCourseLevel,
} from "@/lib/course-format";
import { getCourseByCode } from "@/lib/courses";
import { getMaterialsByCourse } from "@/lib/materials";

// `PageProps` es el helper global que genera `next typegen` (lo corren tanto
// `next dev` como `next build`). En Next 16 `params` es un Promise: el acceso
// sincrono fue eliminado, no solo deprecado.
type Props = PageProps<"/cursos/[code]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  // `getCourseByCode` esta envuelto en `cache()`: esta llamada y la de la
  // pagina se dedupean en una sola query por request.
  const course = await getCourseByCode(code);

  if (!course) {
    return { title: "Curso no encontrado" };
  }

  return {
    title: `${course.code} · ${course.name}`,
    description:
      course.description ?? `Materiales y apuntes de ${course.name}.`,
  };
}

/** Fila de la barra lateral. Los vacios muestran texto, nunca un hueco. */
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-zinc-900 dark:text-zinc-50">{value}</dd>
    </div>
  );
}

export default async function CoursePage({ params }: Props) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const { code } = await params;
  // Normaliza a mayusculas adentro, asi /cursos/iic1103 tambien resuelve.
  const course = await getCourseByCode(code);
  if (!course) {
    notFound();
  }

  const level = getCourseLevel(course.code);
  const materials = await getMaterialsByCourse(course.id);

  return (
    <section className="mx-auto max-w-7xl px-6 pt-16 pb-24">
      <Link
        href="/cursos"
        className="inline-flex items-center gap-1.5 rounded-lg text-sm text-zinc-600 transition-colors duration-150 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none dark:text-zinc-400 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500"
      >
        <ArrowLeftIcon weight="bold" aria-hidden className="h-4 w-4" />
        Cursos
      </Link>

      <header className="mt-8">
        <p className="font-mono text-sm text-zinc-500 dark:text-zinc-400">
          {course.code}
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance text-zinc-900 md:text-4xl lg:text-5xl dark:text-zinc-50">
          {course.name}
        </h1>

        {course.description && (
          <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-zinc-600 md:text-lg dark:text-zinc-400">
            {course.description}
          </p>
        )}
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
        {/* En <1024px la barra lateral se apila antes del placeholder. */}
        <aside className="lg:order-2 lg:col-span-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              Detalles del ramo
            </h2>

            <dl className="mt-5 flex flex-col gap-5">
              <DetailRow
                label="Prerrequisitos"
                value={course.prerequisites ?? "Sin prerrequisitos"}
              />
              <DetailRow
                label="Créditos"
                value={formatCredits(course.credits)}
              />
              <DetailRow
                label="Dictación"
                value={formatParity(course.parity)}
              />
              <DetailRow label="Tipo" value={formatType(course.type)} />
              <DetailRow
                label="Nivel"
                value={level === null ? "Sin información" : formatLevel(level)}
              />
            </dl>
          </div>
        </aside>

        <div className="lg:order-1 lg:col-span-8">
          {/* El `userId` no se pasa como prop: la accion lo toma de la sesion
              en el servidor, donde el cliente no puede suplantarlo. */}
          <UploadMaterialForm courseId={course.id} courseCode={course.code} />

          <MaterialList materials={materials} courseCode={course.code} />
        </div>
      </div>
    </section>
  );
}
