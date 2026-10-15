# TODO — Perfect Silk

## Antes de publicar para o público
- [ ] Definir o domínio final (ex.: `perfectsilk.com.br`) e comprar no Registro.br ou Cloudflare Registrar
- [ ] Atualizar `siteUrl` em `site.config.json` para o endereço final (canonical, sitemap e JSON-LD dependem dele)
- [ ] Garantir que o deploy de produção fique **sem** `VITE_SITE_NOINDEX` (o build de teste bloqueia indexação)
- [ ] Trocar o texto provisório de `/privacidade` pela política definitiva
- [ ] Confirmar e-mail (`sldossantosservicos@gmail.com` ou `perfectsilk@gmail.com`, o Figma diverge)
- [ ] Confirmar telefone e endereço do rodapé e da página Contato
- [ ] Revisar contraste do laranja #FF6600 em textos pequenos (WCAG AA)

## Analytics
- [ ] Obter o snippet do Cloudflare Web Analytics e colar no `index.html`
- [ ] (Opcional) Medir cliques nos botões do WhatsApp, se a ferramenta for escolhida

## Redes sociais
- [ ] Informar as URLs de Instagram e Facebook para o rodapé (hoje os ícones não têm link)

## Hospedagem (Cloudflare Pages)
- [ ] Criar o projeto e anotar o nome, para o endereço `*.pages.dev`
- [ ] Atualizar `siteUrl` para o endereço `*.pages.dev` enquanto estiver em teste
- [ ] Configurar a variável `VITE_SITE_NOINDEX=true` no ambiente de preview/teste da Cloudflare
- [ ] Conectar o repositório ao GitHub (depende de autorização para commit e push)
- [ ] Conectar o domínio final em *Custom domains*

## Pendências do processo
- [ ] Rodar a verificação independente (Verifier) da skill, que não foi executada
