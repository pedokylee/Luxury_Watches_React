import { Link } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import { router } from '@inertiajs/react';

export default function ProductCard({ product }) {
const addToCart = (e) => {
        e.preventDefault();
        router.post('/cart/add', { product_id: product.id, quantity: 1 });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
    };

    return (
        <Link href={`/products/${product.id}`}>
            <div className="product-card" style={{ backgroundColor: 'var(--color-surface)', cursor: 'pointer' }}>
                {/* Image */}
                <div style={{ position: 'relative', paddingTop: '100%', overflow: 'hidden', backgroundColor: '#0d0d0d' }}>
                    <img
                        src={product.image_url || `https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400`}
                        alt={product.name}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                                 objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    />
                    {product.stock <= 2 && product.stock > 0 && (
                        <div style={{ position: 'absolute', top: 10, right: 10,
                                      backgroundColor: 'rgba(220,38,38,0.9)', padding: '2px 8px',
                                      fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em',
                                      color: 'white', textTransform: 'uppercase' }}>
                            Low Stock
                        </div>
                    )}
                    {product.stock === 0 && (
                        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
                                      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: 'var(--color-muted)', fontSize: '0.75rem', fontWeight: 600,
                                          letterSpacing: '0.1em', textTransform: 'uppercase' }}>Out of Stock</span>
                        </div>
                    )}
                </div>

                {/* Info */}
                <div style={{ padding: '1rem' }}>
                    <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em',
                                color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                        {product.brand?.name || product.brand}
                    </p>
                    <p style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem',
                                lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {product.name}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--color-accent)', fontSize: '0.95rem', fontWeight: 600 }}>
                            {formatPrice(product.price)}
                        </span>
                        <span style={{ color: 'var(--color-muted)', fontSize: '0.7rem' }}>
                            Stock: {product.stock}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}