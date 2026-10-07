# Image

> **Só existe na @blips/ai (v3.x da @blips/ui).** O pacote exige `@blips/ui` ^3 e
> React 19. Num repo em `@blips/ui` 2.x não há como usar: proponha a migração
> (ver `../v2-vs-v3.md`).

Import: `@blips/ai/components/image`

Mostra uma imagem **gerada por modelo** a partir do formato `GeneratedFile` do
AI SDK (`base64` + `mediaType`): um `<img>` com `src` em data URL,
`max-w-full h-auto rounded-md`. Nada mais: sem zoom, sem download, sem
carregamento.

## Quando usar (e quando não)

- **Use** para o resultado de geração de imagem (`generateImage`, tool de
  imagem) que chega como base64.
- **Não use** para imagem com URL (anexo enviado, arquivo em bucket, `FileUIPart`
  com `url`): use `<img>`/`next/image` direto ou `Attachments` da @blips/ai
  (`attachments.md`), que já trata partes de arquivo.
- **Não use** para avatar, logo ou ilustração do app: `Avatar` da @blips/ui ou
  `<img>`/`next/image` comum.
- Imagem grande ou muitas imagens: base64 inline incha o HTML e o estado do
  chat. Prefira subir o arquivo e mostrar por URL.

## Peers exigidos

Nenhum em runtime. O tipo `ImageProps` vem de `ai` (`import type
{ GeneratedFile }`): em projeto TypeScript, instale `ai` como
**devDependency**, porque a @blips/ai publica o fonte `.tsx` e o seu `tsc`
precisa resolver o tipo.

```bash
pnpm add @blips/ai
pnpm add -D ai
```

## API

Exports: `Image` e o tipo `ImageProps` = `GeneratedFile & { className?: string; alt?: string }`.

| Prop | Tipo | Padrão | Notas |
|---|---|---|---|
| `base64` | `string` | — | Obrigatória. Vira `src="data:${mediaType};base64,${base64}"`. |
| `mediaType` | `string` | — | Obrigatória (ex.: `"image/png"`). |
| `uint8Array` | `Uint8Array` | — | **Obrigatória no tipo** (vem do `GeneratedFile`), mas ignorada. Passe `new Uint8Array()` se só tiver o base64. |
| `providerMetadata` | `Record<string, JSONObject>` | — | Opcional, ignorada (não vai para o DOM). |
| `alt` | `string` | `"Imagem gerada"` | Troque por uma descrição do que foi gerado (ex.: o prompt). |
| `className` | `string` | — | Mesclado com `cn` depois de `h-auto max-w-full overflow-hidden rounded-md`. |

Não aceita outras props de `<img>` (`width`, `loading`, `onClick`…): o tipo é
só o acima.

## Composição com a @blips/ui

- Num chat: dentro de `MessageContent` do `Message` da @blips/ui, depois do
  `MessageResponse` com o texto do assistente. Quem usa o `MessageResponse` instala os peers do Streamdown e, no CSS
  global, importa `streamdown/styles.css` e `katex/dist/katex.min.css` e
  declara `@source` do `dist` do `streamdown` e dos plugins `@streamdown/*`
  (setup em `message.md`).
- Moldura com proporção fixa: `AspectRatio` da @blips/ui em volta, com
  `className="size-full object-cover"` na `Image`.
- Ação de baixar/ampliar: `MessageActions`/`MessageAction` da @blips/ai
  (`message.md`) abaixo da imagem, ou `Dialog` da @blips/ui para ampliar.
- Enquanto gera: `Skeleton` da @blips/ui no tamanho esperado, ou `Shimmer`
  (`shimmer.md`) com "Gerando imagem…".

## Exemplo v3

```tsx
import { Image } from "@blips/ai/components/image";
import { Message, MessageContent } from "@blips/ui/components/message";

type ImagemGerada = { base64: string; mediaType: string; prompt: string };

export function RespostaComImagem({ imagem }: { imagem: ImagemGerada }) {
  return (
    <Message align="start">
      <MessageContent>
        <p>Aqui está a arte do anúncio da máquina de sorvete:</p>
        <Image
          alt={imagem.prompt}
          base64={imagem.base64}
          className="max-w-sm"
          mediaType={imagem.mediaType}
          uint8Array={new Uint8Array()}
        />
      </MessageContent>
    </Message>
  );
}
```

No servidor, devolva só o que é serializável:
`{ base64: image.base64, mediaType: image.mediaType }` a partir do resultado de
`generateImage`.

## Armadilhas

- **Não espalhe o objeto do AI SDK** (`<Image {...result.image} />`). O
  `DefaultGeneratedFile` expõe `base64` e `uint8Array` como **getters** de
  classe: o spread não copia getters, e o `src` sai
  `data:image/png;base64,undefined` (o TypeScript não acusa). Passe os campos
  explicitamente.
- O mesmo vale ao mandar o objeto do servidor para o cliente: getters não
  serializam. Extraia `base64` e `mediaType` antes.
- `uint8Array` é obrigatória no tipo mesmo sem uso: `new Uint8Array()` basta.
- `alt` padrão é genérico ("Imagem gerada"): para acessibilidade, passe o
  prompt ou uma descrição.
- Em Next.js, a regra `@next/next/no-img-element` pode acusar no seu lint só
  se você usar `<img>` direto; o `Image` da @blips/ai não passa pelo otimizador
  do `next/image` (data URL não precisa).
- Nome `Image` colide com `next/image` e com o construtor global `Image` do
  navegador: se precisar dos dois, importe com alias
  (`import { Image as ImagemGerada } from "@blips/ai/components/image"`).
