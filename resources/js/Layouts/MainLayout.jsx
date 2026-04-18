import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X, Crown, Search } from 'lucide-react';

export default function MainLayout({ children }) {
    const { auth, cartCount = 0 } = usePage().props;
    const isAuthenticated = Boolean(auth?.user);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 768) {
                setMobileOpen(false);
            }
        };

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const footerColumns = [
        {
            title: 'Shop',
            links: [
                { label: 'All Watches', href: '/products' },
                { label: 'Featured', href: '/#featured' },
                ...(isAuthenticated ? [{ label: 'Cart', href: '/cart' }] : []),
            ],
        },
        {
            title: 'Account',
            links: isAuthenticated
                ? [
                    { label: 'My Orders', href: '/orders' },
                    ...(auth.user.is_admin ? [{ label: 'Admin Dashboard', href: '/admin/dashboard' }] : []),
                ]
                : [
                    { label: 'Login', href: '/login' },
                    { label: 'Register', href: '/register' },
                ],
        },
        {
            title: 'Explore',
            links: [
                { label: 'Home', href: '/' },
                { label: 'Shop', href: '/products' },
            ],
        },
    ];

    const mobileLinks = [
        { label: 'Home', href: '/' },
        { label: 'Shop', href: '/products' },
        ...(isAuthenticated ? [{ label: 'Cart', href: '/cart' }] : []),
        ...(isAuthenticated ? [{ label: 'My Orders', href: '/orders' }] : []),
        ...(auth?.user?.is_admin ? [{ label: 'Admin', href: '/admin/dashboard' }] : []),
    ];

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
            <div style={{ backgroundColor: 'var(--color-accent)', padding: '0.45rem 1.5rem', textAlign: 'center', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', color: 'white', textTransform: 'uppercase' }}>
                Free insured shipping on orders over $10,000 - Authentic timepieces guaranteed
            </div>

            <nav
                style={{
                    backgroundColor: scrolled ? 'rgba(10,10,10,0.97)' : 'var(--color-bg)',
                    borderBottom: '1px solid var(--color-border)',
                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
                    backdropFilter: 'blur(12px)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                }}
            >
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                        <Crown size={18} style={{ color: 'var(--color-accent)' }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.2em', color: 'white', textTransform: 'uppercase' }}>
                            ITIMEPIECE
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="nav-link">Home</Link>
                        <Link href="/products" className="nav-link">Shop</Link>
                    </div>

                    <div className="hidden md:flex items-center gap-5">
                        <Link href="/products" style={{ color: 'var(--color-muted)', transition: 'color 0.2s' }} className="hover:text-white">
                            <Search size={17} />
                        </Link>
                        {isAuthenticated && (
                            <Link href="/cart" style={{ position: 'relative', color: 'var(--color-muted)', transition: 'color 0.2s' }} className="hover:text-white">
                                <ShoppingCart size={17} />
                                {cartCount > 0 && (
                                    <span style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: 'var(--color-accent)', color: 'white', fontSize: '0.55rem', fontWeight: 700, width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {cartCount > 9 ? '9+' : cartCount}
                                    </span>
                                )}
                            </Link>
                        )}
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                {auth.user.is_admin && <Link href="/admin/dashboard" className="nav-link">Admin</Link>}
                                <Link href="/orders" className="nav-link">Orders</Link>
                                <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 600, maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {auth.user.name}
                                </span>
                                <Link href="/logout" method="post" as="button" className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <User size={14} /> Logout
                                </Link>
                            </div>
                        ) : (
                            <Link href="/login" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <User size={14} /> Login
                            </Link>
                        )}
                    </div>

                    <div className="md:hidden flex items-center gap-4">
                        {isAuthenticated && (
                            <Link href="/cart" style={{ position: 'relative', color: 'var(--color-muted)' }}>
                                <ShoppingCart size={19} />
                                {cartCount > 0 && (
                                    <span style={{ position: 'absolute', top: '-6px', right: '-6px', backgroundColor: 'var(--color-accent)', color: 'white', fontSize: '0.55rem', fontWeight: 700, width: '14px', height: '14px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {cartCount > 9 ? '9+' : cartCount}
                                    </span>
                                )}
                            </Link>
                        )}
                        <button onClick={() => setMobileOpen((current) => !current)} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }} aria-label="Toggle menu">
                            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                <div style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', maxHeight: mobileOpen ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)' }}>
                    <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0' }}>
                        {mobileLinks.map((item) => (
                            <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '0.875rem 0', borderBottom: '1px solid var(--color-border)', color: 'var(--color-muted)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
                                {item.label}
                            </Link>
                        ))}
                        <div style={{ paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {auth?.user ? (
                                <>
                                    <p style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>
                                        {auth.user.name}
                                    </p>
                                    <Link href="/logout" method="post" as="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }} className="nav-link">
                                        Logout
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" onClick={() => setMobileOpen(false)} className="btn-primary" style={{ display: 'block', textAlign: 'center', fontSize: '0.75rem', textDecoration: 'none' }}>
                                        Sign In
                                    </Link>
                                    <Link href="/register" onClick={() => setMobileOpen(false)} className="btn-outline" style={{ display: 'block', textAlign: 'center', fontSize: '0.75rem', textDecoration: 'none' }}>
                                        Create Account
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-1 page-transition">{children}</main>

            <footer style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem 2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                <Crown size={16} style={{ color: 'var(--color-accent)' }} />
                                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.2em', color: 'white', textTransform: 'uppercase' }}>ITIMEPIECE</span>
                            </div>
                            <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem', lineHeight: 1.8 }}>
                                Your trusted destination for authentic luxury timepieces from the world's most prestigious watchmakers.
                            </p>
                        </div>

                        {footerColumns.map((column) => (
                            <div key={column.title}>
                                <h4 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', color: 'white', textTransform: 'uppercase', marginBottom: '1.25rem' }}>{column.title}</h4>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', listStyle: 'none', padding: 0, margin: 0 }}>
                                    {column.links.map((link) => (
                                        <li key={link.label}>
                                            <Link href={link.href} style={{ color: 'var(--color-muted)', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = 'var(--color-muted)'}>
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '2rem', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>Stay in the know</p>
                            <p style={{ color: 'var(--color-muted)', fontSize: '0.75rem' }}>Exclusive releases and curated collections, delivered to your inbox.</p>
                        </div>
                        <div style={{ display: 'flex', minWidth: '260px', flex: 1, maxWidth: '400px' }}>
                            <input type="email" placeholder="your@email.com" className="input-dark" style={{ flex: 1, borderRight: 'none', fontSize: '0.8rem' }} />
                            <button className="btn-primary" style={{ whiteSpace: 'nowrap', fontSize: '0.7rem', padding: '0 1.25rem' }}>Subscribe</button>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ color: 'var(--color-muted)', fontSize: '0.72rem' }}>© 2026 ITIMEPIECE. All rights reserved.</p>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <Link href="/" style={{ color: 'var(--color-muted)', fontSize: '0.72rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = 'var(--color-muted)'}>
                                Home
                            </Link>
                            <Link href="/products" style={{ color: 'var(--color-muted)', fontSize: '0.72rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = 'var(--color-muted)'}>
                                Shop
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
