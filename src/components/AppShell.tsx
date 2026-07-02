import { useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  CalendarClock,
  FileText,
  FileSearch,
  Bell,
  LogOut,
  Menu,
  Briefcase,
  UsersRound,
  ClipboardList,
  Megaphone,
  ListChecks,
  Shuffle,
  GitBranch,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Logo, LogoMark } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { notificacoes, formatarDataHora } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type NavChild = { label: string; to: string };
type NavItem = {
  label: string;
  icon: React.ElementType;
  to?: string;
  exact?: boolean;
  children?: NavChild[];
};

const nav: NavItem[] = [
  { label: "Dashboard", to: "/app", icon: LayoutDashboard, exact: true },
  { label: "Editais", to: "/app/editais", icon: FileSearch },
  { label: "Cadastro de Funções", to: "/app/funcoes", icon: Briefcase },
  {
    label: "Credenciados",
    icon: UsersRound,
    children: [
      { label: "Cadastrar Solicitação", to: "/app/credenciados/cadastrar" },
      { label: "Consultar", to: "/app/credenciados" },
    ],
  },
  { label: "Cadastro", to: "/app/cadastro", icon: ClipboardList },
  { label: "Convocações", to: "/app/convocacoes", icon: Megaphone },
  {
    label: "Entrevistas",
    icon: CalendarClock,
    children: [
      { label: "Agendar", to: "/app/entrevistas/agendar" },
      { label: "Listar", to: "/app/entrevistas" },
    ],
  },
  {
    label: "Contratos",
    icon: FileText,
    children: [
      { label: "Gerar Contrato", to: "/app/contratos/gerar" },
      { label: "Listar", to: "/app/contratos" },
    ],
  },
  { label: "Situações", to: "/app/situacoes", icon: ListChecks },
  { label: "Sorteio", to: "/app/sorteio", icon: Shuffle },
  { label: "Trâmites", to: "/app/tramites", icon: GitBranch },
];

const pillBase =
  "flex w-full items-center gap-3 rounded-full px-3.5 py-2.5 text-sm font-medium transition-colors";
const pillIdle =
  "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm hover:bg-sidebar-accent/80";
const pillActive = "bg-sidebar-primary text-sidebar-primary-foreground shadow";

function UserCard({ collapsed }: { collapsed?: boolean }) {
  return (
    <div
      className={cn(
        "mx-3 mb-3 flex items-center gap-3 rounded-2xl bg-sidebar-accent p-2.5 shadow-sm",
        collapsed && "justify-center px-0",
      )}
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand font-display text-sm font-bold text-brand-foreground">
        MV
      </span>
      {!collapsed && (
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-semibold text-sidebar-foreground">
            Coord. Marcos V.
          </p>
          <p className="truncate text-xs text-sidebar-foreground/70">Administrador</p>
        </div>
      )}
    </div>
  );
}

function NavGroup({
  item,
  pathname,
  collapsed,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;
  const groupActive = !!item.children?.some((c) => pathname === c.to);
  const [open, setOpen] = useState(groupActive);

  if (collapsed) {
    // Collapsed: link the group icon to its first child.
    const first = item.children![0];
    return (
      <Link
        to={first.to}
        onClick={onNavigate}
        title={item.label}
        className={cn(pillBase, "justify-center px-0", groupActive ? pillActive : pillIdle)}
      >
        <Icon className="h-4.5 w-4.5 shrink-0" />
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(pillBase, groupActive ? pillActive : pillIdle)}
      >
        <Icon className="h-4.5 w-4.5 shrink-0" />
        <span className="flex-1 text-left">{item.label}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="mt-1 flex flex-col gap-1 pl-6">
          {item.children!.map((c) => {
            const active = pathname === c.to;
            return (
              <Link
                key={c.to}
                to={c.to}
                onClick={onNavigate}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm transition-colors",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent",
                )}
              >
                {c.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SidebarInner({
  collapsed,
  onToggleCollapse,
  onNavigate,
}: {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onNavigate?: () => void;
}) {
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <div className="flex h-full flex-col bg-sidebar py-4">
      <div className={cn("px-4 pb-4", collapsed && "flex justify-center px-0")}>
        {collapsed ? (
          <Link to="/app" title="HUM">
            <LogoMark className="h-9 w-9" />
          </Link>
        ) : (
          <Logo to="/app" />
        )}
      </div>

      <UserCard collapsed={collapsed} />

      <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto px-3">
        {nav.map((item) => {
          if (item.children) {
            return (
              <NavGroup
                key={item.label}
                item={item}
                pathname={pathname}
                collapsed={collapsed}
                onNavigate={onNavigate}
              />
            );
          }
          const Icon = item.icon;
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to!);
          return (
            <Link
              key={item.label}
              to={item.to}
              onClick={onNavigate}
              title={collapsed ? item.label : undefined}
              className={cn(
                pillBase,
                collapsed && "justify-center px-0",
                active ? pillActive : pillIdle,
              )}
            >
              <Icon className="h-4.5 w-4.5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-2 space-y-1 px-3">
        <Link
          to="/login"
          onClick={onNavigate}
          title={collapsed ? "Sair" : undefined}
          className={cn(
            pillBase,
            collapsed && "justify-center px-0",
            "bg-transparent text-sidebar-foreground/80 shadow-none hover:bg-sidebar-accent",
          )}
        >
          <LogOut className="h-4.5 w-4.5 shrink-0" />
          {!collapsed && <span>Sair</span>}
        </Link>
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className={cn(
              pillBase,
              collapsed && "justify-center px-0",
              "bg-transparent text-sidebar-foreground/70 shadow-none hover:bg-sidebar-accent",
            )}
          >
            {collapsed ? (
              <ChevronsRight className="h-4.5 w-4.5 shrink-0" />
            ) : (
              <>
                <ChevronsLeft className="h-4.5 w-4.5 shrink-0" />
                <span>Recolher menu</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function NotificationsButton() {
  const naoLidas = notificacoes.filter((n) => !n.lida).length;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notificações">
          <Bell className="h-5 w-5" />
          {naoLidas > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
              {naoLidas}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="border-b px-4 py-3">
          <p className="font-display text-sm font-semibold">Notificações</p>
          <p className="text-xs text-muted-foreground">{naoLidas} não lidas</p>
        </div>
        <div className="max-h-80 divide-y overflow-y-auto">
          {notificacoes.map((n) => (
            <div key={n.id} className={cn("px-4 py-3", !n.lida && "bg-accent/40")}>
              <div className="flex items-start gap-2">
                {!n.lida && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                <div className={cn(!n.lida ? "" : "pl-4")}>
                  <p className="text-sm font-medium leading-snug">{n.titulo}</p>
                  <p className="text-xs text-muted-foreground">{n.descricao}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground/80">
                    {formatarDataHora(n.data)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  const [openMobile, setOpenMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden border-r border-sidebar-border transition-all lg:block",
          collapsed ? "w-20" : "w-72",
        )}
      >
        <SidebarInner
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((c) => !c)}
        />
      </aside>

      <div className={cn("transition-all", collapsed ? "lg:pl-20" : "lg:pl-72")}>
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border/70 bg-card/90 px-4 backdrop-blur sm:px-6">
          <Sheet open={openMobile} onOpenChange={setOpenMobile}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
              <SidebarInner onNavigate={() => setOpenMobile(false)} />
            </SheetContent>
          </Sheet>

          <h1 className="page-underline font-display text-lg font-semibold uppercase tracking-tight">
            {title}
          </h1>

          <div className="ml-auto flex items-center gap-2">
            <NotificationsButton />
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate({ to: "/login" })}
              className="hidden sm:inline-flex"
            >
              Sair
            </Button>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
