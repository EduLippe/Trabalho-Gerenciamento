import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import building from "@/assets/hospital-building.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — Credenciamento HUM" },
      { name: "description", content: "Acesso ao painel administrativo do Credenciamento HUM." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("coordenador@hum.br");
  const [senha, setSenha] = useState("");

  function entrar(e: React.FormEvent) {
    e.preventDefault();
    navigate({ to: "/app" });
  }

  return (
    <div className="relative min-h-screen">
      <img
        src={building}
        alt="Hospital Universitário de Maringá"
        width={1536}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 brand-gradient opacity-90" />

      <div className="relative flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border border-white/15 bg-card/95 p-7 shadow-xl backdrop-blur">
          <div className="mb-6 flex flex-col items-center gap-3 text-center">
            <Logo />
            <div>
              <h1 className="font-display text-xl font-semibold">Acesso ao sistema</h1>
              <p className="text-sm text-muted-foreground">
                Entre com suas credenciais administrativas.
              </p>
            </div>
          </div>

          <form onSubmit={entrar} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" size="lg">
              Entrar
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            É um profissional?{" "}
            <Link to="/inscreva-se" className="font-medium text-primary hover:underline">
              Inscreva-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
