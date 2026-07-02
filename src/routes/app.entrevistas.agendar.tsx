import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CalendarPlus, ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { editais, MODELOS_CONTRATO } from "@/lib/mock-data";

export const Route = createFileRoute("/app/entrevistas/agendar")({
  head: () => ({ meta: [{ title: "Agendar Entrevista — Credenciamento HUM" }] }),
  component: AgendarEntrevista,
});

function AgendarEntrevista() {
  const navigate = useNavigate();

  function agendar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (!form.get("candidato") || !form.get("data") || !form.get("horario")) {
      toast.error("Preencha candidato, data e horário.");
      return;
    }
    toast.success("Entrevista agendada com sucesso.");
    navigate({ to: "/app/entrevistas" });
  }

  return (
    <AppShell title="Agendar Entrevista">
      <PageHeader
        title="Agendar Entrevista"
        description="Defina o candidato, data, horário e o responsável pela entrevista."
        actions={
          <Button variant="outline" onClick={() => navigate({ to: "/app/entrevistas" })}>
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Button>
        }
      />

      <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <form onSubmit={agendar} className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="candidato">Candidato</Label>
            <Input id="candidato" name="candidato" placeholder="Nome completo do candidato" />
          </div>
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
            <Label htmlFor="funcao">Função / Área</Label>
            <select
              id="funcao"
              name="funcao"
              className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm"
            >
              {MODELOS_CONTRATO.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="data">Data</Label>
            <Input id="data" name="data" type="date" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="horario">Horário</Label>
            <Input id="horario" name="horario" type="time" />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="responsavel">Responsável</Label>
            <Input id="responsavel" name="responsavel" placeholder="Coordenador responsável" />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="tipo">Modalidade</Label>
            <select
              id="tipo"
              name="tipo"
              className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm"
            >
              <option>Presencial</option>
              <option>Online (videochamada)</option>
            </select>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="obs">Observações</Label>
            <Textarea id="obs" name="obs" rows={3} placeholder="Instruções, local, documentos..." />
          </div>
          <div className="flex justify-end gap-2 sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => navigate({ to: "/app/entrevistas" })}>
              Cancelar
            </Button>
            <Button type="submit">
              <CalendarPlus className="h-4 w-4" /> Confirmar agendamento
            </Button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
