import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { ShoppingCart, User, Menu, X, Crown } from 'lucide-react';

export default function MainLayout({ children }) {
    const { auth, cartCount = 0 } = usePage().props;
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
            {/* Navbar */}
            <nav style={{ backgroundColor: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}
                 className="fixed top-0 left-0 right-0 z-50">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Crown size={18} style={{ color: 'var(--color-accent)' }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em' }}
                              className="text-white uppercase tracking-widest">
                            ITIMEPIECE
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="nav-link">Home</Link>
                        <Link href="/products" className="nav-link">Shop</Link>
                    </div>

                    {/* Right Side */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/cart" className="relative nav-link flex items-center gap-1">
                            <ShoppingCart size={18} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs w-4 h-4 rounded-full flex items-center justify-center"
                                      style={{ backgroundColor: 'var(--color-accent)', fontSize: '0.6rem' }}>
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        {auth?.user ? (
                            <div className="flex items-center gap-4">
                                {auth.user.is_admin && (
                                    <Link href="/admin/dashboard" className="nav-link">Admin</Link>
                                )}
                                <Link href="/logout" method="post" as="button" className="nav-link flex items-center gap-1">
                                    <User size={15} /> Logout
                                </Link>
                            </div>
                        ) : (
                            <Link href="/login" className="nav-link flex items-center gap-1">
                                <User size={15} /> Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white">
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}
                         className="md:hidden px-6 py-4 flex flex-col gap-4">
                        <Link href="/" className="nav-link" onClick={() => setMobileOpen(false)}>Home</Link>
                        <Link href="/products" className="nav-link" onClick={() => setMobileOpen(false)}>Shop</Link>
                        <Link href="/cart" className="nav-link" onClick={() => setMobileOpen(false)}>Cart ({cartCount})</Link>
                        {auth?.user ? (
                            <>
                                {auth.user.is_admin && (
                                    <Link href="/admin/dashboard" className="nav-link" onClick={() => setMobileOpen(false)}>Admin</Link>
                                )}
                                <Link href="/logout" method="post" as="button" className="nav-link text-left">Logout</Link>
                            </>
                        ) : (
                            <Link href="/login" className="nav-link" onClick={() => setMobileOpen(false)}>Login</Link>
                        )}
                    </div>
                )}
            </nav>

            {/* Page Content */}
            <main className="flex-1 pt-16 page-transition">
                {children}
            </main>

            {/* Footer */}
            <footer style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}
                    className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <Crown size={16} style={{ color: 'var(--color-accent)' }} />
                                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em' }}
                                      className="text-white uppercase">
                                    LUXURY WATCHES
                                </span>
                            </div>
                            <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem', lineHeight: 1.7 }}>
                                Your trusted destination for authentic luxury timepieces. We bring you the finest watches from the world's most prestigious brands.
                            </p>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--color-muted)' }}
                                className="uppercase mb-4">Quick Links</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {['Home', 'Shop', 'About Us', 'Contact'].map(l => (
                                    <li key={l}>
                                        <Link href="#" style={{ color: 'var(--color-muted)', fontSize: '0.8rem', transition: 'color 0.2s' }}
                                              className="hover:text-white">{l}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--color-muted)' }}
                                className="uppercase mb-4">Brands</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {['Rolex', 'Omega', 'Patek Philippe', 'Audemars Piguet'].map(b => (
                                    <li key={b}>
                                        <Link href="#" style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}
                                              className="hover:text-white">{b}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--color-muted)' }}
                                className="uppercase mb-4">Support</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {['FAQ', 'Shipping', 'Returns', 'Warranty'].map(s => (
                                    <li key={s}>
                                        <Link href="#" style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}
                                              className="hover:text-white">{s}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '3rem', paddingTop: '1.5rem',
                                  display: 'flex', justifyContent: 'center' }}>
                        <p style={{ color: 'var(--color-muted)', fontSize: '0.75rem' }}>
                            © 2026 Luxury Watches. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}