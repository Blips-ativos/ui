import { Image } from "@blips/ai/components/image";

// Várias imagens de um mesmo pedido (generateImage com `n: 3`). SVGs fixos em
// base64 no lugar das imagens geradas.
function quadro(cor: string, forma: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="${cor}"/>${forma}</svg>`;
  return {
    base64: btoa(svg),
    mediaType: "image/svg+xml",
    uint8Array: new Uint8Array(),
  };
}

const imagens = [
  {
    alt: "Variação 1: círculo claro sobre fundo azul",
    arquivo: quadro(
      "#1e3a8a",
      '<circle cx="100" cy="100" r="60" fill="#bfdbfe"/>'
    ),
  },
  {
    alt: "Variação 2: quadrado claro sobre fundo verde",
    arquivo: quadro(
      "#14532d",
      '<rect x="45" y="45" width="110" height="110" fill="#bbf7d0"/>'
    ),
  },
  {
    alt: "Variação 3: triângulo claro sobre fundo roxo",
    arquivo: quadro(
      "#581c87",
      '<path d="M100 35 L165 160 H35Z" fill="#e9d5ff"/>'
    ),
  },
];

export default function AiImageGrade() {
  return (
    <div className="grid w-full max-w-md grid-cols-3 gap-3">
      {imagens.map(({ alt, arquivo }) => (
        <Image {...arquivo} alt={alt} key={alt} />
      ))}
    </div>
  );
}
