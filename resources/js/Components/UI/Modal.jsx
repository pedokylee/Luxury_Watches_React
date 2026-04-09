import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children, maxWidth = '480px', footer }) {
    useEffect(() => {
        const handler = (e) => e.key === 'Escape' && onClose?.();
        if (open) document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
                     padding: '1rem', backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
            onClick={(e) => e.target === e.currentTarget && onClose?.()}>
            <div
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)',
                         width: '100%', maxWidth, maxHeight: '90vh', display: 'flex', flexDirection: 'column',
                         animation: 'fadeIn 0.2s ease' }}>
                {/* Header */}
                <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)',
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                    <h2 style={{ color: 'white', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                        {title}
                    </h2>
                    <button onClick={onClose}
                            style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                     border: '1px solid var(--color-border)', background: 'none', cursor: 'pointer',
                                     color: 'var(--color-muted)', transition: 'all 0.2s' }}
                            className="hover:text-white hover:border-white">
                        <X size={14} />
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--color-border)',
                                  display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexShrink: 0 }}>
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}   