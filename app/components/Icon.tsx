// ===== Chap Coffee — inline SVG icon set =====
// Ported verbatim from the prototype's window.ICONS. The strings are static,
// developer-authored markup (no user input), so dangerouslySetInnerHTML is safe.
// Sizing/colour come from parent selectors (e.g. `.icon-btn svg`), matching the
// design system in globals.css.

const ICONS: Record<string, string> = {
  rising:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M17 7h4v4"/></svg>',
  trending:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.9 4.6L19 7l-3.6 3.4L16.3 16 12 13.3 7.7 16l.9-5.6L5 7l5.1-.4L12 2z"/></svg>',
  heart:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
  classic:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.5 7H22l-6 4.5L18.5 22 12 17.5 5.5 22 8 13.5 2 9h7.5z" opacity="0"/><path d="M12 3l2 5 5 .5-3.8 3.3 1.2 5L12 14.5 7.6 16.8l1.2-5L5 8.5 10 8z"/></svg>',
  heartOutline:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.5l-1.32-1.2C6.06 15.1 3 12.3 3 8.85 3 6.1 5.06 4 7.7 4c1.49 0 2.92.71 3.86 1.84L12 6.2l.44-.36A5 5 0 0 1 16.3 4C18.94 4 21 6.1 21 8.85c0 3.45-3.06 6.25-7.68 10.45L12 20.5z"/></svg>',
  cart:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3h2.2l2 12.2a1.6 1.6 0 0 0 1.6 1.3h8.8a1.6 1.6 0 0 0 1.6-1.2L21 7H6"/></svg>',
  arrow:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>',
  chevL:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
  chevR:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
  star:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l2 5 5 .5-3.8 3.3 1.2 5L12 14.5 7.6 16.8l1.2-5L5 8.5 10 8z"/></svg>',
  fire:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.926 20.574a7.26 7.26 0 0 0 3.039 1.511c.107.035.179-.105.107-.175-2.395-2.285-1.079-4.758-.107-5.873.693-.796 1.68-2.107 1.608-3.865 0-.176.18-.317.322-.211 1.359.703 2.288 2.25 2.538 3.515.394-.386.537-.984.537-1.511 0-.176.214-.317.393-.176 1.287 1.16 3.503 5.097-.072 8.19-.071.071 0 .212.072.177a8.761 8.761 0 0 0 3.003-1.442c5.827-4.5 2.037-12.48-.43-15.116-.321-.317-.893-.106-.893.351-.036.95-.322 2.004-1.072 2.707-.572-2.39-2.478-5.105-5.195-6.441-.357-.176-.786.105-.75.492.07 3.27-2.063 5.352-3.922 8.059-1.645 2.425-2.717 6.89.822 9.808z"/></svg>',
  ice:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17L9 20M12 17L15 20M12 17V12M12 17V21M12 7L9 4M12 7L15 4M12 7V12M12 7V3M12 12L7.67 9.5M12 12L16.33 14.5M12 12L7.67 14.5M12 12L16.33 9.5M16.33 14.5L17.43 18.6M16.33 14.5L20.43 13.4M16.33 14.5L19.79 16.5M7.67 9.5L3.57 10.6M7.67 9.5L6.57 5.4M7.67 9.5L4.21 7.5M16.33 9.5L20.43 10.6M16.33 9.5L17.43 5.4M16.33 9.5L19.79 7.5M7.67 14.5L6.57 18.6M7.67 14.5L3.57 13.4M7.67 14.5L4.21 16.5"/></svg>',
  heartFill:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
  clock:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  user:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/></svg>',
  bolt:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4 14h6l-1 8 9-12h-6z"/></svg>',
  flame:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1 3-1 4-2 6-1 2 0 3 1 3 0-1 1-2 2-2 0 4-3 4-3 7 0 2 2 4 4 4s4-2 4-5c0-5-6-7-6-13z"/></svg>',
  plus:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  minus:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14"/></svg>',
  trash:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/></svg>',
  check:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l5 5L20 6"/></svg>',
  leaf:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 21c-1-7 3-14 14-15 1 8-3 14-14 15zM5 21c2-5 5-7 9-9"/></svg>',
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const svg = ICONS[name] ?? ICONS.star;
  return (
    <span
      className={"ic" + (className ? " " + className : "")}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
