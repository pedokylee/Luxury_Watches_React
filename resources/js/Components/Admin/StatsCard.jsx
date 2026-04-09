import { TrendingUp } from 'lucide-react';

export default function StatsCard({ label, value, icon: Icon, trend, accent = false }) {
    return (
        <div style={{
            backgroundColor: 'var(--color-surface)',
            border: `1px solid ${accent ? 'rgba(220,38,38,0.3)' : 'var(--color-border)'}`,
            padding: '1.5rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {accent && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                              backgroundColor: 'var(--color-accent)' }} />
            )}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                    <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em',
                                color: 'var(--color-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        {label}
                    </p>
                    <p style={{ fontSize: '2rem', fontWeight: 700, color: 'white', fontFamily: 'var(--font-body)',
                                lineHeight: 1 }}>
                        {value}
                    </p>
                    {trend && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
                            <TrendingUp size={12} style={{ color: '#22c55e' }} />
                            <span style={{ fontSize: '0.7rem', color: '#22c55e' }}>{trend}</span>
                        </div>
                    )}
                </div>
                {Icon && (
                    <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  backgroundColor: accent ? 'rgba(220,38,38,0.1)' : 'rgba(255,255,255,0.05)',
                                  color: accent ? 'var(--color-accent)' : 'var(--color-muted)' }}>
                        <Icon size={18} />
                    </div>
                )}
            </div>
        </div>
    );
}