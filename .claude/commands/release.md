---
description: Cria o PR de release (staging → main) com a convenção de nome que dispara a tag e o deploy
allowed-tools: Bash(git *), Bash(gh *), Bash(jq *), Bash(node *), Edit, AskUserQuestion
---

## Contexto do Release

Branch atual:
!`git branch --show-current`

Commits em staging que não estão em main (apenas commits, ignora não commitados):
!`git fetch origin main staging --quiet && git log --oneline origin/main..origin/staging`

Última tag existente:
!`git tag -l "v*" --sort=-version:refname | head -1`

Versão atual do @blips/ui:
!`node -p "require('./packages/ui/package.json').version"`

## Sua Tarefa: abrir o PR de release

O fluxo aqui é **determinístico pelo nome do PR**: este comando só cria o PR
`staging → main` com o título `release: vX.Y.Z`. A **tag**, a **publicação no
npm** e o **deploy do docs no Firebase** são feitos pelo workflow
`.github/workflows/release.yml` **ao mergear esse PR na `main`**.

### 1. Validações Iniciais

- [ ] Está na branch `staging`
- [ ] Existem commits em staging que não estão em main

**IMPORTANTE**: ignore arquivos não commitados — o release considera só commits.
Se alguma validação falhar, informe e pare.

### 2. Analisar Commits e Recomendar Versão

Analise os commits pendentes por conventional commits:

| Tipo de commit | Incremento |
| --- | --- |
| `fix:`, `perf:`, `refactor:`, `style:`, `docs:`, `chore:`, `test:` | **PATCH** (x.y.Z) |
| `feat:` | **MINOR** (x.Y.0) |
| `BREAKING CHANGE:` ou `!:` (ex.: `feat!:`) | **MAJOR** (X.0.0) |

Prioridade: qualquer `BREAKING`/`!:` → MAJOR; senão qualquer `feat:` → MINOR;
senão → PATCH. Calcule a partir da última tag (ou da versão do package.json se
não houver tag).

### 3. Perguntar a Versão

Use `AskUserQuestion` com as 3 opções calculadas (PATCH/MINOR/MAJOR), a
recomendada primeiro e marcada como "(Recomendado)".

### 4. Bump da versão do pacote

A versão publicada vem do `packages/ui/package.json`, então atualize-a para a
versão escolhida (sem o `v`) e commite na `staging`:

```
# edite packages/ui/package.json -> "version": "X.Y.Z"
git add packages/ui/package.json
git commit -m "chore(release): vX.Y.Z"
git push origin staging
```

### 5. Criar o Pull Request

Título **obrigatoriamente** na convenção que o workflow consome:

```
gh pr create --base main --head staging \
  --title "release: vX.Y.Z" \
  --body "<lista dos commits incluídos>"
```

> O workflow valida `startsWith(title, 'release: v')` e extrai a versão do
> título. Não mude esse formato.

### 6. Merge (opcional)

Pergunte se deve mergear agora. Se sim:

```
gh pr merge <número> --merge
```

Ao mergear, o workflow cria a tag `vX.Y.Z` + release, publica o `@blips/ui` no
npm e faz o deploy do docs no Firebase Hosting — não crie a tag manualmente.

### 7. Resultado

```
## ✅ PR de release criado

- **Versão**: vX.Y.Z
- **PR**: <url>
- **Ao mergear**: tag vX.Y.Z + release + publish npm + deploy docs (Firebase)
```

## Tratamento de Erros

- PR já existente para `staging → main`: reutilize-o (e ajuste o título/bump se a versão mudou).
- Conflitos ou comando falhando: mostre o erro e pare.
