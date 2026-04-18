import { useForm, Link } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function Login({ errors: serverErrors = {} }) {
    const { data, setData, post, processing, errors } = useForm({ email: '', password: '', remember: false });
    const [showPass, setShowPass] = useState(false);
    const allErrors = { ...serverErrors, ...errors };

    const submit = (e) => { e.preventDefault(); post('/login'); };

    const labelStyle = { fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--color-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' };

    return (
        <AuthLayout title="Welcome Back" subtitle="Sign In">
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                <div>
                    <label style={labelStyle}>Email Address</label>
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        className={`input-dark ${allErrors.email ? 'input-error' : ''}`}
                        autoComplete="email"
                        required
                    />
                    {allErrors.email && <p className="error-message">{allErrors.email}</p>}
                </div>

                <div>
                    <label style={labelStyle}>Password</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPass ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            className={`input-dark ${allErrors.password ? 'input-error' : ''}`}
                            autoComplete="current-password"
                            style={{ paddingRight: '3rem' }}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPass(s => !s)}
                            style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', display: 'flex', alignItems: 'center' }}>
                            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                    </div>
                    {allErrors.password && <p className="error-message">{allErrors.password}</p>}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="checkbox" checked={data.remember} onChange={e => setData('remember', e.target.checked)}
                               style={{ accentColor: 'var(--color-accent)', width: 14, height: 14 }} />
                        <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>Remember me</span>
                    </label>
                    <Link href="#" style={{ fontSize: '0.75rem', color: 'var(--color-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                          onMouseEnter={e => e.target.style.color = 'white'}
                          onMouseLeave={e => e.target.style.color = 'var(--color-muted)'}>
                        Forgot password?
                    </Link>
                </div>

                {allErrors.invalid && (
                    <div style={{ padding: '0.875rem 1rem', backgroundColor: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.3)', fontSize: '0.8rem', color: '#fca5a5', lineHeight: 1.6 }}>
                        {allErrors.invalid}
                    </div>
                )}

                <button type="submit" disabled={processing} className="btn-primary"
                        style={{ opacity: processing ? 0.65 : 1, cursor: processing ? 'not-allowed' : 'pointer', marginTop: '0.25rem' }}>
                    {processing ? 'Signing In...' : 'Sign In'}
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
                    Don't have an account?{' '}
                    <Link href="/register" style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }}>Create one</Link>
                </p>
            </form>
        </AuthLayout>
    );
}