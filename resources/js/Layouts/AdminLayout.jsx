import { Link, usePage } from '@inertiajs/react';
import { Crown, LayoutDashboard, Package, ShoppingBag, LogOut, Bell } from 'lucide-react';

const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
];

export default function AdminLayout({ children, title }) {
    const { auth, url } = usePage();
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    return (
        <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-bg)' }}>
            {/* Sidebar - Fixed 220px */}
            <aside style={{
                width: '220px',
                backgroundColor: 'var(--color-surface)',
                borderRight: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
                overflow: 'hidden',
                height: '100vh',
                position: 'sticky',
                top: 0,
            }}>
                {/* Sidebar Logo */}
                <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '0.5rem', height: '56px' }}>
                    <Crown size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', color: 'white', textTransform: 'uppercase' }}>
                        ITIMEPIECE
                    </span>
                </div>

                {/* Admin Badge */}
                <div style={{ padding: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
                    <div style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-accent)' }} />
                        <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--color-accent)', textTransform: 'uppercase' }}>
                            Admin Panel
                        </span>
                    </div>
                </div>

                {/* Nav Items */}
                <nav style={{ flex: 1, padding: '0.5rem 0', overflowY: 'auto' }}>
                    <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--color-muted)', textTransform: 'uppercase', padding: '0 1rem', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                        Management
                    </p>
                    {navItems.map(({ label, href, icon: Icon }) => {
                        const isActive = currentPath === href || currentPath.startsWith(href + '/');
                        return (
                            <Link key={href} href={href} style={{
                                display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 1rem',
                                fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.05em', color: isActive ? 'var(--color-accent)' : 'var(--color-muted)',
                                backgroundColor: isActive ? 'rgba(220,38,38,0.06)' : 'transparent', borderLeft: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
                                transition: 'all 0.15s', textDecoration: 'none'
                            }}>
                                <Icon size={15} style={{ flexShrink: 0 }} />
                                <span>{label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div style={{ borderTop: '1px solid var(--color-border)', padding: '0.75rem' }}>
                    <Link href="/logout" method="post" as="button" style={{
                        display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem', width: '100%',
                        fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-muted)', backgroundColor: 'transparent',
                        border: 'none', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.15s'
                    }} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted)'}>
                        <LogOut size={15} style={{ flexShrink: 0 }} />
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>

            {/* Main Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                {/* Top Bar */}
                <header style={{ backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)',
                                 padding: '0 1.25rem', height: '56px', display: 'flex', alignItems: 'center',
                                 justifyContent: 'space-between', flexShrink: 0 }}>
                    <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white', letterSpacing: '0.03em' }}>
                            {title || 'Dashboard'}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-muted)', marginTop: '1px' }}>
                            Admin Panel
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button style={{ color: 'var(--color-muted)', position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}
                                className="hover:text-white transition-colors">
                            <Bell size={16} />
                        </button>
                        <div className="flex items-center gap-3" style={{ cursor: 'pointer' }}>
                            <div style={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: 'var(--color-accent)',
                                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                                          fontSize: '0.75rem', fontWeight: 700, color: 'white' }}>
                                {auth?.user?.name?.[0]?.toUpperCase() || 'A'}
                            </div>
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