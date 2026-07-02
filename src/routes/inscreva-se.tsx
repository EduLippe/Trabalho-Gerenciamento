import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PublicHeader } from "@/components/PublicHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { MODELOS_CONTRATO } from "@/lib/mock-data";

export const Route = createFileRoute("/inscreva-se")({
  head: () => ({
    meta: [
      { title: "Inscreva-se — Credenciamento HUM" },
      {
        name: "description",
        content: "Formulário de inscrição para o credenciamento de profissionais no HUM.",
      },
    ],
  }),
  component: Inscrever,
});

const etapas = [
  "Dados Pessoais",
  "Dados Profissionais e Bancários",
  "Dados de Contato",
  "Credenciais e Termo",
];

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  );
}

function Inscrever() {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState(0);
  const [aceite, setAceite] = useState(false);

  const total = etapas.length;
  const avancar = () => setEtapa((s) => Math.min(s + 1, total - 1));
  const voltar = () => setEtapa((s) => Math.max(s - 1, 0));

  function concluir(e: React.FormEvent) {
    e.preventDefault();
    if (!aceite) {
      toast.error("É necessário aceitar o termo de responsabilidade.");
      return;
    }
    toast.success("Inscrição enviada! Redirecionando para o login.");
    setTimeout(() => navigate({ to: "/login" }), 900);
  }

  return (
    <div className="min-h-screen">
      <PublicHeader />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-2xl font-semibold">Inscreva-se</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Preencha os dados em 4 etapas para se candidatar ao credenciamento.
        </p>

        {/* Stepper */}
        <ol className="mt-6 flex items-center gap-2">
          {etapas.map((nome, i) => (
            <li key={nome} className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
                    i < etapa && "border-primary bg-primary text-primary-foreground",
                    i === etapa && "border-primary text-primary",
                    i > etapa && "border-border text-muted-foreground",
                  )}
                >
                  {i < etapa ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span
                  className={cn(
                    "hidden text-xs font-medium sm:block",
                    i === etapa ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {nome}
                </span>
              </div>
              {i < total - 1 && <div className="h-px flex-1 bg-border" />}
            </li>
          ))}
        </ol>

        <form onSubmit={concluir} className="mt-6 rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="font-display text-lg font-semibold">{etapas[etapa]}</h2>

          {etapa === 0 && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Tipo de cadastro">
                <select className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm">
                  <option>Pessoa Física</option>
                  <option>Pessoa Jurídica</option>
                </select>
              </Field>
              <Field label="CPF / CNPJ">
                <Input placeholder="000.000.000-00" />
              </Field>
              <Field label="Nome / Representante" className="sm:col-span-2">
                <Input placeholder="Nome completo" />
              </Field>
              <Field label="Função pretendida">
                <select className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm">
                  {MODELOS_CONTRATO.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </Field>
              <Field label="Sexo">
                <select className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm">
                  <option>Feminino</option>
                  <option>Masculino</option>
                  <option>Prefiro não informar</option>
                </select>
              </Field>
              <Field label="RG">
                <Input />
              </Field>
              <Field label="Data de emissão do RG">
                <Input type="date" />
              </Field>
              <Field label="Data de nascimento">
                <Input type="date" />
              </Field>
              <Field label="Nº CNS (Cartão Nacional de Saúde)">
                <Input />
              </Field>
            </div>
          )}

          {etapa === 1 && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Nº no Conselho">
                <Input placeholder="Ex.: CRM 123456" />
              </Field>
              <Field label="Órgão emissor">
                <Input placeholder="Ex.: CRM-PR" />
              </Field>
              <Field label="Código CBO">
                <Input placeholder="0000-00" />
              </Field>
              <Field label="Atendimento ao SUS">
                <select className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm">
                  <option>Sim</option>
                  <option>Não</option>
                </select>
              </Field>
              <Field label="Banco">
                <Input />
              </Field>
              <Field label="Agência">
                <Input />
              </Field>
              <Field label="Conta">
                <Input />
              </Field>
              <Field label="Tipo de conta">
                <select className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm">
                  <option>Corrente</option>
                  <option>Poupança</option>
                </select>
              </Field>
            </div>
          )}

          {etapa === 2 && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="E-mail" className="sm:col-span-2">
                <Input type="email" placeholder="seu@email.com" />
              </Field>
              <Field label="Telefone / Celular">
                <Input placeholder="(00) 00000-0000" />
              </Field>
              <Field label="CEP">
                <Input placeholder="00000-000" />
              </Field>
              <Field label="Endereço" className="sm:col-span-2">
                <Input placeholder="Rua, número e complemento" />
              </Field>
              <Field label="Município">
                <Input />
              </Field>
              <Field label="UF">
                <Input maxLength={2} placeholder="PR" />
              </Field>
            </div>
          )}

          {etapa === 3 && (
            <div className="mt-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="E-mail de acesso">
                  <Input type="email" placeholder="seu@email.com" />
                </Field>
                <div />
                <Field label="Senha">
                  <Input type="password" placeholder="••••••••" />
                </Field>
                <Field label="Confirmar senha">
                  <Input type="password" placeholder="••••••••" />
                </Field>
              </div>
              <label className="flex items-start gap-3 rounded-lg border bg-secondary/40 p-4">
                <Checkbox
                  checked={aceite}
                  onCheckedChange={(v) => setAceite(v === true)}
                  className="mt-0.5"
                />
                <span className="text-sm text-muted-foreground">
                  Declaro que as informações prestadas são verdadeiras e aceito o{" "}
                  <span className="font-medium text-foreground">
                    termo de responsabilidade
                  </span>{" "}
                  do processo de credenciamento do HUM.
                </span>
              </label>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between border-t pt-5">
            <Button type="button" variant="outline" onClick={voltar} disabled={etapa === 0}>
              <ArrowLeft className="h-4 w-4" /> Voltar
            </Button>
            {etapa < total - 1 ? (
              <Button type="button" onClick={avancar}>
                Próximo <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit">
                <Check className="h-4 w-4" /> Concluir inscrição
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
