---
description: Abre o PR de release (staging → main). Escolhe o escopo (npm+docs, plugin ou ambos); o nome do PR dispara tag/publish/deploy no merge.
allowed-tools: Bash(git *), Bash(gh *), Bash(jq *), Bash(node *), Edit, AskUserQuestion
---

## Contexto do Release

Branch atual:
!`git branch --show-current`

Commits em staging que não estão em main:
!`git fetch origin main staging --quiet && git log --oneline origin/main..origin/staging`

Última tag npm / plugin:
!`echo "npm:    $(git tag -l 'v*' --sort=-version:refname | head -1)"; echo "plugin: $(git tag -l 'plugin-v*' --sort=-version:refname | head -1)"`

Versões atuais:
!`echo "@blips/ui:      $(node -p "require('./packages/ui/package.json').version")"; echo "plugin.json:    $(node -p "require('./plugins/blips-ui/.claude-plugin/plugin.json').version")"; echo "marketplace:    $(node -p "require('./.claude-plugin/marketplace.json').plugins.find(x=>x.name==='blips-ui').version")"`

## Sua Tarefa

Há **dois tracks de release independentes**, dirigidos pelo título do PR:

| Track | Versiona | Título do PR | No merge (workflow) |
| --- | --- | --- | --- |
| **npm + docs** | `packages/ui/package.json` | `release: vX.Y.Z` | publish npm (OIDC) + deploy docs (Firebase) + tag `vX.Y.Z` |
| **plugin** | `plugin.json` + entrada do `marketplace.json` | `release-plugin: vX.Y.Z` | tag `plugin-vX.Y.Z` + release (sem npm/docs) |

Os títulos são **load-bearing** — o `.github/workflows/release.yml` extrai a versão e o track deles. Não altere o formato.

> ### ⚠️ Ordem obrigatória (não pule nem reordene)
>
> 1. **Definir a versão** com o usuário (escopo + bump).
> 2. **Bumpar** os arquivos do track.
> 3. **Commitar** o bump.
> 4. **Push** da `staging` (`git push origin staging`).
> 5. **Só então criar o PR** com o título `release: vX.Y.Z` (ou `release-plugin: vX.Y.Z`).
>
> O PR **tem que conter o commit do bump** — por isso o push vem **antes** de
> `gh pr create`. Nunca abra o PR com a versão antes de commitar+pushar o bump,
> senão o título não bate com os arquivos e o job `verify` falha no merge.
>
> **Toda PR `staging → main` é um release versionado.** Não mergeie mudanças
> avulsas (CI, hotfix, infra) direto na `main` fora de uma PR de release com a
> versão no título — elas entram no próximo release.

### 1. Validações

- [ ] Está na branch `staging`
- [ ] Há commits em staging que não estão em main

Ignore arquivos não commitados. Se falhar, informe e pare.

### 2. Escolher o escopo

Use `AskUserQuestion`: **"O que liberar neste release?"** → `npm + docs`, `plugin` ou `ambos`.

### 3. Recomendar versão(ões) por conventional commits

Para cada track escolhido, analise os commits pendentes (para o plugin, foque
nos que tocam `plugins/**` e `.claude-plugin/**`):

| Tipo | Incremento |
| --- | --- |
| `fix:`, `perf:`, `refactor:`, `style:`, `docs:`, `chore:`, `test:` | **PATCH** |
| `feat:` | **MINOR** |
| `BREAKING CHANGE:` / `!:` | **MAJOR** |

Prioridade: `BREAKING`/`!:` → MAJOR; senão `feat:` → MINOR; senão PATCH.
Calcule a partir da última tag do track (`v*` para npm, `plugin-v*` para plugin)
ou da versão atual do arquivo. Confirme com `AskUserQuestion` (recomendada primeiro).

### 4. Bump → commit → push (NESTA ORDEM, antes de qualquer PR)

- **npm**: edite `packages/ui/package.json` → `"version": "X.Y.Z"`.
- **plugin**: edite **os dois em sincronia** — `plugins/blips-ui/.claude-plugin/plugin.json`
  e a entrada `blips-ui` em `.claude-plugin/marketplace.json` → mesma `version`.
  (O workflow falha o release do plugin se os dois não baterem.)

Commite **e empurre** na staging — o push é **pré-requisito** do passo 5:

```
git add -A && git commit -m "chore(release): <resumo das versões>" && git push origin staging
```

### 5. Criar o PR (somente após o push do bump)

Confirme que o bump já está commitado e **pushado** na `staging` (passo 4). Só
então abra o PR — assim ele já contém o commit do bump e o título bate com os
arquivos versionados:

- **npm + docs** → `gh pr create --base main --head staging --title "release: vX.Y.Z" --body "<commits>"`
- **plugin** → `gh pr create --base main --head staging --title "release-plugin: vX.Y.Z" --body "<commits>"`
- **ambos** → use o título **`release: vX.Y.Z`** (do npm). O bump do plugin vai junto
  no mesmo PR; ao mergear, o workflow publica npm/docs **e** cria a tag `plugin-vA.B.C`
  porque a versão do plugin mudou.

### 6. Merge (opcional)

Pergunte se deve mergear. Se sim: `gh pr merge <número> --merge`. **Não crie tags
manualmente** — o workflow faz tudo no merge.

### 7. Resultado

```
## ✅ PR de release criado

- **Escopo**: <npm+docs | plugin | ambos>
- **Versões**: @blips/ui vX.Y.Z / plugin vA.B.C (conforme escopo)
- **PR**: <url>
- **Ao mergear**: <ações do workflow para o escopo>
```

## Tratamento de Erros

- PR `staging → main` já aberto: reutilize/ajuste o título e o bump.
- Plugin fora de sincronia (`plugin.json` ≠ `marketplace.json`): corrija antes de abrir o PR.
- Conflitos / comando falhando: mostre o erro e pare.
