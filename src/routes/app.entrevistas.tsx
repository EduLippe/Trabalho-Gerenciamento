import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Search, CalendarClock, ClipboardCheck, Eye } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { EntrevistaBadge } from "@/components/StatusBadge";
import { PageHeader, FilterBar, TableCard } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  entrevistas as seed,
  formatarData,
  type Entrevista,
  type EntrevistaResultado,
} from "@/lib/mock-data";

export const Route = createFileRoute("/app/entrevistas")({
  validateSearch: (s: Record<string, unknown>): { resultado?: string } => ({
    resultado: typeof s.resultado === "string" ? s.resultado : undefined,
  }),
  head: () => ({ meta: [{ title: "Entrevistas — Credenciamento HUM" }] }),
  component: Entrevistas,
});

function Entrevistas() {
  const { resultado: resultadoInicial } = Route.useSearch();
  const [lista, setLista] = useState<Entrevista[]>(seed);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState(resultadoInicial ?? "");

  const [resultadoOpen, setResultadoOpen] = useState(false);
  const [verOpen, setVerOpen] = useState(false);
  const [selecionada, setSelecionada] = useState<Entrevista | null>(null);

  const filtradas = useMemo(() => {
    return lista.filter((e) => {
      const termo = busca.trim().toLowerCase();
      const matchBusca =
        !termo ||
        e.candidato.toLowerCase().includes(termo) ||
        e.funcao.toLowerCase().includes(termo);
      const matchFiltro = !filtro || e.resultado === filtro;
      return matchBusca && matchFiltro;
    });
  }, [lista, busca, filtro]);

  function registrarResultado(form: FormData) {
    if (!selecionada) return;
    const resultado = String(form.get("resultado") || "") as EntrevistaResultado;
    const observacoes = String(form.get("observacoes") || "").trim();
    setLista((l) =>
      l.map((e) => (e.id === selecionada.id ? { ...e, resultado, observacoes } : e)),
    );
    setResultadoOpen(false);
    setSelecionada(null);
    toast.success("Resultado registrado.");
  }

  return (
    <AppShell title="Entrevistas">
      <PageHeader
        title="Controle de Entrevistas"
        description="Agende, acompanhe e registre o resultado das entrevistas."
        actions={
          <Button asChild>
            <Link to="/app/entrevistas/agendar">
              <Plus className="h-4 w-4" /> Agendar entrevista
            </Link>
          </Button>
        }
      />

      <FilterBar>
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar candidato ou função"
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
          <option value="">Todos os resultados</option>
          <option value="Agendada">Agendada</option>
          <option value="Aprovado">Aprovado</option>
          <option value="Recusado">Recusado</option>
        </select>
      </FilterBar>

      <TableCard>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidato</TableHead>
              <TableHead className="hidden md:table-cell">Função</TableHead>
              <TableHead>Data / Horário</TableHead>
              <TableHead className="hidden lg:table-cell">Responsável</TableHead>
              <TableHead>Resultado</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtradas.map((e) => (
              <TableRow key={e.id}>
                <TableCell>
                  <div className="font-medium">{e.candidato}</div>
                  <div className="text-xs text-muted-foreground">Edital {e.edital}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {e.funcao}
                </TableCell>
                <TableCell>
                  {formatarData(e.data)} <span className="text-muted-foreground">{e.horario}</span>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground">
                  {e.responsavel}
                </TableCell>
                <TableCell>
                  <EntrevistaBadge resultado={e.resultado} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-primary"
                      aria-label="Ver"
                      onClick={() => {
                        setSelecionada(e);
                        setVerOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {e.resultado === "Agendada" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary"
                        aria-label="Registrar resultado"
                        onClick={() => {
                          setSelecionada(e);
                          setResultadoOpen(true);
                        }}
                      >
                        <ClipboardCheck className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtradas.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                  <CalendarClock className="mx-auto mb-2 h-8 w-8 opacity-40" />
                  Nenhuma entrevista encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableCard>

      {/* Registrar resultado */}
      <Dialog open={resultadoOpen} onOpenChange={setResultadoOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar resultado</DialogTitle>
            <DialogDescription>{selecionada?.candidato}</DialogDescription>
          </DialogHeader>
          <form
            id="form-resultado"
            onSubmit={(e) => {
              e.preventDefault();
              registrarResultado(new FormData(e.currentTarget));
            }}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="resultado">Resultado</Label>
              <select
                id="resultado"
                name="resultado"
                className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm"
                defaultValue="Aprovado"
              >
                <option value="Aprovado">Aprovado</option>
                <option value="Recusado">Recusado</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea id="observacoes" name="observacoes" rows={4} />
            </div>
          </form>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResultadoOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" form="form-resultado">
              Salvar resultado
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Visualizar */}
      <Dialog open={verOpen} onOpenChange={setVerOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes da entrevista</DialogTitle>
          </DialogHeader>
          {selecionada && (
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <div className="col-span-2">
                <dt className="text-muted-foreground">Candidato</dt>
                <dd className="font-medium">{selecionada.candidato}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Função</dt>
                <dd>{selecionada.funcao}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Edital</dt>
                <dd>{selecionada.edital}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Data / Horário</dt>
                <dd>
                  {formatarData(selecionada.data)} {selecionada.horario}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Responsável</dt>
                <dd>{selecionada.responsavel}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-muted-foreground">Resultado</dt>
                <dd className="mt-1">
                  <EntrevistaBadge resultado={selecionada.resultado} />
                </dd>
              </div>
              {selecionada.observacoes && (
                <div className="col-span-2">
                  <dt className="text-muted-foreground">Observações</dt>
                  <dd>{selecionada.observacoes}</dd>
                </div>
              )}
            </dl>
          )}
          <DialogFooter>
            <Button onClick={() => setVerOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
