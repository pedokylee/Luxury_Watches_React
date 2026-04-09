export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    onClick,
    type = 'button',
    className = '',
    style = {},
}) {
    const baseStyle = {
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        borderRadius: '4px',
        fontSize: '0.75rem',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        border: 'none',
        opacity: (disabled || loading) ? 0.6 : 1,
        cursor: (disabled || loading) ? 'not-allowed' : 'pointer',
    };

    const sizes = {
        sm: { padding: '0.5rem 1.25rem', fontSize: '0.7rem' },
        md: { padding: '0.875rem 2rem', fontSize: '0.75rem' },
        lg: { padding: '1.125rem 2.5rem', fontSize: '0.8rem' },
    };

    const variantsStyles = {
        primary: {
            backgroundColor: 'var(--color-accent)',
            color: 'white',
            ':hover': { backgroundColor: 'var(--color-accent-hover)' },
        },
        outline: {
            backgroundColor: 'transparent',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)',
            ':hover': { borderColor: 'var(--color-accent)', color: 'var(--color-accent)' },
        },
        danger: {
            backgroundColor: '#ef4444',
            color: 'white',
            ':hover': { backgroundColor: '#dc2626' },
        },
        ghost: {
            backgroundColor: 'transparent',
            color: 'var(--color-text)',
            ':hover': { backgroundColor: 'rgba(255,255,255,0.05)' },
        },
    };

    const variantStyle = variantsStyles[variant] || variantsStyles.primary;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={className}
            style={{
                ...baseStyle,
                ...sizes[size],
                ...variantStyle,
                ...style,
            }}
            onMouseEnter={(e) => !disabled && !loading && (e.target.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => !disabled && !loading && (e.target.style.transform = 'scale(1)')}
        >
            {loading && (
                <svg width="14" height="14" viewBox="0 0 24 24" style={{ animation: 'spin 1s linear infinite' }}>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                            fill="none" pathLength="1" strokeDasharray="25" strokeDashoffset="6.25" />
                </svg>
            )}
            {children}
        </button>
    );
}
