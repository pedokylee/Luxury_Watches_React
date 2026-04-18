import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Search, Eye, Clock, CheckCircle, Truck, AlertTriangle } from 'lucide-react';

const formatPrice = (value) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(value || 0);

const STATUS_CONFIG = {
    pending: { bg: 'rgba(234,179,8,0.12)', border: 'rgba(234,179,8,0.3)', color: '#eab308', icon: Clock },
    paid: { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)', color: '#3b82f6', icon: CheckCircle },
    shipped: { bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.3)', color: '#a855f7', icon: Truck },
    completed: { bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.3)', color: '#22c55e', icon: CheckCircle },
    cancelled: { bg: 'rgba(220,38,38,0.12)', border: 'rgba(220,38,38,0.3)', color: '#ef4444', icon: AlertTriangle },
};

function StatusBadge({ status }) {
    const cfg = STATUS_CONFIG[status?.toLowerCase()] || STATUS_CONFIG.pending;
    const Icon = cfg.icon;

    return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.25rem 0.7rem', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', backgroundColor: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}>
            <Icon size={10} /> {status || 'Pending'}
        </span>
    );
}

const ALL_STATUSES = ['all', 'pending', 'paid', 'shipped', 'completed', 'cancelled'];

export default function Index({ orders = { data: [], links: [] }, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');

    const items = orders.data || [];

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/orders', { search, status: statusFilter === 'all' ? '' : statusFilter }, { preserveState: true, replace: true });
    };

    const changeStatus = (status) => {
        setStatusFilter(status);
        router.get('/admin/orders', { search, status: status === 'all' ? '' : status }, { preserveState: true, replace: true });
    };

    return (
        <AdminLayout title="Orders">
            <div style={{ marginBottom: '2rem' }}>
                <p className="section-label" style={{ marginBottom: '0.35rem' }}>Management</p>
                <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '1.6rem', fontWeight: 800, color: 'white' }}>
                    Order Management
                </h2>
            </div>

            <div style={{ display: 'flex', gap: '0', marginBottom: '1px', overflowX: 'auto' }}>
                {ALL_STATUSES.map((status) => (
                    <button
                        key={status}
                        onClick={() => changeStatus(status)}
                        style={{
                            padding: '0.625rem 1.125rem',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            border: 'none',
                            background: 'none',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.2s',
                            borderBottom: `2px solid ${statusFilter === status ? 'var(--color-accent)' : 'var(--color-border)'}`,
                            color: statusFilter === status ? 'var(--color-accent)' : 'var(--color-muted)',
                        }}
                    >
                        {status === 'all' ? 'All Orders' : status}
                    </button>
                ))}
            </div>

            <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderTop: 'none', padding: '1rem 1.25rem', marginBottom: '1px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <form onSubmit={handleSearch} style={{ flex: 1, position: 'relative', maxWidth: '320px' }}>
                    <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search by order or customer..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input-dark"
                        style={{ paddingLeft: '2.25rem', height: '38px', fontSize: '0.8rem' }}
                    />
                </form>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginLeft: 'auto' }}>
                    {items.length} orders
                </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderTop: 'none', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            {['Order #', 'Customer', 'Items', 'Total', 'Payment', 'Status', 'Date', 'Actions'].map((heading) => (
                                <th
                                    key={heading}
                                    style={{
                                        padding: '0.875rem 1.25rem',
                                        textAlign: 'left',
                                        whiteSpace: 'nowrap',
                                        fontSize: '0.6rem',
                                        fontWeight: 700,
                                        letterSpacing: '0.14em',
                                        color: 'var(--color-muted)',
                                        textTransform: 'uppercase',
                                        backgroundColor: 'var(--color-surface-2)',
                                        borderBottom: '1px solid var(--color-border)',
                                    }}
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((order) => (
                            <tr
                                key={order.id}
                                style={{ borderBottom: '1px solid var(--color-border)', transition: 'background-color 0.15s' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <td style={{ padding: '0.875rem 1.25rem' }}>
                                    <Link href={`/admin/orders/${order.id}`} style={{ color: 'var(--color-accent)', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'monospace' }}>
                                        {order.order_number}
                                    </Link>
                                </td>
                                <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.85rem', color: 'white' }}>
                                    {order.user?.name || '-'}
                                </td>
                                <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.8rem', color: 'var(--color-muted)', textAlign: 'center' }}>
                                    {order.items_count || '-'}
                                </td>
                                <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.875rem', color: 'white', fontWeight: 600, whiteSpace: 'nowrap' }}>
                                    {formatPrice(order.total)}
                                </td>
                                <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.75rem', color: 'var(--color-muted)', whiteSpace: 'nowrap' }}>
                                    {order.payment_method || '-'}
                                </td>
                                <td style={{ padding: '0.875rem 1.25rem' }}>
                                    <StatusBadge status={order.status} />
                                </td>
                                <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.75rem', color: 'var(--color-muted)', whiteSpace: 'nowrap' }}>
                                    {order.created_at?.split('T')[0] || order.created_at}
                                </td>
                                <td style={{ padding: '0.875rem 1.25rem' }}>
                                    <Link href={`/admin/orders/${order.id}`} style={{ width: 32, height: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border)', color: 'var(--color-muted)', transition: 'all 0.2s' }} className="hover:border-white hover:text-white">
                                        <Eye size={14} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {items.length === 0 && (
                    <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-muted)', fontSize: '0.875rem' }}>
                        No orders found.
                    </div>
                )}
            </div>

            {orders.links && orders.links.length > 3 && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
                    {orders.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || '#'}
                            style={{
                                padding: '0.4rem 0.75rem',
                                fontSize: '0.75rem',
                                border: '1px solid',
                                fontWeight: 500,
                                borderColor: link.active ? 'var(--color-accent)' : 'var(--color-border)',
                                color: link.active ? 'var(--color-accent)' : 'var(--color-muted)',
                                backgroundColor: link.active ? 'rgba(220,38,38,0.05)' : 'transparent',
                                pointerEvents: !link.url ? 'none' : 'auto',
                                opacity: !link.url ? 0.4 : 1,
                            }}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
