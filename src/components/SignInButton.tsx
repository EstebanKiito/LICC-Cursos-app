import { GoogleLogoIcon } from "@phosphor-icons/react/ssr";
import { signInWithGoogle } from "@/app/actions/auth";

const sizes = {
  sm: "h-9 gap-2 px-4 text-sm",
  lg: "h-11 gap-2.5 px-5 text-[15px]",
} as const;

type Props = {
  size?: keyof typeof sizes;
};

/**
 * Unica entrada al login en toda la app. Se comparte entre la navbar y el hero
 * para que la etiqueta del CTA sea identica en ambos lugares.
 */
export function SignInButton({ size = "sm" }: Props) {
  return (
    <form action={signInWithGoogle}>
      <button
        type="submit"
        className={`inline-flex items-center rounded-lg bg-zinc-900 font-medium whitespace-nowrap text-zinc-50 transition-colors duration-150 hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 focus-visible:outline-none active:scale-[0.98] dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-950 ${sizes[size]}`}
      >
        <GoogleLogoIcon weight="bold" className="h-4 w-4 shrink-0" />
        Ingresar con Google
      </button>
    </form>
  );
}
