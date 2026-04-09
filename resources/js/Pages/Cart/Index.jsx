import { router, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

const formatPrice = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

export default function Index({ cart = null, auth = null }) {
    const items = cart?.items || [];

    const updateQty = (itemId, qty) => {
        router.patch(`/cart/${itemId}`, { quantity: qty }, { preserveScroll: true });
    };

    const removeItem = (itemId) => {
        router.delete(`/cart/${itemId}`, { preserveScroll: true });
    };

    const subtotal = items.reduce((acc, i) => acc + (i.product?.price || 0) * i.quantity, 0);
    const shipping = subtotal > 0 ? 250 : 0;
    const total = subtotal + shipping;

    if (items.length === 0) {
        return (
            <MainLayout>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 1.5rem', textAlign: 'center' }}>
                    <ShoppingBag size={64} style={{ color: 'var(--color-border)', margin: '0 auto 1.5rem' }} />
                    <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '1.5rem', fontWeight: 700,
                                 color: 'white', marginBottom: '0.75rem' }}>Your cart is empty</h2>
                    <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
                        Discover our exceptional collection of luxury timepieces.
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
                <div style={{ marginBottom: '2rem' }}>
                    <p className="section-label" style={{ marginBottom: '0.5rem' }}>Review</p>
                    <h1 style={{ fontFamily: 'var(--font-body)', fontSize: '2rem', fontWeight: 800,
                                 color: 'white', textTransform: 'uppercase' }}>Your Cart</h1>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem', alignItems: 'start' }} className="cart-grid">
                    {/* Items */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: 'var(--color-border)' }}>
                        {items.map(item => (
                            <div key={item.id}
                                 style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem',
                                          display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                {/* Thumb */}
                                <div style={{ width: 96, height: 96, flexShrink: 0, backgroundColor: '#0d0d0d', overflow: 'hidden' }}>
                                    <img src={item.product?.image_url || 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200'}
                                         alt={item.product?.name}
                                         style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>

                                {/* Info */}
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: '0.6rem', color: 'var(--color-accent)', fontWeight: 700,
                                                letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                                        {item.product?.brand?.name}
                                    </p>
                                    <p style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                                        {item.product?.name}
                                    </p>
                                    <p style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '1rem' }}>
                                        {formatPrice(item.product?.price)}
                                    </p>
                                </div>

                                {/* Qty */}
                                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)' }}>
                                    <button onClick={() => updateQty(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            style={{ width: 36, height: 36, display: 'flex', alignItems: 'center',
                                                     justifyContent: 'center', color: 'var(--color-muted)',
                                                     borderRight: '1px solid var(--color-border)', background: 'none',
                                                     cursor: 'pointer' }}>
                                        <Minus size={12} />
                                    </button>
                                    <span style={{ width: 40, textAlign: 'center', fontSize: '0.875rem',
                                                   fontWeight: 600, color: 'white' }}>{item.quantity}</span>
                                    <button onClick={() => updateQty(item.id, item.quantity + 1)}
                                            style={{ width: 36, height: 36, display: 'flex', alignItems: 'center',
                                                     justifyContent: 'center', color: 'var(--color-muted)',
                                                     borderLeft: '1px solid var(--color-border)', background: 'none',
                                                     cursor: 'pointer' }}>
                                        <Plus size={12} />
                                    </button>
                                </div>

                                {/* Subtotal */}
                                <div style={{ textAlign: 'right', minWidth: '80px' }}>
                                    <p style={{ color: 'white', fontWeight: 600 }}>
                                        {formatPrice((item.product?.price || 0) * item.quantity)}
                                    </p>
                                </div>

                                {/* Remove */}
                                <button onClick={() => removeItem(item.id)}
                                        style={{ color: 'var(--color-muted)', background: 'none', cursor: 'pointer',
                                                 padding: '0.25rem', transition: 'color 0.2s' }}
                                        className="hover:text-red-500">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)',
                                  padding: '1.5rem', position: 'sticky', top: '80px' }}>
                        <h3 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em',
                                     color: 'white', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                            Order Summary
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>Subtotal</span>
                                <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500 }}>{formatPrice(subtotal)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>Shipping</span>
                                <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500 }}>{formatPrice(shipping)}</span>
                            </div>
                            <div style={{ height: '1px', backgroundColor: 'var(--color-border)' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'white', fontSize: '1rem', fontWeight: 700 }}>Total</span>
                                <span style={{ color: 'var(--color-accent)', fontSize: '1.25rem', fontWeight: 700 }}>
                                    {formatPrice(total)}
                                </span>
                            </div>
                        </div>

                        {auth?.user ? (
                            <Link href="/checkout" className="btn-primary"
                                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                Proceed to Checkout <ArrowRight size={14} />
                            </Link>
                        ) : (
                            <Link href="/login" className="btn-primary"
                                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                Login to Checkout <ArrowRight size={14} />
                            </Link>
                        )}

                        <Link href="/products" style={{ display: 'block', textAlign: 'center', marginTop: '1rem',
                                                        fontSize: '0.75rem', color: 'var(--color-muted)',
                                                        letterSpacing: '0.08em' }}
                              className="hover:text-white transition-colors">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}