import { createFileRoute, redirect } from "@tanstack/react-router";

/** Mantém compatibilidade com previews ou favoritos antigos que apontam para /index. */
export const Route = createFileRoute("/index_")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
});