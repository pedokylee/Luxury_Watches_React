export default function ShippingForm({ data, setData, errors = {} }) {
    const fields = [
        { key: 'full_name',   label: 'Full Name',          type: 'text',   placeholder: 'Juan Dela Cruz',         col: 1 },
        { key: 'phone',       label: 'Phone Number',       type: 'tel',    placeholder: '+63 9XX XXX XXXX',        col: 1 },
        { key: 'address',     label: 'Street Address',     type: 'text',   placeholder: 'Street, Barangay',        col: 2 },
        { key: 'city',        label: 'City / Municipality',type: 'text',   placeholder: 'City',                    col: 1 },
        { key: 'province',    label: 'Province',           type: 'text',   placeholder: 'Province',                col: 1 },
        { key: 'postal_code', label: 'Postal Code',        type: 'text',   placeholder: '0000',                    col: 1 },
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {fields.map(f => (
                <div key={f.key} style={{ gridColumn: f.col === 2 ? 'span 2' : 'span 1' }}>
                    <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em',
                                    color: 'var(--color-muted)', textTransform: 'uppercase', display: 'block',
                                    marginBottom: '0.4rem' }}>
                        {f.label}
                    </label>
                    <input type={f.type} placeholder={f.placeholder}
                           value={data[f.key] || ''}
                           onChange={e => setData(f.key, e.target.value)}
                           className="input-dark"
                           style={{ borderColor: errors[f.key] ? 'var(--color-accent)' : undefined }} />
                    {errors[f.key] && (
                        <p style={{ color: 'var(--color-accent)', fontSize: '0.7rem', marginTop: '0.25rem' }}>
                            {errors[f.key]}
                        </p>
                    )}
                </div>
            ))}
            <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em',
                                color: 'var(--color-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                    Order Notes (Optional)
                </label>
                <textarea placeholder="Special delivery instructions..."
                          value={data.notes || ''}
                          onChange={e => setData('notes', e.target.value)}
                          rows={3} className="input-dark" style={{ resize: 'vertical' }} />
            </div>
        </div>
    );
}