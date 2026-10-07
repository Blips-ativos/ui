# SchemaDisplay

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/schema-display`

Cartão de documentação de um endpoint HTTP: método colorido (`GET`, `POST`,
`PUT`, `PATCH`, `DELETE`) + caminho com os parâmetros de rota (`{id}`)
destacados, descrição e seções recolhíveis de **Parâmetros**, **Corpo da
requisição** e **Resposta**, com propriedades aninhadas (objetos e arrays) em
árvore. Passe os dados na raiz e ele monta tudo; ou componha as partes à mão.

## Quando usar (e quando não)

- **Use** quando o agente mostra ou propõe uma API: a tool HTTP que ele vai
  chamar, o contrato de um endpoint que gerou, a documentação de uma
  integração consultada.
- **Não use** para os argumentos de uma tool call do chat: isso é o `Tool`
  (`tool.md`), que já mostra entrada e saída em JSON.
- **Não use** para JSON cru de exemplo: isso é `CodeBlock` (`code-block.md`)
  com `language="json"`. O `SchemaDisplayExample` é só um `<pre>` sem realce.
- **Não use** como página de referência de API completa (dezenas de
  endpoints): o componente é um cartão por endpoint, sem busca nem navegação.

## Peers exigidos

Nenhum além da @blips/ai (usa `Badge` e `Collapsible` da @blips/ui e
`@phosphor-icons/react`).

```bash
pnpm add @blips/ai
```

O componente não importa `ai`: não é preciso instalá-lo. Se o seu código
tipar dados com tipos do AI SDK, `ai` é peer opcional e só de tipos (sempre
`import type`), e num projeto TypeScript entra como **devDependency**
(`pnpm add -D ai`), porque a @blips/ai publica o fonte `.tsx`.

## API

Formatos dos dados (tipos internos, não exportados; descreva-os inline):

```ts
type SchemaParameter = {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
  location?: "path" | "query" | "header";
};

type SchemaProperty = {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
  properties?: SchemaProperty[]; // objeto aninhado
  items?: SchemaProperty;        // item de array (renderizado como `nome[]`)
};
```

| Export | Props | Notas |
|---|---|---|
| `SchemaDisplay` | `HTMLAttributes<HTMLDivElement>` + `method: "GET" \| "POST" \| "PUT" \| "PATCH" \| "DELETE"`, `path: string`, `description?: string`, `parameters?: SchemaParameter[]`, `requestBody?: SchemaProperty[]`, `responseBody?: SchemaProperty[]`, `requiredLabel?: string` (`"obrigatório"`) | Raiz e contexto. **Sem `children`**, monta o layout padrão (header, descrição se houver, e só as seções com itens). Com `children`, renderiza só eles dentro da moldura `rounded-lg border bg-background`. |
| `SchemaDisplayHeader` | `HTMLAttributes<HTMLDivElement>` | Faixa `flex gap-3 border-b px-4 py-3`. |
| `SchemaDisplayMethod` | Props do `Badge` | Mostra `method` do contexto (ou `children`), com a cor do método. |
| `SchemaDisplayPath` | `HTMLAttributes<HTMLSpanElement>` | Mostra `path` do contexto em `font-mono`, com `{param}` em azul (nós React, sem `innerHTML`). `children` substitui. |
| `SchemaDisplayDescription` | `HTMLAttributes<HTMLParagraphElement>` | Mostra `description` do contexto (ou `children`). |
| `SchemaDisplayContent` | `HTMLAttributes<HTMLDivElement>` | Contêiner `divide-y` das seções. |
| `SchemaDisplayParameters` | Props do `Collapsible` + `label?: ReactNode` (`"Parâmetros"`) | Seção aberta por padrão, com `Badge` de contagem. Sem `children`, lista `parameters` do contexto. |
| `SchemaDisplayParameter` | `HTMLAttributes<HTMLDivElement>` + `SchemaParameter` + `requiredLabel?: string` | Linha: nome mono, `Badge` de tipo, de `location` e o selo vermelho de obrigatório. |
| `SchemaDisplayRequest` | Props do `Collapsible` + `label?: ReactNode` (`"Corpo da requisição"`) | Sem `children`, lista `requestBody`. |
| `SchemaDisplayResponse` | Props do `Collapsible` + `label?: ReactNode` (`"Resposta"`) | Sem `children`, lista `responseBody`. |
| `SchemaDisplayProperty` | `HTMLAttributes<HTMLDivElement>` + `SchemaProperty` + `depth?: number` (`0`), `requiredLabel?: string` | Com `properties`/`items`, vira `Collapsible` (aberto até `depth < 2`) e recursa; recuo de `40 + depth * 16` px. |
| `SchemaDisplayBody` | `HTMLAttributes<HTMLDivElement>` | `div` `divide-y` (para montar à mão). |
| `SchemaDisplayExample` | `HTMLAttributes<HTMLPreElement>` | `<pre>` `bg-muted font-mono text-sm`, sem realce. |

Todos os tipos de props são exportados (`SchemaDisplayProps`,
`SchemaDisplayParameterProps`…).

## Composição com a @blips/ui

- Já usa `Badge` e `Collapsible` (Base UI) da @blips/ui; o estado aberto
  vem de `data-panel-open` (v3), não de `data-[state=open]`.
- Num chat: dentro de `MessageContent` do `Message` da @blips/ui, abaixo do
  `MessageResponse` que explica a API. Quem usa o `MessageResponse` instala os peers do Streamdown e, no CSS
  global, importa `streamdown/styles.css` e `katex/dist/katex.min.css` e
  declara `@source` do `dist` do `streamdown` e dos plugins `@streamdown/*`
  (setup em `message.md`).
- Exemplo de payload com realce: `CodeBlock` (`code-block.md`) logo abaixo do
  cartão, em vez de `SchemaDisplayExample`.
- Vários endpoints: um `SchemaDisplay` por endpoint numa pilha `flex flex-col
  gap-4`, ou num `Accordion` da @blips/ui se forem muitos.

## Exemplo v3

```tsx
import { SchemaDisplay } from "@blips/ai/components/schema-display";

export function EndpointSegundaVia() {
  return (
    <SchemaDisplay
      description="Gera a segunda via do boleto de uma parcela em aberto."
      method="POST"
      parameters={[
        {
          name: "contratoId",
          type: "string",
          location: "path",
          required: true,
          description: "Identificador do contrato.",
        },
        {
          name: "canal",
          type: "string",
          location: "query",
          description: "Por onde enviar: whatsapp ou email.",
        },
      ]}
      path="/contratos/{contratoId}/boletos/segunda-via"
      requestBody={[
        {
          name: "parcela",
          type: "number",
          required: true,
          description: "Número da parcela.",
        },
        {
          name: "destinatario",
          type: "object",
          properties: [
            { name: "nome", type: "string", required: true },
            { name: "email", type: "string" },
          ],
        },
      ]}
      responseBody={[
        { name: "linhaDigitavel", type: "string", required: true },
        { name: "vencimento", type: "string", description: "Data ISO 8601." },
        {
          name: "avisos",
          type: "array",
          items: { name: "aviso", type: "string" },
        },
      ]}
    />
  );
}
```

Montado à mão (ex.: só a resposta, com título próprio):

```tsx
"use client";

import {
  SchemaDisplay,
  SchemaDisplayContent,
  SchemaDisplayHeader,
  SchemaDisplayMethod,
  SchemaDisplayPath,
  SchemaDisplayResponse,
} from "@blips/ai/components/schema-display";

export function SoResposta() {
  return (
    <SchemaDisplay
      method="GET"
      path="/clientes/{id}/recebiveis"
      responseBody={[{ name: "total", type: "number", required: true }]}
    >
      <SchemaDisplayHeader>
        <SchemaDisplayMethod />
        <SchemaDisplayPath />
      </SchemaDisplayHeader>
      <SchemaDisplayContent>
        <SchemaDisplayResponse label="Retorno (200)" />
      </SchemaDisplayContent>
    </SchemaDisplay>
  );
}
```

## Armadilhas

- **`children` na raiz substitui o layout inteiro.** Passou um filho, perdeu
  header e seções automáticas: monte tudo à mão.
- Só os 5 métodos tipados (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`); `HEAD`/
  `OPTIONS` não compilam.
- O título de cada seção é `label`, **não** `title` (que é o atributo HTML de
  tooltip). Selo de obrigatório: `requiredLabel` (na raiz vale para tudo; numa
  propriedade, vale para ela e as aninhadas).
- `name` é a `key` da lista: dois parâmetros ou propriedades com o mesmo nome
  no mesmo nível geram aviso de chave duplicada no React.
- As cores dos métodos e do selo de obrigatório usam paleta Tailwind fixa
  (`bg-green-100`, `bg-red-100`…), não tokens: é intencional, como no upstream.
- `SchemaDisplayExample` não realça nem formata: passe a string já com
  `JSON.stringify(obj, null, 2)`, ou use `CodeBlock`.
- O módulo é `"use client"` (contexto e `Collapsible`): pode ser renderizado
  de um Server Component com dados serializáveis, como no primeiro exemplo.
