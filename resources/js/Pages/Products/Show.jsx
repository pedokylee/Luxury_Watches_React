import { useState } from 'react';
import { router, Link, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import ProductCard from '@/Components/Product/ProductCard';
import AppImage from '@/Components/UI/AppImage';
import { ShoppingCart, Check, ChevronLeft, Minus, Plus, Heart, Share2, Shield, Truck, RotateCcw } from 'lucide-react';

export default function Show({ product = null, relatedProducts = [] }) {
    const { auth } = usePage().props;
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);
    const [wishlisted, setWishlisted] = useState(false);
    const [activeTab, setActiveTab] = useState('description');
    const isAuthenticated = Boolean(auth?.user);

    if (!product?.id) {
        return (
            <MainLayout>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 1.5rem', textAlign: 'center' }}>
                    <h1 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.5rem' }}>Product not found</h1>
                    <Link href="/products" className="btn-primary inline-block">Back to Shop</Link>
                </div>
            </MainLayout>
        );
    }

    const p = product;
    const formatPrice = (value) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            router.get('/login');
            return;
        }

        setAdding(true);
        router.post('/cart/add', { product_id: p.id, quantity }, {
            onSuccess: () => {
                setAdding(false);
                setAdded(true);
                setTimeout(() => setAdded(false), 2500);
            },
            onError: () => setAdding(false),
        });
    };

    const tabs = [
        { key: 'description', label: 'Description' },
        { key: 'specs', label: 'Specifications' },
        { key: 'shipping', label: 'Shipping & Returns' },
    ];

    const tabContentStyle = { color: 'rgba(255,255,255,0.72)', fontSize: '0.875rem', lineHeight: 1.9 };

    return (
        <MainLayout>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    <Link
                        href="/products"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-muted)', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-muted)'}
                    >
                        <ChevronLeft size={13} /> Shop
                    </Link>
                    <span style={{ color: 'var(--color-border)', fontSize: '0.75rem' }}>/</span>
                    <span style={{ color: 'var(--color-muted)', fontSize: '0.75rem' }}>{p.brand?.name}</span>
                    <span style={{ color: 'var(--color-border)', fontSize: '0.75rem' }}>/</span>
                    <span style={{ color: 'white', fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>{p.name}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start', marginBottom: '4rem' }}>
                    <div>
                        <div style={{ backgroundColor: '#0d0d0d', aspectRatio: '1 / 1', overflow: 'hidden', position: 'relative' }}>
                            <AppImage
                                src={p.image_url}
                                alt={p.name}
                                label={p.name}
                                subtitle={p.brand?.name || ''}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            {p.stock === 0 && (
                                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Out of Stock</span>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', marginTop: '1px' }}>
                            {[
                                { icon: Shield, label: 'Authentic' },
                                { icon: Truck, label: 'Insured Ship' },
                                { icon: RotateCcw, label: '30-Day Return' },
                            ].map(({ icon: Icon, label }) => (
                                <div key={label} style={{ backgroundColor: 'var(--color-surface)', padding: '0.875rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', borderRight: '1px solid var(--color-border)' }}>
                                    <Icon size={15} style={{ color: 'var(--color-accent)' }} />
                                    <span style={{ fontSize: '0.65rem', color: 'var(--color-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', textAlign: 'center' }}>{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                            {p.brand?.name || p.brand}
                        </p>
                        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 300, color: 'white', lineHeight: 1.15, marginBottom: '1.5rem', letterSpacing: '0.02em' }}>
                            {p.name}
                        </h1>

                        <p style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 700, color: 'white', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
                            {formatPrice(p.price)}
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem' }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: p.stock > 0 ? '#22c55e' : '#ef4444', boxShadow: p.stock > 0 ? '0 0 6px #22c55e' : '0 0 6px #ef4444' }} />
                            <span style={{ fontSize: '0.8rem', color: p.stock > 0 ? '#4ade80' : '#f87171', fontWeight: 500 }}>
                                {p.stock > 0 ? `In Stock - ${p.stock} unit${p.stock !== 1 ? 's' : ''} available` : 'Out of Stock'}
                            </span>
                        </div>

                        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.75rem', marginBottom: '1.75rem' }} />

                        {p.category && (
                            <div style={{ marginBottom: '1.25rem' }}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.3rem 0.75rem', border: '1px solid var(--color-border)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--color-muted)', textTransform: 'uppercase' }}>
                                    {p.category?.name || p.category}
                                </span>
                            </div>
                        )}

                        {p.stock > 0 && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--color-muted)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Quantity</p>
                                <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--color-border)' }}>
                                    <button
                                        onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                                        style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-muted)', borderRight: '1px solid var(--color-border)', background: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-muted)'}
                                    >
                                        <Minus size={13} />
                                    </button>
                                    <span style={{ width: 52, textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, color: 'white' }}>{quantity}</span>
                                    <button
                                        onClick={() => setQuantity((current) => Math.min(p.stock, current + 1))}
                                        style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-muted)', borderLeft: '1px solid var(--color-border)', background: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-muted)'}
                                    >
                                        <Plus size={13} />
                                    </button>
                                </div>
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                            <button
                                onClick={handleAddToCart}
                                disabled={p.stock === 0 || adding}
                                className="btn-primary"
                                style={{
                                    flex: 1,
                                    minWidth: '180px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.6rem',
                                    opacity: p.stock === 0 ? 0.45 : 1,
                                    backgroundColor: added ? '#16a34a' : 'var(--color-accent)',
                                    cursor: p.stock === 0 ? 'not-allowed' : 'pointer',
                                    transition: 'background-color 0.3s',
                                }}
                            >
                                {added ? <Check size={16} /> : <ShoppingCart size={16} />}
                                {added ? 'Added to Cart!' : !isAuthenticated ? 'Sign In to Add to Cart' : adding ? 'Adding...' : 'Add to Cart'}
                            </button>
                            <button
                                onClick={() => setWishlisted((current) => !current)}
                                style={{
                                    width: 50,
                                    height: 50,
                                    border: `1px solid ${wishlisted ? 'var(--color-accent)' : 'var(--color-border)'}`,
                                    backgroundColor: wishlisted ? 'rgba(220,38,38,0.08)' : 'transparent',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    flexShrink: 0,
                                }}
                            >
                                <Heart size={16} style={{ color: wishlisted ? 'var(--color-accent)' : 'var(--color-muted)', fill: wishlisted ? 'var(--color-accent)' : 'none', transition: 'all 0.2s' }} />
                            </button>
                            <button
                                style={{ width: 50, height: 50, border: '1px solid var(--color-border)', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'border-color 0.2s', flexShrink: 0 }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                            >
                                <Share2 size={15} style={{ color: 'var(--color-muted)' }} />
                            </button>
                        </div>

                        {p.stock > 0 && quantity > 1 && (
                            <div style={{ padding: '0.875rem 1rem', backgroundColor: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>Subtotal ({quantity} units)</span>
                                <span style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '1rem' }}>{formatPrice(p.price * quantity)}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', marginBottom: '4rem' }}>
                    <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid var(--color-border)' }}>
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                style={{
                                    padding: '1rem 1.5rem',
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    color: activeTab === tab.key ? 'white' : 'var(--color-muted)',
                                    background: 'none',
                                    border: 'none',
                                    borderBottom: `2px solid ${activeTab === tab.key ? 'var(--color-accent)' : 'transparent'}`,
                                    marginBottom: '-1px',
                                    cursor: 'pointer',
                                    transition: 'color 0.2s',
                                    fontFamily: 'var(--font-body)',
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div style={{ padding: '2rem 0', maxWidth: '700px' }}>
                        {activeTab === 'description' && (
                            <p style={tabContentStyle}>
                                {p.description || 'A magnificent timepiece crafted with exceptional attention to detail. This watch combines Swiss precision with elegant design built to last for generations.'}
                            </p>
                        )}
                        {activeTab === 'specs' && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', backgroundColor: 'var(--color-border)' }}>
                                {[
                                    ['Brand', p.brand?.name || '-'],
                                    ['Model', p.name],
                                    ['Category', p.category?.name || '-'],
                                    ['Price', formatPrice(p.price)],
                                    ['Stock', `${p.stock} units`],
                                    ['Condition', 'Brand New'],
                                    ['Origin', 'Switzerland'],
                                    ['Warranty', 'Manufacturer Included'],
                                ].map(([key, value]) => (
                                    <div key={key} style={{ backgroundColor: 'var(--color-surface)', padding: '1rem 1.25rem' }}>
                                        <p style={{ fontSize: '0.65rem', color: 'var(--color-muted)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{key}</p>
                                        <p style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500 }}>{value}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        {activeTab === 'shipping' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    { icon: Truck, title: 'Free Insured Shipping', desc: 'All orders come with full insurance and signature confirmation at no extra cost.' },
                                    { icon: Shield, title: 'Authenticity Guaranteed', desc: 'Every timepiece is verified by our experts and comes with a certificate of authenticity.' },
                                    { icon: RotateCcw, title: '30-Day Returns', desc: 'Not satisfied? Return your watch within 30 days for a full refund.' },
                                ].map(({ icon: Icon, title, desc }) => (
                                    <div key={title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                        <div style={{ width: 36, height: 36, border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <Icon size={15} style={{ color: 'var(--color-accent)' }} />
                                        </div>
                                        <div>
                                            <p style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>{title}</p>
                                            <p style={{ color: 'var(--color-muted)', fontSize: '0.82rem', lineHeight: 1.7 }}>{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <div>
                        <div style={{ marginBottom: '2rem' }}>
                            <p className="section-label" style={{ marginBottom: '0.5rem' }}>You May Also Like</p>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 300, color: 'white' }}>Related Timepieces</h3>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1px', backgroundColor: 'var(--color-border)' }}>
                            {relatedProducts.slice(0, 4).map((relatedProduct) => (
                                <div key={relatedProduct.id} style={{ backgroundColor: 'var(--color-bg)' }}>
                                    <ProductCard product={relatedProduct} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
