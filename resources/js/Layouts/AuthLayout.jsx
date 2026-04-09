import { Link } from '@inertiajs/react';
import { Crown } from 'lucide-react';

export default function AuthLayout({ children, title, subtitle }) {
    return (
        <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-bg)' }}>
            {/* Left Panel - Decorative */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
                 style={{ backgroundColor: '#0d0d0d' }}>
                <div className="absolute inset-0"
                     style={{
                         backgroundImage: `url('https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800')`,
                         backgroundSize: 'cover',
                         backgroundPosition: 'center',
                         opacity: 0.3
                     }} />
                <div className="absolute inset-0"
                     style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.4) 100%)' }} />
                <div className="relative z-10 flex flex-col justify-between p-12">
                    <Link href="/" className="flex items-center gap-2">
                        <Crown size={20} style={{ color: 'var(--color-accent)' }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em' }}
                              className="text-white uppercase">ITIMEPIECE</span>
                    </Link>
                    <div>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 300, lineHeight: 1.2, color: 'white' }}>
                            Timeless<br /><em>Elegance</em>
                        </p>
                        <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginTop: '1rem', lineHeight: 1.7 }}>
                            Discover the world's most prestigious luxury timepieces.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex items-center justify-center px-6">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-2 mb-8">
                        <Crown size={18} style={{ color: 'var(--color-accent)' }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em' }}
                              className="text-white uppercase">ITIMEPIECE</span>
                    </div>

                    <div className="mb-8">
                        <p className="section-label mb-2">{subtitle}</p>
                        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 400, color: 'white' }}>
                            {title}
                        </h1>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}