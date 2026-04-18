import { useForm, Link } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import { Eye, EyeOff, Check } from 'lucide-react';
import { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({ name: '', email: '', password: '', password_confirmation: '' });
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const submit = (e) => { e.preventDefault(); post('/register'); };

    const labelStyle = { fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--color-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' };

    const passwordStrength = (pw) => {
        if (!pw) return 0;
        let score = 0;
        if (pw.length >= 8) score++;
        if (/[A-Z]/.test(pw)) score++;
        if (/[0-9]/.test(pw)) score++;
        if (/[^A-Za-z0-9]/.test(pw)) score++;
        return score;
    };

    const strength = passwordStrength(data.password);
    const strengthColors = ['#ef4444', '#f97316', '#eab308', '#22c55e'];
    const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];

    return (
        <AuthLayout title="Create Account" subtitle="Join ITIMEPIECE">
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

                {/* Name */}
                <div>
                    <label style={labelStyle}>Full Name</label>
                    <input type="text" placeholder="Juan Dela Cruz" value={data.name} onChange={e => setData('name', e.target.value)}
                           className={`input-dark ${errors.name ? 'input-error' : ''}`} autoComplete="name" required />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                    <label style={labelStyle}>Email Address</label>
                    <input type="email" placeholder="your@email.com" value={data.email} onChange={e => setData('email', e.target.value)}
                           className={`input-dark ${errors.email ? 'input-error' : ''}`} autoComplete="email" required />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                    <label style={labelStyle}>Password</label>
                    <div style={{ position: 'relative' }}>
                        <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={data.password}
                               onChange={e => setData('password', e.target.value)}
                               className={`input-dark ${errors.password ? 'input-error' : ''}`}
                               autoComplete="new-password" style={{ paddingRight: '3rem' }} required />
                        <button type="button" onClick={() => setShowPass(s => !s)}
                                style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', display: 'flex', alignItems: 'center' }}>
                            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                    </div>
                    {data.password && (
                        <div style={{ marginTop: '0.5rem' }}>
                            <div style={{ display: 'flex', gap: '3px', marginBottom: '0.35rem' }}>
                                {[0, 1, 2, 3].map(i => (
                                    <div key={i} style={{ flex: 1, height: 3, backgroundColor: i < strength ? strengthColors[strength - 1] : 'var(--color-border)', transition: 'background-color 0.3s' }} />
                                ))}
                            </div>
                            <p style={{ fontSize: '0.68rem', color: strength > 0 ? strengthColors[strength - 1] : 'var(--color-muted)' }}>
                                {strength > 0 ? strengthLabels[strength - 1] : ''}
                            </p>
                        </div>
                    )}
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                    <label style={labelStyle}>Confirm Password</label>
                    <div style={{ position: 'relative' }}>
                        <input type={showConfirm ? 'text' : 'password'} placeholder="••••••••" value={data.password_confirmation}
                               onChange={e => setData('password_confirmation', e.target.value)}
                               className="input-dark" autoComplete="new-password"
                               style={{ paddingRight: '3rem' }} required />
                        <button type="button" onClick={() => setShowConfirm(s => !s)}
                                style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', display: 'flex', alignItems: 'center' }}>
                            {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                        {data.password_confirmation && data.password === data.password_confirmation && (
                            <Check size={14} style={{ position: 'absolute', right: '2.5rem', top: '50%', transform: 'translateY(-50%)', color: '#22c55e' }} />
                        )}
                    </div>
                    {errors.password_confirmation && <p className="error-message">{errors.password_confirmation}</p>}
                </div>

                <p style={{ fontSize: '0.72rem', color: 'var(--color-muted)', lineHeight: 1.6, marginTop: '0.25rem' }}>
                    By creating an account you agree to our{' '}
                    <Link href="#" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="#" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Privacy Policy</Link>.
                </p>

                <button type="submit" disabled={processing} className="btn-primary"
                        style={{ opacity: processing ? 0.65 : 1, cursor: processing ? 'not-allowed' : 'pointer' }}>
                    {processing ? 'Creating Account...' : 'Create Account'}
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                    Already have an account?{' '}
                    <Link href="/login" style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
                </p>
            </form>
        </AuthLayout>
    );
}