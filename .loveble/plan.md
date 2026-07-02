## Objetivo

Redesenhar o MVP para ficar **fiel ao protótipo `Credenciamento.png`**, recriando a logo do HUM da forma mais próxima possível e construindo **todas as telas** do protótipo. Segue frontend-only com dados de exemplo (mock).

## Principais diferenças a corrigir (protótipo x atual)

- **Sidebar hoje é verde-escura** → protótipo usa **sidebar verde-clara**, com card de usuário (avatar em quadrado verde + dados) no topo e itens de menu como **botões brancos arredondados com submenus expansíveis** (setas), além de um botão de recolher no rodapé.
- **Dashboard** deve ter: faixa de 5 KPIs em card verde-escuro com ícones (ex.: 90 / 87 / 5 / 7 / 3), **gráfico de rosca "Credenciados por área"** com legenda e número central, card de **ações rápidas**, card de **tabela**, e **painel de alertas** com selos coloridos de severidade (vermelho/amarelo/verde).
- **Agendar Entrevista** e **Gerar Contrato** viram **páginas inteiras** (não diálogos). Gerar Contrato tem **duas colunas**: formulário à esquerda e **pré-visualização do documento** à direita.
- Botões seguem o guia: **verde cheio** (primário) com variante **verde-claro** (secundário/estado).

## Design system (`src/styles.css`)

- Ajustar tokens de sidebar para tema **claro** (fundo verde-clarinho `oklch` ~0.94, texto verde-escuro, itens ativos em branco).
- Confirmar paleta verde institucional, título com **sublinhado verde** (padrão de todas as páginas admin).
- Manter fontes Figtree/Inter.

## Logo (recriação fiel)

- Gerar uma logo horizontal do HUM aproximada ao protótipo (bloco com "HUM" + acento verde e subtítulo "Hospital Universitário de Maringá"), em PNG com fundo transparente, para header público e sidebar. Criar também variante de ícone/quadrado para o card de usuário e para a pré-visualização do contrato.

## Componentes compartilhados

- **AppShell** reescrito: sidebar clara + card de usuário + navegação com grupos expansíveis + botão recolher + topbar com título sublinhado e notificações.
- **PublicHeader**: manter, aplicando logo nova e botões no estilo do guia.
- **PageTitle** (título com sublinhado verde), **FilterCard** (card verde de filtros), **DataTable** (cabeçalho verde, ícones de ação verdes por linha) — reutilizados em todas as telas administrativas.

## Telas a construir

**Públicas**
- **Portal de Editais** (`/`): faixa de abas (Edital / Consultar / etc.) + tabela de editais com ícones e botões de ação por linha.
- **Inscrição** (`/inscreva-se`): stepper de 4 passos fiel (Dados Pessoais com muitos campos, Dados Profissionais, Contato, Credenciais) + tela de confirmação; botões Voltar/Próximo.
- **Login** (`/login`): card sobre foto do hospital (já existente, ajustar à logo/estilo).

**Administrativas (sidebar clara)**
- **Dashboard** (`/app`): KPIs + rosca + ações + tabela + alertas (conforme acima).
- **Agendar Entrevista** (`/app/entrevistas/agendar` + lista em `/app/entrevistas`): página com card verde e formulário (candidato, data, hora, tipo, observações).
- **Gerar Contrato** (`/app/contratos/gerar` + lista em `/app/contratos`): duas colunas (form + pré-visualização do documento).
- **Editais (admin)** (`/app/editais`): card de filtros + tabela CRUD.
- **Cadastro de Funções** (`/app/funcoes`): botão "Cadastrar", busca e tabela.
- **Credenciados – Cadastrar Solicitação** (`/app/credenciados/cadastrar`): formulário + tabela.
- **Credenciados – Consultar** (`/app/credenciados`): filtros + tabela.
- **Cadastro** (`/app/cadastro`): filtros + tabela.
- **Convocações** (`/app/convocacoes`): filtros + tabela.
- **Situações** (`/app/situacoes`): filtros + tabela.
- **Sorteio** (`/app/sorteio`): filtros + tabela.
- **Trâmites** (`/app/tramites`): filtros + tabela.

## Dados de exemplo (`src/lib/mock-data.ts`)

- Estender com: `funcoes`, `credenciados` (mais campos), `convocacoes`, `situacoes`, `sorteios`, `tramites`, `cadastros`, e dados dos KPIs/rosca/alertas do dashboard. Mantém helpers atuais.

## Verificação

- Rodar build e revisar cada tela no preview (Playwright) comparando com os recortes do protótipo, ajustando espaçamento, cores e layout até bater. Confirmar responsividade (sidebar recolhível no mobile).

### Observação técnica
Rotas em `src/routes/` no padrão `app.<secao>.tsx`; layout `app.tsx` renderiza o AppShell com `<Outlet />`. Sem backend nesta etapa — tudo com mock. A logo será recriada por aproximação (não é o arquivo oficial vetorial), conforme sua escolha.