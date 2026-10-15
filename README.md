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
- Vite + [vite-react-ssg](https://github.com/Daydreamer-riri/vite-react-ssg) (pré-renderização)
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

## Deploy (Cloudflare Pages)

- Build command: `npm run build`
- Build output directory: `dist`
- Para o ambiente de teste, defina a variável `VITE_SITE_NOINDEX=true` no preview.

O projeto não tem variáveis de ambiente obrigatórias. Pendências antes de publicar estão em [TODO.md](TODO.md).
