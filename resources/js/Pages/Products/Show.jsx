import { useState } from 'react';
import { router, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { ShoppingCart, Check, ChevronLeft, Minus, Plus } from 'lucide-react';

export default function Show({ product = null, relatedProducts = [] }) {
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);

    // Use product data directly - don't fall back to demo for display
    if (!product || !product.id) {
        return (
            <MainLayout>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem', textAlign: 'center' }}>
                    <h1 style={{ color: 'white', marginBottom: '1rem' }}>Product not found</h1>
                    <Link href="/products" className="btn-primary inline-block">Back to Shop</Link>
                </div>
            </MainLayout>
        );
    }

    const p = product;

    const formatPrice = (val) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

    const handleAddToCart = () => {
        setAdding(true);
        router.post('/cart/add', { product_id: p.id, quantity }, {
            onSuccess: () => {
                setAdding(false);
                setAdded(true);
                setTimeout(() => setAdded(false), 2000);
            },
            onError: () => setAdding(false)
        });
    };

    return (
        <MainLayout>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
                {/* Breadcrumb */}
                <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                                color: 'var(--color-muted)', fontSize: '0.75rem',
                                                letterSpacing: '0.1em', textTransform: 'uppercase',
                                                marginBottom: '2rem' }}
                      className="hover:text-white transition-colors">
                    <ChevronLeft size={14} /> Back to Shop
                </Link>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}
                     className="grid-cols-1 lg:grid-cols-2">
                    {/* Image */}
                    <div style={{ backgroundColor: '#0d0d0d', aspectRatio: '1', overflow: 'hidden' }}>
                        <img
                            src={p.image_url || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600'}
                            alt={p.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    {/* Details */}
                    <div style={{ backgroundColor: 'var(--color-surface)', padding: '2.5rem' }}>
                        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em',
                                    color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                            {p.brand?.name || p.brand}
                        </p>
                        <h1 style={{ fontFamily: 'var(--font-body)', fontSize: '2rem', fontWeight: 800,
                                     color: 'white', letterSpacing: '-0.01em', textTransform: 'uppercase',
                                     lineHeight: 1.1, marginBottom: '1.25rem' }}>
                            {p.name}
                        </h1>

                        <p style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--color-accent)',
                                    marginBottom: '0.75rem' }}>
                            {formatPrice(p.price)}
                        </p>

                        {/* Stock */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%',
                                          backgroundColor: p.stock > 0 ? '#22c55e' : '#ef4444' }} />
                            <span style={{ fontSize: '0.8rem', color: p.stock > 0 ? '#22c55e' : '#ef4444' }}>
                                {p.stock > 0 ? `In Stock (${p.stock} available)` : 'Out of Stock'}
                            </span>
                        </div>

                        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em',
                                         color: 'var(--color-muted)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                Description
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', lineHeight: 1.8 }}>
                                {p.description}
                            </p>
                        </div>

                        {p.category && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.3rem 0.75rem',
                                               border: '1px solid var(--color-border)',
                                               fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em',
                                               color: 'var(--color-muted)', textTransform: 'uppercase' }}>
                                    Category: {p.category?.name || p.category}
                                </span>
                            </div>
                        )}

                        {/* Quantity */}
                        {p.stock > 0 && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em',
                                            color: 'var(--color-muted)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                    Quantity
                                </p>
                                <div style={{ display: 'inline-flex', alignItems: 'center',
                                              border: '1px solid var(--color-border)' }}>
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        style={{ width: 40, height: 40, display: 'flex', alignItems: 'center',
                                                 justifyContent: 'center', color: 'var(--color-muted)',
                                                 borderRight: '1px solid var(--color-border)', background: 'none',
                                                 cursor: 'pointer', transition: 'color 0.2s' }}
                                        className="hover:text-white">
                                        <Minus size={14} />
                                    </button>
                                    <span style={{ width: 48, textAlign: 'center', fontSize: '0.9rem',
                                                   fontWeight: 600, color: 'white' }}>
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(q => Math.min(p.stock, q + 1))}
                                        style={{ width: 40, height: 40, display: 'flex', alignItems: 'center',
                                                 justifyContent: 'center', color: 'var(--color-muted)',
                                                 borderLeft: '1px solid var(--color-border)', background: 'none',
                                                 cursor: 'pointer', transition: 'color 0.2s' }}
                                        className="hover:text-white">
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={p.stock === 0 || adding}
                            className="btn-primary"
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                     gap: '0.75rem', opacity: p.stock === 0 ? 0.5 : 1,
                                     backgroundColor: added ? '#22c55e' : 'var(--color-accent)',
                                     cursor: p.stock === 0 ? 'not-allowed' : 'pointer' }}>
                            {added ? <Check size={16} /> : <ShoppingCart size={16} />}
                            {added ? 'Added to Cart' : adding ? 'Adding...' : 'Add to Cart'}
                        </button>

                        {/* Trust Badges */}
                        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {[
                                "Authentic timepiece with manufacturer's warranty",
                                'Free insured shipping with signature confirmation',
                                '30-day return policy'
                            ].map(text => (
                                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Check size={13} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                                    <span style={{ fontSize: '0.775rem', color: 'var(--color-muted)' }}>{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

