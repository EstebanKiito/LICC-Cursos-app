import Link from "next/link";
import { auth } from "@/auth";
import { SignInButton } from "@/components/SignInButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserMenu } from "@/components/UserMenu";

export async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="glass-surface sticky top-0 z-50 border-b border-zinc-200 bg-white/70 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/70 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="rounded-lg text-[15px] font-semibold tracking-tight text-zinc-900 transition-colors duration-150 hover:text-zinc-600 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none dark:text-zinc-50 dark:hover:text-zinc-300 dark:focus-visible:ring-zinc-500"
        >
          PrepárateUC
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/cursos"
                className="hidden rounded-lg px-1 text-sm text-zinc-600 transition-colors duration-150 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none sm:block dark:text-zinc-400 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500"
              >
                Mis cursos
              </Link>
              <ThemeToggle />
              <UserMenu
                name={user.name}
                email={user.email}
                image={user.image}
              />
            </>
          ) : (
            <>
              <ThemeToggle />
              <SignInButton />
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
