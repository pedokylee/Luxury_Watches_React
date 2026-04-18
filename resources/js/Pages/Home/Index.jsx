import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import ProductCard from '@/Components/Product/ProductCard';
import { Shield, Award, Truck, ArrowRight, Star } from 'lucide-react';

const features = [
    { icon: Award, label: 'Authentic Timepieces', desc: '100% genuine luxury watches from trusted global sourcing partners.' },
    { icon: Shield, label: 'Warranty Protection', desc: 'Every watch includes verified provenance and post-purchase support.' },
    { icon: Truck, label: 'Secure Delivery', desc: 'Fully insured delivery with tracking and signature confirmation.' },
];

const brands = ['Rolex', 'Omega', 'Patek Philippe', 'Audemars Piguet', 'Cartier', 'IWC'];

export default function Index({ featuredProducts = [] }) {
    return (
        <MainLayout>
            <section style={{ position: 'relative', height: 'calc(100vh - 96px)', minHeight: '560px', overflow: 'hidden' }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url('https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1600')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center right',
                }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.92) 45%, rgba(10,10,10,0.2) 100%)' }} />

                <div style={{
                    position: 'relative',
                    zIndex: 10,
                    maxWidth: '1280px',
                    margin: '0 auto',
                    padding: '0 1.5rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}>
                    <p className="section-label" style={{ marginBottom: '1rem', animation: 'fadeInUp 0.8s ease 0.2s both' }}>
                        Est. 2026 - Luxury Collection
                    </p>
                    <h1 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(3rem, 7vw, 6rem)',
                        fontWeight: 300,
                        lineHeight: 1.0,
                        color: 'white',
                        maxWidth: '600px',
                        marginBottom: '1.5rem',
                        animation: 'fadeInUp 0.8s ease 0.35s both',
                        letterSpacing: '0.02em',
                    }}>
                        Timeless
                        <br />
                        <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.85)' }}>Elegance</em>
                    </h1>
                    <p style={{
                        color: 'rgba(255,255,255,0.65)',
                        fontSize: '1rem',
                        lineHeight: 1.8,
                        maxWidth: '420px',
                        marginBottom: '2.5rem',
                        animation: 'fadeInUp 0.8s ease 0.5s both',
                    }}>
                        Discover prestigious timepieces defined by craftsmanship, mechanical precision, and lasting value.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', animation: 'fadeInUp 0.8s ease 0.65s both' }}>
                        <Link href="/products" className="btn-primary inline-flex items-center gap-2" style={{ boxShadow: '0 10px 30px rgba(220,38,38,0.3)' }}>
                            Shop Collection <ArrowRight size={15} />
                        </Link>
                        <Link href="#featured" className="btn-outline inline-flex items-center gap-2">
                            View Highlights
                        </Link>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '2.5rem',
                        marginTop: '4rem',
                        animation: 'fadeInUp 0.8s ease 0.8s both',
                        flexWrap: 'wrap',
                    }}>
                        {[
                            { value: '500+', label: 'Timepieces' },
                            { value: '20+', label: 'Luxury Brands' },
                            { value: '2,400+', label: 'Happy Clients' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', lineHeight: 1 }}>{stat.value}</p>
                                <p style={{ fontSize: '0.7rem', color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.25rem' }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', padding: '1.5rem', overflow: 'hidden' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <span style={{ fontSize: '0.6rem', color: 'var(--color-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginRight: '1rem', whiteSpace: 'nowrap' }}>
                        Authorized Dealer For
                    </span>
                    {brands.map((brand, i) => (
                        <span
                            key={brand}
                            style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                color: 'var(--color-muted)',
                                padding: '0 1rem',
                                borderLeft: i > 0 ? '1px solid var(--color-border)' : 'none',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {brand}
                        </span>
                    ))}
                </div>
            </section>

            <section style={{ backgroundColor: 'var(--color-bg)', padding: '5rem 1.5rem' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
                    {features.map(({ icon: Icon, label, desc }, idx) => (
                        <div key={label} className="feature-badge" style={{ animation: `fadeInUp 0.8s ease ${0.1 + idx * 0.15}s both` }}>
                            <div className="feature-icon">
                                <Icon size={22} />
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
                                <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', color: 'white', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                    {label}
                                </p>
                                <p style={{ fontSize: '0.82rem', color: 'var(--color-muted)', lineHeight: 1.7 }}>
                                    {desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="featured" style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem 6rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <p className="section-label" style={{ marginBottom: '0.75rem' }}>Collection</p>
                        <h2 className="section-title">Featured Timepieces</h2>
                        <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginTop: '1rem', maxWidth: '400px', lineHeight: 1.7 }}>
                            Curated selections from the world's most prestigious watchmakers.
                        </p>
                    </div>
                    <Link href="/products" className="btn-outline inline-flex items-center gap-2" style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                        View All <ArrowRight size={13} />
                    </Link>
                </div>

                {featuredProducts.length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                        gap: '1px',
                        backgroundColor: 'var(--color-border)',
                    }}>
                        {featuredProducts.map((product) => (
                            <div key={product.id} style={{ backgroundColor: 'var(--color-bg)' }} className="product-card-wrapper">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ border: '1px solid var(--color-border)', padding: '3rem 1.5rem', textAlign: 'center' }}>
                        <p style={{ color: 'var(--color-muted)', marginBottom: '1rem' }}>
                            Products will appear here after you seed or create inventory.
                        </p>
                        <Link href="/products" className="btn-outline inline-flex items-center gap-2">
                            Browse Shop
                        </Link>
                    </div>
                )}
            </section>

            <section style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url('https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1600')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.15,
                }} />
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10,10,10,0.7)' }} />
                <div style={{
                    position: 'relative',
                    zIndex: 10,
                    maxWidth: '800px',
                    margin: '0 auto',
                    padding: '6rem 1.5rem',
                    textAlign: 'center',
                }}>
                    <p className="section-label" style={{ marginBottom: '1rem' }}>Exclusive Access</p>
                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 300,
                        color: 'white',
                        marginBottom: '1.25rem',
                        lineHeight: 1.1,
                    }}>
                        Curated for the <em>Connoisseur</em>
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.8, maxWidth: '500px', margin: '0 auto 2.5rem' }}>
                        Create an account to access exclusive collections, early releases, and personalized watch recommendations.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/register" className="btn-primary inline-flex items-center gap-2" style={{ boxShadow: '0 10px 30px rgba(220,38,38,0.3)' }}>
                            Create an Account <ArrowRight size={14} />
                        </Link>
                        <Link href="/products" className="btn-outline inline-flex items-center gap-2">
                            Browse First
                        </Link>
                    </div>
                </div>
            </section>

            <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 1.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <p className="section-label" style={{ marginBottom: '0.75rem' }}>Reviews</p>
                    <h2 className="section-title">What Our Clients Say</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', backgroundColor: 'var(--color-border)' }}>
                    {[
                        { name: 'Maria Santos', review: 'The Rolex I purchased arrived impeccably packed and was exactly as described. The team was responsive throughout the process.', rating: 5, watch: 'Rolex Submariner' },
                        { name: 'Jose Reyes', review: 'Exceptional service from start to finish. My Patek Philippe arrived insured, documented, and in flawless condition.', rating: 5, watch: 'Patek Philippe Nautilus' },
                        { name: 'Ana Cruz', review: 'The best luxury watch buying experience I have had. Fast communication, secure shipping, and a beautiful Omega.', rating: 5, watch: 'Omega Seamaster' },
                    ].map((testimonial) => (
                        <div key={testimonial.name} style={{ backgroundColor: 'var(--color-surface)', padding: '2rem' }}>
                            <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                                {Array.from({ length: testimonial.rating }).map((_, j) => (
                                    <Star key={j} size={13} style={{ color: 'var(--color-accent)', fill: 'var(--color-accent)' }} />
                                ))}
                            </div>
                            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', lineHeight: 1.8, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                                "{testimonial.review}"
                            </p>
                            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                                <p style={{ color: 'white', fontSize: '0.8rem', fontWeight: 600 }}>{testimonial.name}</p>
                                <p style={{ color: 'var(--color-accent)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.2rem' }}>{testimonial.watch}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </MainLayout>
    );
}
