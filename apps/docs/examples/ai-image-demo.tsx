import { Image } from "@blips/ai/components/image";

// Imagem no formato do `GeneratedFile` do AI SDK (resultado de generateImage).
// Aqui é um SVG fixo em base64, para o exemplo não chamar nenhum modelo.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300">
<defs><linearGradient id="c" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#fde68a"/><stop offset="1" stop-color="#fb923c"/>
</linearGradient></defs>
<rect width="480" height="300" fill="url(#c)"/>
<circle cx="370" cy="80" r="40" fill="#fff7ed"/>
<path d="M0 230 Q120 170 240 220 T480 210 V300 H0Z" fill="#9a3412"/>
<path d="M0 260 Q140 220 280 255 T480 250 V300 H0Z" fill="#7c2d12"/>
</svg>`;

const imagem = {
  base64: btoa(svg),
  mediaType: "image/svg+xml",
  uint8Array: new Uint8Array(),
};

export default function AiImageDemo() {
  return (
    <Image
      {...imagem}
      alt="Pôr do sol sobre colinas, em tons de laranja"
      className="w-full max-w-md border"
    />
  );
}
