# blips-ui

Biblioteca de componentes **Blips UI** — Turborepo + pnpm. Os componentes
espelham o shadcn/ui sobre primitivas **Base UI** (`@base-ui/react`, estilo
shadcn **`base-mira`**) e são publicados como `@blips/ui`. Desde a v3 a lib não
usa `@radix-ui/*` nem `vaul`.

### Convenções da lib (v3)

- **Base UI, não Radix** — polimorfismo pela prop `render` (não existe mais
  `asChild`): `<Button nativeButton={false} render={<Link href="/docs" />}>`.
  Atributos de estado são os do Base UI (`data-open`, `data-checked`,
  `data-active`…), não `data-state=…`.
- **Referência canônica de classes** — a saída do CLI do shadcn no preset
  **`b6GMQNVCs`** (`base-mira`, ícones Phosphor, menu translúcido), com as
  personalizações da Blips por cima. Componente novo ou atualizado parte dessa
  saída, não de classes ajustadas à mão.
- **Densidade `mira`** — compacta de propósito: controles `h-7` por padrão
  (`sm` `h-6`, `lg` `h-8`), texto `text-xs`, ícones `size-3.5`.
- **Utilitários do shadcn embutidos no `globals.css`** — cópia do
  `shadcn/tailwind.css` (variantes `data-open/closed/checked/…`,
  `no-scrollbar`, `scroll-fade*`, `shimmer*`, keyframes do accordion), sem
  depender do CLI do shadcn em runtime.
- **Ícones** — `@phosphor-icons/react`, sempre com o **sufixo `Icon`**
  (`CaretDownIcon`, `XIcon`, `MagnifyingGlassIcon`…); os nomes sem sufixo estão
  deprecated no Phosphor 2.1.x. `lucide-react` é bloqueado pelo Biome.
- **Gráficos** — recharts **3** (`3.10.1`).
- **Registry shadcn** — `packages/ui/registry/default/` é uma cópia gerada de
  `packages/ui/src/`. Depois de mexer nos componentes, rode
  `pnpm --filter @blips/ui exec node scripts/build-registry.js --sync`;
  `pnpm registry:build` falha se a cópia estiver fora de sincronia.
- **Commits** em pt-BR, Conventional Commits.

O repositório também hospeda um **marketplace de plugins do Claude Code**
(`blips-ui-marketplace`) com o plugin `blips-ui` (skills para adicionar e
gerenciar componentes).

## Publicando / distribuindo

As skills deste repositório são distribuídas **dentro de plugins**, e os
plugins são listados em um **marketplace**. A unidade de publicação é sempre o
plugin — não a skill isolada:

```
marketplace  →  lista plugins  →  plugin contém skills/commands/agents/hooks
```

O manifest do marketplace fica em `.claude-plugin/marketplace.json` (na raiz do
repo) e os plugins em `plugins/<nome>/.claude-plugin/plugin.json`.

### Instalando o marketplace e os plugins

```bash
# Adicionar o marketplace (repo no GitHub)
claude plugin marketplace add Blips-ativos/ui
# ou, dentro do Claude Code:
#   /plugin marketplace add Blips-ativos/ui

# Instalar o plugin do marketplace
claude plugin install blips-ui@blips-ui-marketplace

# Atualizar o catálogo e validar o manifest antes de publicar
claude plugin marketplace update blips-ui-marketplace
claude plugin validate .
```

> O repo `Blips-ativos/ui` é privado. Para o `git push` e para os
> auto-updates funcionarem, garanta que a conta `BernardoBlips` esteja ativa no
> `gh` (`gh auth switch --user BernardoBlips`) ou exporte `GITHUB_TOKEN`.

### Distribuição automática para a equipe

Adicione ao `.claude/settings.json` de um repositório consumidor para que os
membros da equipe recebam o prompt de instalação automaticamente:

```json
{
  "extraKnownMarketplaces": {
    "blips-ui-marketplace": {
      "source": { "source": "github", "repo": "Blips-ativos/ui" }
    }
  },
  "enabledPlugins": {
    "blips-ui@blips-ui-marketplace": true
  }
}
```

### Versionamento (atenção)

São dois tracks de release independentes — incremente cada um separadamente:

- **npm (`@blips/ui`) + site de docs** — release pelo comando **`/release`**
  (`.claude/commands/release.md`) + o workflow **`release.yml`**. O `/release`
  analisa os conventional commits, faz o bump do `packages/ui/package.json` e
  abre um PR `staging → main` com título **`release: vX.Y.Z`** (convenção
  determinística — o workflow extrai a versão do título). Ao mergear esse PR, o
  workflow cria a tag `vX.Y.Z` + release, publica o `@blips/ui` no npm via
  **Trusted Publishing (OIDC, sem token; exige npm ≥ 11.5.1 / Node ≥ 22.14)** e
  faz o build (export SSG) + deploy do docs no **Firebase Hosting** (projeto
  `blips-ui`). O CI precisa do secret `FIREBASE_SERVICE_ACCOUNT`, da variable
  `FIREBASE_PROJECT_ID` e do trusted publisher do npm registrado para o
  workflow `release.yml`.
- **Plugin do marketplace (`blips-ui`)** — também liberado pelo **`/release`**
  (escopo `plugin`), mas em **track próprio**: bumpa o `version` no **`plugin.json`**
  e na **entrada do `marketplace.json`** (têm que ficar em sincronia — o workflow
  falha o release do plugin caso contrário) e abre um PR titulado
  **`release-plugin: vX.Y.Z`**. No merge, cria a tag **`plugin-vX.Y.Z`** + release,
  **sem npm/docs** (desacoplado pelo prefixo do título). Como o plugin é
  distribuído por git, é o bump chegando na `main` que o torna válido — então
  **incremente a cada release**, senão o cache do Claude Code mantém a versão
  antiga. Para release combinado, o escopo `ambos` leva o bump do plugin no PR
  `release: vX.Y.Z` e o workflow também cria a tag `plugin-v…`.

### Iteração local

Qualquer pasta em `.claude/skills/<nome>/` ou `~/.claude/skills/<nome>/` que
contenha um `.claude-plugin/plugin.json` vira automaticamente o plugin
`<nome>@skills-dir` na próxima sessão — sem precisar de marketplace nem install.
Útil para testar uma skill antes de publicá-la no marketplace.
