export default function Input({
    label,
    error,
    type = 'text',
    placeholder = '',
    value,
    onChange,
    required = false,
    disabled = false,
    prefix,
    suffix,
    className = '',
    style = {},
    id,
}) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const baseInputStyle = {
        fontFamily: 'var(--font-body)',
        fontSize: '0.875rem',
        padding: '0.875rem 1rem',
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface-2)',
        color: 'var(--color-text)',
        borderRadius: '4px',
        transition: 'all 0.2s ease',
        outline: 'none',
        width: '100%',
        fontWeight: 400,
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
            {label && (
                <label htmlFor={inputId}
                       style={{ 
                           fontFamily: 'var(--font-body)',
                           fontSize: '0.65rem', 
                           fontWeight: 700, 
                           letterSpacing: '0.1em',
                           color: 'var(--color-text)', 
                           textTransform: 'uppercase' 
                       }}>
                    {label}{required && <span style={{ color: 'var(--color-accent)', marginLeft: '0.25rem' }}>*</span>}
                </label>
            )}
            <div style={{ position: 'relative', width: '100%' }}>
                {prefix && (
                    <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
                                   color: 'var(--color-muted)', fontSize: '0.875rem', pointerEvents: 'none', zIndex: 1 }}>
                        {prefix}
                    </span>
                )}
                <input
                    id={inputId}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    className={className}
                    style={{
                        ...baseInputStyle,
                        paddingLeft: prefix ? '2.75rem' : '1rem',
                        paddingRight: suffix ? '2.75rem' : '1rem',
                        borderColor: error ? 'var(--color-accent)' : 'var(--color-border)',
                        opacity: disabled ? 0.6 : 1,
                        cursor: disabled ? 'not-allowed' : 'text',
                        ...style,
                    }}
                    onFocus={(e) => !disabled && (e.target.style.borderColor = 'var(--color-accent)')}
                    onBlur={(e) => !error && !disabled && (e.target.style.borderColor = 'var(--color-border)')}
                />
                {suffix && (
                    <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                                   color: 'var(--color-muted)', fontSize: '0.875rem', pointerEvents: 'none', zIndex: 1 }}>
                        {suffix}
                    </span>
                )}
            </div>
            {error && (
                <p style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.7rem', 
                    color: 'var(--color-accent)', 
                    marginTop: '0.25rem',
                    letterSpacing: '0.05em'
                }}>{error}</p>
            )}
        </div>
    );
}
