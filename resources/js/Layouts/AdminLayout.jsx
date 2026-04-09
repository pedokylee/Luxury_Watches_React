import { Link, usePage } from '@inertiajs/react';
import { Crown, LayoutDashboard, Package, ShoppingBag, Users, LogOut, Menu, X, Bell, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
];

export default function AdminLayout({ children, title }) {
    const { auth, url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    return (
        <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-bg)' }}>
            {/* Sidebar */}
            <aside style={{
                width: sidebarOpen ? '240px' : '64px',
                backgroundColor: 'var(--color-surface)',
                borderRight: '1px solid var(--color-border)',
                transition: 'width 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                zIndex: 40,
                overflow: 'hidden'
            }}>
                {/* Sidebar Header */}
                <div style={{ padding: '1.25rem 1rem', borderBottom: '1px solid var(--color-border)',
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '64px' }}>
                    {sidebarOpen && (
                        <Link href="/" className="flex items-center gap-2">
                            <Crown size={16} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700,
                                          letterSpacing: '0.12em', color: 'white', whiteSpace: 'nowrap' }}>
                                ITIMEPIECE
                            </span>
                        </Link>
                    )}
                    <button onClick={() => setSidebarOpen(!sidebarOpen)}
                            style={{ color: 'var(--color-muted)', padding: '4px', flexShrink: 0 }}
                            className="hover:text-white transition-colors ml-auto">
                        {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
                    </button>
                </div>

                {/* Admin badge */}
                {sidebarOpen && (
                    <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                        <div style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)',
                                      padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-accent)' }} />
                            <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em',
                                          color: 'var(--color-accent)', textTransform: 'uppercase' }}>
                                Admin Panel
                            </span>
                        </div>
                    </div>
                )}

                {/* Nav Items */}
                <nav style={{ flex: 1, padding: '1rem 0', overflowY: 'auto' }}>
                    {sidebarOpen && (
                        <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--color-muted)',
                                    textTransform: 'uppercase', padding: '0 1rem', marginBottom: '0.5rem' }}>
                            Management
                        </p>
                    )}
                    {navItems.map(({ label, href, icon: Icon }) => {
                        const isActive = currentPath === href || currentPath.startsWith(href + '/');
                        return (
                            <Link key={href} href={href}
                                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                                  style={{ justifyContent: sidebarOpen ? 'flex-start' : 'center' }}>
                                <Icon size={17} style={{ flexShrink: 0 }} />
                                {sidebarOpen && <span>{label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div style={{ borderTop: '1px solid var(--color-border)', padding: '1rem' }}>
                    <Link href="/logout" method="post" as="button"
                          className="sidebar-link w-full"
                          style={{ justifyContent: sidebarOpen ? 'flex-start' : 'center' }}>
                        <LogOut size={16} style={{ flexShrink: 0 }} />
                        {sidebarOpen && <span>Logout</span>}
                    </Link>
                </div>
            </aside>

            {/* Main Area */}
            <div style={{ flex: 1, marginLeft: sidebarOpen ? '240px' : '64px', transition: 'margin-left 0.3s ease',
                          display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                {/* Top Bar */}
                <header style={{ backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)',
                                 padding: '0 1.5rem', height: '64px', display: 'flex', alignItems: 'center',
                                 justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 30 }}>
                    <div>
                        <h1 style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 600,
                                     color: 'white', letterSpacing: '0.03em' }}>
                            {title || 'Dashboard'}
                        </h1>
                        <p style={{ fontSize: '0.7rem', color: 'var(--color-muted)', marginTop: '1px' }}>
                            Admin Panel
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button style={{ color: 'var(--color-muted)', position: 'relative' }}
                                className="hover:text-white transition-colors">
                            <Bell size={18} />
                        </button>
                        <div className="flex items-center gap-2" style={{ cursor: 'pointer' }}>
                            <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'var(--color-accent)',
                                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                                          fontSize: '0.8rem', fontWeight: 700, color: 'white' }}>
                                {auth?.user?.name?.[0]?.toUpperCase() || 'A'}
                            </div>
                            {sidebarOpen && (
                                <span style={{ fontSize: '0.8rem', color: 'white' }}>{auth?.user?.name || 'Admin'}</span>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main style={{ flex: 1, padding: '2rem 1.5rem' }} className="page-transition">
                    {children}
                </main>
            </div>
        </div>
    );
}