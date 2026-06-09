"use client";

import { AnchorProvider, type TableOfContents, TOCItem } from "fumadocs-core/toc";
import { usePathname } from "next/navigation";
import * as React from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const INDENT = 10; // px shift per nesting level
const ROW_H = 28; // item row height
const JUNC_H = 10; // height of the S junction between levels
const RAIL_GAP = 22; // space between the rail and the anchor text
const STROKE = 1.5;
const HEADER = 56; // var(--header-height): top of the reading viewport

const xOf = (depth: number) => STROKE + Math.max(0, depth - 2) * INDENT;
const idOf = (url: string) => url.replace(/^#/, "");

export function DocsToc({ toc }: { toc: TableOfContents }) {
  if (toc.length === 0) return null;

  return (
    <div className="sticky top-[calc(var(--header-height)+2rem)] h-[calc(100svh-var(--header-height)-4rem)] overflow-auto pb-8 text-sm">
      <p className="text-foreground mb-3 font-medium">Nesta página</p>
      <AnchorProvider toc={toc}>
        <TocRail toc={toc} />
      </AnchorProvider>
    </div>
  );
}

// Continuous "sliding window": maps the visible viewport (its top/bottom in the
// document) onto rail coordinates by interpolating between the headings' real
// document positions and their rail positions. Updates every scroll frame, so
// the highlighted band glides with the scroll instead of snapping per heading.
function useScrollWindow(
  toc: TableOfContents,
  railTops: number[],
  railBottoms: number[],
  totalHeight: number,
  length: number,
) {
  const pathname = usePathname();
  const [win, setWin] = React.useState({ start: 0, end: 0 });

  React.useEffect(() => {
    if (!length || !totalHeight) return;
    let frame = 0;
    let breaks: { docY: number; railY: number }[] = [];

    const buildBreaks = () => {
      const next: { docY: number; railY: number }[] = [];
      for (let i = 0; i < toc.length; i++) {
        const el = document.getElementById(idOf(toc[i].url));
        if (!el) continue;
        next.push({
          docY: el.getBoundingClientRect().top + window.scrollY,
          railY: railTops[i],
        });
      }
      // terminal point: bottom of the article maps to the last rail bottom,
      // so scrolling through the final section glides to the end.
      const article = document.querySelector("article");
      const lastRail = railBottoms[toc.length - 1] ?? totalHeight;
      if (next.length) {
        const aBottom = article
          ? article.getBoundingClientRect().top +
            window.scrollY +
            article.offsetHeight
          : next[next.length - 1].docY + 1;
        next.push({
          docY: Math.max(aBottom, next[next.length - 1].docY + 1),
          railY: lastRail,
        });
      }
      breaks = next.sort((a, b) => a.docY - b.docY);
    };

    const mapToRail = (docY: number) => {
      if (breaks.length === 0) return 0;
      if (docY <= breaks[0].docY) return breaks[0].railY;
      const last = breaks[breaks.length - 1];
      if (docY >= last.docY) return last.railY;
      for (let i = 0; i < breaks.length - 1; i++) {
        const a = breaks[i];
        const b = breaks[i + 1];
        if (docY >= a.docY && docY <= b.docY) {
          const t = b.docY === a.docY ? 0 : (docY - a.docY) / (b.docY - a.docY);
          return a.railY + t * (b.railY - a.railY);
        }
      }
      return last.railY;
    };

    const compute = () => {
      frame = 0;
      const top = mapToRail(window.scrollY + HEADER);
      const bottom = mapToRail(window.scrollY + window.innerHeight);
      const lo = Math.min(top, bottom);
      const hi = Math.max(top, bottom);
      setWin({
        start: (lo / totalHeight) * length,
        end: (hi / totalHeight) * length,
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };
    const onResize = () => {
      buildBreaks();
      onScroll();
    };

    buildBreaks();
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const article = document.querySelector("article");
    let observer: ResizeObserver | undefined;
    if (article && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(onResize);
      observer.observe(article);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname, length, totalHeight, toc, railTops, railBottoms]);

  return win;
}

function TocRail({ toc }: { toc: TableOfContents }) {
  // One continuous path (single subpath) + per-item rail top/bottom. Memoized
  // so the arrays keep a stable identity across the per-frame scroll re-renders
  // (otherwise the scroll-window effect would re-bind its listeners every frame).
  const { width, d, railTops, railBottoms, totalHeight } = React.useMemo(() => {
    let y = 0;
    let path = "";
    const tops: number[] = [];
    const bottoms: number[] = [];
    toc.forEach((item, i) => {
      const x2 = xOf(item.depth);
      const prev = toc[i - 1];
      if (i === 0) {
        path += `M${x2} ${y}`;
      } else if (prev.depth !== item.depth) {
        const x1 = xOf(prev.depth);
        path += `C${x1} ${y + JUNC_H / 2} ${x2} ${y + JUNC_H / 2} ${x2} ${y + JUNC_H}`;
        y += JUNC_H;
      }
      tops[i] = y;
      path += `V${y + ROW_H}`;
      y += ROW_H;
      bottoms[i] = y;
    });
    return {
      width: Math.max(...toc.map((i) => xOf(i.depth))) + STROKE,
      d: path,
      railTops: tops,
      railBottoms: bottoms,
      totalHeight: y,
    };
  }, [toc]);

  const fillRef = React.useRef<SVGPathElement>(null);
  const [length, setLength] = React.useState(0);
  useIsomorphicLayoutEffect(() => {
    const path = fillRef.current;
    if (!path) return;
    const measure = () => setLength(path.getTotalLength());
    measure();
    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(measure);
      observer.observe(path);
    }
    return () => observer?.disconnect();
  }, [d]);

  const win = useScrollWindow(toc, railTops, railBottoms, totalHeight, length);

  const measured = length > 0;
  const filledLen = Math.max(0, win.end - win.start);
  const visible = measured && filledLen > 0.5;

  return (
    <div className="relative">
      <svg
        className="pointer-events-none absolute top-0 left-0"
        width={width}
        height={totalHeight}
        viewBox={`0 0 ${width} ${totalHeight}`}
        fill="none"
        aria-hidden="true"
      >
        {/* base rail */}
        <path
          d={d}
          className="text-foreground/15"
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
        {/* sliding window: only the rails within the visible viewport */}
        <path
          ref={fillRef}
          d={d}
          className="text-primary"
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeLinecap="round"
          style={{
            strokeDasharray: visible ? `${filledLen} ${length}` : `0 ${length || 1}`,
            strokeDashoffset: visible ? -win.start : 0,
            opacity: visible ? 1 : 0,
          }}
        />
      </svg>

      <div className="flex flex-col">
        {toc.map((item, i) => {
          const x2 = xOf(item.depth);
          const prev = toc[i - 1];
          const junction = Boolean(prev && prev.depth !== item.depth);
          return (
            <React.Fragment key={item.url}>
              {junction && <div aria-hidden="true" style={{ height: JUNC_H }} />}
              <TOCItem
                href={item.url}
                className="text-muted-foreground hover:text-foreground data-[active=true]:text-foreground flex items-center transition-colors"
                style={{ height: `${ROW_H}px`, paddingLeft: `${x2 + RAIL_GAP}px` }}
              >
                <span className="truncate">{item.title}</span>
              </TOCItem>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
