# Site Perfect Silk Design

**Spec**: `.specs/features/site-perfect-silk/spec.md`

## Architecture

SPA React pré-renderizada em build (vite-react-ssg). Sem backend. Conteúdo em módulos de dados tipados; componentes de apresentação com CSS Modules; tokens em variáveis CSS.

```
src/
├── main.tsx              # createRoot do vite-react-ssg + rotas
├── routes.tsx            # lista de rotas (/, /producao, /projetos, /contato, /privacidade, *)
├── styles/tokens.css     # cores, tipografia, espaçamentos, breakpoints
├── styles/global.css
├── lib/whatsapp.ts       # buildWhatsAppUrl(message), buildQuoteMessage(fields)
├── lib/validation.ts     # validateQuoteForm(values)
├── lib/seo.ts            # pageMeta por rota, jsonLd
├── content/*.ts          # textos e dados por página
├── components/           # Header, Footer, Button, Section, Accordion, Layout, Seo
├── sections/home|producao|projetos|contato/
└── pages/                # Home, Producao, Projetos, Contato, Privacy, NotFound
public/images/            # ativos exportados do Figma
```

## Decisões

- CSS Modules + tokens CSS (performance equivalente a Tailwind, sem dependência extra).
- Breakpoints: mobile < 768, desktop ≥ 1280 (container 1480px, margens 220px a 1920px), fluido entre eles.
- WhatsApp: `https://wa.me/5591981365656?text=` + `encodeURIComponent`.
- Testes: Vitest + Testing Library + jest-axe, ambiente jsdom.
- Fidelidade: cada seção implementada com `get_design_context` + `get_screenshot` do nó correspondente.

## Componentes compartilhados

| Componente | Responsabilidade |
| ---------- | ---------------- |
| Header | Logo, menu (aria-current), CTA orçamento, menu mobile |
| Footer | Contatos, links, política de privacidade |
| WhatsAppButton | Link wa.me em nova aba com mensagem inicial |
| Accordion | FAQ com aria-expanded |
| Seo | title, description, canonical, JSON-LD via Head do vite-react-ssg |
