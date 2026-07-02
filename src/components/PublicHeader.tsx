import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">Editais</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/login">Entrar</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/inscreva-se">Inscreva-se</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
