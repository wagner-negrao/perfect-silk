# Perfect Silk — Site institucional

Site institucional da Perfect Silk (confecção, serigrafia e sublimação, Ananindeua/PA). Feito em React com pré-renderização estática, para que cada página já saia pronta com título, descrição e JSON-LD para buscadores.

O design vem do Figma. A especificação está em [.specs/features/site-perfect-silk/spec.md](.specs/features/site-perfect-silk/spec.md).

## Páginas

| Rota | Conteúdo |
| --- | --- |
| `/` | Início |
| `/producao` | Produção própria, etapas e técnicas |
| `/projetos` | Galeria de produtos |
| `/contato` | Canais e formulário de orçamento |
| `/privacidade` | Política de privacidade (provisória, `noindex`) |
| `/404` | Página não encontrada |

Todos os botões de orçamento abrem o WhatsApp `(91) 98136-5656` com a mensagem preenchida. Não há backend.

## Stack

- React 18 + TypeScript
- Vite + [vite-react-ssg] (pré-renderização)
- React Router e react-helmet-async
- CSS Modules com tokens em variáveis CSS
- Vitest, Testing Library e jest-axe

## Como rodar

Requisitos: Node 20 ou superior.

```bash
npm install
npm run dev        # servidor de desenvolvimento
npm test           # testes
npm run lint       # checagem de tipos
npm run build      # build de produção em dist/
npm run build:teste  # build de teste, com noindex em todas as páginas
npm run preview    # serve o dist/ localmente
```

## Build e SEO

O `npm run build` gera `dist/` com:
- uma pasta por rota, já com HTML pré-renderizado;
- `sitemap.xml` e `robots.txt`, a partir de `site.config.json`;
- `404.html`, usado pela Cloudflare Pages para endereços inexistentes.

O endereço do site fica em `siteUrl` no [site.config.json](site.config.json). Ele alimenta canonical, sitemap e JSON-LD, então precisa ser o endereço final antes de publicar.

### Build de teste

`npm run build:teste` (ou `VITE_SITE_NOINDEX=true npm run build`) adiciona `noindex` a todas as páginas e bloqueia todos os crawlers no `robots.txt`. Use-o em ambientes de teste, para que uma cópia de preview não entre nos buscadores.

## Estrutura

```
src/
  components/   cabeçalho, rodapé, formulário, FAQ, galeria, botão do WhatsApp
  content/      textos e dados compartilhados (contato, projetos)
  lib/          regras de WhatsApp, validação do formulário e SEO
  pages/        uma página por rota, com testes
  sections/     seções da página inicial
  styles/       tokens de design e estilos globais
scripts/        geração de sitemap/robots, otimização de imagens
public/images/  imagens em WebP exportadas do Figma
```

## Versionamento e rollback

- Trabalho em `develop`. Todo commit vai para esse branch. A `main` só recebe código validado, por merge.
- Versões são tags anotadas na `main`, no formato `vMAJOR.MINOR.PATCH`. Versão atual: `v0.1.0`.
- Para desfazer um commit ruim, use `git revert <hash>` no `develop` e depois faça o merge na `main`. Não use `reset --hard` nem `push --force`.
- Para reverter o site no ar rapidamente, use o rollback da Cloudflare Pages: na aba **Deployments**, abra uma versão anterior e escolha **Rollback**. Depois corrija o código com `git revert`, porque o próximo push na `main` publica de novo.
- Antes de ir para a `main`, o `develop` pode ser testado pela URL de preview que a Cloudflare gera para cada branch.
- Para criar uma nova versão: `git tag -a vX.Y.Z -m "descrição" <commit>` na `main` e `git push origin vX.Y.Z`.

## Deploy (Cloudflare Pages)

- Build command: `npm run build`
- Build output directory: `dist`
- Para o ambiente de teste, defina a variável `VITE_SITE_NOINDEX=true` no preview.

O projeto não tem variáveis de ambiente obrigatórias. Pendências antes de publicar estão em [TODO.md](TODO.md). Regras para contribuir, incluindo o uso do branch `develop`, estão em [AGENTS.md](AGENTS.md).
