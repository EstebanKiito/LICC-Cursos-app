import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { CourseBrowser } from "@/components/cursos/CourseBrowser";
import { getCourses } from "@/lib/courses";

export default async function CursosPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  // `proxy.ts` solo hace el check optimista de la cookie; `auth()` de arriba es
  // la verificacion autoritativa, asi que recien aca se consulta la base.
  const courses = await getCourses();

  return (
    <section className="mx-auto max-w-7xl px-6 pt-16 pb-24">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl dark:text-zinc-50">
        Bienvenido a tus cursos, {session.user.name}
      </h1>

      <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        Explora el catálogo de ramos y entra a cualquiera para revisar sus
        materiales.
      </p>

      <CourseBrowser courses={courses} />
    </section>
  );
}
