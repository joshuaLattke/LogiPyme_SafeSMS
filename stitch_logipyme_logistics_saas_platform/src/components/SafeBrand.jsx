export function SafeBrand({ compact = false }) {
  return <span className={`safe-brand ${compact ? 'compact' : ''}`}><img src="/assets/logipyme-safesms-diapositivas.png" alt="LogiPyme + SafeSMS" />{!compact && <small>Revisión preventiva de mensajes</small>}</span>;
}
