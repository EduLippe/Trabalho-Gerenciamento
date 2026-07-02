import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, ListChecks } from "lucide-react";
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
import { situacoes as seed, type SituacaoCadastro } from "@/lib/mock-data";

export const Route = createFileRoute("/app/situacoes")({
  head: () => ({ meta: [{ title: "Situações — Credenciamento HUM" }] }),
  component: Situacoes,
});

const categorias: SituacaoCadastro["categoria"][] = ["Credenciamento", "Contrato", "Trâmite"];

function Situacoes() {
  const [lista, setLista] = useState<SituacaoCadastro[]>(seed);
  const [busca, setBusca] = useState("");
  const [open, setOpen] = useState(false);

  const filtradas = useMemo(() => {
    const t = busca.trim().toLowerCase();
    return lista.filter((s) => !t || s.nome.toLowerCase().includes(t) || s.codigo.toLowerCase().includes(t));
  }, [lista, busca]);

  function criar(form: FormData) {
    const nome = String(form.get("nome") || "").trim();
    const categoria = String(form.get("categoria") || categorias[0]) as SituacaoCadastro["categoria"];
    if (!nome) {
      toast.error("Informe o nome da situação.");
      return;
    }
    setLista((l) => [
      { id: `st-${Date.now()}`, codigo: `S-${String(l.length + 1).padStart(2, "0")}`, nome, categoria, ativo: true },
      ...l,
    ]);
    setOpen(false);
    toast.success("Situação cadastrada.");
  }

  return (
    <AppShell title="Situações">
      <PageHeader
        title="Situações"
        description="Parametrize as situações utilizadas nos fluxos do sistema."
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" /> Nova situação
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
              <TableHead>Situação</TableHead>
              <TableHead className="hidden md:table-cell">Categoria</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtradas.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.codigo}</TableCell>
                <TableCell>{s.nome}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{s.categoria}</TableCell>
                <TableCell>
                  <StatusBadge label={s.ativo ? "Ativo" : "Inativo"} tone={s.ativo ? "success" : "neutral"} />
                </TableCell>
              </TableRow>
            ))}
            {filtradas.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-12 text-center text-muted-foreground">
                  <ListChecks className="mx-auto mb-2 h-8 w-8 opacity-40" />
                  Nenhuma situação encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableCard>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova situação</DialogTitle>
          </DialogHeader>
          <form
            id="form-situacao"
            onSubmit={(e) => {
              e.preventDefault();
              criar(new FormData(e.currentTarget));
            }}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" name="nome" placeholder="Ex.: Aguardando análise" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="categoria">Categoria</Label>
              <select
                id="categoria"
                name="categoria"
                className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm"
              >
                {categorias.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" form="form-situacao">
              Cadastrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
