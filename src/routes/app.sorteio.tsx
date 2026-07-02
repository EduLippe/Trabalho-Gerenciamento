import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Shuffle, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { PageHeader, TableCard } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { sorteios as seed, formatarData, type Sorteio } from "@/lib/mock-data";

export const Route = createFileRoute("/app/sorteio")({
  head: () => ({ meta: [{ title: "Sorteio — Credenciamento HUM" }] }),
  component: SorteioPage,
});

function SorteioPage() {
  const [lista, setLista] = useState<Sorteio[]>(seed);
  const [sorteando, setSorteando] = useState<string | null>(null);

  function realizarSorteio(s: Sorteio) {
    setSorteando(s.id);
    setTimeout(() => {
      setLista((l) => l.map((x) => (x.id === s.id ? { ...x, situacao: "Realizado" } : x)));
      setSorteando(null);
      toast.success(`Sorteio do edital ${s.edital} realizado.`);
    }, 1200);
  }

  return (
    <AppShell title="Sorteio">
      <PageHeader
        title="Sorteio Eletrônico"
        description="Realize o sorteio das vagas quando o número de inscritos exceder as vagas disponíveis."
      />

      <TableCard className="mt-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Edital</TableHead>
              <TableHead className="hidden md:table-cell">Função</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-center">Inscritos</TableHead>
              <TableHead className="text-center">Vagas</TableHead>
              <TableHead>Situação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lista.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.edital}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{s.funcao}</TableCell>
                <TableCell className="text-muted-foreground">{formatarData(s.dataSorteio)}</TableCell>
                <TableCell className="text-center">{s.inscritos}</TableCell>
                <TableCell className="text-center">{s.vagas}</TableCell>
                <TableCell>
                  <StatusBadge
                    label={s.situacao}
                    tone={s.situacao === "Realizado" ? "success" : "info"}
                  />
                </TableCell>
                <TableCell className="text-right">
                  {s.situacao === "Agendado" ? (
                    <Button
                      size="sm"
                      onClick={() => realizarSorteio(s)}
                      disabled={sorteando === s.id}
                    >
                      {sorteando === s.id ? (
                        <>
                          <Sparkles className="h-4 w-4 animate-pulse" /> Sorteando…
                        </>
                      ) : (
                        <>
                          <Shuffle className="h-4 w-4" /> Realizar
                        </>
                      )}
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground">Concluído</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableCard>
    </AppShell>
  );
}
