# bot-avatars (cópia)

Cópia **sem modificação** de `packages/bot-avatars/src` do [Jakubantalik/Libraries.dev](https://github.com/Jakubantalik/Libraries.dev)
(versão 0.2.2, commit `9f59769a7f2adecff9aec4a53bd5d4d2817c11e2`), licença MIT (ver `LICENSE` nesta pasta). O pacote não está
publicado no npm, por isso é copiado em vez de entrar como dependência.

Não edite estes arquivos: para atualizar, substitua a pasta inteira pela versão nova do upstream.
As adaptações da Blips (padrões de cor e tamanho) ficam em `src/fx/bot-avatars.tsx`.

Única alteração em relação ao upstream: `engine.ts`, `plastic.ts` e `wear.ts` ganharam uma primeira linha
`// @ts-nocheck`, porque têm variáveis não usadas que o TypeScript estrito do repo (e o de apps consumidores
com `noUnusedLocals`, já que o pacote publica o fonte) acusaria. Nenhuma outra linha foi alterada.
