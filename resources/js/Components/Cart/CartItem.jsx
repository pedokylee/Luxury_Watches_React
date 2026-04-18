import { router } from '@inertiajs/react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import AppImage from '@/Components/UI/AppImage';

const formatPrice = (value) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(value || 0);

export default function CartItem({ item }) {
    const updateQty = (qty) => {
        if (qty < 1) {
            return;
        }

        router.patch(`/cart/${item.id}`, { quantity: qty }, { preserveScroll: true });
    };

    const remove = () => {
        router.delete(`/cart/${item.id}`, { preserveScroll: true });
    };

    return (
        <div style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ width: 96, height: 96, flexShrink: 0, backgroundColor: '#0d0d0d', overflow: 'hidden' }}>
                <AppImage
                    src={item.product?.image_url}
                    alt={item.product?.name}
                    label={item.product?.name}
                    subtitle={item.product?.brand?.name || ''}
                    compact
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '0.6rem', color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                    {item.product?.brand?.name}
                </p>
                <p style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.4rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.product?.name}
                </p>
                <p style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '1rem' }}>
                    {formatPrice(item.product?.price)}
                </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)' }}>
                <button onClick={() => updateQty(item.quantity - 1)} disabled={item.quantity <= 1} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-muted)', borderRight: '1px solid var(--color-border)', background: 'none', cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer', opacity: item.quantity <= 1 ? 0.4 : 1 }}>
                    <Minus size={12} />
                </button>
                <span style={{ width: 40, textAlign: 'center', fontSize: '0.875rem', fontWeight: 600, color: 'white' }}>
                    {item.quantity}
                </span>
                <button onClick={() => updateQty(item.quantity + 1)} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-muted)', borderLeft: '1px solid var(--color-border)', background: 'none', cursor: 'pointer', transition: 'color 0.2s' }} className="hover:text-white">
                    <Plus size={12} />
                </button>
            </div>

            <p style={{ minWidth: '80px', textAlign: 'right', color: 'white', fontWeight: 700 }}>
                {formatPrice((item.product?.price || 0) * item.quantity)}
            </p>

            <button onClick={remove} style={{ color: 'var(--color-muted)', background: 'none', cursor: 'pointer', padding: '0.25rem', transition: 'color 0.2s' }} className="hover:text-red-500">
                <Trash2 size={16} />
            </button>
        </div>
    );
}
