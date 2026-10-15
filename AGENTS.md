# AGENTS.md — Perfect Silk

Instruções para agentes de IA e colaboradores que trabalham neste repositório.

## Regras de Git (obrigatórias)

- **Todo commit vai para o branch `develop`. Nunca commitar na `main`.**
- A `main` só recebe código já validado em `develop`, e só por merge feito pelo responsável do projeto.
- **Todo push na `develop` deve ter um Pull Request aberto para a `main`.** O workflow `.github/workflows/pr-develop-to-main.yml` abre esse PR automaticamente. Só existe um PR aberto de `develop` para `main` por vez; os commits seguintes aparecem nele.
- Não mesclar o PR sem revisar os commits. Não fechar o PR sem o responsável do projeto.
- Não fazer `push --force` em nenhum branch. Não reescrever o histórico da `main`.
- Não fazer `git push` sem autorização explícita do responsável para aquela ação.
- Não commitar `PLAN.md`, `.claude/settings.local.json`, `.env*`, `node_modules/` nem `dist/`. Eles já estão no `.gitignore`.
- Mensagens de commit seguem Conventional Commits: `feat(escopo): ...`, `fix(escopo): ...`, `docs: ...`, `chore: ...`.
- Todo commit termina com a linha:
  `Co-Authored-By: <modelo> <noreply@anthropic.com>`

## Fluxo de PR

1. Commit e push na `develop`.
2. O workflow abre (ou reaproveita) o PR `develop → main`.
3. O responsável revisa e mescla na `main`.
4. Criar a tag de versão na `main` após o merge.

## Versionamento

- Versões são marcadas com tags anotadas no formato `vMAJOR.MINOR.PATCH` na `main`.
- Versão atual: `v0.1.0`.
- Para desfazer um commit ruim: `git revert <hash>` no `develop`, depois merge na `main`.
- Para reverter o site no ar rapidamente: rollback na Cloudflare Pages (ver [README.md](README.md#versionamento-e-rollback)).

## Projeto

- Site institucional da Perfect Silk (confecção, serigrafia e sublimação, Ananindeua/PA).
- Design fonte: Figma, arquivo `d9LfPQ5H7qHfvmG6BPyNtg`, página "Page 1".
- Especificação: `.specs/features/site-perfect-silk/spec.md`. Tarefas e design na mesma pasta.
- Sem backend. Todo orçamento vai para o WhatsApp `(91) 98136-5656` via link `wa.me`.
- Rotas: `/`, `/producao`, `/projetos`, `/contato`, `/privacidade`, `/404`. Nomes sem acento.

## Stack e comandos

- React 18, TypeScript, Vite, vite-react-ssg (pré-renderização), React Router, react-helmet-async.
- CSS Modules com tokens em `src/styles/tokens.css`. Não usar Tailwind.
- Testes: Vitest + Testing Library + jest-axe. Não há testes visuais (Playwright fora de escopo).
- `npm test`, `npm run lint`, `npm run build`, `npm run build:teste`.

## Regras de implementação

- Textos e dados compartilhados ficam em `src/content/` e `src/lib/`, não espalhados nos componentes.
- Contato confirmado: telefone `(91) 98136-5656`, e-mail `sldossantosservicos@gmail.com`, endereço Travessa WE 45-B, nº 371B, Cidade Nova VIII, CEP 67133-805, Ananindeua/PA. O Figma diverge no e-mail (`perfectsilk@gmail.com` no rodapé desktop); não trocar sem confirmação.
- Pedido mínimo de 20 peças. Mensagens de erro exatas estão em `src/lib/validation.ts` e são testadas.
- Imagens do Figma ficam em `public/images` em WebP. Não usar URLs temporárias do Figma no código.
- Toda página nova precisa de `Seo` com title e description próprios e de teste de rota.
- Só usar `noindex` em `/privacidade`, `/404` e no build de teste (`VITE_SITE_NOINDEX=true`).

## Antes de commitar

1. `npm run lint` sem erros.
2. `npm test` passando.
3. `npm run build` gerando `dist/` com as rotas, `sitemap.xml`, `robots.txt` e `404.html`.

## Pendências

Lista viva em [TODO.md](TODO.md): domínio final, `siteUrl`, analytics, redes sociais, política de privacidade e nome do projeto na Cloudflare.
