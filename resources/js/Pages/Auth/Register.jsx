import { useForm, Link } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <AuthLayout title="Create Account" subtitle="Join ITIMEPIECE">
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                    { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Juan Dela Cruz' },
                    { key: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                    { key: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
                    { key: 'password_confirmation', label: 'Confirm Password', type: 'password', placeholder: '••••••••' },
                ].map(f => (
                    <div key={f.key}>
                        <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em',
                                        color: 'var(--color-muted)', textTransform: 'uppercase', display: 'block',
                                        marginBottom: '0.5rem' }}>
                            {f.label}
                        </label>
                        <input
                            type={f.type}
                            placeholder={f.placeholder}
                            value={data[f.key]}
                            onChange={e => setData(f.key, e.target.value)}
                            className="input-dark"
                            required
                        />
                        {errors[f.key] && (
                            <p style={{ color: 'var(--color-accent)', fontSize: '0.7rem', marginTop: '0.25rem' }}>
                                {errors[f.key]}
                            </p>
                        )}
                    </div>
                ))}

                <button type="submit" disabled={processing} className="btn-primary"
                        style={{ opacity: processing ? 0.7 : 1, cursor: processing ? 'not-allowed' : 'pointer' }}>
                    {processing ? 'Creating Account...' : 'Create Account'}
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                    Already have an account?{' '}
                    <Link href="/login" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
                        Sign in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}