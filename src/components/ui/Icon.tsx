const iconPaths: Record<string, string> = {
  search:      'M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0',
  chat:        'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  workflow:    'M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9C9 9 6 15 6 15',
  agent:       'M12 8V4H8M2 4h20M20 4v16M4 4v16M2 20h20M9 12h6M9 16h6',
  application: 'M11 4h10M11 12h10M11 20h10M3 4h.01M3 12h.01M3 20h.01',
  shield:      'M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6z',
  layers:      'M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01',
  stack:       'M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  bolt:        'M13 2 3 14h9l-1 8 10-12h-9l1-8z',
  redaction:   'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  gateway:     'M21 7H3M21 7l-4-4M21 7l-4 4M3 17h18M3 17l4 4M3 17l4-4',
  audit:       'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
  corpus:      'M12 5C8.13 5 5 6.34 5 8s3.13 3 7 3 7-1.34 7-3S15.87 5 12 5zM5 8v4c0 1.66 3.13 3 7 3s7-1.34 7-3V8M5 12v4c0 1.66 3.13 3 7 3s7-1.34 7-3v-4',
  index:       'M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM6 21a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM6 9v3M6 18v-3M18 18a9 9 0 0 1-12 0',
  lock:        'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4',
  residency:   'M12 21s7-6.4 7-12a7 7 0 0 0-14 0c0 5.6 7 12 7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  auditBook:   'M9 12l2 2 4-4M5 3h14v18l-4-2-3 2-3-2-4 2z',
  bank:        'M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6',
  trend:       'M3 17l6-6 4 4 8-8M14 7h7v7',
  rupee:       'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  bars:        'M4 20V10M10 20V4M16 20v-8M22 20H2',
  card:        'M2 7h20v12H2zM2 11h20M6 15h4',
  /* v1 additions — product-mock glyphs from the redesign, Lucide geometry */
  check:       'M20 6L9 17l-5-5',
  arrowRight:  'M5 12h14M13 6l6 6-6 6',
  arrowUp:     'M12 19V5M5 12l7-7 7 7',
  chevronDown: 'M6 9l6 6 6-6',
  chevronUp:   'M18 15l-6-6-6 6',
  menu:        'M3 6h18M3 12h18M3 18h18',
  paperclip:   'M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48',
  mic:         'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4',
  database:    'M12 5C8.13 5 5 6.34 5 8s3.13 3 7 3 7-1.34 7-3S15.87 5 12 5zM5 8v4c0 1.66 3.13 3 7 3s7-1.34 7-3V8M5 12v4c0 1.66 3.13 3 7 3s7-1.34 7-3v-4',
  file:        'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 15h6',
  clock:       'M12 8v4l3 2M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z',
  shieldPlain: 'M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6z',
  padlock:     'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4'
}


export default function Icon({ name, size = 20, strokeWidth = 2 }: { name: string; size?: number; strokeWidth?: number }) {
  const d = iconPaths[name]
  if (!d) return null
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d={d} />
    </svg>
  )
}
