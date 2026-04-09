import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import ProductCard from '@/Components/Product/ProductCard';
import { Shield, Award, Truck, ArrowRight } from 'lucide-react';

const features = [
    { icon: Award, label: 'Authentic Timepieces', desc: '100% genuine luxury watches from authorized dealers' },
    { icon: Shield, label: 'Warranty Protection', desc: 'All watches come with manufacturer\'s warranty' },
    { icon: Truck, label: 'Secure Delivery', desc: 'Insured shipping with signature confirmation' },
];

export default function Index({ featuredProducts = [] }) {
    return (
        <MainLayout>
            {/* Hero Section */}
            <section style={{ position: 'relative', height: '90vh', minHeight: '550px', overflow: 'hidden' }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url('https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1400')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center right',
                }} />
                <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at left, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)' }} />
                <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto',
                              padding: '0 1.5rem', height: '100%', display: 'flex', flexDirection: 'column',
                              justifyContent: 'center', alignItems: 'flex-start' }}>
                    <p className="section-label" style={{ marginBottom: '1rem', opacity: 0.8, animation: 'fadeInUp 0.8s ease 0.2s both' }}>Est. 2026</p>
                    <h1 className="hero-title" style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                                 fontWeight: 900, lineHeight: 1.05, textTransform: 'uppercase',
                                 letterSpacing: '-0.02em', maxWidth: '550px', marginBottom: '1.5rem',
                                 animation: 'fadeInUp 0.8s ease 0.4s both' }}>
                        TIMELESS<br />ELEGANCE
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', lineHeight: 1.8,
                                maxWidth: '400px', marginBottom: '2.5rem', fontWeight: 400,
                                animation: 'fadeInUp 0.8s ease 0.6s both' }}>
                        Discover the world's most prestigious luxury timepieces. Each watch tells a story of craftsmanship, precision, and heritage.
                    </p>
                    <div style={{ animation: 'fadeInUp 0.8s ease 0.8s both' }}>
                        <Link href="/products" className="btn-primary inline-flex items-center gap-2"
                              style={{ boxShadow: '0 10px 30px rgba(220, 38, 38, 0.3)', fontSize: '0.8rem', fontWeight: 600 }}>
                            Shop Now <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Feature Badges */}
            <section style={{ backgroundColor: 'var(--color-bg)', padding: '4rem 1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto',
                              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
                    {features.map(({ icon: Icon, label, desc }, idx) => (
                        <div key={label} className="feature-badge" style={{ animation: `fadeInUp 0.8s ease ${0.2 + idx * 0.1}s both` }}>
                            <div className="feature-icon">
                                <Icon size={24} />
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em',
                                            color: 'white', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                    {label}
                                </p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>
                                    {desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Collection */}
            <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 1.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <p className="section-label" style={{ marginBottom: '1rem' }}>Collection</p>
                    <h2 className="section-title" style={{ marginBottom: '1rem' }}>
                        Featured Timepieces
                    </h2>
                    <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginTop: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                        Curated selections from the world's most prestigious watchmakers
                    </p>
                </div>

                {featuredProducts.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1px',
                                  backgroundColor: 'var(--color-border)' }}>
                        {featuredProducts.map(product => (
                            <div key={product.id} style={{ backgroundColor: 'var(--color-bg)' }} className="product-card-wrapper">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Placeholder cards */
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1px',
                                  backgroundColor: 'var(--color-border)' }}>
                        {[
                            { id:1, name:'Submariner Date 41mm', brand:{name:'Rolex'}, price:14550, stock:3,
                              image_url:'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400' },
                            { id:2, name:'Seamaster Planet Ocean', brand:{name:'Omega'}, price:6350, stock:7,
                              image_url:'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400' },
                            { id:3, name:'Nautilus 5711/1A', brand:{name:'Patak Philippe'}, price:35000, stock:1,
                              image_url:'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400' },
                            { id:4, name:'Royal Oak 41mm', brand:{name:'Audemars Piguet'}, price:28900, stock:4,
                              image_url:'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400' },
                        ].map(p => (
                            <div key={p.id} style={{ backgroundColor: 'var(--color-bg)' }} className="product-card-wrapper">
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                )}

                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <Link href="/products" className="btn-outline inline-flex items-center gap-2"
                          style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                        View All Watches <ArrowRight size={14} />
                    </Link>
                </div>
            </section>

            {/* Banner CTA */}
            <section style={{ position: 'relative', overflow: 'hidden', marginBottom: '0' }}>
                <div style={{ position: 'absolute', inset: 0,
                              backgroundImage: `url('https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1400')`,
                              backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }} />
                <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto',
                              padding: '5rem 1.5rem', textAlign: 'center' }}>
                    <p className="section-label" style={{ marginBottom: '1rem' }}>Exclusive Access</p>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                                 fontWeight: 300, color: 'white', marginBottom: '1.5rem' }}>
                        Curated for the <em>Connoisseur</em>
                    </h2>
                    <Link href="/register" className="btn-primary inline-flex items-center gap-2">
                        Create an Account <ArrowRight size={14} />
                    </Link>
                </div>
            </section>
        </MainLayout>
    );
}