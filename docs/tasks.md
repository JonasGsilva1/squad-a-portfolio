# Tasks — Registro de Correções e Refatorações do Projeto Squad A

Este documento registra todas as tarefas de correção, refatoração e melhorias aplicadas ao projeto **squad-a-portfolio**, organizadas cronologicamente por commit.

---

## Task 1 — Organização da Estrutura do Projeto
**Commit:** `32d8db5`  
**Tipo:** Estrutura  

- [x] Criar pasta `src/` e mover todos os arquivos `.html` para dentro dela
- [x] Mover a pasta `styles/` para dentro de `src/`
- [x] Criar pasta `tests/` para testes automatizados
- [x] Criar pasta `docs/` para documentação do projeto
- [x] Criar pasta `assets/` para imagens, ícones e fontes
- [x] Criar pasta `config/` para configurações da aplicação
- [x] Criar pasta `data/` e mover `metadata.json` para dentro dela
- [x] Criar arquivo `.gitignore` (ignorando `node_modules/`)
- [x] Criar arquivo `README.md` com descrição do projeto
- [x] Criar arquivo `package.json` (arquivo de dependências padrão Node.js)

---

## Task 2 — Refatoração com Clean Code, Complexidade O(1) e Docstrings
**Commit:** `2d5e555`  
**Tipo:** Refatoração / Engenharia de Software  

- [x] Criar diretório `src/scripts/`
- [x] Criar arquivo `src/scripts/main.js` com lógica de programação
- [x] Implementar **Dicionário (Tabela Hash)** para armazenar contatos dos membros da equipe
- [x] Implementar função `buscarContato()` com complexidade **O(1)** (acesso direto por chave no objeto)
- [x] Implementar função `renderizarMenu()` aplicando o **Princípio DRY** (menu definido em 1 lugar só, em vez de copiado em 8 HTMLs)
- [x] Documentar todas as funções com **JSDoc** (`@param`, `@returns`, `@constant`)
- [x] Aplicar **Princípio de Responsabilidade Única**: cada função faz apenas uma coisa
- [x] Remover o código HTML do menu repetido de todos os arquivos `.html`
- [x] Substituir por tag âncora `<header id="main-header"></header>` em cada página
- [x] Adicionar `<script src="scripts/main.js"></script>` em todas as páginas

---

## Task 3 — Correção de Quebras de Layout e Erros de Sintaxe HTML
**Commit:** `67afba1`  
**Tipo:** Bugfix  

- [x] Corrigir tag `<main` sem fechar (`>`) em `projetos.html`
- [x] Corrigir tag `<div class="projeto"` sem fechar (`>`) em `projetos.html`
- [x] Corrigir `<h3>Luiz Fenando<h3>` (tag de fechamento errada e nome com typo) em `projetos.html`
- [x] Remover tag `<link>` corrompida (`<link rel="" href=">")` em `projetos.html`
- [x] Corrigir `<div class="Rodape"` sem fechar (`>`) e `<p>` sem fechamento em `projetos.html`
- [x] Corrigir tags `<a>` e `</div>` não fechadas no logo em `servicos.html`
- [x] Remover `</span>` órfão dentro da div de preço em `servicos.html`

---

## Task 4 — Padronização Visual com Design System (CSS Global)
**Commit:** `ad1a988`  
**Tipo:** Feature / Design  

- [x] Criar arquivo `src/styles/global.css` com Design System premium
- [x] Definir variáveis CSS de cores (`--primary-color`, `--bg-color`, etc.)
- [x] Padronizar tipografia com fonte "Inter" (Google Fonts)
- [x] Criar classes globais padronizadas: `.card`, `.btn`, `.menu`, `.grid`
- [x] Padronizar estilos de inputs e formulários
- [x] Adicionar `<meta name="viewport">` em todas as 8 páginas HTML
- [x] Importar `global.css` no `<head>` de todas as páginas

---

## Task 5 — Correção do Cabeçalho em Habilidades e Menu de Serviços
**Commit:** `bd5ecc8`  
**Tipo:** Bugfix  

- [x] Substituir menu antigo (sem links `href`) em `habilidades.html` pela tag `<header id="main-header"></header>`
- [x] Separar "Habilidades e Serviço" em dois links independentes no menu: "Habilidades" e "Serviços"
- [x] Padronizar todos os itens do menu como `<h2>` (antes alguns eram `<h3>`)

---

## Task 6 — Reescrita Completa da Estrutura HTML de Todas as Páginas
**Commit:** `c5c9972`  
**Tipo:** Refatoração  

- [x] Adicionar tags `<head>` e `</head>` que estavam faltando em 7 dos 8 arquivos HTML
- [x] Mover `<header id="main-header"></header>` para ANTES do `<main>` (estava dentro do `<main>` em várias páginas)
- [x] Preencher `case-de-sucesso.html` que estava vazio (adicionar cards de exemplo)
- [x] Remover tags `<link rel="stylesheet" href="">` vazias/órfãs em `sobre.html`
- [x] Padronizar a ordem: `<header>` → `<main>` → `<script>` → `</body>` em todas as páginas

---

## Task 7 — Eliminação de Estilos Duplicados nos CSS Individuais
**Commit:** `ea61df9`  
**Tipo:** Refatoração / Clean Code  

- [x] Remover regras de `header`, `.menu`, `.menu h2`, `.menu h3`, `.menu a` de `home.css`
- [x] Remover regras de `header`, `.menu`, `.menu h2`, `.menu h3`, `.menu a` de `contato.css`
- [x] Remover regras de `header`, `.menu`, `.menu h2`, `.menu h3`, `.menu a` de `depoimentos.css`
- [x] Remover regras de `header`, `.menu`, `.menu h2`, `.menu h3`, `.menu a` de `habilidades.css`
- [x] Remover regras de `header`, `.menu`, `.menu h2`, `.menu h3`, `.menu a` de `sobre.css`
- [x] Remover regras de `header`, `.menu`, `.menu h2`, `.menu h3`, `.menu a` de `projetos.css`
- [x] Remover regras de `header`, `.menu`, `.menu h2`, `.menu h3`, `.menu a` de `servicos.css`
- [x] Escopar regras genéricas de `h2` e `p` em `home.css` para `main h2` e `main p` (evitar conflito com o menu)
- [x] Inverter ordem de carregamento nos HTMLs: CSS da página primeiro, `global.css` por último (prioridade)

---

## Task 8 — Remoção da Barra de Busca O(1) da Página de Contato
**Commit:** `9baedae`  
**Tipo:** Remoção de Feature  

- [x] Remover o bloco HTML da barra de pesquisa "Buscar Contato Rápido (O(1))" de `contato.html`

---

## Task 9 — Substituição de Nomes nos Depoimentos
**Commit:** `d176884`  
**Tipo:** Correção de Conteúdo  

- [x] Substituir "Jonas Gabriel" por "Carlos Mendes" (Desenvolvedor Front-end)
- [x] Substituir "Joan Henrique" por "Mariana Costa" (UX/UI Designer)
- [x] Substituir "Luiz Fernando" por "Rafael Oliveira" (Gerente de Projetos)
- [x] Adicionar nome "Fernanda Souza" (Analista de Sistemas) ao 4º depoimento que estava sem nome

---

## Task 10 — Refatoração Final do JavaScript (Conformidade Total)
**Commit:** `172599d`  
**Tipo:** Refatoração / Engenharia de Software  

- [x] Adicionar **Docstring de módulo** no topo do arquivo explicando os 3 princípios aplicados
- [x] Remover lógica órfã de busca (referenciava elementos HTML que já não existiam)
- [x] Criar função `inicializarPagina()` para orquestrar a inicialização (Responsabilidade Única)
- [x] Simplificar o `return` de `buscarContato()` usando operador `||`
- [x] Aplicar early return em `renderizarMenu()` (guard clause) para código mais limpo
- [x] Passar referência de função no `addEventListener` em vez de arrow function anônima
