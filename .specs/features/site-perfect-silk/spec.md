# Site Institucional Perfect Silk Specification

## Problem Statement

A Perfect Silk (confecção, serigrafia e sublimação, Ananindeua/PA) precisa de um site institucional que converta visitantes em pedidos de orçamento via WhatsApp. O design está fechado no Figma (Homepage, Produção, Projetos, Contato em desktop 1920px; Homepage em mobile 390px). O site deve reproduzi-lo fielmente, ser indexável por buscadores e por IA, e ter testes que detectem regressões.

## Goals

- [ ] 4 páginas (`/`, `/producao`, `/projetos`, `/contato`) fiéis ao Figma em desktop e mobile.
- [ ] Todo pedido de orçamento chega ao WhatsApp (91) 98136-5656 com mensagem composta.
- [ ] HTML pré-renderizado por rota com title, meta description, canonical e JSON-LD próprios.
- [ ] Suíte Vitest cobrindo seções, rotas, formulário, link do WhatsApp e SEO.

## Out of Scope

| Feature | Reason |
| ------- | ------ |
| Backend, API, envio de e-mail | Decisão do cliente: apenas WhatsApp via link |
| Páginas `/uniformes-corporativos`, `/camisetas-para-eventos`, `/serigrafia`, `/sublimacao`, `/orcamento` | O Figma as trata como roteiro, não desenhadas |
| Testes visuais com screenshots (Playwright) | Decisão do cliente: apenas Vitest |
| Hospedagem e domínio | Ainda não definidos; build estático é agnóstico |
| Texto jurídico final da política de privacidade | Depende do cliente |
| Telas mobile de Produção, Projetos e Contato | Não existem no Figma; derivadas do padrão da Home mobile |

---

## Assumptions & Open Questions

| Assumption / decision | Chosen default | Rationale | Confirmed? |
| --------------------- | -------------- | --------- | ---------- |
| Stack | Vite + React + TypeScript + CSS Modules + tokens CSS | Site estático pequeno, design com tokens fixos; performance equivalente a Tailwind | y |
| Roteamento e SEO | `vite-react-ssg` (pré-renderização de 4 rotas) + react-router | HTML completo sem depender de JS | y |
| Rotas | `/`, `/producao`, `/projetos`, `/contato` (sem acento) | Guia do Figma manda normalizar | y |
| Número WhatsApp | 5591981365656 → `https://wa.me/5591981365656?text=...` | (91) 98136-5656 do guia, DDI 55 | y |
| Mobile das páginas internas | Layout derivado dos breakpoints da Home mobile (390px) | Figma só tem desktop para elas | n |
| Breakpoints | Mobile < 768px, tablet 768–1023px, desktop ≥ 1024px (margens fluidas até 220px e área útil de 1480px em 1920px) | Figma define só 390 e 1920 | y |
| Imagens | Exportadas do Figma para `public/images`, convertidas para WebP quando possível | Fotos reais da cliente; performance mobile | n |
| Dados estruturados | JSON-LD Organization + LocalBusiness com dados confirmados no Figma (nome, telefone, e-mail, endereço) | Guia pede apenas informações confirmadas | y |
| Política de privacidade | Link no rodapé para página/seção placeholder `/privacidade` | Guia pede a política; texto não fornecido | n |
| Estados de hover | Reproduzidos conforme frames "Perfect Silk / Hover / ..." | Existem no Figma | y |
| Campos do formulário | Home: 6 campos (frame 2:153). Contato: 9 campos (frame 21:430). Ambos montam a mensagem do WhatsApp | Lidos do Figma | y |
| E-mail exibido | sldossantosservicos@gmail.com em todo o site | Figma diverge: rodapé desktop mostra perfectsilk@gmail.com; guia, mobile e Contato mostram sldossantosservicos@gmail.com | n |
| Domínio | https://www.perfectsilk.com.br em `site.config.json` | Domínio real ainda não definido; afeta canonical, sitemap e JSON-LD | n |
| Redes sociais | Ícones Instagram/Facebook do rodapé sem link | Figma não traz as URLs | n |

**Open questions:** none - all resolved or logged above (required before the spec is confirmed).

---

## User Stories

### P1: Navegação e identidade comum ⭐ MVP

**User Story**: As a visitante, I want navegar entre Início, Produção, Projetos e Contato so that encontro as informações da empresa.

**Why P1**: Estrutura compartilhada por todas as páginas.

**Acceptance Criteria**:

1. The site SHALL expor as rotas `/`, `/producao`, `/projetos` e `/contato`.
2. WHEN o visitante clica em um item do menu THEN the site SHALL navegar para a rota correspondente sem recarregar a página.
3. WHILE a rota atual é X the site SHALL marcar o item de menu X com `aria-current="page"`.
4. WHEN o viewport é menor que 1024px THEN the site SHALL exibir o menu em formato mobile com botão que abre e fecha a navegação.
5. The site SHALL renderizar o cabeçalho (Navegação) e o rodapé em todas as 4 páginas.
6. The site SHALL usar Montserrat e a paleta #FF6600, #1A1A1A, #333333, #E9E9E9 e #FFFFFF definidas como tokens CSS.

**Independent Test**: Renderizar cada rota e verificar cabeçalho, rodapé, item ativo e navegação por clique.

---

### P1: Orçamento via WhatsApp ⭐ MVP

**User Story**: As a cliente potencial, I want pedir orçamento em um clique so that falo direto com a empresa.

**Why P1**: Conversão principal do site.

**Acceptance Criteria**:

1. WHEN o visitante clica em um botão de solicitar orçamento THEN the site SHALL abrir `https://wa.me/5591981365656?text=<mensagem inicial codificada>`.
2. The site SHALL abrir links de WhatsApp em nova aba com `rel="noopener noreferrer"`.
3. WHEN o visitante envia o formulário de contato com todos os campos válidos THEN the site SHALL abrir o link do WhatsApp com uma mensagem contendo os valores preenchidos.
4. IF um campo obrigatório está vazio THEN the site SHALL exibir mensagem de erro associada ao campo e não abrir o WhatsApp.
5. IF a quantidade informada é menor que 20 THEN the site SHALL exibir o erro "O pedido mínimo é de 20 peças." e não abrir o WhatsApp.
6. The site SHALL codificar o texto da mensagem com `encodeURIComponent`, preservando acentos e quebras de linha.

**Independent Test**: Testes unitários da função de composição do link e testes de componente do formulário.

---

### P1: Homepage ⭐ MVP

**User Story**: As a visitante, I want entender os serviços e o processo da Perfect Silk so that decido pedir orçamento.

**Why P1**: Porta de entrada do site.

**Acceptance Criteria**:

1. The site SHALL renderizar na rota `/` as seções, nesta ordem: Hero, Soluções, Processo, Personalização, Por que Perfect Silk, Projetos realizados, Perguntas frequentes e Solicite seu orçamento.
2. The site SHALL exibir um único `h1` com o texto "Da confecção à estampa. Sua marca em cada detalhe."
3. The site SHALL exibir os `h2` "Uma solução para cada ocasião", "Do primeiro corte ao último detalhe", "Sua identidade. Muitas possibilidades", "Uma produção. Todos os detalhes", "Antes de produzir, vamos esclarecer" e "Sua próxima peça começa aqui".
4. The site SHALL declarar o pedido mínimo de 20 peças no conteúdo visível.
5. The site SHALL renderizar todos os itens do FAQ expandidos inicialmente, como no Figma.
6. WHEN o visitante aciona um item do FAQ expandido THEN the site SHALL recolhê-lo e definir `aria-expanded="false"` no gatilho.
7. WHEN o visitante aciona um item do FAQ recolhido THEN the site SHALL expandi-lo e definir `aria-expanded="true"` no gatilho.
8. WHERE o viewport é 390px the site SHALL usar o layout da Homepage / Mobile do Figma.

**Independent Test**: Renderizar `/` e verificar ordem das seções, headings, FAQ e botões de orçamento.

---

### P1: Página Produção ⭐ MVP

**User Story**: As a visitante, I want conhecer as etapas e técnicas de produção so that sei o que esperar do pedido.

**Why P1**: Página desenhada no Figma.

**Acceptance Criteria**:

1. The site SHALL renderizar em `/producao` as seções Produção própria, Etapas da produção, Técnicas e Prepare seu pedido, nesta ordem.
2. The site SHALL exibir um único `h1` na página.
3. The site SHALL exibir pelo menos um botão de orçamento via WhatsApp na página.

**Independent Test**: Renderizar `/producao` e verificar seções e botão.

---

### P1: Página Projetos ⭐ MVP

**User Story**: As a visitante, I want ver trabalhos e produtos reais so that avalio a qualidade.

**Why P1**: Página desenhada no Figma.

**Acceptance Criteria**:

1. The site SHALL renderizar em `/projetos` as seções Projetos, Galeria de projetos e Seu próximo projeto, nesta ordem.
2. The site SHALL exibir todas as imagens da galeria com texto `alt` não vazio.
3. The site SHALL exibir um único `h1` na página.
4. The site SHALL exibir pelo menos um botão de orçamento via WhatsApp na página.

**Independent Test**: Renderizar `/projetos` e verificar galeria, alts e botão.

---

### P1: Página Contato ⭐ MVP

**User Story**: As a cliente, I want enviar os detalhes do pedido e ver os canais da empresa so that recebo o orçamento.

**Why P1**: Página desenhada no Figma.

**Acceptance Criteria**:

1. The site SHALL renderizar em `/contato` as seções Contato, Orçamento e canais e Próximos passos, nesta ordem.
2. The site SHALL exibir telefone (91) 98136-5656, e-mail sldossantosservicos@gmail.com e o endereço em Ananindeua/PA informados no guia do Figma.
3. The site SHALL associar cada campo do formulário a um `label` visível.
4. The site SHALL exibir um único `h1` na página.

**Independent Test**: Renderizar `/contato` e verificar canais, labels e formulário.

---

### P1: SEO técnico ⭐ MVP

**User Story**: As a dono do negócio, I want aparecer em buscadores e respostas de IA so that recebo mais pedidos.

**Why P1**: Exigência do guia do Figma.

**Acceptance Criteria**:

1. The site SHALL gerar HTML estático pré-renderizado para cada uma das 4 rotas.
2. The site SHALL definir em `/` o title "Perfect Silk | Confecção, Serigrafia e Sublimação" e a meta description do guia do Figma.
3. The site SHALL definir em `/producao` o title "Produção própria, serigrafia e sublimação | Perfect Silk".
4. The site SHALL definir em `/projetos` o title "Projetos e produtos personalizados | Perfect Silk".
5. The site SHALL definir em `/contato` o title "Orçamento de produtos personalizados | Perfect Silk".
6. The site SHALL definir em cada rota uma meta description e uma URL canônica próprias.
7. The site SHALL incluir JSON-LD Organization/LocalBusiness com apenas dados confirmados.
8. The site SHALL gerar `sitemap.xml` com as 4 rotas e `robots.txt`.

**Independent Test**: Testar o módulo de metadados por rota e inspecionar o HTML do build.

---

### P2: Acessibilidade e estados de interação

**User Story**: As a visitante com limitações, I want usar o site por teclado e leitor de tela so that tenho a mesma experiência.

**Why P2**: Exigência do guia e qualidade.

**Acceptance Criteria**:

1. The site SHALL permitir operar menu, botões, FAQ e formulário apenas por teclado, com foco visível.
2. The site SHALL ter todas as imagens informativas com `alt` descritivo e as decorativas com `alt=""`.
3. The site SHALL passar na verificação `jest-axe` sem violações em cada uma das 4 páginas.
4. WHEN o visitante passa o mouse sobre itens de menu, botões e cards THEN the site SHALL aplicar os estados de hover definidos nos frames "Perfect Silk / Hover" do Figma.

**Independent Test**: `jest-axe` por página e teste de teclado no FAQ e no menu.

---

### P3: Política de privacidade

**User Story**: As a visitante, I want consultar a política de privacidade so that sei como meus dados são tratados.

**Why P3**: Pedida pelo guia; texto depende do cliente.

**Acceptance Criteria**:

1. The site SHALL exibir no rodapé um link "Política de privacidade" para `/privacidade`.
2. The site SHALL renderizar `/privacidade` com texto provisório e `meta robots noindex`.

---

## Edge Cases

- IF a rota não existe THEN the site SHALL exibir uma página 404 com link para a Home.
- IF o campo de quantidade recebe valor não numérico THEN the site SHALL exibir erro de validação e não abrir o WhatsApp.
- IF uma imagem falha ao carregar THEN the site SHALL manter o layout sem deslocamento (largura e altura declaradas).
- WHEN o visitante usa `prefers-reduced-motion: reduce` THEN the site SHALL desativar transições e animações decorativas.

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| -------------- | ----- | ----- | ------ |
| NAV-01 | P1: Navegação e identidade comum | Specify | Pending |
| WA-01 | P1: Orçamento via WhatsApp | Specify | Pending |
| HOME-01 | P1: Homepage | Specify | Pending |
| PROD-01 | P1: Página Produção | Specify | Pending |
| PROJ-01 | P1: Página Projetos | Specify | Pending |
| CONT-01 | P1: Página Contato | Specify | Pending |
| SEO-01 | P1: SEO técnico | Specify | Pending |
| A11Y-01 | P2: Acessibilidade e estados de interação | Specify | Pending |
| PRIV-01 | P3: Política de privacidade | Specify | Pending |

**Coverage:** 9 total, 0 mapped to tasks, 9 unmapped ⚠️

---

## Success Criteria

- [ ] `npm test` passa com todos os testes das 4 páginas, do formulário, do link do WhatsApp e do SEO.
- [ ] `npm run build` gera HTML estático para as 4 rotas, `sitemap.xml` e `robots.txt`.
- [ ] Cada página confere com o frame do Figma correspondente em 1920px e a Home também em 390px.
- [ ] Nenhuma violação de acessibilidade detectada pelo `jest-axe`.
