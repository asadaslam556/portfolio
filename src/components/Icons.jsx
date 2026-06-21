// Single inline-SVG icon component. Usage: <Icon name="mail" className="h-5 w-5" />
export default function Icon({ name, className = 'h-5 w-5' }) {
  const stroke = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }

  switch (name) {
    case 'arrowRight':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <line x1="4" y1="12" x2="20" y2="12" />
          <polyline points="14 6 20 12 14 18" />
        </svg>
      )
    case 'arrowDown':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <line x1="12" y1="4" x2="12" y2="20" />
          <polyline points="6 14 12 20 18 14" />
        </svg>
      )
    case 'arrowUpRight':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      )
    case 'download':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M12 3v12" />
          <polyline points="7 11 12 16 17 11" />
          <path d="M5 21h14" />
        </svg>
      )
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      )
    case 'phone':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
      )
    case 'mapPin':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      )
    case 'external':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M14 5h5v5" />
          <path d="M19 5 11 13" />
          <path d="M19 14v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
        </svg>
      )
    case 'menu':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      )
    case 'close':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      )
    case 'award':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <circle cx="12" cy="9" r="6" />
          <path d="M9 14.5 7.5 22 12 19.5 16.5 22 15 14.5" />
        </svg>
      )
    case 'database':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
          <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
        </svg>
      )
    case 'sparkles':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" />
          <path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z" />
        </svg>
      )
    case 'cloud':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M7 18h9a4 4 0 0 0 .5-7.97A6 6 0 0 0 5 9.5 3.5 3.5 0 0 0 6 18z" />
        </svg>
      )
    case 'chart':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M4 4v16h16" />
          <rect x="7" y="11" width="3" height="6" />
          <rect x="12" y="7" width="3" height="10" />
          <rect x="17" y="13" width="3" height="4" />
        </svg>
      )
    case 'pipeline':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <circle cx="5" cy="6" r="2" />
          <circle cx="19" cy="6" r="2" />
          <circle cx="12" cy="18" r="2" />
          <path d="M7 6h10M5 8v4a4 4 0 0 0 4 4h1M19 8v4a4 4 0 0 1-4 4h-1" />
        </svg>
      )
    case 'images':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <rect x="7" y="3" width="14" height="14" rx="2" />
          <path d="M3 7v12a2 2 0 0 0 2 2h12" />
        </svg>
      )
    case 'check':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )
    case 'spinner':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M21 12a9 9 0 1 1-6.2-8.6" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8.5h4V24h-4V8.5zM8.5 8.5h3.8v2.1h.06c.53-1 1.83-2.1 3.77-2.1 4.03 0 4.77 2.65 4.77 6.1V24h-4v-6.9c0-1.64-.03-3.75-2.29-3.75-2.29 0-2.64 1.79-2.64 3.63V24h-4V8.5z" />
        </svg>
      )
    case 'github':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
        </svg>
      )
    default:
      return null
  }
}
