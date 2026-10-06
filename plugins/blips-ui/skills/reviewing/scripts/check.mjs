#!/usr/bin/env node
/**
 * Check mecânico da blips-ui:reviewing — bateria determinística de violações.
 * Uso: node check.mjs <dir-do-app>
 * Saída: JSON { react, blipsUi: {version, track}, blipsAi: {version, declared},
 *   findings: [{file, line, rule, dimension, severity}] }
 * Trilha da lib: "v2" (Radix) | "v3" (Base UI) | null (não detectada). Checks de API
 * (asChild/render, data-state, sufixo Icon, componentes só-v3) dependem da trilha.
 * Heurísticas marcadas com verify:true exigem confirmação do revisor.
 * Dimensões: imports, icones, api-versao, tailwind, formatacao, a11y, anti-slop,
 * tipografia, motion, construcao e blips-ai (só quando o app tem @blips/ai:
 * subpath, peers por componente, `ai` só tipo, chat recriado, CSS na ordem). Severidades: "bloqueante" | "aviso".
 * Princípio: checks de alta precisão (literais) são bloqueante; heurísticos
 * (verify:true) são aviso — o revisor promove a bloqueante se confirmar.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.argv[2];
if (!root) {
  console.error("uso: node check.mjs <dir-do-app>");
  process.exit(2);
}

const SKIP = new Set([
  "node_modules",
  ".next",
  "dist",
  "out",
  ".git",
  ".turbo",
  "coverage",
]);
const findings = [];
const add = (file, line, rule, dimension, severity, verify = false) =>
  findings.push({
    file,
    line,
    rule,
    dimension,
    severity,
    ...(verify && { verify: true }),
  });

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) yield* walk(p);
    else yield p;
  }
}

// --- contexto: versão do React e dependências declaradas ---
const pkgPath = join(root, "package.json");
const pkg = existsSync(pkgPath)
  ? JSON.parse(readFileSync(pkgPath, "utf8"))
  : {};
const deps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) };
const reactMajor =
  Number.parseInt(
    String(deps.react ?? "").replace(/[^\d]*(\d+).*/, "$1"),
    10
  ) || null;

// --- trilha da @blips/ui: v2.x (Radix) ou v3.x (Base UI) ---
// 1) node_modules/@blips/ui/package.json: deps dizem a primitiva (mais confiável que o número,
//    que pode não ter sido bumpado num workspace); 2) version instalada; 3) range do package.json.
function detectBlipsUi() {
  const declared = String(deps["@blips/ui"] ?? "");
  const libPkgPath = join(root, "node_modules", "@blips", "ui", "package.json");
  let installed = null;
  let primitive = null;
  if (existsSync(libPkgPath)) {
    try {
      const lib = JSON.parse(readFileSync(libPkgPath, "utf8"));
      installed = lib.version ?? null;
      const libDeps = {
        ...(lib.dependencies ?? {}),
        ...(lib.peerDependencies ?? {}),
      };
      if (libDeps["@base-ui/react"]) primitive = "v3";
      else if (Object.keys(libDeps).some((d) => d.startsWith("@radix-ui/")))
        primitive = "v2";
    } catch {}
  }
  const major = (v) =>
    Number.parseInt(String(v ?? "").replace(/[^\d]*(\d+).*/, "$1"), 10) || null;
  const m = major(installed) ?? major(declared);
  const track = primitive ?? (m === 3 ? "v3" : m === 2 ? "v2" : null);
  return { version: installed ?? (declared || null), track };
}
const blipsUi = detectBlipsUi();
const isV3 = blipsUi.track === "v3";
const isV2 = blipsUi.track === "v2";
const V3_ONLY = [
  "attachment",
  "bubble",
  "combobox",
  "direction",
  "item",
  "marker",
  "message",
  "message-scroller",
  "native-select",
  "questionnaire",
  "toast",
];
// data-state de primitiva (Radix). Exceções legítimas na v3: data-state="selected" (TableRow)
// e data-state="expanded|collapsed" (Sidebar), que são atributos da própria lib.
const RADIX_STATE_RE =
  /data-\[state=(open|closed|checked|unchecked|indeterminate|active|inactive|on|off|delayed-open|instant-open)\]|\[data-state=["']?(open|closed|checked|unchecked|indeterminate|active|on|off)/;
const BASEUI_STATE_RE =
  /\b(group-|peer-|has-|in-)?data-(open|closed|checked|unchecked|popup-open|panel-open|pressed|starting-style|ending-style)(\/[\w-]+)?:/;

// --- @blips/ai (componentes de IA sobre a @blips/ui v3.x) ---
// Regras: import por subpath (não existe barrel), peers opcionais declarados por
// componente importado, `ai` só como tipo, e não recriar bolha/mensagem/lista de
// chat que a @blips/ui (Message/Bubble) e a @blips/ai (Conversation/MessageResponse)
// já têm. Só roda quando o app declara (ou tem instalada) a @blips/ai.
const aiPkgPath = join(root, "node_modules", "@blips", "ai", "package.json");
const aiPkg = (() => {
  if (!existsSync(aiPkgPath)) return null;
  try {
    return JSON.parse(readFileSync(aiPkgPath, "utf8"));
  } catch {
    return null;
  }
})();
const hasAi = Boolean(deps["@blips/ai"]) || aiPkg !== null;
const blipsAi = {
  version: aiPkg?.version ?? (deps["@blips/ai"] || null),
  declared: Boolean(deps["@blips/ai"]),
};
// Peers por subpath (fase 1). Com node_modules/@blips/ai presente, o mapa é
// recalculado a partir do fonte instalado (aiPeersFor), então novos componentes
// entram sem mexer aqui.
const STREAMDOWN = [
  "streamdown",
  "@streamdown/code",
  "@streamdown/math",
  "@streamdown/mermaid",
  "@streamdown/cjk",
];
const AI_PEERS_STATIC = {
  "components/chain-of-thought": [],
  "components/code-block": ["shiki"],
  "components/confirmation": ["ai"],
  "components/context": ["ai"],
  "components/conversation": ["ai"],
  "components/inline-citation": [],
  "components/message": [...STREAMDOWN, "ai"],
  "components/prompt-input": ["ai"],
  "components/reasoning": [...STREAMDOWN],
  "components/shimmer": [],
  "components/sources": [],
  "components/suggestion": [],
  "components/tool": ["shiki", "ai"],
  "fx/border-beam": [],
  "fx/thinking-orbs": [],
};
const aiExports = aiPkg?.exports
  ? Object.keys(aiPkg.exports)
      .filter((k) => k.startsWith("./"))
      .map((k) => k.slice(2))
  : null;
const moduleRoot = (spec) =>
  spec.startsWith("@")
    ? spec.split("/").slice(0, 2).join("/")
    : spec.split("/")[0];
const aiPeerCache = new Map();
// Peers opcionais que o subpath importa, seguindo imports relativos do pacote.
function aiPeersFor(subpath) {
  if (!aiPkg) return AI_PEERS_STATIC[subpath] ?? [];
  if (aiPeerCache.has(subpath)) return aiPeerCache.get(subpath);
  const optional = new Set(Object.keys(aiPkg.peerDependenciesMeta ?? {}));
  const target = aiPkg.exports?.[`./${subpath}`];
  const found = new Set();
  const seen = new Set();
  const base = join(root, "node_modules", "@blips", "ai");
  const visit = (abs) => {
    if (seen.has(abs) || !existsSync(abs)) return;
    seen.add(abs);
    const src = readFileSync(abs, "utf8");
    for (const m of src.matchAll(/from\s+["']([^"']+)["']/g)) {
      const spec = m[1];
      if (spec.startsWith(".")) {
        const rel = join(abs, "..", spec);
        for (const ext of ["", ".tsx", ".ts", "/index.tsx", "/index.ts"])
          if (existsSync(rel + ext) && statSync(rel + ext).isFile()) {
            visit(rel + ext);
            break;
          }
      } else if (optional.has(moduleRoot(spec))) found.add(moduleRoot(spec));
    }
  };
  if (typeof target === "string") visit(join(base, target));
  const peers = target ? [...found] : (AI_PEERS_STATIC[subpath] ?? []);
  aiPeerCache.set(subpath, peers);
  return peers;
}
// Tipos do `ai` que aparecem nas props da @blips/ai: importá-los sem `type`
// cria import de runtime de um pacote que o app pode nem ter em produção.
const AI_TYPE_NAMES = new Set([
  "UIMessage",
  "UIMessagePart",
  "UIDataTypes",
  "UITools",
  "UIToolInvocation",
  "ChatStatus",
  "ChatTransport",
  "ChatRequestOptions",
  "CreateUIMessage",
  "ToolUIPart",
  "DynamicToolUIPart",
  "TextUIPart",
  "ReasoningUIPart",
  "SourceUrlUIPart",
  "SourceDocumentUIPart",
  "FileUIPart",
  "StepStartUIPart",
  "DataUIPart",
  "LanguageModelUsage",
  "InferUITools",
  "ToolSet",
]);
// Nomes de componente que indicam bolha/mensagem/lista de chat recriada à mão.
const CHAT_REBUILD_RE =
  /(?:function|const|let)\s+(ChatBubble|MessageBubble|ChatMessage|ChatMessageItem|MessageItem|MessageList|ChatList|ChatMessages|ChatHistory|ChatWindow|Bubble|Message|Conversation)\b\s*[=(:<]/;
// Arquivo que compõe a casca oficial (não está recriando nada).
const CHAT_COMPOSE_RE =
  /from\s+["'](@blips\/ui\/components\/(message|bubble|message-scroller)|@blips\/ai\/components\/(message|conversation))["']/;
const aiImports = new Map(); // subpath -> {file, line}
const aiCssImports = []; // {file, line}
let aiUndeclaredReported = false;

// deps embutidas na lib que o app só pode importar se declarar como diretas
const LIB_TRANSITIVES = [
  "sonner",
  "react-hook-form",
  "zod",
  "recharts",
  "date-fns",
  "cmdk",
  "vaul",
  "next-themes",
];

if (deps["lucide-react"])
  add(
    "package.json",
    0,
    "lucide-react em dependencies — Phosphor é o padrão",
    "icones",
    "bloqueante"
  );
for (const banned of ["react-icons", "@heroicons/react"])
  if (deps[banned])
    add(
      "package.json",
      0,
      `${banned} em dependencies — Phosphor é o padrão`,
      "icones",
      "bloqueante"
    );

for (const cfg of [
  "tailwind.config.js",
  "tailwind.config.ts",
  "tailwind.config.cjs",
  "tailwind.config.mjs",
])
  if (existsSync(join(root, cfg)))
    add(
      cfg,
      0,
      "tailwind.config.* presente — v4 é CSS-first (se for repo em coexistência v3, marcar para o revisor confirmar)",
      "tailwind",
      "bloqueante",
      true
    );

// tokens da lib que não podem ser redefinidos no CSS do app
const LIB_TOKENS = [
  "--primary",
  "--background",
  "--foreground",
  "--radius",
  "--card",
  "--muted",
  "--accent",
  "--border",
  "--secondary",
  "--destructive",
];

// --- anti-slop: constantes (hexes/CDNs/emoji) ---
// Fonte: nexu-io/open-design (Apache 2.0) — craft/anti-ai-slop.md
// Indigo/violet do Tailwind é o "tell" textual de IA — o tema Blips só tem
// amarelo (#fcba28) como marca; nenhum desses hexes pode aparecer no produto.
// Os 7 primeiros são os "seven cardinal sins" da fonte (anti-ai-slop.md L18-19);
// os 3 últimos são a família estendida (indigo-400/violet-700/violet-400).
const AI_DEFAULT_INDIGO = [
  "#6366f1",
  "#4f46e5",
  "#4338ca",
  "#3730a3",
  "#8b5cf6",
  "#7c3aed",
  "#a855f7",
  "#818cf8",
  "#6d28d9",
  "#a78bfa",
];
// CDNs de placeholder são frágeis e óbvios; usar imagens reais/placeholder shipado.
const PLACEHOLDER_CDN =
  /(unsplash\.com|placehold\.co|via\.placeholder|dummyimage\.com|placekitten\.com|picsum\.photos|loremflickr\.com)/i;
// Faixa de emojis usados como ícone de feature (✨🚀🎯⚡🔥💡 e vizinhos no plano de símbolos).
const EMOJI_RE =
  /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}]|\u{FE0F}/u;
// hex cru (não em arbitrary value) p/ contagem por arquivo — >12 = tokens ignorados.
const RAW_HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;
// Elisão de código em entrega: o componente sai pela metade. Alta precisão.
// Fonte: nexu-io/open-design (Apache 2.0) — skills/output-skill/SKILL.md.
const CODE_ELISION_RE =
  /\/\/\s*\.\.\.|\/\*\s*\.\.\.\s*\*\/|\/\/\s*(resto d|implemente?\b|continua o padr|similar ao acima|adicione mais|c[óo]digo (restante|acima)|demais (campos|casos|itens))/i;
const PROSE_ELISION_RE =
  /\b(o resto segue o mesmo padr[ãa]o|similarmente para os demais|por brevidade|e assim por diante|deixo como exerc[íi]cio|posso continuar se quiser)\b/i;
const LOREM_RE = /\blorem ipsum\b/i;

const files = [...walk(root)];
for (const abs of files) {
  const file = relative(root, abs);
  const ext = file.split(".").pop();
  if (!["tsx", "ts", "jsx", "js", "css", "mjs"].includes(ext)) continue;
  const text = readFileSync(abs, "utf8");
  const lines = text.split("\n");

  lines.forEach((l, i) => {
    const n = i + 1;
    if (ext === "css") {
      // @source para o Streamdown (usado pela @blips/ai) é legítimo: conteúdo
      // fora da auto-detecção, exigido pelo README do pacote.
      if (/^\s*@source\b/.test(l) && !/streamdown/.test(l))
        add(
          file,
          n,
          "@source defensivo — auto-detecção v4 cobre o app",
          "tailwind",
          "aviso"
        );
      for (const t of LIB_TOKENS)
        if (new RegExp(`${t}\\s*:`).test(l) && !file.includes("globals-da-lib"))
          add(
            file,
            n,
            `token da lib redefinido (${t}) — tema é fonte única`,
            "tailwind",
            "bloqueante"
          );
      // anti-slop: indigo/violet do Tailwind também é banido no CSS (o "AI tell").
      for (const hex of AI_DEFAULT_INDIGO)
        if (l.toLowerCase().includes(hex))
          add(
            file,
            n,
            `cor indigo/violet de IA (${hex}) — tema Blips só usa amarelo de marca`,
            "anti-slop",
            "bloqueante"
          );
      return;
    }
    // imports da lib conforme React
    if (/from\s+["']@blips\/ui["']/.test(l) && reactMajor && reactMajor >= 18)
      add(
        file,
        n,
        "barrel import em React 18/19 — subpath obrigatório (barrel quebra App Router)",
        "imports",
        "bloqueante"
      );
    if (/from\s+["']@blips\/ui\/components\//.test(l) && reactMajor === 17)
      add(
        file,
        n,
        "subpath em React 17 — barrel obrigatório (subpath falha tsc)",
        "imports",
        "bloqueante"
      );
    if (/from\s+["']@blips\/ui\/(src|dist)\//.test(l))
      add(file, n, "import de caminho interno da lib", "imports", "bloqueante");
    if (/from\s+["']lucide-react["']/.test(l))
      add(
        file,
        n,
        "import de lucide-react — usar Phosphor",
        "icones",
        "bloqueante"
      );

    // --- @blips/ai: imports ---
    if (/(?:from\s+|import\s+)["']@blips\/ai["']/.test(l))
      add(
        file,
        n,
        'import do barrel "@blips/ai" — não existe; usar @blips/ai/components/<x> ou @blips/ai/fx/<x>',
        "blips-ai",
        "bloqueante"
      );
    const aiSub = l.match(/(?:from\s+|import\s+)["']@blips\/ai\/([^"']+)["']/);
    if (aiSub) {
      const sub = aiSub[1];
      if (!deps["@blips/ai"] && !aiUndeclaredReported) {
        aiUndeclaredReported = true;
        add(
          file,
          n,
          "import de @blips/ai sem a dependência no package.json do app",
          "blips-ai",
          "bloqueante"
        );
      }
      if (/^(src|dist)\//.test(sub))
        add(
          file,
          n,
          `import de caminho interno (@blips/ai/${sub}) — usar o subpath publicado`,
          "blips-ai",
          "bloqueante"
        );
      else if (
        sub !== "styles.css" &&
        sub !== "package.json" &&
        !(aiExports ?? Object.keys(AI_PEERS_STATIC)).includes(sub)
      )
        add(
          file,
          n,
          `subpath @blips/ai/${sub} não existe nos exports do pacote`,
          "blips-ai",
          "bloqueante"
        );
      else if (sub !== "styles.css" && !aiImports.has(sub))
        aiImports.set(sub, { file, line: n });
    }
    if (hasAi) {
      if (/<Message\b[^>]*\sfrom=/.test(l))
        add(
          file,
          n,
          "<Message from=…> é API do AI Elements — na @blips/ui o lado é align={messageAlign(role)}",
          "blips-ai",
          "bloqueante"
        );
      if (/from\s+["'][^"']*components\/ai-elements\//.test(l))
        add(
          file,
          n,
          "cópia do AI Elements (components/ai-elements) num app com @blips/ai — usar @blips/ai/components/<x> (uma família de chat só)",
          "blips-ai",
          "bloqueante"
        );
      if (
        /from\s+["'](react-markdown|marked|markdown-to-jsx|markdown-it)["']/.test(
          l
        )
      )
        add(
          file,
          n,
          "renderizador de markdown próprio num app com @blips/ai — resposta do modelo é MessageResponse (Streamdown)",
          "blips-ai",
          "aviso",
          true
        );
      if (/scrollIntoView\(|scrollTop\s*=\s*[^;]*scrollHeight/.test(l))
        add(
          file,
          n,
          "rolagem de chat à mão (scrollIntoView/scrollTop) — usar Conversation da @blips/ai (gruda no fim) ou MessageScroller da @blips/ui",
          "blips-ai",
          "aviso",
          true
        );
      if (
        /\b(role|from|sender|author)\s*===?\s*["'](user|assistant)["']/.test(
          l
        ) &&
        /\b(bg-|justify-end|ml-auto|ms-auto|self-end|items-end|flex-row-reverse|rounded-)/.test(
          l
        )
      )
        add(
          file,
          n,
          "balão/alinhamento de mensagem por role à mão — usar Message align={messageAlign(role)} + Bubble da @blips/ui",
          "blips-ai",
          "aviso",
          true
        );
    }

    // --- API por trilha da lib (v2.x Radix × v3.x Base UI) ---
    if (isV3) {
      if (/\basChild\b/.test(l))
        add(
          file,
          n,
          "asChild em repo v3.x (Base UI) — prop não existe; usar render={<El />} (Button com elemento não-button: nativeButton={false})",
          "api-versao",
          "bloqueante"
        );
      if (RADIX_STATE_RE.test(l))
        add(
          file,
          n,
          "seletor data-state do Radix em repo v3.x — Base UI emite data-open/data-closed/data-checked/data-popup-open (data-state=selected/collapsed são exceções)",
          "api-versao",
          "aviso",
          true
        );
      if (/\bdelayDuration\s*=/.test(l))
        add(
          file,
          n,
          "TooltipProvider delayDuration em repo v3.x — a prop é delay",
          "api-versao",
          "bloqueante"
        );
      if (/<Separator\b[^>]*\bdecorative\b/.test(l))
        add(
          file,
          n,
          'Separator decorative em repo v3.x — prop removida (use role="none"/aria-hidden)',
          "api-versao",
          "bloqueante"
        );
      if (/from\s+["']vaul["']/.test(l) || /from\s+["']@radix-ui\//.test(l))
        add(
          file,
          n,
          "import de primitiva Radix/vaul em repo v3.x — a lib usa Base UI",
          "api-versao",
          "aviso",
          true
        );
      if (/checked=\{?[^}]*["']indeterminate["']/.test(l))
        add(
          file,
          n,
          'checked="indeterminate" em repo v3.x — checked é boolean; use a prop indeterminate',
          "api-versao",
          "bloqueante"
        );
    }
    if (isV2) {
      if (
        /<[A-Z]\w*[^>]*\srender=\{\s*</.test(l) ||
        /^\s*render=\{\s*</.test(l)
      )
        add(
          file,
          n,
          "render={<El />} em repo v2.x (Radix) — usar asChild com o elemento como filho",
          "api-versao",
          "bloqueante",
          true
        );
      if (BASEUI_STATE_RE.test(l))
        add(
          file,
          n,
          "seletor de estado do Base UI (data-open:/data-checked:…) em repo v2.x — Radix emite data-[state=open]/data-[state=checked]",
          "api-versao",
          "aviso",
          true
        );
      const v3only = l.match(
        /from\s+["']@blips\/ui\/components\/([a-z-]+)["']/
      );
      if (v3only && V3_ONLY.includes(v3only[1]))
        add(
          file,
          n,
          `@blips/ui/components/${v3only[1]} só existe na v3.x — não existe em repo v2.x`,
          "api-versao",
          "bloqueante"
        );
    }
    // deps fantasmas
    for (const t of LIB_TRANSITIVES) {
      if (new RegExp(`from\\s+["']${t}(/|["'])`).test(l) && !deps[t])
        add(
          file,
          n,
          `import de ${t} sem dependência direta no package.json (dep fantasma)`,
          "imports",
          "bloqueante"
        );
    }
    // tailwind
    if (/(bg|text|border|ring|fill|stroke)-\[#[0-9a-fA-F]{3,8}\]/.test(l))
      add(
        file,
        n,
        "cor hardcoded em arbitrary value — usar token semântico",
        "tailwind",
        "bloqueante"
      );
    if (/hsl\(var\(--/.test(l))
      add(
        file,
        n,
        "hsl(var(--…)) — tokens da lib são cor completa; usar var(--…)",
        "tailwind",
        "bloqueante"
      );
    // formatação
    if (
      /Intl\.(NumberFormat|DateTimeFormat|RelativeTimeFormat)\(\s*(undefined|\)|,)/.test(
        l
      )
    )
      add(
        file,
        n,
        "Intl sem locale explícito — 'pt-BR' obrigatório",
        "formatacao",
        "bloqueante"
      );
    if (/\.toLocale(String|DateString|TimeString)\(\s*\)/.test(l))
      add(
        file,
        n,
        "toLocale*() sem locale explícito",
        "formatacao",
        "bloqueante"
      );
    if (/R\$\s*[`$"'{]/.test(l) || /["'`]R\$\s/.test(l))
      add(
        file,
        n,
        "moeda montada à mão com 'R$' — usar formatter BRL central",
        "formatacao",
        "bloqueante",
        true
      );
    if (/weight\s*=\s*["'{]/.test(l) && /@phosphor-icons\/react/.test(text))
      add(
        file,
        n,
        "weight passado em ícone Phosphor — regular (default) é o padrão",
        "icones",
        "aviso"
      );

    // --- a11y (por linha) ---
    // tabindex positivo reordena contra o DOM — sempre errado. Alta precisão.
    if (/tab[Ii]ndex\s*=\s*["'{]?\s*[1-9]/.test(l))
      add(
        file,
        n,
        "tabindex positivo — reordena contra o DOM; conserte a ordem do DOM",
        "a11y",
        "bloqueante"
      );
    // remoção de outline de foco sem substituto na mesma linha — falha 2.4.7 (heurística).
    if (
      /(outline:\s*none|outline-none|outline-hidden)/.test(l) &&
      !/focus-visible|focus:|ring-/.test(l)
    )
      add(
        file,
        n,
        "outline de foco removido sem substituto (focus-visible/ring) — falha 2.4.7",
        "a11y",
        "aviso",
        true
      );

    // --- anti-slop (por linha) ---
    // Fonte: nexu-io/open-design (Apache 2.0) — craft/anti-ai-slop.md §"seven cardinal sins"
    // indigo/violet em qualquer .tsx/.ts (hex cru ou em arbitrary) — bloqueante.
    for (const hex of AI_DEFAULT_INDIGO)
      if (l.toLowerCase().includes(hex))
        add(
          file,
          n,
          `cor indigo/violet de IA (${hex}) — tema Blips só usa amarelo de marca`,
          "anti-slop",
          "bloqueante"
        );
    // emoji como ícone de feature dentro de <h1-6>/<button>/<li> — usar Phosphor monoline.
    if (EMOJI_RE.test(l) && /<(h[1-6]|button|li)\b/i.test(l))
      add(
        file,
        n,
        "emoji dentro de <h*>/<button>/<li> — usar ícone Phosphor (currentColor), não emoji",
        "anti-slop",
        "aviso",
        true
      );
    // CDN de placeholder — frágil e óbvio; usar imagem real ou placeholder shipado.
    if (PLACEHOLDER_CDN.test(l))
      add(
        file,
        n,
        "CDN de imagem placeholder — usar asset real/placeholder do projeto",
        "anti-slop",
        "aviso"
      );

    // --- completude de código (entrega sem truncamento) ---
    // Fonte: nexu-io/open-design (Apache 2.0) — skills/output-skill/SKILL.md.
    // Elisão = componente entregue pela metade. Alta precisão → bloqueante.
    if (CODE_ELISION_RE.test(l))
      add(
        file,
        n,
        "elisão de código (// ... / 'resto do código' / 'implemente aqui') — entregue o arquivo inteiro",
        "construcao",
        "bloqueante"
      );
    if (PROSE_ELISION_RE.test(l))
      add(
        file,
        n,
        "atalho em prosa no lugar de código ('o resto segue o padrão', 'por brevidade') — entregue o código real",
        "construcao",
        "bloqueante"
      );
    if (LOREM_RE.test(l))
      add(
        file,
        n,
        "lorem ipsum em entrega — usar conteúdo real ou placeholder do domínio",
        "anti-slop",
        "bloqueante"
      );
    // fonte hardcoded (arbitrary font-family ou font-family inline) — tema é lei.
    // font-[Inter]/font-['Roboto'] (começa com letra, não dígito de peso) ou font-family: literal.
    if (/font-\[['"]?[A-Za-z]/.test(l) || /font-family\s*:/.test(l))
      add(
        file,
        n,
        "fonte hardcoded (font-[…]/font-family) — usar font-sans/display/mono do tema",
        "anti-slop",
        "bloqueante"
      );

    // --- construção (por linha) ---
    // Título de rota via Metadata API, não document.title em effect (Next App Router).
    if (/document\.title\s*=/.test(l))
      add(
        file,
        n,
        "document.title= em runtime — usar a Metadata API (export const metadata)",
        "construcao",
        "aviso",
        true
      );
    // Logical properties (Tailwind v4): preferir ps-/pe-/ms-/me- a pl-/pr-/ml-/mr-.
    if (/\b(class(Name)?=)/.test(l) && /\b(pl|pr|ml|mr)-\d/.test(l))
      add(
        file,
        n,
        "propriedade física (pl-/pr-/ml-/mr-) — preferir logical (ps-/pe-/ms-/me-)",
        "construcao",
        "aviso",
        true
      );

    // --- tipografia (por linha) ---
    // Fonte: nexu-io/open-design (Apache 2.0) — typography.md.
    // Caixa-alta exige tracking ≥0.06em: só tracking-wider (0.05) NÃO basta; precisa
    // tracking-widest (0.1) ou arbitrary ≥0.06em. tracking-wide (0.025)/tight também falham.
    if (
      (/\buppercase\b/.test(l) || /text-transform\s*:\s*uppercase/.test(l)) &&
      !/tracking-widest|tracking-\[0?\.0[6-9]|tracking-\[0?\.[1-9]/.test(l)
    )
      add(
        file,
        n,
        "caixa-alta sem tracking ≥0.06em (use tracking-widest) — letra apertada parece genérica",
        "tipografia",
        "aviso",
        true
      );
    // Display grande (text-4xl+) pede tracking negativo (-0.02 a -0.03em).
    if (
      /text-(4|5|6|7|8|9)xl\b/.test(l) &&
      !/tracking-(tight|tighter)|tracking-\[-/.test(l)
    )
      add(
        file,
        n,
        "display grande (text-4xl+) sem tracking negativo — use tracking-tight/tighter",
        "tipografia",
        "aviso",
        true
      );
    // Corpo nunca justificado.
    if (/\btext-justify\b/.test(l))
      add(
        file,
        n,
        "text-justify — corpo nunca é justificado (rios de espaço)",
        "tipografia",
        "aviso"
      );

    // --- motion (por linha) ---
    // Fonte: nexu-io/open-design (Apache 2.0) — transições de UI devem ser rápidas;
    // duração arbitrária >500ms parece lenta/"flashy". (enter ~200ms, exit ~140ms)
    const durMs = l.match(/duration-\[(\d+)ms\]/);
    const durS = l.match(/duration-\[(\d+(?:\.\d+)?)s\]/);
    if ((durMs && Number(durMs[1]) > 500) || (durS && Number(durS[1]) > 0.5))
      add(
        file,
        n,
        "duração de animação >500ms (arbitrary) — transições de UI devem ser rápidas",
        "motion",
        "aviso",
        true
      );
  });

  // checks de arquivo inteiro (multi-linha)
  // v3.x: ícones Phosphor sem sufixo Icon estão @deprecated no Phosphor 2.1.10
  if (isV3 && /\.(tsx|ts|jsx|js)$/.test(file)) {
    const re =
      /import\s*\{([^}]*)\}\s*from\s*["']@phosphor-icons\/react(?:\/dist\/ssr)?["']/g;
    for (const m of text.matchAll(re)) {
      const names = m[1]
        .split(",")
        .map(
          (x) =>
            x
              .trim()
              .replace(/^type\s+/, "")
              .split(/\s+as\s+/)[0]
        )
        .filter(Boolean);
      const bad = names.filter(
        (x) =>
          !/Icon$/.test(x) &&
          ![
            "IconContext",
            "IconBase",
            "IconProps",
            "IconWeight",
            "SSR",
          ].includes(x)
      );
      if (bad.length) {
        const ln = text.slice(0, m.index).split("\n").length;
        add(
          file,
          ln,
          `ícone Phosphor sem sufixo Icon em repo v3.x (${bad.join(", ")}) — usar ${bad[0]}Icon (sem sufixo é @deprecated)`,
          "icones",
          "aviso"
        );
      }
    }
  }
  // --- @blips/ai: checks de arquivo inteiro ---
  if (ext === "css") {
    const aiCss = lines.findIndex((l) =>
      /@import\s+["']@blips\/ai\/styles\.css["']/.test(l)
    );
    if (aiCss !== -1) {
      const uiCss = lines.findIndex((l) =>
        /@import\s+["']@blips\/ui\/globals\.css["']/.test(l)
      );
      aiCssImports.push({ file, line: aiCss + 1 });
      if (uiCss > aiCss)
        add(
          file,
          aiCss + 1,
          "@blips/ai/styles.css importado antes de @blips/ui/globals.css — a @blips/ui (Tailwind + tema) vem primeiro",
          "blips-ai",
          "bloqueante"
        );
    }
  }
  if (/\.(tsx|ts|jsx|js|mjs)$/.test(file)) {
    const importsAiUi = /from\s+["']@blips\/ai\//.test(text);
    for (const m of text.matchAll(
      /import\s+(type\s+)?\{([^}]*)\}\s*from\s*["']ai["']/g
    )) {
      if (m[1]) continue; // import type { … } — correto
      const valueNames = m[2]
        .split(",")
        .map((x) => x.trim())
        .filter((x) => x && !x.startsWith("type "))
        .map((x) => x.split(/\s+as\s+/)[0]);
      const ln = text.slice(0, m.index).split("\n").length;
      const typeAsValue = valueNames.filter((x) => AI_TYPE_NAMES.has(x));
      const runtime = valueNames.filter((x) => !AI_TYPE_NAMES.has(x));
      if (typeAsValue.length)
        add(
          file,
          ln,
          `tipo do "ai" importado como valor (${typeAsValue.join(", ")}) — usar import type (o @blips/ai só consome tipos do AI SDK)`,
          "blips-ai",
          "aviso"
        );
      if (hasAi && importsAiUi && runtime.length)
        add(
          file,
          ln,
          `runtime do "ai" (${runtime.join(", ")}) num arquivo de UI da @blips/ai — os componentes são apresentacionais; confirme que é a camada de dados (transport/useChat) e não lógica dentro do componente`,
          "blips-ai",
          "aviso",
          true
        );
    }
    if (hasAi && /\.(tsx|jsx)$/.test(file)) {
      const rebuild = text.match(CHAT_REBUILD_RE);
      if (rebuild && !CHAT_COMPOSE_RE.test(text)) {
        const ln = text.slice(0, rebuild.index).split("\n").length;
        add(
          file,
          ln,
          `${rebuild[1]} definido sem compor Message/Bubble (@blips/ui) nem Conversation/MessageResponse (@blips/ai) — bolha/mensagem/lista de chat recriada`,
          "blips-ai",
          "aviso",
          true
        );
      }
    }
  }
  if (/<DialogContent/.test(text) && !/DialogTitle/.test(text))
    add(
      file,
      0,
      "DialogContent sem DialogTitle no arquivo — exige nome acessível",
      "a11y",
      "bloqueante",
      true
    );
  if (/size=["']icon["']/.test(text)) {
    // heurística: cada tag com size="icon" precisa de aria-label ou sr-only por perto
    const blocks = text.split(/<Button/).slice(1);
    blocks.forEach((b) => {
      const head = b.slice(0, 300);
      if (/size=["']icon["']/.test(head) && !/aria-label|sr-only/.test(head))
        add(
          file,
          0,
          'botão size="icon" sem aria-label/sr-only (confirmar no contexto)',
          "a11y",
          "bloqueante",
          true
        );
    });
  }
  if (
    /new Intl\.(NumberFormat|DateTimeFormat)/.test(text) &&
    /export (default )?function|=>\s*{/.test(text) &&
    /\.tsx$/.test(file)
  ) {
    const ln = lines.findIndex((l) => /new Intl\./.test(l)) + 1;
    add(
      file,
      ln,
      "Intl instanciado em componente — mover para módulo formatters (instância memoizada)",
      "formatacao",
      "aviso",
      true
    );
  }
  // anti-slop: muitos hexes crus = tokens não honrados. globals.css é a fonte de tokens (isento).
  // Fonte: nexu-io/open-design (Apache 2.0) — anti-ai-slop.md §"Soft tells" (>~12 hex fora de :root).
  if (!/globals\.css$/.test(file)) {
    const rawHexCount = (text.match(RAW_HEX_RE) ?? []).length;
    if (rawHexCount > 12)
      add(
        file,
        0,
        `${rawHexCount} hexes crus no arquivo (>12) — usar tokens semânticos do tema`,
        "anti-slop",
        "aviso"
      );
  }
}

// --- @blips/ai: checks do app inteiro (depois de varrer os arquivos) ---
if (hasAi) {
  if (isV2)
    add(
      "package.json",
      0,
      "@blips/ai exige @blips/ui ^3 (v3.x — Base UI); repo está na v2.x",
      "blips-ai",
      "bloqueante"
    );
  if (reactMajor && reactMajor < 19)
    add(
      "package.json",
      0,
      `@blips/ai exige React 19 (peer react ^19); repo em React ${reactMajor}`,
      "blips-ai",
      "bloqueante"
    );
  if (aiImports.size && !aiCssImports.length)
    add(
      "(css)",
      0,
      "@blips/ai/styles.css não importado em nenhum CSS — sem ele o Tailwind não gera as classes dos componentes de IA (importe depois de @blips/ui/globals.css)",
      "blips-ai",
      "bloqueante"
    );
  for (const [sub, at] of aiImports) {
    const missing = aiPeersFor(sub).filter((peer) => !deps[peer]);
    if (missing.length)
      add(
        at.file,
        at.line,
        `@blips/ai/${sub} exige peers não declarados no package.json do app: ${missing.join(", ")}${missing.includes("ai") ? " (ai: só tipos, mas o tsc compila o fonte .tsx do pacote; devDependency basta)" : ""}`,
        "blips-ai",
        "bloqueante"
      );
  }
}

const summary = {};
for (const f of findings)
  summary[f.dimension] = (summary[f.dimension] ?? 0) + 1;
console.log(
  JSON.stringify(
    {
      react: reactMajor,
      blipsUi,
      blipsAi,
      total: findings.length,
      summary,
      findings,
    },
    null,
    2
  )
);

// Fonte: nexu-io/open-design (Apache 2.0) — craft/anti-ai-slop.md
// (checks de anti-slop, tipografia e motion derivados das regras desse arquivo).
