import { useForm, Link } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';

export default function Login({ errors: serverErrors = {} }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    const allErrors = { ...serverErrors, ...errors };

    return (
        <AuthLayout title="Welcome Back" subtitle="Sign In">
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                    <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em',
                                    color: 'var(--color-muted)', textTransform: 'uppercase', display: 'block',
                                    marginBottom: '0.5rem' }}>
                        Email Address
                    </label>
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        className="input-dark"
                        autoComplete="email"
                        required
                    />
                    {allErrors.email && (
                        <p style={{ color: 'var(--color-accent)', fontSize: '0.7rem', marginTop: '0.25rem' }}>
                            {allErrors.email}
                        </p>
                    )}
                </div>

                <div>
                    <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em',
                                    color: 'var(--color-muted)', textTransform: 'uppercase', display: 'block',
                                    marginBottom: '0.5rem' }}>
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        className="input-dark"
                        autoComplete="current-password"
                        required
                    />
                    {allErrors.password && (
                        <p style={{ color: 'var(--color-accent)', fontSize: '0.7rem', marginTop: '0.25rem' }}>
                            {allErrors.password}
                        </p>
                    )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="checkbox" checked={data.remember} onChange={e => setData('remember', e.target.checked)}
                               style={{ accentColor: 'var(--color-accent)', width: 14, height: 14 }} />
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Remember me</span>
                    </label>
                </div>

                {allErrors.invalid && (
                    <div style={{ padding: '0.75rem', backgroundColor: 'rgba(220,38,38,0.1)',
                                  border: '1px solid rgba(220,38,38,0.3)', fontSize: '0.8rem', color: '#fca5a5' }}>
                        {allErrors.invalid}
                    </div>
                )}

                <button type="submit" disabled={processing} className="btn-primary"
                        style={{ opacity: processing ? 0.7 : 1, cursor: processing ? 'not-allowed' : 'pointer' }}>
                    {processing ? 'Signing In...' : 'Sign In'}
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                    Don't have an account?{' '}
                    <Link href="/register" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
                        Create one
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}