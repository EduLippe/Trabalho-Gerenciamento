import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { UserPlus, ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { editais, MODELOS_CONTRATO } from "@/lib/mock-data";

export const Route = createFileRoute("/app/credenciados/cadastrar")({
  head: () => ({ meta: [{ title: "Cadastrar Solicitação — Credenciamento HUM" }] }),
  component: CadastrarSolicitacao,
});

function CadastrarSolicitacao() {
  const navigate = useNavigate();

  function salvar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (!form.get("nome") || !form.get("cpf")) {
      toast.error("Preencha nome e CPF/CNPJ.");
      return;
    }
    toast.success("Solicitação de credenciamento registrada.");
    navigate({ to: "/app/credenciados" });
  }

  return (
    <AppShell title="Cadastrar Solicitação">
      <PageHeader
        title="Cadastrar Solicitação"
        description="Registre uma nova solicitação de credenciamento."
        actions={
          <Button variant="outline" onClick={() => navigate({ to: "/app/credenciados" })}>
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Button>
        }
      />

      <form onSubmit={salvar} className="mx-auto max-w-3xl space-y-6">
        <section className="rounded-2xl border bg-card p-6 shadow-sm">
          <h3 className="mb-4 font-display font-semibold text-brand-dark">Dados pessoais</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="nome">Nome completo</Label>
              <Input id="nome" name="nome" placeholder="Nome do profissional" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cpf">CPF / CNPJ</Label>
              <Input id="cpf" name="cpf" placeholder="000.000.000-00" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="registro">Registro profissional</Label>
              <Input id="registro" name="registro" placeholder="CRM / CRBM / etc." />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" name="email" type="email" placeholder="email@exemplo.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" name="telefone" placeholder="(44) 90000-0000" />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border bg-card p-6 shadow-sm">
          <h3 className="mb-4 font-display font-semibold text-brand-dark">Dados do credenciamento</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="edital">Edital</Label>
              <select
                id="edital"
                name="edital"
                className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm"
              >
                {editais.map((ed) => (
                  <option key={ed.id} value={ed.numero}>
                    {ed.numero} — {ed.funcao}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="area">Área</Label>
              <select
                id="area"
                name="area"
                className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm"
              >
                {MODELOS_CONTRATO.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate({ to: "/app/credenciados" })}>
            Cancelar
          </Button>
          <Button type="submit">
            <UserPlus className="h-4 w-4" /> Registrar solicitação
          </Button>
        </div>
      </form>
    </AppShell>
  );
}
