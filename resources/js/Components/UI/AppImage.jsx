import { useEffect, useState } from 'react';
import { Crown } from 'lucide-react';

function getInitials(label = '') {
    return label
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('') || 'LW';
}

export default function AppImage({
    src,
    alt,
    label = '',
    subtitle = '',
    style = {},
    className = '',
    compact = false,
}) {
    const [hasError, setHasError] = useState(!src);
    const initials = getInitials(label);

    useEffect(() => {
        setHasError(!src);
    }, [src]);

    if (!src || hasError) {
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: compact ? '0.25rem' : '0.5rem',
                    background: 'linear-gradient(135deg, #18181b 0%, #111111 55%, #220f12 100%)',
                    color: 'white',
                    textAlign: 'center',
                    padding: compact ? '0.35rem' : '0.75rem',
                }}
            >
                <div
                    style={{
                        width: compact ? 22 : 38,
                        height: compact ? 22 : 38,
                        borderRadius: '50%',
                        border: '1px solid rgba(220,38,38,0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(220,38,38,0.08)',
                        flexShrink: 0,
                    }}
                >
                    <Crown size={compact ? 11 : 16} style={{ color: 'var(--color-accent)' }} />
                </div>
                <span
                    style={{
                        fontSize: compact ? '0.65rem' : '0.9rem',
                        fontWeight: 700,
                        letterSpacing: compact ? '0.08em' : '0.12em',
                        color: 'rgba(255,255,255,0.92)',
                    }}
                >
                    {initials}
                </span>
                {!compact && subtitle && (
                    <span
                        style={{
                            fontSize: '0.62rem',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.45)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '100%',
                        }}
                    >
                        {subtitle}
                    </span>
                )}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            style={style}
            loading="lazy"
            onError={() => setHasError(true)}
        />
    );
}
