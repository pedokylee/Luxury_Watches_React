import MainLayout from '@/Layouts/MainLayout';
import ProductFilter from '@/Components/Product/ProductFilter';
import ProductCard from '@/Components/Product/ProductCard';
import AppImage from '@/Components/UI/AppImage';
import { Link } from '@inertiajs/react';
import { LayoutGrid, List } from 'lucide-react';
import { useState } from 'react';

export default function Index({ products = { data: [], links: [], meta: {} }, filters = {}, categories = [], brands = [] }) {
    const [viewMode, setViewMode] = useState('grid');
    const items = products.data || [];
    const meta = products.meta || {};
    const totalCount = meta.total || items.length;

    const iconBtnStyle = (active) => ({
        width: 36,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${active ? 'var(--color-accent)' : 'var(--color-border)'}`,
        backgroundColor: active ? 'rgba(220,38,38,0.08)' : 'transparent',
        color: active ? 'var(--color-accent)' : 'var(--color-muted)',
        cursor: 'pointer',
        transition: 'all 0.2s',
    });

    return (
        <MainLayout>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
                <div style={{ marginBottom: '2.5rem' }}>
                    <p className="section-label" style={{ marginBottom: '0.5rem' }}>Collection</p>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 300, color: 'white', letterSpacing: '0.04em' }}>
                        Luxury Watches
                    </h1>
                </div>

                <ProductFilter filters={filters} categories={categories} brands={brands} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <p style={{ fontSize: '0.78rem', color: 'var(--color-muted)', letterSpacing: '0.04em' }}>
                        Showing <span style={{ color: 'white', fontWeight: 600 }}>{items.length}</span> of <span style={{ color: 'white', fontWeight: 600 }}>{totalCount}</span> watches
                    </p>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button onClick={() => setViewMode('grid')} style={iconBtnStyle(viewMode === 'grid')} title="Grid view">
                            <LayoutGrid size={15} />
                        </button>
                        <button onClick={() => setViewMode('list')} style={iconBtnStyle(viewMode === 'list')} title="List view">
                            <List size={15} />
                        </button>
                    </div>
                </div>

                {items.length > 0 ? (
                    viewMode === 'grid' ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                            gap: '1px',
                            backgroundColor: 'var(--color-border)',
                            marginBottom: '2.5rem',
                        }}>
                            {items.map((product) => (
                                <div key={product.id} style={{ backgroundColor: 'var(--color-bg)' }}>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: 'var(--color-border)', marginBottom: '2.5rem' }}>
                            {items.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.id}`}
                                    style={{ backgroundColor: 'var(--color-surface)', display: 'flex', gap: '1.5rem', padding: '1.25rem', alignItems: 'center', textDecoration: 'none', transition: 'background-color 0.2s' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-2)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface)'}
                                >
                                    <div style={{ width: 80, height: 80, flexShrink: 0, backgroundColor: '#0d0d0d', overflow: 'hidden' }}>
                                        <AppImage
                                            src={product.image_url}
                                            alt={product.name}
                                            label={product.name}
                                            subtitle={product.brand?.name || ''}
                                            compact
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontSize: '0.6rem', color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                                            {product.brand?.name}
                                        </p>
                                        <p style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {product.name}
                                        </p>
                                        <p style={{ color: 'var(--color-muted)', fontSize: '0.75rem' }}>
                                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                        </p>
                                    </div>
                                    <p style={{ color: 'white', fontWeight: 700, fontSize: '1.05rem', whiteSpace: 'nowrap' }}>
                                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(product.price)}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    )
                ) : (
                    <div style={{ textAlign: 'center', padding: '5rem 1.5rem', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
                        <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                            No watches found matching your filters.
                        </p>
                        <Link href="/products" className="btn-outline" style={{ fontSize: '0.75rem' }}>
                            Clear Filters
                        </Link>
                    </div>
                )}

                {products.links && products.links.length > 3 && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.35rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                        {products.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                style={{
                                    padding: '0.5rem 0.9rem',
                                    fontSize: '0.78rem',
                                    fontWeight: 500,
                                    border: '1px solid',
                                    borderColor: link.active ? 'var(--color-accent)' : 'var(--color-border)',
                                    color: link.active ? 'var(--color-accent)' : 'var(--color-muted)',
                                    backgroundColor: link.active ? 'rgba(220,38,38,0.08)' : 'transparent',
                                    pointerEvents: !link.url ? 'none' : 'auto',
                                    opacity: !link.url ? 0.35 : 1,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s',
                                }}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
