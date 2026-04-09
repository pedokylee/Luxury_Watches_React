import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ChevronLeft, Clock, CheckCircle, Truck, AlertTriangle, User, MapPin, CreditCard, Package } from 'lucide-react';

const formatPrice = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v || 0);

const STATUS_CONFIG = {
    pending:   { bg: 'rgba(234,179,8,0.12)',  border: 'rgba(234,179,8,0.3)',  color: '#eab308',  icon: Clock },
    paid:      { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)', color: '#3b82f6',  icon: CheckCircle },
    shipped:   { bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.3)', color: '#a855f7',  icon: Truck },
    completed: { bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.3)',  color: '#22c55e',  icon: CheckCircle },
    cancelled: { bg: 'rgba(220,38,38,0.12)',  border: 'rgba(220,38,38,0.3)',  color: '#ef4444',  icon: AlertTriangle },
};

const STATUS_OPTIONS = ['pending', 'paid', 'shipped', 'completed', 'cancelled'];

function StatusBadge({ status }) {
    const cfg = STATUS_CONFIG[status?.toLowerCase()] || STATUS_CONFIG.pending;
    const Icon = cfg.icon;
    return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.875rem',
                        fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                        backgroundColor: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}>
            <Icon size={12} /> {status || 'Pending'}
        </span>
    );
}

const DEMO_ORDER = {
    id: 42,
    order_number: 'ORD-2026-042',
    status: 'pending',
    payment_method: 'Cash on Delivery',
    total: 45250,
    subtotal: 45000,
    shipping_fee: 250,
    notes: 'Please handle with care.',
    created_at: '2026-04-05T10:30:00Z',
    user: { name: 'Maria Santos', email: 'maria@example.com', phone: '+63 912 345 6789' },
    shipping_address: {
        full_name: 'Maria Santos', phone: '+63 912 345 6789',
        address: 'Brgy. San Isidro, Maharlika Highway', city: 'Basey',
        province: 'Samar', postal_code: '6720'
    },
    items: [
        { id:1, product:{ name:'Royal Oak Offshore', brand:{name:'Audemars Piguet'},
                           price:45000, image_url:'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=80' },
          quantity:1, price:45000 }
    ]
};

export default function Show({ order = null }) {
    const o = order || DEMO_ORDER;
    const [status, setStatus] = useState(o.status || 'pending');
    const [updating, setUpdating] = useState(false);

    const updateStatus = () => {
        setUpdating(true);
        router.patch(`/admin/orders/${o.id}/status`, { status }, {
            onFinish: () => setUpdating(false),
        });
    };

    const cfg = STATUS_CONFIG[status?.toLowerCase()] || STATUS_CONFIG.pending;

    return (
        <AdminLayout title={`Order ${o.order_number || '#' + o.id}`}>
            {/* Breadcrumb */}
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link href="/admin/orders"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem',
                               color: 'var(--color-muted)', fontSize: '0.75rem', letterSpacing: '0.08em' }}
                      className="hover:text-white transition-colors">
                    <ChevronLeft size={15} /> Orders
                </Link>
                <span style={{ color: 'var(--color-border)' }}>/</span>
                <span style={{ fontSize: '0.75rem', color: 'white' }}>{o.order_number || `#${o.id}`}</span>
            </div>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                          flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                <div>
                    <p className="section-label" style={{ marginBottom: '0.35rem' }}>Order Details</p>
                    <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '1.6rem', fontWeight: 800, color: 'white' }}>
                        {o.order_number || `#${o.id}`}
                    </h2>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
                        Placed on {o.created_at?.split('T')[0] || o.created_at}
                    </p>
                </div>
                <StatusBadge status={status} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>
                {/* Left */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Order Items */}
                    <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)',
                                      display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Package size={14} style={{ color: 'var(--color-muted)' }} />
                            <h3 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em',
                                         color: 'white', textTransform: 'uppercase' }}>
                                Items Ordered
                            </h3>
                        </div>
                        <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {o.items?.map(item => (
                                <div key={item.id}
                                     style={{ display: 'flex', gap: '1rem', alignItems: 'center',
                                              paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                                    <div style={{ width: 64, height: 64, flexShrink: 0, backgroundColor: '#0d0d0d', overflow: 'hidden' }}>
                                        <img src={item.product?.image_url || 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=120'}
                                             alt={item.product?.name}
                                             style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em',
                                                    color: 'var(--color-accent)', textTransform: 'uppercase',
                                                    marginBottom: '0.2rem' }}>
                                            {item.product?.brand?.name}
                                        </p>
                                        <p style={{ color: 'white', fontWeight: 500, fontSize: '0.9rem',
                                                    marginBottom: '0.25rem' }}>
                                            {item.product?.name}
                                        </p>
                                        <p style={{ color: 'var(--color-muted)', fontSize: '0.75rem' }}>
                                            Qty: {item.quantity} × {formatPrice(item.price || item.product?.price)}
                                        </p>
                                    </div>
                                    <p style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem',
                                                whiteSpace: 'nowrap' }}>
                                        {formatPrice((item.price || item.product?.price || 0) * item.quantity)}
                                    </p>
                                </div>
                            ))}

                            {/* Totals */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingTop: '0.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>Subtotal</span>
                                    <span style={{ color: 'white', fontSize: '0.85rem' }}>{formatPrice(o.subtotal)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>Shipping</span>
                                    <span style={{ color: 'white', fontSize: '0.85rem' }}>{formatPrice(o.shipping_fee)}</span>
                                </div>
                                <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '0.25rem 0' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>Total</span>
                                    <span style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '1.1rem' }}>
                                        {formatPrice(o.total)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer & Shipping Info */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        {/* Customer */}
                        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem',
                                          paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
                                <User size={13} style={{ color: 'var(--color-muted)' }} />
                                <h4 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em',
                                             color: 'white', textTransform: 'uppercase' }}>
                                    Customer
                                </h4>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <p style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500 }}>
                                    {o.user?.name || o.shipping_address?.full_name}
                                </p>
                                <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>{o.user?.email}</p>
                                <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>
                                    {o.user?.phone || o.shipping_address?.phone}
                                </p>
                            </div>
                        </div>

                        {/* Shipping */}
                        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem',
                                          paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
                                <MapPin size={13} style={{ color: 'var(--color-muted)' }} />
                                <h4 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em',
                                             color: 'white', textTransform: 'uppercase' }}>
                                    Shipping Address
                                </h4>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                {o.shipping_address && Object.entries({
                                    name: o.shipping_address.full_name,
                                    address: o.shipping_address.address,
                                    city: `${o.shipping_address.city}, ${o.shipping_address.province}`,
                                    postal: o.shipping_address.postal_code,
                                }).map(([k, v]) => v && (
                                    <p key={k} style={{ color: k === 'name' ? 'white' : 'var(--color-muted)',
                                                        fontSize: '0.8rem', fontWeight: k === 'name' ? 500 : 400 }}>
                                        {v}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    {o.notes && (
                        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '1.25rem' }}>
                            <h4 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em',
                                         color: 'white', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                Order Notes
                            </h4>
                            <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                                {o.notes}
                            </p>
                        </div>
                    )}
                </div>

                {/* Right: Status Update */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Update Status */}
                    <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em',
                                     color: 'white', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                            Update Status
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                            {STATUS_OPTIONS.map(s => {
                                const c = STATUS_CONFIG[s];
                                const Icon = c.icon;
                                return (
                                    <label key={s}
                                           style={{ display: 'flex', alignItems: 'center', gap: '0.75rem',
                                                    padding: '0.75rem', cursor: 'pointer', transition: 'all 0.2s',
                                                    border: `1px solid ${status === s ? c.border : 'var(--color-border)'}`,
                                                    backgroundColor: status === s ? c.bg : 'transparent' }}>
                                        <input type="radio" name="order_status" value={s}
                                               checked={status === s} onChange={() => setStatus(s)}
                                               style={{ display: 'none' }} />
                                        <Icon size={14} style={{ color: status === s ? c.color : 'var(--color-muted)', flexShrink: 0 }} />
                                        <span style={{ fontSize: '0.8rem', fontWeight: status === s ? 600 : 400,
                                                       color: status === s ? c.color : 'var(--color-muted)',
                                                       textTransform: 'capitalize' }}>
                                            {s}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                        <button onClick={updateStatus} disabled={updating} className="btn-primary"
                                style={{ width: '100%', opacity: updating ? 0.7 : 1, cursor: updating ? 'not-allowed' : 'pointer' }}>
                            {updating ? 'Updating...' : 'Update Status'}
                        </button>
                    </div>

                    {/* Payment Info */}
                    <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem',
                                      paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
                            <CreditCard size={13} style={{ color: 'var(--color-muted)' }} />
                            <h4 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em',
                                         color: 'white', textTransform: 'uppercase' }}>
                                Payment
                            </h4>
                        </div>
                        <p style={{ color: 'var(--color-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Method</p>
                        <p style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500 }}>
                            {o.payment_method || '—'}
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}