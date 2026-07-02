import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Search, FileText, Eye, RefreshCw } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ContratoBadge } from "@/components/StatusBadge";
import { PageHeader, FilterBar, TableCard } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  contratos as seed,
  CONTRATO_STATUS,
  diasParaVencer,
  formatarData,
  type Contrato,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/contratos")({
  head: () => ({ meta: [{ title: "Contratos — Credenciamento HUM" }] }),
  component: Contratos,
});

function Contratos() {
  const [lista, setLista] = useState<Contrato[]>(seed);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("");

  const [verOpen, setVerOpen] = useState(false);
  const [renovarOpen, setRenovarOpen] = useState(false);
  const [selecionado, setSelecionado] = useState<Contrato | null>(null);

  const filtrados = useMemo(() => {
    return lista.filter((c) => {
      const termo = busca.trim().toLowerCase();
      const matchBusca =
        !termo ||
        c.credenciado.toLowerCase().includes(termo) ||
        c.numero.toLowerCase().includes(termo);
      const matchFiltro = !filtro || c.status === filtro;
      return matchBusca && matchFiltro;
    });
  }, [lista, busca, filtro]);

  function renovar(form: FormData) {
    if (!selecionado) return;
    const novoTermino = String(form.get("termino") || "");
    setLista((l) =>
      l.map((c) =>
        c.id === selecionado.id ? { ...c, termino: novoTermino, status: "Ativo" } : c,
      ),
    );
    setRenovarOpen(false);
    setSelecionado(null);
    toast.success("Contrato renovado.");
  }

  return (
    <AppShell title="Contratos">
      <PageHeader
        title="Gestão de Contratos"
        description="Acompanhe a vigência, renove e gere novos contratos de credenciamento."
        actions={
          <Button asChild>
            <Link to="/app/contratos/gerar">
              <Plus className="h-4 w-4" /> Gerar contrato
            </Link>
          </Button>
        }
      />

      <FilterBar>
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nº ou credenciado"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="h-9 rounded-md border border-input bg-card px-3 text-sm"
        >
          <option value="">Todos os status</option>
          {CONTRATO_STATUS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </FilterBar>

      <TableCard>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contrato</TableHead>
              <TableHead className="hidden md:table-cell">Modelo</TableHead>
              <TableHead className="hidden lg:table-cell">Vigência</TableHead>
              <TableHead>Prazo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtrados.map((c) => {
              const dias = diasParaVencer(c.termino);
              return (
                <TableRow key={c.id}>
                  <TableCell>
                    <div className="font-medium">{c.numero}</div>
                    <div className="text-xs text-muted-foreground">{c.credenciado}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {c.modelo}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    {formatarData(c.inicio)} — {formatarData(c.termino)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "font-medium",
                        dias < 0
                          ? "text-destructive"
                          : dias <= 30
                            ? "text-warning-foreground"
                            : "text-muted-foreground",
                      )}
                    >
                      {dias < 0 ? "Vencido" : `${dias} dias`}
                    </span>
                  </TableCell>
                  <TableCell>
                    <ContratoBadge status={c.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary"
                        aria-label="Ver"
                        onClick={() => {
                          setSelecionado(c);
                          setVerOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary"
                        aria-label="Renovar"
                        onClick={() => {
                          setSelecionado(c);
                          setRenovarOpen(true);
                        }}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {filtrados.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                  <FileText className="mx-auto mb-2 h-8 w-8 opacity-40" />
                  Nenhum contrato encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableCard>

      {/* Ver contrato */}
      <Dialog open={verOpen} onOpenChange={setVerOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do contrato</DialogTitle>
          </DialogHeader>
          {selecionado && (
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Número</dt>
                <dd className="font-medium">{selecionado.numero}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Status</dt>
                <dd className="mt-1">
                  <ContratoBadge status={selecionado.status} />
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-muted-foreground">Credenciado</dt>
                <dd className="font-medium">{selecionado.credenciado}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">CPF/CNPJ</dt>
                <dd>{selecionado.cpfCnpj}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Modelo</dt>
                <dd>{selecionado.modelo}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Setor</dt>
                <dd>{selecionado.setor}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Vigência</dt>
                <dd>
                  {formatarData(selecionado.inicio)} — {formatarData(selecionado.termino)}
                </dd>
              </div>
            </dl>
          )}
          <DialogFooter>
            <Button onClick={() => setVerOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Renovar */}
      <Dialog open={renovarOpen} onOpenChange={setRenovarOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Renovar contrato</DialogTitle>
            <DialogDescription>{selecionado?.numero}</DialogDescription>
          </DialogHeader>
          <form
            id="form-renovar"
            onSubmit={(e) => {
              e.preventDefault();
              renovar(new FormData(e.currentTarget));
            }}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="termino">Nova data de término</Label>
              <Input id="termino" name="termino" type="date" defaultValue={selecionado?.termino} />
            </div>
          </form>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenovarOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" form="form-renovar">
              Confirmar renovação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
