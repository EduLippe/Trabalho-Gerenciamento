import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, Briefcase } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { PageHeader, FilterBar, TableCard } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { funcoes as seed, MODELOS_CONTRATO, type Funcao } from "@/lib/mock-data";

export const Route = createFileRoute("/app/funcoes")({
  head: () => ({ meta: [{ title: "Cadastro de Funções — Credenciamento HUM" }] }),
  component: Funcoes,
});

function Funcoes() {
  const [lista, setLista] = useState<Funcao[]>(seed);
  const [busca, setBusca] = useState("");
  const [open, setOpen] = useState(false);

  const filtradas = useMemo(() => {
    const t = busca.trim().toLowerCase();
    return lista.filter((f) => !t || f.nome.toLowerCase().includes(t) || f.codigo.toLowerCase().includes(t));
  }, [lista, busca]);

  function criar(form: FormData) {
    const nome = String(form.get("nome") || "").trim();
    const area = String(form.get("area") || MODELOS_CONTRATO[0]) as Funcao["area"];
    if (!nome) {
      toast.error("Informe o nome da função.");
      return;
    }
    setLista((l) => [
      { id: `fn-${Date.now()}`, codigo: `F-${String(l.length + 1).padStart(3, "0")}`, nome, area, situacao: "Ativo" },
      ...l,
    ]);
    setOpen(false);
    toast.success("Função cadastrada.");
  }

  return (
    <AppShell title="Cadastro de Funções">
      <PageHeader
        title="Cadastro de Funções"
        description="Gerencie as funções/áreas disponíveis para credenciamento."
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" /> Nova função
          </Button>
        }
      />

      <FilterBar>
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou código"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-9"
          />
        </div>
      </FilterBar>

      <TableCard>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Função</TableHead>
              <TableHead className="hidden md:table-cell">Área</TableHead>
              <TableHead>Situação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtradas.map((f) => (
              <TableRow key={f.id}>
                <TableCell className="font-medium">{f.codigo}</TableCell>
                <TableCell>{f.nome}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{f.area}</TableCell>
                <TableCell>
                  <StatusBadge label={f.situacao} tone={f.situacao === "Ativo" ? "success" : "neutral"} />
                </TableCell>
              </TableRow>
            ))}
            {filtradas.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-12 text-center text-muted-foreground">
                  <Briefcase className="mx-auto mb-2 h-8 w-8 opacity-40" />
                  Nenhuma função encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableCard>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova função</DialogTitle>
          </DialogHeader>
          <form
            id="form-funcao"
            onSubmit={(e) => {
              e.preventDefault();
              criar(new FormData(e.currentTarget));
            }}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="nome">Nome da função</Label>
              <Input id="nome" name="nome" placeholder="Ex.: Médico Plantonista" />
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
          </form>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" form="form-funcao">
              Cadastrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
