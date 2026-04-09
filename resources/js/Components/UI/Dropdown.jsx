import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Dropdown({ trigger, items = [], align = 'left' }) {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
            <div onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
                {trigger || (
                    <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem',
                                     background: 'none', border: '1px solid var(--color-border)',
                                     color: 'var(--color-text)', padding: '0.6rem 0.875rem',
                                     fontSize: '0.8rem', cursor: 'pointer' }}>
                        Options <ChevronDown size={13} style={{ transition: 'transform 0.2s',
                                                                 transform: open ? 'rotate(180deg)' : 'none' }} />
                    </button>
                )}
            </div>

            {open && (
                <div style={{
                    position: 'absolute', top: 'calc(100% + 4px)', zIndex: 50, minWidth: '160px',
                    backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                    ...(align === 'right' ? { right: 0 } : { left: 0 }),
                    animation: 'fadeIn 0.15s ease'
                }}>
                    {items.map((item, i) => (
                        item.divider ? (
                            <div key={i} style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '0.25rem 0' }} />
                        ) : (
                            <button key={i} onClick={() => { item.onClick?.(); setOpen(false); }}
                                    style={{ width: '100%', padding: '0.625rem 1rem', textAlign: 'left',
                                             fontSize: '0.8rem', background: 'none', border: 'none', cursor: 'pointer',
                                             color: item.danger ? '#ef4444' : 'var(--color-muted)',
                                             display: 'flex', alignItems: 'center', gap: '0.5rem',
                                             transition: 'color 0.15s, background-color 0.15s' }}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                                {item.icon && <item.icon size={13} />}
                                {item.label}
                            </button>
                        )
                    ))}
                </div>
            )}
        </div>
    );
}