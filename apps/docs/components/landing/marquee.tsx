const COMPONENTS = [
  "accordion",
  "alert",
  "alert-dialog",
  "aspect-ratio",
  "avatar",
  "badge",
  "breadcrumb",
  "button",
  "button-group",
  "calendar",
  "card",
  "carousel",
  "chart",
  "checkbox",
  "collapsible",
  "command",
  "context-menu",
  "dialog",
  "drawer",
  "dropdown-menu",
  "empty",
  "field",
  "form",
  "hover-card",
  "input",
  "input-group",
  "input-otp",
  "item",
  "kbd",
  "label",
  "menubar",
  "native-select",
  "navigation-menu",
  "pagination",
  "popover",
  "progress",
  "radio-group",
  "resizable",
  "scroll-area",
  "select",
  "separator",
  "sheet",
  "sidebar",
  "skeleton",
  "slider",
  "sonner",
  "spinner",
  "switch",
  "table",
  "tabs",
  "textarea",
  "toggle",
  "toggle-group",
  "tooltip",
];

function Row() {
  return (
    <div className="flex shrink-0">
      {COMPONENTS.map((name) => (
        <span
          key={name}
          className="px-5 text-muted-foreground/70 text-xs uppercase tracking-[0.18em]"
        >
          {name}
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <section
      className="landing-marquee overflow-hidden border-b border-border py-4"
      aria-hidden
    >
      {/* duas metades idênticas → loop sem emenda (track desliza -50%) */}
      <div className="landing-marquee-track">
        <Row />
        <Row />
      </div>
    </section>
  );
}
