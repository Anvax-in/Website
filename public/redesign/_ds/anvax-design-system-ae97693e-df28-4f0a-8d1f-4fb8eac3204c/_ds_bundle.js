/* @ds-bundle: {"format":4,"namespace":"AnvaxDesignSystem_ae9769","components":[{"name":"BlogCard","sourcePath":"components/blog/BlogCard.jsx"},{"name":"Pagination","sourcePath":"components/blog/Pagination.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"SectionHead","sourcePath":"components/core/SectionHead.jsx"},{"name":"StatusPill","sourcePath":"components/core/StatusPill.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Term","sourcePath":"components/core/Term.jsx"},{"name":"Footer","sourcePath":"components/layout/Footer.jsx"},{"name":"Nav","sourcePath":"components/layout/Nav.jsx"}],"sourceHashes":{"components/blog/BlogCard.jsx":"2cab13e58ef8","components/blog/Pagination.jsx":"18570121a69b","components/core/Button.jsx":"5be6d057ed73","components/core/Eyebrow.jsx":"c14af2b995fb","components/core/Icon.jsx":"2b07a51b5a98","components/core/SectionHead.jsx":"706c4c97bfad","components/core/StatusPill.jsx":"e53c117416cc","components/core/Tag.jsx":"c2e7fb519e3e","components/core/Term.jsx":"6d8744153634","components/layout/Footer.jsx":"93a53441cc34","components/layout/Nav.jsx":"45da84df5428","ui_kits/website/BlogScreens.jsx":"5da99c7ec20c","ui_kits/website/ContactScreen.jsx":"de5e3d71a352","ui_kits/website/HomeScreen.jsx":"25674d8801fa","ui_kits/website/PlatformScreen.jsx":"3e1dfeecb07b"},"inlinedExternals":[],"unexposedExports":[{"name":"iconPaths","sourcePath":"components/core/Icon.jsx"}]} */

(() => {

const __ds_ns = (window.AnvaxDesignSystem_ae9769 = window.AnvaxDesignSystem_ae9769 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/blog/BlogCard.jsx
try { (() => {
function BlogCard({
  title,
  description,
  date,
  readingTime,
  tags = [],
  href = '#',
  style
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement('article', {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: Object.assign({
      background: 'var(--bg-inset)',
      border: '1px solid ' + (hover ? 'var(--border-strong)' : 'var(--border)'),
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: hover ? 'var(--shadow-pop)' : 'none',
      transition: 'box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)'
    }, style)
  }, React.createElement('a', {
    href,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: '28px 28px 24px',
      textDecoration: 'none',
      color: 'inherit',
      height: '100%'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, React.createElement('time', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.02em',
      color: 'var(--fg-3)'
    }
  }, date), React.createElement('span', {
    style: {
      color: 'var(--border-strong)',
      fontSize: 12
    }
  }, '\u00B7'), React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.02em',
      color: 'var(--fg-3)'
    }
  }, readingTime + ' min read')), React.createElement('h2', {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 20,
      fontWeight: 400,
      lineHeight: '28px',
      color: hover ? 'var(--amber-700)' : 'var(--ink-900)',
      textWrap: 'balance',
      transition: 'color var(--dur-base) var(--ease-out)'
    }
  }, title), React.createElement('p', {
    style: {
      fontSize: 14,
      lineHeight: '22px',
      color: 'var(--fg-2)',
      flex: 1
    }
  }, description), tags.length > 0 && React.createElement('div', {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, tags.map(t => React.createElement('span', {
    key: t,
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.02em',
      padding: '3px 9px',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid var(--border)',
      background: 'var(--bone-100)',
      color: 'var(--fg-3)',
      whiteSpace: 'nowrap'
    }
  }, t))), React.createElement('span', {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--amber-600)',
      marginTop: 4
    }
  }, 'Read more \u2192')));
}
Object.assign(__ds_scope, { BlogCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blog/BlogCard.jsx", error: String((e && e.message) || e) }); }

// components/blog/Pagination.jsx
try { (() => {
const arrowBase = {
  fontFamily: 'var(--font-sans)',
  fontSize: 13,
  fontWeight: 500,
  color: 'var(--ink-900)',
  textDecoration: 'none',
  padding: '8px 14px',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-button)',
  background: 'var(--bg-inset)',
  transition: 'background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)'
};
function Arrow({
  children,
  disabled,
  href,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  const css = Object.assign({}, arrowBase, disabled ? {
    opacity: 0.35,
    pointerEvents: 'none'
  } : null, hover && !disabled ? {
    background: 'var(--bone-100)',
    borderColor: 'var(--border-strong)'
  } : null);
  return React.createElement(disabled ? 'span' : 'a', {
    href: disabled ? undefined : href,
    onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: css
  }, children);
}
function Page({
  n,
  current,
  onSelect
}) {
  const [hover, setHover] = React.useState(false);
  const css = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    textDecoration: 'none',
    borderRadius: 'var(--radius-button)',
    border: '1px solid transparent',
    color: current ? 'var(--bone-100)' : hover ? 'var(--ink-900)' : 'var(--fg-2)',
    background: current ? 'var(--ink-900)' : hover ? 'var(--bone-100)' : 'transparent',
    borderColor: current ? 'var(--ink-900)' : 'transparent',
    pointerEvents: current ? 'none' : 'auto',
    transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)'
  };
  return React.createElement('a', {
    href: '#',
    onClick: e => {
      e.preventDefault();
      onSelect && onSelect(n);
    },
    'aria-current': current ? 'page' : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: css
  }, n);
}
function Pagination({
  currentPage = 1,
  totalPages = 1,
  onSelect,
  style
}) {
  if (totalPages <= 1) return null;
  const pages = Array.from({
    length: totalPages
  }, (_, i) => i + 1);
  return React.createElement('nav', {
    'aria-label': 'Pagination',
    style: Object.assign({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginTop: 56,
      paddingTop: 32,
      borderTop: '1px solid var(--border)'
    }, style)
  }, React.createElement(Arrow, {
    disabled: currentPage <= 1,
    href: '#',
    onClick: e => {
      e.preventDefault();
      onSelect && onSelect(currentPage - 1);
    }
  }, '\u2190 Prev'), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 4
    }
  }, pages.map(n => React.createElement(Page, {
    key: n,
    n,
    current: n === currentPage,
    onSelect
  }))), React.createElement(Arrow, {
    disabled: currentPage >= totalPages,
    href: '#',
    onClick: e => {
      e.preventDefault();
      onSelect && onSelect(currentPage + 1);
    }
  }, 'Next \u2192'));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blog/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const base = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '11px 18px',
  borderRadius: 'var(--radius-button)',
  fontFamily: 'var(--font-heading)',
  fontSize: 14,
  fontWeight: 800,
  lineHeight: 1,
  border: '1px solid transparent',
  cursor: 'pointer',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)'
};
const variants = {
  primary: {
    background: 'var(--ink-900)',
    backgroundImage: 'var(--sheen-primary)',
    color: 'var(--bone-100)'
  },
  accent: {
    background: 'var(--amber-600)',
    backgroundImage: 'var(--sheen-accent)',
    color: 'var(--bone-100)'
  },
  secondary: {
    background: 'transparent',
    color: 'var(--ink-900)',
    borderColor: 'var(--border-strong)'
  },
  secondaryDark: {
    background: 'transparent',
    color: 'var(--bone-100)',
    borderColor: 'rgba(255,255,255,0.32)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--ink-900)',
    paddingLeft: 4,
    paddingRight: 4
  }
};
const hovers = {
  primary: {
    background: 'var(--ink-700)',
    backgroundImage: 'var(--sheen-primary)'
  },
  accent: {
    background: 'var(--amber-700)',
    backgroundImage: 'var(--sheen-accent)'
  },
  secondary: {
    background: 'var(--bone-100)',
    borderColor: 'var(--ink-900)'
  },
  secondaryDark: {
    background: 'rgba(255,255,255,0.08)',
    borderColor: 'var(--bone-100)'
  },
  ghost: {
    color: 'var(--amber-700)'
  }
};
function Button({
  variant = 'primary',
  arrow = false,
  href,
  disabled,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const css = Object.assign({}, base, variants[variant] || variants.primary, hover && !disabled ? hovers[variant] || hovers.primary : null, disabled ? {
    opacity: 0.4,
    pointerEvents: 'none'
  } : null, style);
  const inner = React.createElement(React.Fragment, null, children, arrow && React.createElement('span', {
    style: {
      transition: 'transform var(--dur-base) var(--ease-out)',
      transform: hover ? 'translateX(2px)' : 'none'
    }
  }, '\u2192'));
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  };
  if (href !== undefined) return React.createElement('a', Object.assign({
    href,
    style: css
  }, handlers, rest), inner);
  return React.createElement('button', Object.assign({
    type: 'button',
    style: css,
    disabled
  }, handlers, rest), inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function Eyebrow({
  children,
  muted,
  onDark,
  style
}) {
  const css = {
    fontFamily: 'var(--font-sans)',
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: '0.02em',
    color: muted ? 'var(--fg-3)' : onDark ? 'rgba(255,255,255,0.82)' : 'var(--amber-700)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    textAlign: 'left'
  };
  return React.createElement('div', {
    style: Object.assign(css, style)
  }, children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
/* 24x24 stroke paths lifted verbatim from the section data in
   anvax-website/src/components/sections/*.tsx. Lucide-compatible geometry:
   24 viewBox, stroke 2, round caps and joins, no fill. */
const iconPaths = {
  search: 'M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0',
  chat: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  workflow: 'M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9C9 9 6 15 6 15',
  agent: 'M12 8V4H8M2 4h20M20 4v16M4 4v16M2 20h20M9 12h6M9 16h6',
  application: 'M11 4h10M11 12h10M11 20h10M3 4h.01M3 12h.01M3 20h.01',
  shield: 'M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6z',
  layers: 'M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01',
  stack: 'M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  bolt: 'M13 2 3 14h9l-1 8 10-12h-9l1-8z',
  redaction: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  gateway: 'M21 7H3M21 7l-4-4M21 7l-4 4M3 17h18M3 17l4 4M3 17l4-4',
  audit: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
  corpus: 'M12 5C8.13 5 5 6.34 5 8s3.13 3 7 3 7-1.34 7-3S15.87 5 12 5zM5 8v4c0 1.66 3.13 3 7 3s7-1.34 7-3V8M5 12v4c0 1.66 3.13 3 7 3s7-1.34 7-3v-4',
  index: 'M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM6 21a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM6 9v3M6 18v-3M18 18a9 9 0 0 1-12 0',
  lock: 'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4',
  residency: 'M12 21s7-6.4 7-12a7 7 0 0 0-14 0c0 5.6 7 12 7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  auditBook: 'M9 12l2 2 4-4M5 3h14v18l-4-2-3 2-3-2-4 2z',
  bank: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6',
  trend: 'M3 17l6-6 4 4 8-8M14 7h7v7',
  rupee: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  bars: 'M4 20V10M10 20V4M16 20v-8M22 20H2',
  card: 'M2 7h20v12H2zM2 11h20M6 15h4'
};
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  strokeWidth = 2,
  style
}) {
  const d = iconPaths[name];
  if (!d) return null;
  return React.createElement('svg', {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
    style: Object.assign({
      flexShrink: 0
    }, style)
  }, React.createElement('path', {
    d
  }));
}
Object.assign(__ds_scope, { iconPaths, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHead.jsx
try { (() => {
function SectionHead({
  eyebrow,
  title,
  lede,
  dark,
  style
}) {
  return React.createElement('div', {
    style: Object.assign({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      textAlign: 'left',
      marginBottom: 36,
      gap: 14
    }, style)
  }, React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      alignItems: 'flex-start'
    }
  }, eyebrow && React.createElement(__ds_scope.Eyebrow, {
    muted: dark
  }, eyebrow), React.createElement('h2', {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 800,
      fontSize: 32,
      lineHeight: '42px',
      letterSpacing: '-0.015em',
      color: dark ? 'var(--bone-100)' : 'var(--ink-900)',
      maxWidth: '32ch',
      margin: 0,
      textWrap: 'balance',
      textAlign: 'left'
    }
  }, title)), lede && React.createElement('div', {
    style: {
      textAlign: 'left',
      width: '100%'
    }
  }, React.createElement('p', {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 15.5,
      lineHeight: '26px',
      color: dark ? 'rgba(255,255,255,0.72)' : 'var(--ink-500)',
      maxWidth: '60ch',
      textWrap: 'pretty'
    }
  }, lede)));
}
Object.assign(__ds_scope, { SectionHead });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHead.jsx", error: String((e && e.message) || e) }); }

// components/core/StatusPill.jsx
try { (() => {
const base = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding: '4px 10px',
  borderRadius: 'var(--radius-pill)',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  background: 'var(--sage-100)',
  color: 'var(--sage-700)',
  border: '1px solid var(--sage-600)'
};
const variants = {
  wip: {
    background: 'var(--amber-100)',
    color: 'var(--amber-700)',
    borderColor: 'var(--amber-500)'
  },
  planned: {
    background: 'var(--bone-100)',
    color: 'var(--ink-500)',
    borderColor: 'var(--border-strong)'
  }
};
const dotColor = {
  live: 'var(--sage-700)',
  wip: 'var(--amber-700)',
  planned: 'var(--slate-400)'
};
function StatusPill({
  status = 'live',
  children,
  style
}) {
  return React.createElement('span', {
    style: Object.assign({}, base, variants[status], style)
  }, React.createElement('span', {
    style: {
      width: 5,
      height: 5,
      borderRadius: '50%',
      background: dotColor[status] || dotColor.live
    }
  }), children);
}
Object.assign(__ds_scope, { StatusPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatusPill.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
const base = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 5,
  fontFamily: 'var(--font-sans)',
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.02em',
  padding: '3px 10px',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border)',
  background: 'var(--bone-100)',
  color: 'var(--fg-3)',
  whiteSpace: 'nowrap'
};
const variants = {
  live: {
    color: 'var(--paper)',
    borderColor: 'var(--sage-600)',
    background: 'var(--sage-600)'
  },
  next: {
    color: 'var(--paper)',
    borderColor: 'var(--blue-600)',
    background: 'var(--blue-600)'
  },
  roadmap: {
    color: 'var(--fg-3)',
    borderColor: 'var(--border)',
    background: 'var(--bone-200)'
  },
  outline: {
    color: 'var(--amber-700)',
    borderColor: 'var(--amber-600)',
    background: 'transparent'
  }
};
const dots = {
  live: 'var(--paper)',
  next: 'var(--paper)',
  roadmap: 'var(--slate-300)'
};
function Tag({
  variant = 'default',
  children,
  style
}) {
  const dot = dots[variant];
  return React.createElement('span', {
    style: Object.assign({}, base, variants[variant], style)
  }, dot && React.createElement('span', {
    style: {
      width: 5,
      height: 5,
      borderRadius: '50%',
      background: dot,
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/Term.jsx
try { (() => {
function Term({
  dark,
  children,
  style
}) {
  const css = {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.92em',
    background: dark ? 'rgba(244,240,229,0.06)' : 'var(--bone-100)',
    border: '1px solid ' + (dark ? 'rgba(244,240,229,0.14)' : 'var(--border)'),
    padding: '1px 6px',
    borderRadius: 'var(--radius-chip)',
    color: dark ? 'var(--bone-100)' : 'var(--ink-900)',
    whiteSpace: 'nowrap'
  };
  return React.createElement('code', {
    style: Object.assign(css, style)
  }, children);
}
Object.assign(__ds_scope, { Term });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Term.jsx", error: String((e && e.message) || e) }); }

// components/layout/Footer.jsx
try { (() => {
const product = [{
  to: '/platform',
  label: 'Platform'
}, {
  to: '/industries',
  label: 'Industries'
}, {
  to: '/deployment',
  label: 'Deployment'
}];
const trust = [{
  to: '/trust',
  label: 'Architecture'
}, {
  to: '/trust#free-ai',
  label: 'RBI FREE-AI'
}, {
  to: '/trust#dpdp',
  label: 'DPDP & CERT-In'
}, {
  to: '/trust#downloads',
  label: 'Regulator pack'
}];
const company = [{
  to: '/company',
  label: 'About'
}, {
  to: '/company#team',
  label: 'Team'
}, {
  to: '/company#careers',
  label: 'Careers'
}, {
  to: '/blog',
  label: 'Sovereign Stack'
}, {
  to: '/contact',
  label: 'Contact'
}];
function Col({
  title,
  links
}) {
  return React.createElement('div', null, React.createElement('h4', {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.02em',
      color: 'var(--fg-3)',
      marginBottom: 16
    }
  }, title), React.createElement('ul', {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, links.map(l => React.createElement('li', {
    key: l.to + l.label
  }, React.createElement('a', {
    href: l.to,
    style: {
      fontSize: 14,
      color: 'var(--ink-900)',
      textDecoration: 'none'
    }
  }, l.label)))));
}
function Footer({
  logoSrc = '/assets/anvax-icon.png',
  blurb = "The sovereign AI platform for India's regulated enterprises. Built in India, governed for India's regulators.",
  legal = '\u00A9 2026 Anvax Technologies Pvt. Ltd.',
  style
}) {
  return React.createElement('footer', {
    style: Object.assign({
      background: 'var(--bone-100)',
      borderTop: '2px solid var(--border)',
      padding: '72px 0 36px'
    }, style)
  }, React.createElement('div', {
    className: 'container'
  }, React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
      gap: 36
    }
  }, React.createElement('div', null, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, React.createElement('img', {
    src: logoSrc,
    alt: '',
    style: {
      height: 28,
      width: 28
    }
  }), React.createElement('span', {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 800,
      fontSize: 18,
      color: 'var(--ink-900)',
      lineHeight: 1,
      letterSpacing: '-0.03em'
    }
  }, 'Anvax')), React.createElement('p', {
    style: {
      marginTop: 14,
      fontSize: 13,
      lineHeight: '20px',
      color: 'var(--ink-500)',
      maxWidth: '36ch'
    }
  }, blurb)), React.createElement(Col, {
    title: 'Product',
    links: product
  }), React.createElement(Col, {
    title: 'Trust',
    links: trust
  }), React.createElement(Col, {
    title: 'Company',
    links: company
  })), React.createElement('div', {
    style: {
      marginTop: 56,
      paddingTop: 24,
      borderTop: '2px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      color: 'var(--fg-3)',
      letterSpacing: '0.01em'
    }
  }, React.createElement('span', null, legal), React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, React.createElement('span', {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--amber-600)'
    }
  }), 'Data residency \u00B7 India'))));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Footer.jsx", error: String((e && e.message) || e) }); }

// components/layout/Nav.jsx
try { (() => {
const defaultLinks = [{
  to: '/platform',
  label: 'Platform'
}, {
  to: '/industries',
  label: 'Industries'
}, {
  to: '/trust',
  label: 'Trust'
}, {
  to: '/deployment',
  label: 'Deployment'
}, {
  to: '/company',
  label: 'Company'
}, {
  to: '/blog',
  label: 'Blog'
}];
function NavLink({
  link,
  active,
  onNavigate
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement('a', {
    href: link.to,
    onClick: onNavigate ? e => {
      e.preventDefault();
      onNavigate(link.to);
    } : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      textDecoration: 'none',
      padding: '6px 0',
      position: 'relative',
      color: hover && !active ? 'var(--amber-700)' : 'var(--ink-900)',
      transition: 'color var(--dur-base) var(--ease-out)'
    }
  }, link.label, active && React.createElement('span', {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: -22,
      height: 2,
      background: 'var(--ink-900)'
    }
  }));
}
function Nav({
  links = defaultLinks,
  active,
  logoSrc = '/assets/anvax-icon.png',
  ctaLabel = 'Request a demo',
  onNavigate,
  style
}) {
  return React.createElement('nav', {
    'aria-label': 'Primary',
    style: Object.assign({
      position: 'sticky',
      top: 0,
      zIndex: 30,
      background: 'var(--nav-bg)',
      WebkitBackdropFilter: 'var(--nav-blur)',
      backdropFilter: 'var(--nav-blur)',
      borderBottom: '2px solid var(--border)'
    }, style)
  }, React.createElement('div', {
    className: 'container',
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 'var(--nav-height)'
    }
  }, React.createElement('a', {
    href: '/',
    'aria-label': 'Anvax home',
    onClick: onNavigate ? e => {
      e.preventDefault();
      onNavigate('/');
    } : undefined,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      textDecoration: 'none'
    }
  }, React.createElement('img', {
    src: logoSrc,
    alt: '',
    style: {
      height: 36,
      width: 36
    }
  }), React.createElement('span', {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 800,
      fontSize: 22,
      color: 'var(--ink-900)',
      lineHeight: 1,
      letterSpacing: '-0.03em'
    }
  }, 'Anvax')), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 28,
      alignItems: 'center'
    }
  }, links.map(l => React.createElement(NavLink, {
    key: l.to,
    link: l,
    active: active === l.to,
    onNavigate
  }))), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, React.createElement(__ds_scope.Button, {
    variant: 'primary',
    href: '/contact',
    onClick: onNavigate ? e => {
      e.preventDefault();
      onNavigate('/contact');
    } : undefined
  }, ctaLabel))));
}
Object.assign(__ds_scope, { Nav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/BlogScreens.jsx
try { (() => {
const {
  BlogCard,
  Pagination
} = window.AnvaxDesignSystem_ae9769;
const ASSETS = '../../assets';
const POSTS = [{
  slug: 'rbi-democratising-ai-compute',
  title: 'RBI Is Serious About Democratising AI Compute',
  description: "RBI's FREE-AI report treats compute access, not just governance, as the real bottleneck to inclusive AI adoption in Indian finance.",
  date: '18 Aug 2026',
  readingTime: 6,
  tags: ['RBI', 'FREE-AI', 'AI Governance', 'BFSI']
}, {
  slug: 'india-public-data-lake-financial-ai',
  title: 'India Is Building a Public Data Lake for Financial AI. Here Is What It Changes.',
  description: "RBI's FREE-AI report proposed a publicly governed financial sector data lake. Why that is a market structure decision, not an infrastructure one.",
  date: '14 Aug 2026',
  readingTime: 7,
  tags: ['RBI', 'FREE-AI', 'AI Governance', 'BFSI']
}, {
  slug: 'when-the-model-degrades',
  title: 'What Happens to the Workflow When the Model Degrades',
  description: "Model degradation doesn't crash the API, it just quietly stops being trustworthy. Here's what a BFSI workflow needs to catch that before a complaint does.",
  date: '11 Aug 2026',
  readingTime: 8,
  tags: ['Model Risk', 'AI Governance', 'Model Monitoring'],
  image: 'when-the-model-degrades.webp'
}, {
  slug: 'nobody-tried-to-break-your-ai',
  title: 'Nobody Has Tried to Break Your AI Yet. That Is Not Good News.',
  description: "An untested AI agent isn't safe, it's unproven. Why BFSI teams need adversarial testing before a fraud ring or regulator finds the gaps first.",
  date: '6 Aug 2026',
  readingTime: 7,
  tags: ['AI Governance', 'AI Audit', 'Model Risk']
}, {
  slug: 'attack-surface-before-defenses',
  title: 'AI Gives Your Institution New Attack Surface Before It Gives You New Defenses',
  description: 'Every AI system a bank ships opens a new door before anyone builds the lock for it. Why the security gap between AI adoption and AI defense is BFSI\u2019s next real exposure.',
  date: '4 Aug 2026',
  readingTime: 8,
  tags: ['AI Security', 'Cyber Risk', 'RBI']
}, {
  slug: 'denied-by-a-model',
  title: 'Your Customer Does Not Know They Were Denied by a Model',
  description: "A rejection letter that never mentions a model isn't neutral - it's a disclosure gap. Why silent algorithmic denial is becoming BFSI's next transparency problem.",
  date: '30 Jul 2026',
  readingTime: 7,
  tags: ['AI Governance', 'Explainability', 'Customer Trust'],
  image: 'denied-by-a-model.webp'
}, {
  slug: 'governance-starts-at-deployment',
  title: 'Model Governance Does Not End at Deployment. That Is Where It Starts.',
  description: "Most governance effort is spent before a model ships. Here's why the deployment date is the start of the highest-risk phase, not the finish line.",
  date: '27 Jul 2026',
  readingTime: 7,
  tags: ['AI Governance', 'Model Risk', 'Model Monitoring']
}, {
  slug: 'training-data-paper-trail',
  title: "Your AI Is Only As Compliant As Its Training Data's Paper Trail",
  description: "Model documentation means nothing if you can't prove what the model was trained on. Why training data provenance is the compliance gap BFSI institutions haven't priced yet.",
  date: '23 Jul 2026',
  readingTime: 8,
  tags: ['AI Governance', 'Data Lineage', 'RBI']
}, {
  slug: 'shadow-ai-inventory-problem',
  title: 'You Cannot Govern Models You Have Not Listed',
  description: "The shadow AI inventory problem: BFSI institutions can't govern models, prompts, and agents nobody registered. Here is why that gap is now a regulatory exposure.",
  date: '21 Jul 2026',
  readingTime: 7,
  tags: ['AI Governance', 'Model Risk', 'RBI', 'BFSI'],
  image: 'shadow-ai-inventory-problem.webp'
}, {
  slug: 'ai-policy-set-of-decisions',
  title: 'A Board-Approved AI Policy Is Not a Document. It Is a Set of Decisions.',
  description: 'Most AI policies in Indian financial institutions decide nothing. Here is the test that separates a governance instrument from a well-formatted intention.',
  date: '17 Jul 2026',
  readingTime: 6,
  tags: ['AI Governance', 'RBI', 'Board Oversight']
}, {
  slug: 'ai-audit-trail-90-days',
  title: 'Can You Reconstruct One AI Decision From 90 Days Ago?',
  description: "RBI's FREE-AI audit framework turns AI governance policy into governance proof. Most institutions can't reconstruct a single AI-assisted decision today.",
  date: '14 Jul 2026',
  readingTime: 7,
  tags: ['RBI', 'FREE-AI', 'AI Audit'],
  image: 'ai-audit-trail-90-days.webp'
}, {
  slug: 'hallucination-board-risk',
  title: 'Hallucination just became a board-level risk.',
  description: "RBI's latest draft quietly changes who owns AI hallucinations. What was once considered a product problem is becoming a governance obligation.",
  date: '7 Jul 2026',
  readingTime: 6,
  tags: ['RBI', 'Generative AI', 'Model Risk']
}];
const PER_PAGE = 6;
function LatticeHeader({
  eyebrow,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '60px 0 72px',
      borderBottom: '1px solid var(--border)',
      background: 'var(--ink-900)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'url(' + ASSETS + '/lattice.svg)',
      backgroundSize: '220px 220px',
      opacity: 0.06,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.02em',
      color: 'rgba(255,255,255,0.45)',
      marginBottom: 20
    }
  }, eyebrow), children)));
}
function BlogScreen({
  go
}) {
  const [page, setPage] = React.useState(1);
  const totalPages = Math.ceil(POSTS.length / PER_PAGE);
  const shown = POSTS.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LatticeHeader, {
    eyebrow: "Sovereign Stack"
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 400,
      fontSize: 48,
      lineHeight: '58px',
      letterSpacing: '-0.015em',
      color: 'var(--bone-100)',
      marginBottom: 20,
      whiteSpace: 'nowrap'
    }
  }, "Notes on governed AI in Indian finance."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 18,
      lineHeight: '28px',
      color: 'var(--fg-on-dark-dim)',
      maxWidth: '54ch',
      marginBottom: 28
    }
  }, "What RBI, SEBI and IRDAI are actually asking for, and what it takes to answer them with evidence rather than policy."), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.02em',
      color: 'rgba(255,255,255,0.55)',
      textDecoration: 'none',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: 'var(--radius-pill)',
      padding: '4px 12px'
    }
  }, "RSS")), /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      paddingBottom: 96
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24,
      marginTop: 48
    }
  }, shown.map(p => /*#__PURE__*/React.createElement(BlogCard, {
    key: p.slug,
    title: p.title,
    description: p.description,
    date: p.date,
    readingTime: p.readingTime,
    tags: p.tags,
    href: '#' + p.slug,
    style: {
      cursor: 'pointer'
    }
  }))), /*#__PURE__*/React.createElement(Pagination, {
    currentPage: page,
    totalPages: totalPages,
    onSelect: setPage
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('/blog/shadow-ai-inventory-problem');
    },
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--fg-3)',
      textDecoration: 'none'
    }
  }, "Open a post \u2192"))));
}
const POST_BODY = [{
  h2: 'The Problem Nobody Put On The Risk Register'
}, {
  p: "Here's something that keeps model risk officers up at night: the models they can name are not the ones they should worry about. The fine-tuned classifier in the fraud queue, the vendor's credit model, the chatbot answering EMI questions - those are on a spreadsheet somewhere, reviewed, signed off. What isn't on that spreadsheet is the real exposure."
}, {
  p: 'A product manager wires a prompt template into a support workflow on a Friday afternoon. A data scientist spins up an open-weights model on a personal API key to test an idea before the sprint review. A vendor updates their underlying model version without telling anyone, because the contract never asked them to.'
}, {
  quote: 'A missing entry in a model inventory is not a documentation gap. It is a governance gap wearing a documentation costume.'
}, {
  h2: "First, Let's Be Clear About What We're Talking About"
}, {
  p: 'Shadow AI, properly defined, is any model, prompt chain, fine-tune, or agent making decisions or generating outputs that touch your institution\u2019s customers, data, or operations - without appearing in a system your risk function actually monitors. That includes:'
}, {
  ul: ["A vendor's embedded model whose version changes are invisible to your contract terms", 'An internal fine-tune built for a pilot that quietly became production', 'A prompt template in a low-code workflow tool that nobody classified as "a model"', 'An agent that calls three other models and a rules engine, none of which were individually registered as "AI"']
}, {
  p: "The common thread is not malice. It's velocity. Model deployment got faster than model governance, and the gap between them is where shadow AI lives."
}];
function BlogPostScreen({
  go
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '60px 0 64px',
      borderBottom: '1px solid var(--border)',
      background: 'var(--ink-900)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'url(' + ASSETS + '/lattice.svg)',
      backgroundSize: '220px 220px',
      opacity: 0.06
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 900,
      margin: '0 auto',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.02em',
      color: 'rgba(255,255,255,0.45)',
      marginBottom: 20
    }
  }, "Sovereign Stack"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 400,
      fontSize: 44,
      lineHeight: '54px',
      letterSpacing: '-0.016em',
      color: 'var(--bone-100)',
      marginBottom: 24
    }
  }, "You Cannot Govern Models You Have Not Listed"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.02em',
      color: 'var(--fg-on-dark-dim)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "21 Jul 2026"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.4
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "7 min read")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 6,
      marginTop: 20
    }
  }, ['AI Governance', 'Model Risk', 'RBI', 'BFSI', 'AI Audit', 'Compliance'].map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.02em',
      padding: '3px 9px',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid rgba(244,240,229,0.18)',
      background: 'rgba(244,240,229,0.06)',
      color: 'var(--fg-on-dark-dim)'
    }
  }, t)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '64px 0 96px',
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      width: '100%',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('/blog');
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.02em',
      color: 'var(--fg-3)',
      textDecoration: 'none',
      marginBottom: 40
    }
  }, "\u2190 All posts"), /*#__PURE__*/React.createElement("img", {
    src: ASSETS + '/blog/shadow-ai-inventory-problem.webp',
    alt: "",
    style: {
      width: '100%',
      marginBottom: 40,
      border: '1px solid var(--border)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      lineHeight: '28px',
      color: 'var(--fg-2)'
    }
  }, POST_BODY.map((b, i) => {
    if (b.h2) return /*#__PURE__*/React.createElement("h2", {
      key: i,
      style: {
        fontFamily: 'var(--font-serif)',
        fontSize: 28,
        fontWeight: 400,
        lineHeight: '36px',
        color: 'var(--ink-900)',
        marginTop: 48,
        marginBottom: 16,
        letterSpacing: '-0.01em'
      }
    }, b.h2);
    if (b.quote) return /*#__PURE__*/React.createElement("blockquote", {
      key: i,
      style: {
        margin: '28px 0',
        padding: '16px 24px',
        borderLeft: '2px solid var(--ink-900)',
        background: 'var(--bone-100)',
        fontFamily: 'var(--font-serif)',
        fontSize: 19,
        lineHeight: '30px',
        color: 'var(--ink-900)'
      }
    }, b.quote);
    if (b.ul) return /*#__PURE__*/React.createElement("ul", {
      key: i,
      style: {
        paddingLeft: 24,
        marginBottom: 20
      }
    }, b.ul.map(li => /*#__PURE__*/React.createElement("li", {
      key: li,
      style: {
        marginBottom: 8
      }
    }, li)));
    return /*#__PURE__*/React.createElement("p", {
      key: i,
      style: {
        marginBottom: 20
      }
    }, b.p);
  })))));
}
Object.assign(window, {
  BlogScreen,
  BlogPostScreen,
  POSTS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/BlogScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ContactScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ASSETS = '../../assets';
const inputStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: 15,
  color: 'var(--ink-900)',
  background: 'var(--bone-50)',
  border: '1px solid var(--border-strong)',
  borderRadius: 'var(--radius-md)',
  padding: '10px 14px',
  outline: 'none',
  width: '100%',
  transition: 'border-color var(--dur-base) var(--ease-out)'
};
function Field({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 500,
      letterSpacing: '0.01em',
      color: 'var(--ink-500)'
    }
  }, label), children);
}
function Input(props) {
  const [focus, setFocus] = React.useState(false);
  const El = props.multiline ? 'textarea' : 'input';
  const {
    multiline,
    ...rest
  } = props;
  return /*#__PURE__*/React.createElement(El, _extends({}, rest, {
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: Object.assign({}, inputStyle, multiline ? {
      resize: 'vertical',
      minHeight: 96
    } : null, focus ? {
      borderColor: 'var(--ink-900)',
      background: 'var(--paper)'
    } : null)
  }));
}
function ContactScreen() {
  const [sent, setSent] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      padding: '60px 0 72px',
      borderBottom: '1px solid var(--border-dark)',
      background: 'var(--ink-900)',
      overflow: 'hidden',
      backgroundImage: 'radial-gradient(70% 80% at 90% 0%, rgba(184,132,62,0.18) 0%, rgba(184,132,62,0) 55%), radial-gradient(80% 60% at 0% 100%, rgba(20,35,55,1) 0%, rgba(11,26,42,0) 60%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'url(' + ASSETS + '/lattice.svg)',
      backgroundSize: '220px 220px',
      opacity: 0.06
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 700,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.02em',
      color: 'rgba(255,255,255,0.45)',
      marginBottom: 20
    }
  }, "Contact"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 400,
      fontSize: 50,
      lineHeight: '60px',
      letterSpacing: '-0.018em',
      color: 'var(--bone-100)'
    }
  }, "Bring your regulator into the room."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 24,
      fontFamily: 'var(--font-serif)',
      fontSize: 20,
      lineHeight: '30px',
      color: 'var(--fg-on-dark-dim)'
    }
  }, "Tell us what your examiner is asking for. We will show you the workspace that answers it.")))), /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      padding: '64px 72px 96px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 340px',
      gap: 64,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 40,
      background: 'var(--paper)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)'
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '48px 24px',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: '50%',
      background: 'var(--sage-100)',
      color: 'var(--sage-700)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 22,
      fontWeight: 600
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 24,
      fontWeight: 400,
      color: 'var(--ink-900)'
    }
  }, "Thanks \u2014 we have it."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: '24px',
      color: 'var(--ink-500)',
      maxWidth: '40ch'
    }
  }, "We respond to every sales enquiry within one business day.")) : /*#__PURE__*/React.createElement("form", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    },
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Full name"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Aditi Rao"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Work email"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "aditi@nbfc.in"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Institution"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Regulated entity name"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Role"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Chief Compliance Officer"
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "What are you trying to prove to your regulator?"
  }, /*#__PURE__*/React.createElement(Input, {
    multiline: true,
    placeholder: "e.g. reconstruct any AI-assisted credit decision from the last 90 days"
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      alignSelf: 'flex-start',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 500,
      padding: '11px 22px',
      background: hover ? 'var(--amber-700)' : 'var(--amber-600)',
      color: 'var(--bone-100)',
      border: 'none',
      borderRadius: 'var(--radius-button)',
      cursor: 'pointer',
      transition: 'background var(--dur-base) var(--ease-out)'
    }
  }, "Request a demo"))), /*#__PURE__*/React.createElement("aside", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, [{
    label: 'Response time',
    desc: 'We respond to every sales enquiry within one business day. Security reports within 24 hours.'
  }, {
    label: 'Data residency',
    desc: 'Every deployment tier keeps customer data, embeddings and inference traces inside India.'
  }].map(c => /*#__PURE__*/React.createElement("div", {
    key: c.label,
    style: {
      padding: 24,
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--bone-50)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.02em',
      color: 'var(--amber-700)',
      marginBottom: 10
    }
  }, c.label), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: '22px',
      color: 'var(--ink-500)',
      marginBottom: 12
    }
  }, c.desc), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--ink-900)',
      textDecoration: 'none',
      borderBottom: '1px solid var(--border-strong)',
      paddingBottom: 1
    }
  }, "hello@anvax.in")))))));
}
Object.assign(window, {
  ContactScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ContactScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
const {
  Button,
  Eyebrow,
  Tag,
  SectionHead,
  Icon
} = window.AnvaxDesignSystem_ae9769;
const heroBadges = ['RBI', 'SEBI', 'IRDAI', 'DPDP-aware', 'SOC 2', 'ISO 27001', 'CERT-In (in progress)'];
const heroStack = [{
  label: 'Application: search, chat, agents, workflows',
  color: 'var(--blue)',
  icon: 'application',
  offset: 0
}, {
  label: 'Governance: redaction, audit, policy',
  color: 'var(--ink-900)',
  icon: 'shield',
  offset: 28
}, {
  label: 'Knowledge core: corpus, India stack',
  color: 'var(--teal)',
  icon: 'layers',
  offset: 56
}];
function Hero({
  go
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'relative',
      padding: '96px 0 72px',
      background: 'var(--bg-page)',
      backgroundImage: 'var(--wash-hero)',
      borderBottom: '2px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,7fr) minmax(0,5fr)',
      gap: 32,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Sovereign AI \xB7 Built for India's regulators"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 800,
      fontSize: 64,
      lineHeight: '70px',
      letterSpacing: '-0.02em',
      color: 'var(--ink-900)',
      margin: '20px 0 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block'
    }
  }, "Governed AI for India's"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block'
    }
  }, "regulated enterprises.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: '28px',
      color: 'var(--ink-500)',
      maxWidth: '52ch',
      marginTop: 28
    }
  }, "Your analysts search, chat, and run workflows on your own corpus, not someone else's cloud. Every query is logged. Every PII field is redacted before it leaves the boundary."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    onClick: () => go('/contact')
  }, "Request a demo"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => go('/trust')
  }, "Architecture for regulators")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    },
    "aria-label": "Compliance posture"
  }, heroBadges.map(b => /*#__PURE__*/React.createElement(Tag, {
    key: b,
    variant: "outline"
  }, b)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 14,
      paddingTop: 80
    },
    "aria-hidden": "true"
  }, heroStack.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      background: s.color,
      marginLeft: s.offset,
      padding: '18px 22px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 18,
    color: "white"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--paper)'
    }
  }, s.label)))))));
}
const problems = [{
  title: 'No scoped access',
  body: 'Employees get all-or-nothing access to internal systems. IT has no way to assign the right tools to the right people.'
}, {
  title: 'Shadow AI',
  body: 'When employees connect AI tools on their own, IT has no way to track, manage, or revoke connections.'
}, {
  title: 'No audit trail or logs',
  body: 'When an employee uses AI to take action in a system, there is no record of what happened or what data was shared.'
}, {
  title: 'No data guardrails',
  body: 'AI tool calls pass through third-party systems with no policy enforcement on what data is included.'
}];
function Problem() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      maxWidth: 860,
      margin: '0 auto 56px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 800,
      fontSize: 40,
      lineHeight: 1.15,
      letterSpacing: '-0.025em',
      color: 'var(--ink-900)',
      margin: '0 0 20px'
    }
  }, "Employees want to move fast with AI.", /*#__PURE__*/React.createElement("br", null), "IT can't enable it safely."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.6,
      color: 'var(--ink-500)',
      maxWidth: 680,
      margin: '0 auto'
    }
  }, "When employees connect AI to third-party systems, it's all or nothing. Most companies have no way to scope tool access by role, no guardrails on what data reaches third party APIs, and no audit trail.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 1,
      background: 'var(--border)',
      border: '1px solid var(--border)'
    }
  }, problems.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.title,
    style: {
      background: 'var(--bone-50)',
      padding: '28px 24px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 15,
      fontWeight: 700,
      lineHeight: 1.4,
      color: 'var(--ink-900)',
      margin: '0 0 10px'
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.65,
      color: 'var(--ink-500)',
      margin: 0
    }
  }, p.body))))));
}
const pillars = [{
  tag: 'Shipping today',
  title: 'Wedge',
  body: 'Your analysts work on your corpus, not ours: search, chat, workflows and agents with full audit trails, DPDP compliance and Indian data residency.',
  icon: 'bolt',
  color: 'var(--blue)',
  href: '/platform'
}, {
  tag: 'Compounding',
  title: 'Platform',
  body: 'Four structural advantages built into every deployment: organisational memory, India-stack connectors, vertical packs, and compliance infrastructure on day one.',
  icon: 'stack',
  color: 'var(--ink-900)',
  href: '/platform'
}, {
  tag: 'Your iron',
  title: 'Deployment',
  body: 'Three tiers, one product: fully managed SaaS on Indian infrastructure, sovereign VPC, or on-prem and air-gapped. Your data never leaves India.',
  icon: 'layers',
  color: 'var(--teal)',
  href: '/deployment'
}];
function PillarCard({
  p,
  go
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: p.href,
    onClick: e => {
      e.preventDefault();
      go(p.href);
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--paper)',
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      alignItems: 'flex-start',
      textDecoration: 'none',
      color: 'inherit',
      transform: hover ? 'translateY(-4px)' : 'none',
      boxShadow: hover ? 'var(--shadow-md)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      background: p.color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: p.icon,
    size: 20,
    color: "white"
  })), /*#__PURE__*/React.createElement(Tag, {
    variant: "outline"
  }, p.tag), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 800,
      fontSize: 26,
      lineHeight: '32px',
      letterSpacing: '-0.008em',
      margin: 0
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: '22px',
      color: 'var(--ink-500)',
      margin: 0
    }
  }, p.body));
}
function Pillars({
  go
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "section alt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "How Anvax works",
    title: "Three layers. One product.",
    lede: "A wedge that ships today, a platform that compounds, and a deployment model that meets every regulator where they are."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24
    }
  }, pillars.map(p => /*#__PURE__*/React.createElement(PillarCard, {
    key: p.title,
    p: p,
    go: go
  })))));
}
const layers = [{
  num: 'Layer 03',
  name: 'Application layer',
  desc: 'The surface your analyst, RM and compliance officer use every day.',
  icon: 'application',
  color: 'var(--blue)',
  chips: [{
    t: 'Search',
    d: 'Hybrid · cited',
    ci: 'search'
  }, {
    t: 'Chat',
    d: 'Threads · ⌘K',
    ci: 'chat'
  }, {
    t: 'Workflows',
    d: 'Temporal-backed',
    ci: 'workflow'
  }, {
    t: 'Agents',
    d: 'Policy-checked',
    ci: 'agent'
  }]
}, {
  num: 'Layer 02',
  name: 'Governance layer',
  desc: 'Every request passes through here, wired into the data path, not an afterthought.',
  icon: 'shield',
  color: 'var(--ink-900)',
  chips: [{
    t: 'PII redaction',
    d: 'Aadhaar · PAN · UPI',
    ci: 'redaction'
  }, {
    t: 'Prompt-injection gate',
    d: 'Per user message',
    ci: 'bolt'
  }, {
    t: 'Model gateway',
    d: 'Tier-gated · pinned',
    ci: 'gateway'
  }, {
    t: 'Immutable audit',
    d: 'SHA-256 chained',
    ci: 'audit'
  }]
}, {
  num: 'Layer 01',
  name: 'Knowledge core',
  desc: 'Customer corpus, India-stack connectors, and the hybrid index that makes them queryable.',
  icon: 'layers',
  color: 'var(--teal)',
  chips: [{
    t: 'Customer corpus',
    d: 'Per-tenant',
    ci: 'corpus'
  }, {
    t: 'India stack',
    d: 'GST · MCA · AA · Tally',
    ci: 'stack'
  }, {
    t: 'Hybrid index',
    d: 'RAG + structured',
    ci: 'index'
  }, {
    t: 'Encrypted at rest',
    d: 'AES-256-GCM · per-tenant DEK',
    ci: 'lock'
  }]
}];
function ArchChip({
  c,
  color
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      border: '1px solid ' + (hover ? color : 'var(--border)'),
      padding: '12px 14px',
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      transform: hover ? 'translateY(-2px)' : 'none',
      boxShadow: hover ? 'var(--shadow-sm)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      marginTop: 6,
      flex: 'none',
      background: color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 600,
      lineHeight: '18px',
      color: 'var(--ink-900)'
    }
  }, c.t), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      lineHeight: '16px',
      color: 'var(--fg-3)'
    }
  }, c.d)), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      alignSelf: 'flex-end',
      color: 'var(--fg-3)',
      opacity: 0.7
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.ci,
    size: 14
  })));
}
function ArchRow({
  l
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      borderTop: '2px solid var(--border)',
      padding: '24px 0',
      paddingLeft: hover ? 8 : 0,
      display: 'grid',
      gridTemplateColumns: 'minmax(140px,240px) 1fr',
      gap: '24px 64px',
      alignItems: 'start',
      background: hover ? 'var(--hover-wash)' : 'transparent',
      transition: 'background var(--dur-base) var(--ease-out), padding-left var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      flex: 'none',
      borderRadius: '50%',
      background: l.color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: hover ? 'scale(1.12) rotate(6deg)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: l.icon,
    size: 16,
    color: "white"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--fg-3)',
      marginBottom: 6,
      fontVariantNumeric: 'tabular-nums'
    }
  }, l.num), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 800,
      fontSize: 20,
      lineHeight: '26px',
      color: 'var(--ink-900)'
    }
  }, l.name), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 10,
      fontSize: 14,
      lineHeight: '20px',
      color: 'var(--ink-500)',
      maxWidth: '26ch'
    }
  }, l.desc))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      gap: 10
    }
  }, l.chips.map(c => /*#__PURE__*/React.createElement(ArchChip, {
    key: c.t,
    c: c,
    color: l.color
  }))));
}
function Arch({
  go
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Architecture \xB7 Conceptual",
    title: "One stack, three layers.",
    lede: "Knowledge is grounded per tenant. Governance sits between the user and the model, not as an afterthought. The application layer is what your people see."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 0
    }
  }, layers.map(l => /*#__PURE__*/React.createElement(ArchRow, {
    key: l.num,
    l: l
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 0 0',
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      fontSize: 13.5,
      color: 'var(--ink-500)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "All customer data, embeddings & inference traces stay in India."), /*#__PURE__*/React.createElement("a", {
    href: "/trust",
    onClick: e => {
      e.preventDefault();
      go('/trust');
    },
    style: {
      color: 'var(--ink-900)',
      textDecoration: 'none',
      fontWeight: 600,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, "See the full architecture ", /*#__PURE__*/React.createElement("span", null, "\u2192"))))));
}
const industries = [{
  tag: 'NBFC',
  status: 'live',
  title: 'NBFC',
  body: 'Credit-pack assembly, RBI circular tracking, customer 360, and audit-prep workflows.',
  roles: ['Compliance', 'Credit', 'Ops', 'Internal audit'],
  icon: 'bank',
  color: 'var(--teal)'
}, {
  tag: 'Wealth',
  status: 'next',
  title: 'Wealth management',
  body: 'Client briefings, portfolio commentary, SEBI advisor disclosures, and KYC packs.',
  roles: ['RM', 'Research', 'Compliance'],
  icon: 'trend',
  color: 'var(--blue)'
}, {
  tag: 'Lending',
  status: 'next',
  title: 'Lending',
  body: 'Underwriting over bank statements, GST, and AA pulls. Remediation tickets from circulars.',
  roles: ['Underwriting', 'Risk', 'Collections'],
  icon: 'rupee',
  color: 'var(--blue)'
}, {
  tag: 'Insurance',
  status: 'roadmap',
  title: 'Insurance',
  body: 'Policy lookups, IRDAI disclosure drafting, claims triage, agent-script governance.',
  roles: ['Underwriting', 'Claims', 'Compliance'],
  icon: 'shield',
  color: 'var(--ink-900)'
}, {
  tag: 'Broking',
  status: 'roadmap',
  title: 'Broking',
  body: 'SEBI circular intake, surveillance memos, research synthesis, client briefings.',
  roles: ['Compliance', 'Research', 'Surveillance'],
  icon: 'bars',
  color: 'var(--ink-900)'
}, {
  tag: 'Payments',
  status: 'roadmap',
  title: 'Payments',
  body: 'Merchant onboarding, dispute drafts, RBI PSO compliance, and incident postmortems.',
  roles: ['Risk', 'Ops', 'Compliance'],
  icon: 'card',
  color: 'var(--ink-900)'
}];
const statusLabel = {
  live: 'Live',
  next: 'Next',
  roadmap: 'Roadmap'
};
function IndustryCard({
  i
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      borderTop: '2px solid var(--border)',
      padding: '22px 20px 22px 0',
      textDecoration: 'none',
      color: 'inherit',
      background: hover ? 'var(--hover-wash)' : 'transparent',
      transition: 'background var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      flex: 'none',
      background: i.color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i.icon,
    size: 16,
    color: "white"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 800,
      fontSize: 19,
      lineHeight: '24px',
      margin: 0
    }
  }, i.tag), /*#__PURE__*/React.createElement(Tag, {
    variant: i.status
  }, statusLabel[i.status])), i.title !== i.tag && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      letterSpacing: '0.01em',
      color: 'var(--fg-3)',
      margin: '-8px 0 12px'
    }
  }, i.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: '21px',
      color: 'var(--ink-500)',
      margin: '0 0 12px'
    }
  }, i.body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '4px 8px',
      fontSize: 13.5,
      letterSpacing: '0.01em',
      color: 'var(--fg-3)'
    }
  }, i.roles.map(r => /*#__PURE__*/React.createElement("span", {
    key: r
  }, "\xB7 ", r))));
}
function Industries() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section alt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Industries \xB7 Year 1 rollout",
    title: "NBFC first. Then the rest of regulated India.",
    lede: "Vertical packs ship as compounding intelligence: RBI circulars, sectoral templates, role-based workflows. We don't sell horizontally and call it a fit."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 0
    }
  }, industries.map(i => /*#__PURE__*/React.createElement(IndustryCard, {
    key: i.tag,
    i: i
  })))));
}
const compliance = [{
  title: 'Data residency',
  body: 'Customer data, embeddings and model responses stay in India at every tier: SaaS, sovereign cloud, or on-prem. No exceptions.',
  icon: 'residency',
  color: 'var(--teal)'
}, {
  title: 'Audit trail',
  body: 'Complete inference trail from prompt to response. Immutable, tamper-evident, and exportable when your examiner asks for it.',
  icon: 'auditBook',
  color: 'var(--blue)'
}, {
  title: 'RBI compliance',
  body: 'RBI FREE-AI requirements, DPDP Act 2023, and CERT-In obligations are implemented in the product. Not on a roadmap.',
  icon: 'shield',
  color: 'var(--ink-900)'
}];
function Compliance({
  go
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      padding: '64px 0',
      borderBottom: '1px solid var(--border)',
      background: 'var(--blue-light)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Compliance & sovereignty",
    title: "Built for the regulator in the room."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24
    }
  }, compliance.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.title,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      background: c.color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.icon,
    size: 20,
    color: "white"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 800,
      fontSize: 19,
      lineHeight: '26px',
      margin: 0,
      color: 'var(--ink-900)'
    }
  }, c.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14.5,
      lineHeight: '22px',
      color: 'var(--ink-500)',
      margin: 0
    }
  }, c.body)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/trust",
    onClick: e => {
      e.preventDefault();
      go('/trust');
    },
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--amber-700)',
      textDecoration: 'none'
    }
  }, "Read the full compliance architecture \u2192"))));
}
function Vision() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Vision",
    title: "The compliance layer is not a feature you configure. It is the foundation."
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15.5,
      lineHeight: '27px',
      color: 'var(--ink-500)',
      maxWidth: '64ch',
      margin: 0
    }
  }, "Every AI tool available to Indian compliance teams was built for a different market, a different regulator, a different risk culture. Anvax reverses that. RBI, SEBI and IRDAI requirements are the foundation, Account Aggregator, GST Portal, MCA21 and DigiLocker are first-class connectors. Every query is logged, every PII field redacted, before we ship a single feature.")));
}
function Cta({
  go
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "demo",
    style: {
      background: 'var(--gradient-cta)',
      color: 'var(--paper)',
      padding: '160px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 800,
      fontSize: 52,
      lineHeight: '56px',
      letterSpacing: '-0.015em',
      color: 'var(--paper)',
      maxWidth: '20ch',
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block'
    }
  }, "Bring your regulator"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block'
    }
  }, "into the room.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: '28px',
      maxWidth: '52ch',
      margin: '28px 0 0',
      color: 'rgba(255,255,255,0.85)'
    }
  }, "Show us the audit your CISO is preparing for and we'll show you what an examiner-ready AI workspace looks like, live, on your own corpus."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondaryDark",
    onClick: () => go('/contact')
  }, "Talk to sales"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondaryDark",
    onClick: () => go('/trust')
  }, "Get the regulator pack"))));
}
function HomeScreen({
  go
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, {
    go: go
  }), /*#__PURE__*/React.createElement(Problem, null), /*#__PURE__*/React.createElement(Pillars, {
    go: go
  }), /*#__PURE__*/React.createElement(Arch, {
    go: go
  }), /*#__PURE__*/React.createElement(Industries, null), /*#__PURE__*/React.createElement(Compliance, {
    go: go
  }), /*#__PURE__*/React.createElement(Vision, null), /*#__PURE__*/React.createElement(Cta, {
    go: go
  }));
}
Object.assign(window, {
  HomeScreen,
  CtaBand: Cta
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/PlatformScreen.jsx
try { (() => {
const {
  Tag,
  Icon,
  Button
} = window.AnvaxDesignSystem_ae9769;
const capabilities = [{
  tag: 'Search',
  tagVariant: 'live',
  icon: 'search',
  h3: 'Semantic search over every document in your corpus.',
  desc: 'Hybrid retrieval (dense vectors plus BM25 keyword) across PDFs, RBI circulars, NBFC policies, emails, and structured data. Results arrive with source citations and paragraph-level provenance.',
  specs: [['Retrieval', 'Dense + BM25 hybrid, reranked by cross-encoder'], ['Sources', 'PDF, DOCX, XLSX, JSON, emails, database views'], ['Citations', 'Paragraph-level, page number, document title'], ['PII guard', 'Auto-redact Aadhaar, PAN, IFSC, GSTIN, mobile'], ['Latency', 'P95 < 1.4 s end-to-end including model call']]
}, {
  tag: 'Chat',
  tagVariant: 'live',
  icon: 'chat',
  h3: 'Multi-turn grounded chat that never hallucinates a regulation.',
  desc: 'Every answer is anchored to retrieved context. The model is instructed to say "not found in corpus" rather than fabricate. Thread history stays scoped to tenant, never mixed across customers.',
  specs: [['Grounding', 'RAG with top-k=12, context window 128 K'], ['Tenancy', 'Strict RLS, threads never cross tenant boundary'], ['Models', 'Claude Sonnet, Haiku; Gemini Flash fallback'], ['Roles', 'System prompt + tool schema per role definition'], ['Audit', 'Every turn logged to immutable inference_traces']]
}, {
  tag: 'Workflows',
  tagVariant: 'live',
  icon: 'workflow',
  h3: 'Multi-step compliance workflows with human checkpoints.',
  desc: 'Drag-and-drop workflow builder for recurring tasks: RBI circular triage, credit memo drafting, audit checklist generation. Each step can require human approval before proceeding.',
  specs: [['Builder', 'Visual node graph with conditional branching'], ['Triggers', 'Manual, scheduled (cron), webhook, email ingest'], ['Human gate', 'Approval step with deadline + escalation path'], ['Outputs', 'PDF, DOCX, structured JSON, email, webhook'], ['Templates', 'RBI circular triage, credit memo, audit checklist']]
}, {
  tag: 'Agents',
  tagVariant: 'next',
  icon: 'agent',
  h3: 'Persistent agents that monitor your regulatory environment 24/7.',
  desc: 'Long-running agents watch RBI, SEBI, IRDAI feeds. When a new circular drops, they classify, summarise, and route to the right team before your compliance officer opens email.',
  specs: [['Monitoring', 'RBI, SEBI, IRDAI, MCA feed polling with delta diff'], ['Actions', 'Slack alert, task create, workflow trigger, email'], ['Memory', 'Tenant-scoped persistent memory with TTL policy'], ['Guardrails', 'Action whitelist, spend cap, human-in-the-loop gate']]
}];
const moats = [{
  icon: '🧠',
  h3: 'Persistent memory',
  desc: 'Every query, decision, and approval becomes part of a continuously updated corpus. The longer you use Anvax, the smarter your tenant instance gets, without any data leaving your boundary.'
}, {
  icon: '🇮🇳',
  h3: 'India stack wired in',
  desc: 'GST Portal, Account Aggregator, DigiLocker, MCA21, and UPI/NPCI are pre-connected at the data layer. Built for RBI, SEBI, and IRDAI from day one, not retrofitted later.'
}, {
  icon: '🏦',
  h3: 'BFSI verticals by default',
  desc: 'Not a horizontal AI with a compliance checkbox. The default prompt templates, workflow library, and corpus schema are designed for NBFC, wealth, lending, insurance, broking, and payments.'
}, {
  icon: '📋',
  h3: 'Compliance by construction',
  desc: 'Postgres RLS, per-tenant encryption keys, immutable audit chain, RBI FREE-AI mapping: not features you configure. They are the foundation. You cannot turn them off.'
}];
const logoTiles = [{
  src: 'gst.png',
  name: 'GST Portal',
  kind: 'Govt · Tax'
}, {
  src: 'mca.png',
  name: 'MCA21',
  kind: 'Govt · Corporate'
}, {
  src: 'rbi.png',
  name: 'RBI Circulars',
  kind: 'Regulator'
}, {
  src: 'npci.svg',
  name: 'UPI / NPCI',
  kind: 'Payments infra'
}, {
  src: 'digilocker.svg',
  name: 'DigiLocker',
  kind: 'Govt · Identity'
}, {
  src: 'account-aggregator.svg',
  name: 'Account Aggregator',
  kind: 'Financial data'
}, {
  src: 'sebi.jpg',
  name: 'SEBI',
  kind: 'Regulator'
}, {
  src: 'irdai.png',
  name: 'IRDAI',
  kind: 'Regulator'
}, {
  src: 'tally.png',
  name: 'Tally',
  kind: 'Ledger'
}, {
  src: 'zoho.svg',
  name: 'Zoho Books',
  kind: 'Ledger'
}, {
  src: 'busy.jpg',
  name: 'BUSY',
  kind: 'Ledger'
}, {
  src: 'salesforce-official.svg',
  name: 'Salesforce',
  kind: 'CRM'
}, {
  src: 'slack.svg',
  name: 'Slack',
  kind: 'Messaging'
}, {
  src: 'confluence-official.svg',
  name: 'Confluence',
  kind: 'Knowledge'
}, {
  src: 'snowflake-official.svg',
  name: 'Snowflake',
  kind: 'Data warehouse'
}, {
  src: 'drive-official.svg',
  name: 'Google Drive',
  kind: 'Storage'
}, {
  src: 'sharepoint.svg',
  name: 'SharePoint',
  kind: 'Storage'
}, {
  mono: 'CK',
  name: 'CKYC',
  kind: 'Identity'
}];
const ASSETS = '../../assets';
function PlatformScreen({
  go
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      padding: '60px 0 72px',
      borderBottom: '1px solid var(--border-dark)',
      background: 'var(--ink-900)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'url(' + ASSETS + '/lattice.svg)',
      backgroundSize: '220px 220px',
      opacity: 0.06,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 760,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.02em',
      color: 'rgba(255,255,255,0.45)',
      marginBottom: 20,
      textAlign: 'center'
    }
  }, "Platform"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 400,
      fontSize: 50,
      lineHeight: '60px',
      letterSpacing: '-0.018em',
      color: 'var(--bone-100)',
      textAlign: 'center'
    }
  }, "Four capabilities.", /*#__PURE__*/React.createElement("br", null), "One sovereign platform.", /*#__PURE__*/React.createElement("br", null), "Built for India's regulatory stack."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 24,
      fontFamily: 'var(--font-serif)',
      fontSize: 20,
      lineHeight: '30px',
      color: 'var(--fg-on-dark-dim)',
      textAlign: 'center'
    }
  }, "Search, Chat, Workflows, and Agents, each with an India-stack connector layer, RBI-compliant audit trail, and per-tenant data isolation baked in by construction.")))), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, capabilities.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.tag,
    style: {
      padding: '56px 0',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '40px 80px',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      background: c.tagVariant === 'live' ? 'var(--teal)' : 'var(--blue)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.icon,
    size: 16,
    color: "white"
  })), /*#__PURE__*/React.createElement(Tag, {
    variant: c.tagVariant
  }, c.tag)), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 26,
      fontWeight: 400,
      lineHeight: '34px',
      marginBottom: 14,
      color: 'var(--ink-900)'
    }
  }, c.h3), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--fg-2)',
      fontSize: 15,
      lineHeight: '24px'
    }
  }, c.desc)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      fontSize: 13.5
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.02em',
      color: 'var(--fg-3)',
      padding: '0 0 10px',
      borderBottom: '1px solid var(--border)'
    }
  }, "SPEC"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.02em',
      color: 'var(--fg-3)',
      padding: '0 0 10px',
      borderBottom: '1px solid var(--border)'
    }
  }, "VALUE"))), /*#__PURE__*/React.createElement("tbody", null, c.specs.map(([s, v], i) => /*#__PURE__*/React.createElement("tr", {
    key: s
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12.5,
      color: 'var(--ink-900)',
      fontWeight: 500,
      paddingRight: 20,
      whiteSpace: 'nowrap',
      padding: '10px 20px 10px 0',
      borderBottom: i === c.specs.length - 1 ? 0 : '1px solid var(--border)',
      verticalAlign: 'top'
    }
  }, s), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 0',
      borderBottom: i === c.specs.length - 1 ? 0 : '1px solid var(--border)',
      verticalAlign: 'top',
      color: 'var(--fg-2)',
      fontSize: 13.5,
      lineHeight: '20px'
    }
  }, v)))))))))), /*#__PURE__*/React.createElement("section", {
    className: "section alt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 24,
      marginTop: 0
    }
  }, moats.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.h3,
    style: {
      background: 'var(--paper)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '28px 28px 24px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      flexShrink: 0,
      borderRadius: 'var(--radius-md)',
      background: 'var(--bone-200)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18
    }
  }, m.icon), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 20,
      fontWeight: 400,
      marginBottom: 0
    }
  }, m.h3)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: '22px',
      color: 'var(--fg-2)'
    }
  }, m.desc)))))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 1,
      background: 'var(--border)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden'
    }
  }, logoTiles.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.name,
    style: {
      background: 'var(--paper)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      padding: '24px 16px',
      textAlign: 'center',
      minHeight: 100
    }
  }, t.src ? /*#__PURE__*/React.createElement("img", {
    src: ASSETS + '/logos/' + t.src,
    alt: t.name,
    style: {
      maxHeight: 32,
      maxWidth: 80,
      objectFit: 'contain'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--ink-700)',
      background: 'var(--bone-200)',
      width: 36,
      height: 36,
      borderRadius: 'var(--radius-sm)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, t.mono), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: 'var(--fg-2)'
    }
  }, t.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: 'var(--fg-3)',
      letterSpacing: '0.05em'
    }
  }, t.kind)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    onClick: () => go('/contact')
  }, "Request a demo"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    arrow: true,
    onClick: () => go('/trust')
  }, "Architecture for regulators")))));
}
Object.assign(window, {
  PlatformScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/PlatformScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.BlogCard = __ds_scope.BlogCard;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.SectionHead = __ds_scope.SectionHead;

__ds_ns.StatusPill = __ds_scope.StatusPill;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Term = __ds_scope.Term;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Nav = __ds_scope.Nav;

})();
