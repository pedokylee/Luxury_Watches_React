import MainLayout from '@/Layouts/MainLayout';
import ProductFilter from '@/Components/Product/ProductFilter';
import ProductCard from '@/Components/Product/ProductCard';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Index({ products = { data: [], links: [], meta: {} }, filters = {}, categories = [], brands = [] }) {
    const items = products.data || [];
    const meta = products.meta || {};

    // Fallback demo data if no real data
    const demoProducts = [
        { id:1, name:'Royal Oak Offshore', brand:{name:'Audemars Piguet'}, price:45000, stock:5, image_url:'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400' },
        { id:2, name:'Submariner Date', brand:{name:'Rolex'}, price:38000, stock:3, image_url:'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400' },
        { id:3, name:'Nautilus 5711', brand:{name:'Patek Philippe'}, price:85000, stock:2, image_url:'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400' },
        { id:4, name:'Seamaster Planet Ocean', brand:{name:'Omega'}, price:12500, stock:7, image_url:'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400' },
        { id:5, name:'Cosmograph Daytona', brand:{name:'Rolex'}, price:42000, stock:1, image_url:'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400' },
        { id:6, name:'Santos de Cartier', brand:{name:'Cartier'}, price:28500, stock:4, image_url:'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400' },
    ];
    const displayProducts = items.length > 0 ? items : demoProducts;
    const totalCount = meta.total || displayProducts.length;
    const currentCount = displayProducts.length;

    return (
        <MainLayout>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
                {/* Page Header */}
                <div style={{ marginBottom: '2rem' }}>
                    <p className="section-label" style={{ marginBottom: '0.5rem' }}>Collection</p>
                    <h1 style={{ fontFamily: 'var(--font-body)', fontSize: '2rem', fontWeight: 800,
                                 color: 'white', letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
                        Luxury Watches Collection
                    </h1>
                </div>

                {/* Filters */}
                <ProductFilter filters={filters} categories={categories} brands={brands} />

                {/* Count */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Showing {currentCount} of {totalCount} watches
                    </p>
                </div>

                {/* Grid */}
                {displayProducts.length > 0 ? (
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1px', 
                        backgroundColor: 'var(--color-border)',
                        marginBottom: '2rem'
                    }}>
                        {displayProducts.map(product => (
                            <div key={product.id} style={{ backgroundColor: 'var(--color-bg)' }}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                        <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>No products found</p>
                    </div>
                )}

                {/* Pagination */}
                {products.links && products.links.length > 3 && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem' }}>
                        {products.links.map((link, i) => (
                            <Link key={i} href={link.url || '#'}
                                  style={{
                                      padding: '0.5rem 0.875rem',
                                      fontSize: '0.8rem',
                                      fontWeight: 500,
                                      border: '1px solid',
                                      borderColor: link.active ? 'var(--color-accent)' : 'var(--color-border)',
                                      color: link.active ? 'var(--color-accent)' : 'var(--color-muted)',
                                      backgroundColor: link.active ? 'rgba(220,38,38,0.05)' : 'transparent',
                                      pointerEvents: !link.url ? 'none' : 'auto',
                                      opacity: !link.url ? 0.4 : 1
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