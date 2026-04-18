import AdminLayout from '@/Layouts/AdminLayout';
import StatsCard from '@/Components/Admin/StatsCard';
import { DollarSign, ShoppingBag, Users, AlertTriangle, Clock, CheckCircle, Truck } from 'lucide-react';
import { Link } from '@inertiajs/react';

const formatPrice = (value) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(value || 0);

const STATUS_STYLES = {
    pending: { bg: 'rgba(234,179,8,0.12)', border: 'rgba(234,179,8,0.3)', color: '#eab308', icon: Clock },
    paid: { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)', color: '#3b82f6', icon: CheckCircle },
    shipped: { bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.3)', color: '#a855f7', icon: Truck },
    completed: { bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.3)', color: '#22c55e', icon: CheckCircle },
    cancelled: { bg: 'rgba(220,38,38,0.12)', border: 'rgba(220,38,38,0.3)', color: '#ef4444', icon: AlertTriangle },
};

function StatusBadge({ status }) {
    const style = STATUS_STYLES[status?.toLowerCase()] || STATUS_STYLES.pending;
    const Icon = style.icon;

    return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.25rem 0.6rem', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', backgroundColor: style.bg, border: `1px solid ${style.border}`, color: style.color }}>
            <Icon size={10} />
            {status || 'Pending'}
        </span>
    );
}

export default function Dashboard({ stats = {} }) {
    const recentOrders = stats.recentOrders || [];
    const lowStockProducts = stats.lowStockProducts || [];

    return (
        <AdminLayout title="Dashboard">
            <div style={{ marginBottom: '2rem' }}>
                <p className="section-label" style={{ marginBottom: '0.35rem' }}>Overview</p>
                <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '1.6rem', fontWeight: 800, color: 'white', letterSpacing: '-0.01em' }}>
                    Store Dashboard
                </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', backgroundColor: 'var(--color-border)', marginBottom: '2rem' }}>
                {[
                    { label: 'Total Sales', value: formatPrice(stats.totalRevenue), icon: DollarSign, accent: true },
                    { label: 'Total Orders', value: stats.totalOrders || 0, icon: ShoppingBag },
                    { label: 'Total Customers', value: stats.totalUsers || 0, icon: Users },
                    { label: 'Low Stock Alerts', value: lowStockProducts.length, icon: AlertTriangle },
                ].map((card) => (
                    <div key={card.label} style={{ backgroundColor: 'var(--color-bg)' }}>
                        <StatsCard {...card} />
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }}>
                <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h3 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', color: 'white', textTransform: 'uppercase' }}>
                            Recent Orders
                        </h3>
                        <Link href="/admin/orders" style={{ fontSize: '0.7rem', color: 'var(--color-accent)', fontWeight: 600, letterSpacing: '0.08em' }} className="hover:opacity-80 transition-opacity">
                            View All {'->'}
                        </Link>
                    </div>
                    {recentOrders.length > 0 ? (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        {['Order', 'Customer', 'Total', 'Status', 'Date'].map((heading) => (
                                            <th key={heading} style={{ padding: '0.75rem 1.25rem', textAlign: 'left', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--color-muted)', textTransform: 'uppercase', backgroundColor: 'var(--color-surface-2)', borderBottom: '1px solid var(--color-border)' }}>
                                                {heading}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map((order) => (
                                        <tr key={order.id} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background-color 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                            <td style={{ padding: '0.875rem 1.25rem' }}>
                                                <Link href={`/admin/orders/${order.id}`} style={{ color: 'var(--color-accent)', fontSize: '0.8rem', fontWeight: 600, fontFamily: 'monospace' }}>
                                                    {order.order_number}
                                                </Link>
                                            </td>
                                            <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.8rem', color: 'white' }}>
                                                {order.user?.name || '-'}
                                            </td>
                                            <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.8rem', color: 'white', fontWeight: 600 }}>
                                                {formatPrice(order.total)}
                                            </td>
                                            <td style={{ padding: '0.875rem 1.25rem' }}>
                                                <StatusBadge status={order.status} />
                                            </td>
                                            <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                                                {order.created_at?.split('T')[0] || order.created_at}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div style={{ padding: '2rem 1.5rem', color: 'var(--color-muted)' }}>
                            No recent orders yet.
                        </div>
                    )}
                </div>

                <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid rgba(220,38,38,0.25)' }}>
                    <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertTriangle size={14} style={{ color: 'var(--color-accent)' }} />
                        <h3 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', color: 'white', textTransform: 'uppercase' }}>
                            Low Stock Alert
                        </h3>
                    </div>
                    {lowStockProducts.length > 0 ? (
                        <div style={{ padding: '0.5rem 0' }}>
                            {lowStockProducts.map((product) => (
                                <div key={product.id} style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <p style={{ color: 'white', fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.2rem' }}>
                                            {product.name}
                                        </p>
                                        <p style={{ color: 'var(--color-muted)', fontSize: '0.7rem' }}>
                                            {product.brand?.name}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ display: 'inline-block', padding: '0.2rem 0.6rem', backgroundColor: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.3)', fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-accent)', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                                            {product.stock} left
                                        </span>
                                    </div>
                                </div>
                            ))}
                            <div style={{ padding: '1rem 1.25rem' }}>
                                <Link href="/admin/products" style={{ fontSize: '0.7rem', color: 'var(--color-accent)', fontWeight: 600, letterSpacing: '0.08em' }} className="hover:opacity-80 transition-opacity">
                                    Manage Products {'->'}
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div style={{ padding: '2rem 1.5rem', color: 'var(--color-muted)' }}>
                            No low-stock alerts.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
