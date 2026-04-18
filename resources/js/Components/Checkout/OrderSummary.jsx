import AppImage from '@/Components/UI/AppImage';

const formatPrice = (value) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(value || 0);

export default function OrderSummary({ items = [], shippingFee = 250 }) {
    const subtotal = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
    const total = subtotal + shippingFee;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {items.map((item) => (
                    <div key={item.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <div style={{ width: 44, height: 44, backgroundColor: '#0d0d0d', flexShrink: 0, overflow: 'hidden' }}>
                            <AppImage
                                src={item.product?.image_url}
                                alt={item.product?.name || 'Product image'}
                                label={item.product?.name}
                                subtitle={item.product?.brand?.name || ''}
                                compact
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ color: 'white', fontSize: '0.8rem', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {item.product?.name}
                            </p>
                            <p style={{ color: 'var(--color-muted)', fontSize: '0.7rem' }}>Qty: {item.quantity}</p>
                        </div>
                        <p style={{ color: 'white', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                            {formatPrice((item.product?.price || 0) * item.quantity)}
                        </p>
                    </div>
                ))}
            </div>

            <div style={{ height: '1px', backgroundColor: 'var(--color-border)' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <Row label="Subtotal" value={formatPrice(subtotal)} />
                <Row label="Shipping" value={formatPrice(shippingFee)} />
                <div style={{ height: '1px', backgroundColor: 'var(--color-border)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'white', fontWeight: 700 }}>Total</span>
                    <span style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '1.1rem' }}>
                        {formatPrice(total)}
                    </span>
                </div>
            </div>
        </div>
    );
}

function Row({ label, value }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>{label}</span>
            <span style={{ color: 'white', fontSize: '0.8rem' }}>{value}</span>
        </div>
    );
}
