import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { CreditCard, Banknote, Check } from 'lucide-react';

const formatPrice = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

export default function Index({ cart = null }) {
    const items = cart?.items || [];
    const subtotal = items.reduce((acc, i) => acc + (i.product?.price || 0) * i.quantity, 0);
    const shipping = 250;
    const total = subtotal + shipping;

    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        phone: '',
        address: '',
        city: '',
        province: '',
        postal_code: '',
        notes: '',
        payment_method: 'cod',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/checkout');
    };

    const fields = [
        { key: 'full_name', label: 'Full Name', placeholder: 'Enter full name', col: 1 },
        { key: 'phone', label: 'Phone Number', placeholder: '+63 9XX XXX XXXX', col: 1 },
        { key: 'address', label: 'Address', placeholder: 'Street, Barangay', col: 2 },
        { key: 'city', label: 'City / Municipality', placeholder: 'City', col: 1 },
        { key: 'province', label: 'Province', placeholder: 'Province', col: 1 },
        { key: 'postal_code', label: 'Postal Code', placeholder: '0000', col: 1 },
    ];

    return (
        <MainLayout>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <p className="section-label" style={{ marginBottom: '0.5rem' }}>Secure Checkout</p>
                    <h1 style={{ fontFamily: 'var(--font-body)', fontSize: '2rem', fontWeight: 800,
                                 color: 'white', textTransform: 'uppercase' }}>Checkout</h1>
                </div>

                <form onSubmit={submit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem', alignItems: 'start' }}>
                        {/* Left: Shipping + Payment */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Shipping */}
                            <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem',
                                          border: '1px solid var(--color-border)' }}>
                                <h2 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em',
                                             color: 'white', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                                    Shipping Information
                                </h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    {fields.map(f => (
                                        <div key={f.key} style={{ gridColumn: f.col === 2 ? 'span 2' : 'span 1' }}>
                                            <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em',
                                                            color: 'var(--color-muted)', textTransform: 'uppercase',
                                                            display: 'block', marginBottom: '0.4rem' }}>
                                                {f.label}
                                            </label>
                                            <input
                                                type="text"
                                                placeholder={f.placeholder}
                                                value={data[f.key]}
                                                onChange={e => setData(f.key, e.target.value)}
                                                className={`input-dark ${errors[f.key] ? 'input-error' : ''}`}
                                            />
                                            {errors[f.key] && (
                                                <p className="error-message">
                                                    {errors[f.key]}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em',
                                                        color: 'var(--color-muted)', textTransform: 'uppercase',
                                                        display: 'block', marginBottom: '0.4rem' }}>
                                            Order Notes (Optional)
                                        </label>
                                        <textarea
                                            placeholder="Special instructions..."
                                            value={data.notes}
                                            onChange={e => setData('notes', e.target.value)}
                                            rows={3}
                                            className="input-dark"
                                            style={{ resize: 'vertical' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment */}
                            <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem',
                                          border: '1px solid var(--color-border)' }}>
                                <h2 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em',
                                             color: 'white', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                                    Payment Method
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {[
                                        { val: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order arrives', icon: Banknote },
                                        { val: 'bank_transfer', label: 'Bank Transfer', desc: 'Transfer to our bank account', icon: CreditCard },
                                    ].map(({ val, label, desc, icon: Icon }) => (
                                        <label key={val}
                                               style={{ display: 'flex', alignItems: 'center', gap: '1rem',
                                                        padding: '1rem', cursor: 'pointer',
                                                        border: `1px solid ${data.payment_method === val ? 'var(--color-accent)' : 'var(--color-border)'}`,
                                                        backgroundColor: data.payment_method === val ? 'rgba(220,38,38,0.05)' : 'transparent',
                                                        transition: 'all 0.2s' }}>
                                            <input type="radio" name="payment_method" value={val}
                                                   checked={data.payment_method === val}
                                                   onChange={() => setData('payment_method', val)}
                                                   style={{ display: 'none' }} />
                                            <div style={{ width: 18, height: 18, border: `2px solid ${data.payment_method === val ? 'var(--color-accent)' : 'var(--color-border)'}`,
                                                          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                          flexShrink: 0, transition: 'border-color 0.2s' }}>
                                                {data.payment_method === val && (
                                                    <div style={{ width: 8, height: 8, borderRadius: '50%',
                                                                  backgroundColor: 'var(--color-accent)' }} />
                                                )}
                                            </div>
                                            <Icon size={20} style={{ color: data.payment_method === val ? 'var(--color-accent)' : 'var(--color-muted)' }} />
                                            <div>
                                                <p style={{ color: 'white', fontWeight: 600, fontSize: '0.875rem' }}>{label}</p>
                                                <p style={{ color: 'var(--color-muted)', fontSize: '0.75rem' }}>{desc}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.03)',
                                              border: '1px solid var(--color-border)', fontSize: '0.75rem',
                                              color: 'var(--color-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ color: 'var(--color-accent)' }}>*</span>
                                    Payment simulation only — no real transaction will be processed.
                                </div>
                            </div>
                        </div>

                        {/* Right: Order Summary */}
                        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)',
                                      padding: '1.5rem', position: 'sticky', top: '80px' }}>
                            <h3 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em',
                                         color: 'white', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                                Order Summary
                            </h3>

                            {/* Items */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                                {items.length > 0 ? items.map(item => (
                                    <div key={item.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                        <div style={{ width: 48, height: 48, backgroundColor: '#0d0d0d', flexShrink: 0 }}>
                                            <img src={item.product?.image_url || 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=100'}
                                                 alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: '0.8rem', color: 'white', fontWeight: 500 }}>{item.product?.name}</p>
                                            <p style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>Qty: {item.quantity}</p>
                                        </div>
                                        <p style={{ fontSize: '0.875rem', color: 'white', fontWeight: 600 }}>
                                            {formatPrice((item.product?.price || 0) * item.quantity)}
                                        </p>
                                    </div>
                                )) : (
                                    <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem', textAlign: 'center' }}>No items</p>
                                )}
                            </div>

                            <div style={{ height: '1px', backgroundColor: 'var(--color-border)', marginBottom: '1rem' }} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>Subtotal</span>
                                    <span style={{ color: 'white', fontSize: '0.8rem' }}>{formatPrice(subtotal)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>Shipping</span>
                                    <span style={{ color: 'white', fontSize: '0.8rem' }}>{formatPrice(shipping)}</span>
                                </div>
                                <div style={{ height: '1px', backgroundColor: 'var(--color-border)' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'white', fontWeight: 700 }}>Total</span>
                                    <span style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '1.1rem' }}>
                                        {formatPrice(total)}
                                    </span>
                                </div>
                            </div>

                            <button type="submit" disabled={processing} className="btn-primary"
                                    style={{ width: '100%', display: 'flex', alignItems: 'center',
                                             justifyContent: 'center', gap: '0.5rem',
                                             opacity: processing ? 0.7 : 1, cursor: processing ? 'not-allowed' : 'pointer' }}>
                                <Check size={16} />
                                {processing ? 'Placing Order...' : 'Place Order'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}