import { Link, router, usePage } from '@inertiajs/react';
import { ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';
import AppImage from '@/Components/UI/AppImage';

export default function ProductCard({ product }) {
    const { auth } = usePage().props;
    const [adding, setAdding] = useState(false);
    const [wishlisted, setWishlisted] = useState(false);
    const isAuthenticated = Boolean(auth?.user);

    const addToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            router.get('/login');
            return;
        }

        if (product.stock === 0 || adding) {
            return;
        }

        setAdding(true);

        router.post('/cart/add', { product_id: product.id, quantity: 1 }, {
            onSuccess: () => setAdding(false),
            onError: () => setAdding(false),
            preserveScroll: true,
        });
    };

    const toggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setWishlisted((current) => !current);
    };

    const formatPrice = (price) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(price);

    return (
        <Link href={`/products/${product.id}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div className="product-card" style={{ backgroundColor: 'var(--color-surface)', cursor: 'pointer', height: '100%' }}>
                <div style={{ position: 'relative', paddingTop: '100%', overflow: 'hidden', backgroundColor: '#0d0d0d' }}>
                    <AppImage
                        src={product.image_url}
                        alt={product.name}
                        label={product.name}
                        subtitle={product.brand?.name || product.brand || ''}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />

                    <button
                        onClick={toggleWishlist}
                        style={{
                            position: 'absolute',
                            top: 10,
                            left: 10,
                            width: 34,
                            height: 34,
                            backgroundColor: 'rgba(10,10,10,0.75)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            backdropFilter: 'blur(4px)',
                        }}
                        aria-label="Add to wishlist"
                    >
                        <Heart
                            size={14}
                            style={{
                                color: wishlisted ? 'var(--color-accent)' : 'rgba(255,255,255,0.6)',
                                fill: wishlisted ? 'var(--color-accent)' : 'none',
                                transition: 'all 0.2s',
                            }}
                        />
                    </button>

                    {product.stock <= 2 && product.stock > 0 && (
                        <div style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            backgroundColor: 'rgba(220,38,38,0.9)',
                            padding: '3px 8px',
                            fontSize: '0.58rem',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            color: 'white',
                            textTransform: 'uppercase',
                            backdropFilter: 'blur(4px)',
                        }}>
                            Only {product.stock} Left
                        </div>
                    )}

                    {product.stock === 0 && (
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(0,0,0,0.65)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                                Out of Stock
                            </span>
                        </div>
                    )}

                    {product.stock > 0 && (
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                backgroundColor: 'rgba(10,10,10,0.9)',
                                padding: '0.75rem',
                                transform: 'translateY(100%)',
                                transition: 'transform 0.3s ease',
                            }}
                            className="product-card-overlay"
                        >
                            <button
                                onClick={addToCart}
                                disabled={adding}
                                style={{
                                    width: '100%',
                                    backgroundColor: adding ? '#555' : 'var(--color-accent)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.6rem',
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    cursor: adding ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    transition: 'background-color 0.2s',
                                }}
                            >
                                <ShoppingCart size={13} />
                                {!isAuthenticated ? 'Sign In to Buy' : adding ? 'Adding...' : 'Quick Add'}
                            </button>
                        </div>
                    )}
                </div>

                <div style={{ padding: '1rem 1.1rem 1.25rem' }}>
                    <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                        {product.brand?.name || product.brand}
                    </p>
                    <p style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.75rem', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {product.name}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ color: 'white', fontSize: '1rem', fontWeight: 700 }}>
                            {formatPrice(product.price)}
                        </span>
                        <span style={{ color: product.stock > 0 ? 'var(--color-muted)' : '#ef4444', fontSize: '0.68rem', letterSpacing: '0.05em' }}>
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
