import { router, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import AppImage from '@/Components/UI/AppImage';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Shield, Truck } from 'lucide-react';

const fmt = (value) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(value);

export default function Index({ cart = null, auth = null }) {
    const items = cart?.items || [];

    const updateQty = (itemId, qty) => {
        if (qty < 1) {
            return;
        }

        router.patch(`/cart/${itemId}`, { quantity: qty }, { preserveScroll: true });
    };

    const removeItem = (itemId) => {
        router.delete(`/cart/${itemId}`, { preserveScroll: true });
    };

    const subtotal = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
    const shipping = subtotal > 0 ? 250 : 0;
    const total = subtotal + shipping;

    if (items.length === 0) {
        return (
            <MainLayout>
                <div style={{ maxWidth: '600px', margin: '0 auto', padding: '8rem 1.5rem', textAlign: 'center' }}>
                    <div style={{ width: 80, height: 80, margin: '0 auto 1.75rem', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingBag size={32} style={{ color: 'var(--color-muted)' }} />
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'white', marginBottom: '0.75rem' }}>
                        Your Cart is Empty
                    </h2>
                    <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>
                        Discover our exceptional collection of luxury timepieces and find your perfect watch.
                    </p>
                    <Link href="/products" className="btn-primary inline-flex items-center gap-2">
                        Browse Collection <ArrowRight size={14} />
                    </Link>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
                <div style={{ marginBottom: '2.5rem' }}>
                    <p className="section-label" style={{ marginBottom: '0.5rem' }}>Review</p>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 300, color: 'white' }}>
                        Your Cart <span style={{ color: 'var(--color-muted)', fontSize: '1rem', fontFamily: 'var(--font-body)', fontWeight: 400 }}>({items.length} {items.length === 1 ? 'item' : 'items'})</span>
                    </h1>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: '2rem', alignItems: 'start' }} className="cart-grid">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: 'var(--color-border)' }}>
                        {items.map((item) => (
                            <div key={item.id} style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                                <Link href={`/products/${item.product?.id}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                                    <div style={{ width: 96, height: 96, backgroundColor: '#0d0d0d', overflow: 'hidden' }}>
                                        <AppImage
                                            src={item.product?.image_url}
                                            alt={item.product?.name}
                                            label={item.product?.name}
                                            subtitle={item.product?.brand?.name || ''}
                                            compact
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                </Link>

                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ fontSize: '0.6rem', color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                                        {item.product?.brand?.name}
                                    </p>
                                    <Link href={`/products/${item.product?.id}`} style={{ textDecoration: 'none' }}>
                                        <p style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.35rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-muted)'} onMouseLeave={(e) => e.target.style.color = 'white'}>
                                            {item.product?.name}
                                        </p>
                                    </Link>
                                    <p style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '1rem' }}>
                                        {fmt(item.product?.price)}
                                    </p>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                        <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--color-border)' }}>
                                            <button onClick={() => updateQty(item.id, item.quantity - 1)} disabled={item.quantity <= 1} style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.quantity <= 1 ? 'var(--color-border)' : 'var(--color-muted)', borderRight: '1px solid var(--color-border)', background: 'none', cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer', transition: 'color 0.2s' }}>
                                                <Minus size={11} />
                                            </button>
                                            <span style={{ width: 38, textAlign: 'center', fontSize: '0.875rem', fontWeight: 600, color: 'white' }}>{item.quantity}</span>
                                            <button onClick={() => updateQty(item.id, item.quantity + 1)} style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-muted)', borderLeft: '1px solid var(--color-border)', background: 'none', cursor: 'pointer', transition: 'color 0.2s' }}>
                                                <Plus size={11} />
                                            </button>
                                        </div>

                                        <span style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>
                                            {fmt((item.product?.price || 0) * item.quantity)}
                                        </span>

                                        <button onClick={() => removeItem(item.id)} style={{ color: 'var(--color-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'color 0.2s', fontFamily: 'var(--font-body)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-muted)'}>
                                            <Trash2 size={13} /> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ position: 'sticky', top: '80px' }}>
                        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '1.75rem' }}>
                            <h3 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', color: 'white', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                                Order Summary
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '1.5rem' }}>
                                {[
                                    { label: 'Subtotal', value: fmt(subtotal) },
                                    { label: 'Shipping & Insurance', value: fmt(shipping), sub: 'Fully insured delivery' },
                                ].map((row) => (
                                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <span style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>{row.label}</span>
                                            {row.sub && <p style={{ color: 'var(--color-muted)', fontSize: '0.68rem', marginTop: '2px' }}>{row.sub}</p>}
                                        </div>
                                        <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500 }}>{row.value}</span>
                                    </div>
                                ))}
                                <div style={{ height: '1px', backgroundColor: 'var(--color-border)' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'white', fontSize: '1rem', fontWeight: 700 }}>Total</span>
                                    <span style={{ color: 'var(--color-accent)', fontSize: '1.35rem', fontWeight: 700 }}>{fmt(total)}</span>
                                </div>
                            </div>

                            {auth?.user ? (
                                <Link href="/checkout" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', textDecoration: 'none' }}>
                                    Proceed to Checkout <ArrowRight size={14} />
                                </Link>
                            ) : (
                                <div>
                                    <Link href="/login" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem', textDecoration: 'none' }}>
                                        Sign In to Checkout <ArrowRight size={14} />
                                    </Link>
                                    <Link href="/register" className="btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', textDecoration: 'none', fontSize: '0.75rem' }}>
                                        Create Account
                                    </Link>
                                </div>
                            )}

                            <Link href="/products" style={{ display: 'block', textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--color-muted)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = 'var(--color-muted)'}>
                                Continue Shopping
                            </Link>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                            {[
                                { icon: Shield, text: 'All items verified authentic with certificates' },
                                { icon: Truck, text: 'Fully insured delivery with tracking' },
                            ].map(({ icon: Icon, text }) => (
                                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Icon size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
