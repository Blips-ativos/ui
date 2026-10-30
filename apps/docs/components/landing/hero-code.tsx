import { codeToHtml } from "shiki";

import { CopyButton } from "@/components/copy-button";
import { CODE_THEMES } from "@/lib/highlight-code";

const HERO_CODE = `// pnpm add @blips/ui
import { Button } from "@blips/ui/components/button";

export function Contrato() {
  return <Button>Assinar contrato</Button>;
}`;

/**
 * Bloco de código da hero, igual aos do MDX: shiki com os mesmos temas, gerado
 * no servidor (no build, já que o site é exportação estática) e com a mesma
 * marcação do rehype-pretty-code (`data-rehype-pretty-code-figure`, linhas com
 * `data-line`, cores em `--shiki-light/--shiki-dark`), então herda a moldura de
 * código do globals.css. Fica fora do typeset (`data-not-typeset`).
 */
export async function HeroCode() {
  const html = await codeToHtml(HERO_CODE, {
    lang: "tsx",
    themes: CODE_THEMES,
    defaultColor: false,
    transformers: [
      {
        line(node) {
          node.properties["data-line"] = "";
        },
      },
    ],
  });

  return (
    <figure data-rehype-pretty-code-figure="" data-not-typeset="">
      <CopyButton value={HERO_CODE} />
      <div
        // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML gerado pelo shiki no servidor a partir de uma constante deste arquivo
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
