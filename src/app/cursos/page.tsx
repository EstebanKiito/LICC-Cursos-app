import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function CursosPage() {
  // Gate autoritativo: el proxy solo hace un check optimista de la cookie,
  // aqui se verifica la firma real del JWT.
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <section className="mx-auto max-w-7xl px-6 pt-16 pb-24">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl dark:text-zinc-50">
        Bienvenido a tus cursos, {session.user.name}
      </h1>
    </section>
  );
}
