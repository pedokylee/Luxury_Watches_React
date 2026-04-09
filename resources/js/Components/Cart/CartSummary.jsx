import { Link } from '@inertiajs/react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

const formatPrice = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v || 0);

export default function CartSummary({ items = [], isLoggedIn = false, shippingFee = 250 }) {
    const subtotal = items.reduce((acc, i) => acc + (i.product?.price || 0) * i.quantity, 0);
    const total = subtotal + (subtotal > 0 ? shippingFee : 0);

    return (
        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em',
                         color: 'white', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                Order Summary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '1.5rem' }}>
                <Row label="Subtotal" value={formatPrice(subtotal)} />
                <Row label="Shipping" value={subtotal > 0 ? formatPrice(shippingFee) : 'Free'} />
                <div style={{ height: '1px', backgroundColor: 'var(--color-border)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>Total</span>
                    <span style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '1.2rem' }}>
                        {formatPrice(total)}
                    </span>
                </div>
            </div>

            {isLoggedIn ? (
                <Link href="/checkout" className="btn-primary"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    Proceed to Checkout <ArrowRight size={14} />
                </Link>
            ) : (
                <Link href="/login" className="btn-primary"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    Login to Checkout <ArrowRight size={14} />
                </Link>
            )}

            <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          gap: '0.4rem', color: 'var(--color-muted)', fontSize: '0.72rem' }}>
                <ShieldCheck size={13} />
                <span>Secure, insured delivery</span>
            </div>

            <Link href="/products"
                  style={{ display: 'block', textAlign: 'center', marginTop: '0.875rem',
                           fontSize: '0.75rem', color: 'var(--color-muted)', letterSpacing: '0.08em',
                           transition: 'color 0.2s' }}
                  className="hover:text-white">
                ← Continue Shopping
            </Link>
        </div>
    );
}

function Row({ label, value }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>{label}</span>
            <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500 }}>{value}</span>
        </div>
    );
}