import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FileSignature, ArrowLeft, Printer } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/admin/AdminUI";
import { LogoMark } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MODELOS_CONTRATO, credenciados, formatarData } from "@/lib/mock-data";

export const Route = createFileRoute("/app/contratos/gerar")({
  head: () => ({ meta: [{ title: "Gerar Contrato — Credenciamento HUM" }] }),
  component: GerarContrato,
});

const hoje = new Date().toISOString().slice(0, 10);
const umAno = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  .toISOString()
  .slice(0, 10);

function GerarContrato() {
  const navigate = useNavigate();
  const [credenciado, setCredenciado] = useState(credenciados[0]?.nome ?? "");
  const [cpfCnpj, setCpfCnpj] = useState(credenciados[0]?.cpfCnpj ?? "");
  const [modelo, setModelo] = useState<string>(MODELOS_CONTRATO[0]);
  const [setor, setSetor] = useState("Diagnóstico por Imagem");
  const [inicio, setInicio] = useState(hoje);
  const [termino, setTermino] = useState(umAno);
  const [numero] = useState(`CT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);

  function gerar(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Contrato gerado e enviado para assinatura.");
    navigate({ to: "/app/contratos" });
  }

  return (
    <AppShell title="Gerar Contrato">
      <PageHeader
        title="Gerar Contrato"
        description="Preencha os dados e visualize a minuta do contrato em tempo real."
        actions={
          <Button variant="outline" onClick={() => navigate({ to: "/app/contratos" })}>
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Formulário */}
        <form onSubmit={gerar} className="space-y-5 rounded-2xl border bg-card p-6 shadow-sm">
          <div className="space-y-1.5">
            <Label htmlFor="credenciado">Credenciado</Label>
            <select
              id="credenciado"
              className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm"
              value={credenciado}
              onChange={(e) => {
                const c = credenciados.find((x) => x.nome === e.target.value);
                setCredenciado(e.target.value);
                if (c) setCpfCnpj(c.cpfCnpj);
              }}
            >
              {credenciados.map((c) => (
                <option key={c.id} value={c.nome}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="cpf">CPF / CNPJ</Label>
              <Input id="cpf" value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="modelo">Modelo de contrato</Label>
              <select
                id="modelo"
                className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
              >
                {MODELOS_CONTRATO.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="setor">Setor / Lotação</Label>
            <Input id="setor" value={setor} onChange={(e) => setSetor(e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="inicio">Início da vigência</Label>
              <Input id="inicio" type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="termino">Término da vigência</Label>
              <Input id="termino" type="date" value={termino} onChange={(e) => setTermino(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => navigate({ to: "/app/contratos" })}>
              Cancelar
            </Button>
            <Button type="submit">
              <FileSignature className="h-4 w-4" /> Gerar contrato
            </Button>
          </div>
        </form>

        {/* Pré-visualização do documento */}
        <div className="rounded-2xl border bg-muted/40 p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between px-1">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Pré-visualização
            </span>
            <Button variant="ghost" size="sm" className="text-muted-foreground" type="button">
              <Printer className="h-4 w-4" /> Imprimir
            </Button>
          </div>
          <div className="mx-auto max-w-md space-y-4 rounded-lg bg-white p-8 text-[13px] leading-relaxed text-neutral-800 shadow-lg ring-1 ring-black/5">
            <div className="flex items-center gap-3 border-b border-neutral-200 pb-4">
              <LogoMark className="h-9 w-9" />
              <div>
                <p className="font-display text-sm font-bold text-brand-dark">
                  Hospital Universitário de Maringá
                </p>
                <p className="text-[11px] text-neutral-500">Sistema de Credenciamento</p>
              </div>
            </div>

            <h3 className="text-center font-display text-sm font-bold uppercase tracking-wide">
              Contrato de Credenciamento
            </h3>
            <p className="text-center text-[11px] text-neutral-500">Nº {numero}</p>

            <p>
              Pelo presente instrumento, o <strong>Hospital Universitário de Maringá (HUM)</strong> e
              o(a) credenciado(a) <strong>{credenciado || "—"}</strong>, inscrito(a) sob o CPF/CNPJ{" "}
              <strong>{cpfCnpj || "—"}</strong>, firmam o presente contrato na modalidade{" "}
              <strong>{modelo}</strong>.
            </p>

            <div className="space-y-1">
              <p>
                <strong>Cláusula 1ª — Objeto.</strong> Prestação de serviços na área de{" "}
                {modelo.toLowerCase()}, junto ao setor de <strong>{setor || "—"}</strong>.
              </p>
              <p>
                <strong>Cláusula 2ª — Vigência.</strong> De{" "}
                <strong>{inicio ? formatarData(inicio) : "—"}</strong> a{" "}
                <strong>{termino ? formatarData(termino) : "—"}</strong>.
              </p>
              <p>
                <strong>Cláusula 3ª — Obrigações.</strong> O credenciado compromete-se a cumprir as
                normas internas e a legislação vigente aplicável.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8 text-center text-[11px]">
              <div>
                <div className="mb-1 border-t border-neutral-400" />
                Contratante (HUM)
              </div>
              <div>
                <div className="mb-1 border-t border-neutral-400" />
                Credenciado(a)
              </div>
            </div>
            <p className="pt-2 text-center text-[10px] text-neutral-400">
              Maringá, {formatarData(hoje)}
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
