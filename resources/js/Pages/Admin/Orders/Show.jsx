import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AppImage from '@/Components/UI/AppImage';
import { ChevronLeft, Clock, CheckCircle, Truck, AlertTriangle, User, MapPin, CreditCard, Package } from 'lucide-react';

const formatPrice = (value) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(value || 0);

const STATUS_CONFIG = {
    pending: { bg: 'rgba(234,179,8,0.12)', border: 'rgba(234,179,8,0.3)', color: '#eab308', icon: Clock },
    paid: { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)', color: '#3b82f6', icon: CheckCircle },
    shipped: { bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.3)', color: '#a855f7', icon: Truck },
    completed: { bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.3)', color: '#22c55e', icon: CheckCircle },
    cancelled: { bg: 'rgba(220,38,38,0.12)', border: 'rgba(220,38,38,0.3)', color: '#ef4444', icon: AlertTriangle },
};

const STATUS_OPTIONS = ['pending', 'paid', 'shipped', 'completed', 'cancelled'];

function StatusBadge({ status }) {
    const cfg = STATUS_CONFIG[status?.toLowerCase()] || STATUS_CONFIG.pending;
    const Icon = cfg.icon;

    return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.875rem', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', backgroundColor: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}>
            <Icon size={12} /> {status || 'Pending'}
        </span>
    );
}

export default function Show({ order }) {
    const [status, setStatus] = useState(order.status || 'pending');
    const [updating, setUpdating] = useState(false);

    const shippingAddress = order.shipping_address && typeof order.shipping_address === 'object'
        ? order.shipping_address
        : {};
    const subtotal = (order.items || []).reduce((sum, item) => sum + ((item.price || item.product?.price || 0) * item.quantity), 0);
    const shippingFee = Math.max((order.total || 0) - subtotal, 0);

    const updateStatus = () => {
        setUpdating(true);
        router.patch(`/admin/orders/${order.id}/status`, { status }, {
            onFinish: () => setUpdating(false),
        });
    };

    return (
        <AdminLayout title={`Order ${order.order_number}`}>
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link href="/admin/orders" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-muted)', fontSize: '0.75rem', letterSpacing: '0.08em' }} className="hover:text-white transition-colors">
                    <ChevronLeft size={15} /> Orders
                </Link>
                <span style={{ color: 'var(--color-border)' }}>/</span>
                <span style={{ fontSize: '0.75rem', color: 'white' }}>{order.order_number}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                <div>
                    <p className="section-label" style={{ marginBottom: '0.35rem' }}>Order Details</p>
                    <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '1.6rem', fontWeight: 800, color: 'white' }}>
                        {order.order_number}
                    </h2>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
                        Placed on {order.created_at?.split('T')[0] || order.created_at}
                    </p>
                </div>
                <StatusBadge status={status} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Package size={14} style={{ color: 'var(--color-muted)' }} />
                            <h3 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', color: 'white', textTransform: 'uppercase' }}>
                                Items Ordered
                            </h3>
                        </div>
                        <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {order.items?.map((item) => (
                                <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                                    <div style={{ width: 64, height: 64, flexShrink: 0, backgroundColor: '#0d0d0d', overflow: 'hidden' }}>
                                        <AppImage
                                            src={item.product?.image_url}
                                            alt={item.product?.name}
                                            label={item.product?.name}
                                            subtitle={item.product?.brand?.name || ''}
                                            compact
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                                            {item.product?.brand?.name}
                                        </p>
                                        <p style={{ color: 'white', fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                                            {item.product?.name}
                                        </p>
                                        <p style={{ color: 'var(--color-muted)', fontSize: '0.75rem' }}>
                                            Qty: {item.quantity} x {formatPrice(item.price || item.product?.price)}
                                        </p>
                                    </div>
                                    <p style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', whiteSpace: 'nowrap' }}>
                                        {formatPrice((item.price || item.product?.price || 0) * item.quantity)}
                                    </p>
                                </div>
                            ))}

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingTop: '0.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>Subtotal</span>
                                    <span style={{ color: 'white', fontSize: '0.85rem' }}>{formatPrice(subtotal)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>Shipping</span>
                                    <span style={{ color: 'white', fontSize: '0.85rem' }}>{formatPrice(shippingFee)}</span>
                                </div>
                                <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '0.25rem 0' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>Total</span>
                                    <span style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '1.1rem' }}>
                                        {formatPrice(order.total)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
                                <User size={13} style={{ color: 'var(--color-muted)' }} />
                                <h4 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', color: 'white', textTransform: 'uppercase' }}>
                                    Customer
                                </h4>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <p style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500 }}>
                                    {order.user?.name || shippingAddress.full_name}
                                </p>
                                <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>{order.user?.email}</p>
                                <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>
                                    {order.user?.phone || shippingAddress.phone}
                                </p>
                            </div>
                        </div>

                        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
                                <MapPin size={13} style={{ color: 'var(--color-muted)' }} />
                                <h4 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', color: 'white', textTransform: 'uppercase' }}>
                                    Shipping Address
                                </h4>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                {Object.entries({
                                    name: shippingAddress.full_name,
                                    address: shippingAddress.address,
                                    city: `${shippingAddress.city || ''}, ${shippingAddress.province || shippingAddress.state || ''}`.replace(/^,\s*|\s*,\s*$/g, ''),
                                    postal: shippingAddress.postal_code || shippingAddress.zip,
                                }).map(([key, value]) => value && (
                                    <p key={key} style={{ color: key === 'name' ? 'white' : 'var(--color-muted)', fontSize: '0.8rem', fontWeight: key === 'name' ? 500 : 400 }}>
                                        {value}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {order.notes && (
                        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '1.25rem' }}>
                            <h4 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', color: 'white', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                Order Notes
                            </h4>
                            <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                                {order.notes}
                            </p>
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', color: 'white', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                            Update Status
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                            {STATUS_OPTIONS.map((option) => {
                                const config = STATUS_CONFIG[option];
                                const Icon = config.icon;

                                return (
                                    <label
                                        key={option}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            padding: '0.75rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            border: `1px solid ${status === option ? config.border : 'var(--color-border)'}`,
                                            backgroundColor: status === option ? config.bg : 'transparent',
                                        }}
                                    >
                                        <input type="radio" name="order_status" value={option} checked={status === option} onChange={() => setStatus(option)} style={{ display: 'none' }} />
                                        <Icon size={14} style={{ color: status === option ? config.color : 'var(--color-muted)', flexShrink: 0 }} />
                                        <span style={{ fontSize: '0.8rem', fontWeight: status === option ? 600 : 400, color: status === option ? config.color : 'var(--color-muted)', textTransform: 'capitalize' }}>
                                            {option}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                        <button onClick={updateStatus} disabled={updating} className="btn-primary" style={{ width: '100%', opacity: updating ? 0.7 : 1, cursor: updating ? 'not-allowed' : 'pointer' }}>
                            {updating ? 'Updating...' : 'Update Status'}
                        </button>
                    </div>

                    <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
                            <CreditCard size={13} style={{ color: 'var(--color-muted)' }} />
                            <h4 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', color: 'white', textTransform: 'uppercase' }}>
                                Payment
                            </h4>
                        </div>
                        <p style={{ color: 'var(--color-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Method</p>
                        <p style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500 }}>
                            {order.payment_method || '-'}
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
