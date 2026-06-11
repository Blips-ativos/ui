#!/usr/bin/env node
/**
 * Check mecânico da blips-ui:reviewing — bateria determinística de violações.
 * Uso: node check.mjs <dir-do-app>
 * Saída: JSON { react, findings: [{file, line, rule, dimension, severity}] }
 * Heurísticas marcadas com verify:true exigem confirmação do revisor.
 * Dimensões: imports, icones, tailwind, formatacao, a11y, anti-slop,
 * tipografia, motion, construcao. Severidades: "bloqueante" | "aviso".
 * Princípio: checks de alta precisão (literais) são bloqueante; heurísticos
 * (verify:true) são aviso — o revisor promove a bloqueante se confirmar.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.argv[2];
if (!root) {
  console.error("uso: node check.mjs <dir-do-app>");
  process.exit(2);
}

const SKIP = new Set(["node_modules", ".next", "dist", "out", ".git", ".turbo", "coverage"]);
const findings = [];
const add = (file, line, rule, dimension, severity, verify = false) =>
  findings.push({ file, line, rule, dimension, severity, ...(verify && { verify: true }) });

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
const pkg = existsSync(pkgPath) ? JSON.parse(readFileSync(pkgPath, "utf8")) : {};
const deps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) };
const reactMajor = Number.parseInt(String(deps.react ?? "").replace(/[^\d]*(\d+).*/, "$1"), 10) || null;

// deps embutidas na lib que o app só pode importar se declarar como diretas
const LIB_TRANSITIVES = ["sonner", "react-hook-form", "zod", "recharts", "date-fns", "cmdk", "vaul", "next-themes"];

if (deps["lucide-react"]) add("package.json", 0, "lucide-react em dependencies — Phosphor é o padrão", "icones", "bloqueante");
for (const banned of ["react-icons", "@heroicons/react"])
  if (deps[banned]) add("package.json", 0, `${banned} em dependencies — Phosphor é o padrão`, "icones", "bloqueante");

for (const cfg of ["tailwind.config.js", "tailwind.config.ts", "tailwind.config.cjs", "tailwind.config.mjs"])
  if (existsSync(join(root, cfg))) add(cfg, 0, "tailwind.config.* presente — v4 é CSS-first (se for repo em coexistência v3, marcar para o revisor confirmar)", "tailwind", "bloqueante", true);

// tokens da lib que não podem ser redefinidos no CSS do app
const LIB_TOKENS = ["--primary", "--background", "--foreground", "--radius", "--card", "--muted", "--accent", "--border", "--secondary", "--destructive"];

// --- anti-slop: constantes (hexes/CDNs/emoji) ---
// Fonte: nexu-io/open-design (Apache 2.0) — craft/anti-ai-slop.md
// Indigo/violet do Tailwind é o "tell" textual de IA — o tema Blips só tem
// amarelo (#fcba28) como marca; nenhum desses hexes pode aparecer no produto.
// Os 7 primeiros são os "seven cardinal sins" da fonte (anti-ai-slop.md L18-19);
// os 3 últimos são a família estendida (indigo-400/violet-700/violet-400).
const AI_DEFAULT_INDIGO = [
  "#6366f1", "#4f46e5", "#4338ca", "#3730a3", "#8b5cf6", "#7c3aed", "#a855f7",
  "#818cf8", "#6d28d9", "#a78bfa",
];
// CDNs de placeholder são frágeis e óbvios; usar imagens reais/placeholder shipado.
const PLACEHOLDER_CDN = /(unsplash\.com|placehold\.co|via\.placeholder|dummyimage\.com|placekitten\.com|picsum\.photos|loremflickr\.com)/i;
// Faixa de emojis usados como ícone de feature (✨🚀🎯⚡🔥💡 e vizinhos no plano de símbolos).
const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}]/u;
// hex cru (não em arbitrary value) p/ contagem por arquivo — >12 = tokens ignorados.
const RAW_HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;
// Elisão de código em entrega: o componente sai pela metade. Alta precisão.
// Fonte: nexu-io/open-design (Apache 2.0) — skills/output-skill/SKILL.md.
const CODE_ELISION_RE = /\/\/\s*\.\.\.|\/\*\s*\.\.\.\s*\*\/|\/\/\s*(resto d|implemente?\b|continua o padr|similar ao acima|adicione mais|c[óo]digo (restante|acima)|demais (campos|casos|itens))/i;
const PROSE_ELISION_RE = /\b(o resto segue o mesmo padr[ãa]o|similarmente para os demais|por brevidade|e assim por diante|deixo como exerc[íi]cio|posso continuar se quiser)\b/i;
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
      if (/^\s*@source\b/.test(l)) add(file, n, "@source defensivo — auto-detecção v4 cobre o app", "tailwind", "aviso");
      for (const t of LIB_TOKENS)
        if (new RegExp(`${t}\\s*:`).test(l) && !file.includes("globals-da-lib"))
          add(file, n, `token da lib redefinido (${t}) — tema é fonte única`, "tailwind", "bloqueante");
      // anti-slop: indigo/violet do Tailwind também é banido no CSS (o "AI tell").
      for (const hex of AI_DEFAULT_INDIGO)
        if (l.toLowerCase().includes(hex))
          add(file, n, `cor indigo/violet de IA (${hex}) — tema Blips só usa amarelo de marca`, "anti-slop", "bloqueante");
      return;
    }
    // imports da lib conforme React
    if (/from\s+["']@blips\/ui["']/.test(l) && reactMajor && reactMajor >= 18)
      add(file, n, "barrel import em React 18/19 — subpath obrigatório (barrel quebra App Router)", "imports", "bloqueante");
    if (/from\s+["']@blips\/ui\/components\//.test(l) && reactMajor === 17)
      add(file, n, "subpath em React 17 — barrel obrigatório (subpath falha tsc)", "imports", "bloqueante");
    if (/from\s+["']@blips\/ui\/(src|dist)\//.test(l)) add(file, n, "import de caminho interno da lib", "imports", "bloqueante");
    if (/from\s+["']lucide-react["']/.test(l)) add(file, n, "import de lucide-react — usar Phosphor", "icones", "bloqueante");
    // deps fantasmas
    for (const t of LIB_TRANSITIVES) {
      if (new RegExp(`from\\s+["']${t}(/|["'])`).test(l) && !deps[t])
        add(file, n, `import de ${t} sem dependência direta no package.json (dep fantasma)`, "imports", "bloqueante");
    }
    // tailwind
    if (/(bg|text|border|ring|fill|stroke)-\[#[0-9a-fA-F]{3,8}\]/.test(l))
      add(file, n, "cor hardcoded em arbitrary value — usar token semântico", "tailwind", "bloqueante");
    if (/hsl\(var\(--/.test(l)) add(file, n, "hsl(var(--…)) — tokens da lib são cor completa; usar var(--…)", "tailwind", "bloqueante");
    // formatação
    if (/Intl\.(NumberFormat|DateTimeFormat|RelativeTimeFormat)\(\s*(undefined|\)|,)/.test(l))
      add(file, n, "Intl sem locale explícito — 'pt-BR' obrigatório", "formatacao", "bloqueante");
    if (/\.toLocale(String|DateString|TimeString)\(\s*\)/.test(l))
      add(file, n, "toLocale*() sem locale explícito", "formatacao", "bloqueante");
    if (/R\$\s*[`$"'{]/.test(l) || /["'`]R\$\s/.test(l))
      add(file, n, "moeda montada à mão com 'R$' — usar formatter BRL central", "formatacao", "bloqueante", true);
    if (/weight\s*=\s*["'{]/.test(l) && /@phosphor-icons\/react/.test(text))
      add(file, n, "weight passado em ícone Phosphor — regular (default) é o padrão", "icones", "aviso");

    // --- a11y (por linha) ---
    // tabindex positivo reordena contra o DOM — sempre errado. Alta precisão.
    if (/tab[Ii]ndex\s*=\s*["'{]?\s*[1-9]/.test(l))
      add(file, n, "tabindex positivo — reordena contra o DOM; conserte a ordem do DOM", "a11y", "bloqueante");
    // remoção de outline de foco sem substituto na mesma linha — falha 2.4.7 (heurística).
    if (/(outline:\s*none|outline-none|outline-hidden)/.test(l) && !/focus-visible|focus:|ring-/.test(l))
      add(file, n, "outline de foco removido sem substituto (focus-visible/ring) — falha 2.4.7", "a11y", "aviso", true);

    // --- anti-slop (por linha) ---
    // Fonte: nexu-io/open-design (Apache 2.0) — craft/anti-ai-slop.md §"seven cardinal sins"
    // indigo/violet em qualquer .tsx/.ts (hex cru ou em arbitrary) — bloqueante.
    for (const hex of AI_DEFAULT_INDIGO)
      if (l.toLowerCase().includes(hex))
        add(file, n, `cor indigo/violet de IA (${hex}) — tema Blips só usa amarelo de marca`, "anti-slop", "bloqueante");
    // emoji como ícone de feature dentro de <h1-6>/<button>/<li> — usar Phosphor monoline.
    if (EMOJI_RE.test(l) && /<(h[1-6]|button|li)\b/i.test(l))
      add(file, n, "emoji dentro de <h*>/<button>/<li> — usar ícone Phosphor (currentColor), não emoji", "anti-slop", "aviso", true);
    // CDN de placeholder — frágil e óbvio; usar imagem real ou placeholder shipado.
    if (PLACEHOLDER_CDN.test(l))
      add(file, n, "CDN de imagem placeholder — usar asset real/placeholder do projeto", "anti-slop", "aviso");

    // --- completude de código (entrega sem truncamento) ---
    // Fonte: nexu-io/open-design (Apache 2.0) — skills/output-skill/SKILL.md.
    // Elisão = componente entregue pela metade. Alta precisão → bloqueante.
    if (CODE_ELISION_RE.test(l))
      add(file, n, "elisão de código (// ... / 'resto do código' / 'implemente aqui') — entregue o arquivo inteiro", "construcao", "bloqueante");
    if (PROSE_ELISION_RE.test(l))
      add(file, n, "atalho em prosa no lugar de código ('o resto segue o padrão', 'por brevidade') — entregue o código real", "construcao", "bloqueante");
    if (LOREM_RE.test(l))
      add(file, n, "lorem ipsum em entrega — usar conteúdo real ou placeholder do domínio", "anti-slop", "bloqueante");
    // fonte hardcoded (arbitrary font-family ou font-family inline) — tema é lei.
    // font-[Inter]/font-['Roboto'] (começa com letra, não dígito de peso) ou font-family: literal.
    if (/font-\[['"]?[A-Za-z]/.test(l) || /font-family\s*:/.test(l))
      add(file, n, "fonte hardcoded (font-[…]/font-family) — usar font-sans/display/mono do tema", "anti-slop", "bloqueante");

    // --- construção (por linha) ---
    // Título de rota via Metadata API, não document.title em effect (Next App Router).
    if (/document\.title\s*=/.test(l))
      add(file, n, "document.title= em runtime — usar a Metadata API (export const metadata)", "construcao", "aviso", true);
    // Logical properties (Tailwind v4): preferir ps-/pe-/ms-/me- a pl-/pr-/ml-/mr-.
    if (/\b(class(Name)?=)/.test(l) && /\b(pl|pr|ml|mr)-\d/.test(l))
      add(file, n, "propriedade física (pl-/pr-/ml-/mr-) — preferir logical (ps-/pe-/ms-/me-)", "construcao", "aviso", true);

    // --- tipografia (por linha) ---
    // Fonte: nexu-io/open-design (Apache 2.0) — typography.md.
    // Caixa-alta exige tracking ≥0.06em: só tracking-wider (0.05) NÃO basta; precisa
    // tracking-widest (0.1) ou arbitrary ≥0.06em. tracking-wide (0.025)/tight também falham.
    if ((/\buppercase\b/.test(l) || /text-transform\s*:\s*uppercase/.test(l)) &&
        !/tracking-widest|tracking-\[0?\.0[6-9]|tracking-\[0?\.[1-9]/.test(l))
      add(file, n, "caixa-alta sem tracking ≥0.06em (use tracking-widest) — letra apertada parece genérica", "tipografia", "aviso", true);
    // Display grande (text-4xl+) pede tracking negativo (-0.02 a -0.03em).
    if (/text-(4|5|6|7|8|9)xl\b/.test(l) && !/tracking-(tight|tighter)|tracking-\[-/.test(l))
      add(file, n, "display grande (text-4xl+) sem tracking negativo — use tracking-tight/tighter", "tipografia", "aviso", true);
    // Corpo nunca justificado.
    if (/\btext-justify\b/.test(l))
      add(file, n, "text-justify — corpo nunca é justificado (rios de espaço)", "tipografia", "aviso");

    // --- motion (por linha) ---
    // Fonte: nexu-io/open-design (Apache 2.0) — transições de UI devem ser rápidas;
    // duração arbitrária >500ms parece lenta/"flashy". (enter ~200ms, exit ~140ms)
    const durMs = l.match(/duration-\[(\d+)ms\]/);
    const durS = l.match(/duration-\[(\d+(?:\.\d+)?)s\]/);
    if ((durMs && Number(durMs[1]) > 500) || (durS && Number(durS[1]) > 0.5))
      add(file, n, "duração de animação >500ms (arbitrary) — transições de UI devem ser rápidas", "motion", "aviso", true);
  });

  // checks de arquivo inteiro (multi-linha)
  if (/<DialogContent/.test(text) && !/DialogTitle/.test(text))
    add(file, 0, "DialogContent sem DialogTitle no arquivo — exige nome acessível", "a11y", "bloqueante", true);
  if (/size=["']icon["']/.test(text)) {
    // heurística: cada tag com size="icon" precisa de aria-label ou sr-only por perto
    const blocks = text.split(/<Button/).slice(1);
    blocks.forEach((b) => {
      const head = b.slice(0, 300);
      if (/size=["']icon["']/.test(head) && !/aria-label|sr-only/.test(head))
        add(file, 0, 'botão size="icon" sem aria-label/sr-only (confirmar no contexto)', "a11y", "bloqueante", true);
    });
  }
  if (/new Intl\.(NumberFormat|DateTimeFormat)/.test(text) && /export (default )?function|=>\s*{/.test(text) && /\.tsx$/.test(file)) {
    const ln = lines.findIndex((l) => /new Intl\./.test(l)) + 1;
    add(file, ln, "Intl instanciado em componente — mover para módulo formatters (instância memoizada)", "formatacao", "aviso", true);
  }
  // anti-slop: muitos hexes crus = tokens não honrados. globals.css é a fonte de tokens (isento).
  // Fonte: nexu-io/open-design (Apache 2.0) — anti-ai-slop.md §"Soft tells" (>~12 hex fora de :root).
  if (!/globals\.css$/.test(file)) {
    const rawHexCount = (text.match(RAW_HEX_RE) ?? []).length;
    if (rawHexCount > 12)
      add(file, 0, `${rawHexCount} hexes crus no arquivo (>12) — usar tokens semânticos do tema`, "anti-slop", "aviso");
  }
}

const summary = {};
for (const f of findings) summary[f.dimension] = (summary[f.dimension] ?? 0) + 1;
console.log(JSON.stringify({ react: reactMajor, total: findings.length, summary, findings }, null, 2));

// Fonte: nexu-io/open-design (Apache 2.0) — craft/anti-ai-slop.md
// (checks de anti-slop, tipografia e motion derivados das regras desse arquivo).
