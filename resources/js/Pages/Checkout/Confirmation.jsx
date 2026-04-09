import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { CheckCircle, ArrowRight, Package } from 'lucide-react';

const formatPrice = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

export default function Confirmation({ order = null }) {
    const o = order || {
        id: 'ORD-2026-001',
        status: 'Pending',
        payment_method: 'Cash on Delivery',
        total: 45250,
        items: [
            { id: 1, product: { name: 'Royal Oak Offshore', brand: { name: 'Audemars Piguet' }, price: 45000 }, quantity: 1 }
        ],
        shipping_address: { full_name: 'Juan Dela Cruz', address: 'Brgy. San Isidro', city: 'Basey', province: 'Samar' }
    };

    return (
        <MainLayout>
            <div style={{ maxWidth: '700px', margin: '0 auto', padding: '5rem 1.5rem', textAlign: 'center' }}>
                {/* Success Icon */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: 'rgba(34,197,94,0.1)',
                                  border: '2px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center',
                                  justifyContent: 'center' }}>
                        <CheckCircle size={40} style={{ color: '#22c55e' }} />
                    </div>
                </div>

                <p className="section-label" style={{ marginBottom: '0.75rem' }}>Order Placed</p>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 300, color: 'white',
                             marginBottom: '1rem' }}>
                    Thank You <em>for your order!</em>
                </h1>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>
                    Your order has been received and is being processed. You'll receive a confirmation shortly.
                </p>

                {/* Order Details Card */}
                <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)',
                              padding: '2rem', textAlign: 'left', marginBottom: '2rem' }}>
                    {/* Order Number + Status */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                  marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                        <div>
                            <p style={{ fontSize: '0.6rem', color: 'var(--color-muted)', fontWeight: 700,
                                        letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                                Order Number
                            </p>
                            <p style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>#{o.id}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem',
                                      padding: '0.4rem 0.875rem',
                                      backgroundColor: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)' }}>
                            <Package size={14} style={{ color: '#eab308' }} />
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em',
                                          color: '#eab308', textTransform: 'uppercase' }}>
                                {o.status || 'Pending'}
                            </span>
                        </div>
                    </div>

                    {/* Items */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em',
                                     color: 'var(--color-muted)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                            Items Ordered
                        </h3>
                        {(o.items || []).map(item => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between',
                                                        alignItems: 'center', padding: '0.75rem 0',
                                                        borderBottom: '1px solid var(--color-border)' }}>
                                <div>
                                    <p style={{ color: 'white', fontWeight: 500, fontSize: '0.875rem' }}>
                                        {item.product?.name}
                                    </p>
                                    <p style={{ color: 'var(--color-muted)', fontSize: '0.75rem' }}>
                                        {item.product?.brand?.name} · Qty: {item.quantity}
                                    </p>
                                </div>
                                <p style={{ color: 'white', fontWeight: 600 }}>
                                    {formatPrice((item.product?.price || 0) * item.quantity)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Totals + Payment */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>Payment Method</span>
                            <span style={{ color: 'white', fontSize: '0.8rem' }}>{o.payment_method}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                            <span style={{ color: 'white', fontWeight: 700 }}>Total</span>
                            <span style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '1.1rem' }}>
                                {formatPrice(o.total)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link href="/products" className="btn-primary inline-flex items-center gap-2">
                        Continue Shopping <ArrowRight size={14} />
                    </Link>
                    <Link href="/orders" className="btn-outline inline-flex items-center gap-2">
                        View My Orders
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
}