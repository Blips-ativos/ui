---
paths:
  - "**/*.tsx"
description: Regras de construção de componentes React baseadas no guia interno da equipe.
---

# Construção de Componentes

Referência: [Confluence — Construção de Componentes](https://blips-dev.atlassian.net/wiki/spaces/BPLT/pages/830504963)

## 1. Quando Extrair um Componente

Extraia quando houver **pelo menos um** destes sinais:

- **Estado local exclusivo** — apenas um trecho da UI usa certo `useState`/`useReducer`. Extraia para que o pai não re-renderize por causa daquele estado.
- **Cálculo caro** (transformações, sorting, gráficos) que não depende do restante do componente.
- **Complexidade cognitiva** — muitos handlers e condicionais no mesmo JSX.
- **Reuso real** — mesmo layout e semântica em mais de um lugar.
- **Acessibilidade específica** (aria-*, foco, rolagem, atalhos) que poluiria o pai.
- **Limite de responsabilidade** — dados chegam "prontos" num ponto; dali em diante é só exibição.

## 2. Atualizações por Eventos, Não por `useEffect`

> Se a atualização pode acontecer em resposta a um evento (onClick, onChange, onSubmit…), faça no próprio handler — nunca num `useEffect`.

- `useEffect` serve para **sincronizar com sistemas externos** (DOM imperativo, timers, WebSocket, URL, analytics).
- Usar `useEffect` para "observar" um estado e setar outro cria **estado derivado duplicado**, renders extras e risco de loop.
- Valores derivados devem ser computados diretamente na renderização (ou com `useMemo` se caro).

```tsx
// ❌ Anti-padrão
const [query, setQuery] = useState("");
const [hasQuery, setHasQuery] = useState(false);
useEffect(() => { setHasQuery(query.trim().length > 0); }, [query]);

// ✅ Correto — valor derivado
const [query, setQuery] = useState("");
const hasQuery = query.trim().length > 0;
```

## 3. Redução de Estados

Estados que **sempre mudam juntos** devem ser unificados em um único objeto ou `useReducer`.

Manter estados separados causa:
- Inconsistência (um atualizado e outro não).
- Renders desnecessários (dois `setState` em vez de um).
- Mais complexidade para manter e revisar.

```tsx
// ❌ Dois estados que sempre mudam juntos
const [count, setCount] = useState(0);
const [lastAction, setLastAction] = useState<"inc" | "dec" | null>(null);

// ✅ Agrupados
const [state, setState] = useState({ count: 0, lastAction: null as "inc" | "dec" | null });
```

## 4. Ordem Interna de Hooks e Constantes

Seguir o princípio de **dependências progressivas** — cada camada se apoia na anterior:

1. **Hooks utilitários e customizados** — `useRouter`, `usePathname`, `useContext`, hooks custom.
2. **Hooks de estado** — `useState`, `useReducer`.
3. **Hooks de requisição** — `useQuery`, `useMutation`, hooks RTK Query.
4. **Constantes e funções** — valores derivados, `useMemo`, `useCallback`, funções internas.
5. **Hooks de efeito** — `useEffect`, `useLayoutEffect` (sempre por último antes do return).

## 5. Performance ao Componentizar

1. **Isole estados "barulhentos"** — localize o estado no menor componente que precisa dele.
2. **`React.memo` com props estáveis** — use quando o filho deve pular renders se props não mudarem. Garanta props estáveis com `useMemo` e `useCallback`.
3. **Evite recriar objetos/arrays nas props** — use `useMemo` para dados passados como prop.
4. **Divida cálculos caros** — extraia sub-blocos que dependem de transformações pesadas.
5. **Context com seleção** — evite re-render global usando context selectors ou contextos menores.
6. **Virtualização e paginação** — para listas longas, combine componentes itemizados com virtualização.
