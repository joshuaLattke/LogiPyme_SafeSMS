import { useEffect, useRef } from 'react';

export function Modal({ title, open, onClose, children }) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.activeElement;
    const focusables = () => [...(ref.current?.querySelectorAll('button:not(:disabled), a[href], input, select, textarea, [tabindex="0"]') ?? [])];
    focusables()[0]?.focus();
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') closeRef.current();
      if (event.key === 'Tab') {
        const items = focusables(); const first = items[0]; const last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => { document.removeEventListener('keydown', closeOnEscape); previous?.focus(); };
  }, [open]);

  if (!open) return null;
  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section ref={ref} className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-head"><div><p className="eyebrow">LogiPyme</p><h2 id="modal-title">{title}</h2></div><button type="button" aria-label="Cerrar" onClick={onClose}>×</button></div>
        {children}
      </section>
    </div>
  );
}
