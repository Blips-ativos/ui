# blips-ui

Biblioteca de componentes **Blips UI** — Turborepo + pnpm. Os componentes
espelham o shadcn/ui sobre primitivas Radix e são publicados como `@blips/ui`.

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
- **Plugin do marketplace (`blips-ui`)** — o `version` está
  definido no **`plugin.json`** e na **entrada do `marketplace.json`**. Como
  é `version` explícito, **é obrigatório incrementá-lo a cada release** (mantendo
  os dois arquivos em sincronia) — sem o bump, o Claude Code mantém o cache e os
  usuários não recebem a atualização. Para iteração rápida, é possível omitir
  `version` e deixar o Claude Code usar o commit SHA (todo push novo vira
  atualização).

### Iteração local

Qualquer pasta em `.claude/skills/<nome>/` ou `~/.claude/skills/<nome>/` que
contenha um `.claude-plugin/plugin.json` vira automaticamente o plugin
`<nome>@skills-dir` na próxima sessão — sem precisar de marketplace nem install.
Útil para testar uma skill antes de publicá-la no marketplace.
