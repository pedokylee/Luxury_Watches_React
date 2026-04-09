import AdminLayout from '@/Layouts/AdminLayout';
import StatsCard from '@/Components/Admin/StatsCard';
import { DollarSign, ShoppingBag, Users, AlertTriangle, TrendingUp, Clock, CheckCircle, Truck } from 'lucide-react';
import { Link } from '@inertiajs/react';

const formatPrice = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v || 0);

const STATUS_STYLES = {
    pending:   { bg: 'rgba(234,179,8,0.12)',  border: 'rgba(234,179,8,0.3)',  color: '#eab308', icon: Clock },
    paid:      { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)', color: '#3b82f6', icon: CheckCircle },
    shipped:   { bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.3)', color: '#a855f7', icon: Truck },
    completed: { bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.3)',  color: '#22c55e', icon: CheckCircle },
    cancelled: { bg: 'rgba(220,38,38,0.12)',  border: 'rgba(220,38,38,0.3)',  color: '#ef4444', icon: AlertTriangle },
};

function StatusBadge({ status }) {
    const s = STATUS_STYLES[status?.toLowerCase()] || STATUS_STYLES.pending;
    const Icon = s.icon;
    return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                        padding: '0.25rem 0.6rem', fontSize: '0.65rem', fontWeight: 700,
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        backgroundColor: s.bg, border: `1px solid ${s.border}`, color: s.color }}>
            <Icon size={10} />
            {status || 'Pending'}
        </span>
    );
}

export default function Dashboard({ stats = {}, recentOrders = [], lowStockProducts = [] }) {
    const demoStats = {
        total_sales: 284500,
        total_orders: 42,
        total_customers: 128,
        low_stock_count: 3,
    };
    const s = { ...demoStats, ...stats };

    const demoOrders = [
        { id: 1, order_number: 'ORD-2026-042', customer: { name: 'Maria Santos' }, total: 45250, status: 'pending',   created_at: '2026-04-05' },
        { id: 2, order_number: 'ORD-2026-041', customer: { name: 'Jose Reyes' },   total: 38500, status: 'paid',      created_at: '2026-04-04' },
        { id: 3, order_number: 'ORD-2026-040', customer: { name: 'Ana Cruz' },     total: 12800, status: 'shipped',   created_at: '2026-04-03' },
        { id: 4, order_number: 'ORD-2026-039', customer: { name: 'Pedro Lim' },    total: 85000, status: 'completed', created_at: '2026-04-02' },
        { id: 5, order_number: 'ORD-2026-038', customer: { name: 'Rosa Tan' },     total: 9800,  status: 'cancelled', created_at: '2026-04-01' },
    ];

    const demoLowStock = [
        { id: 1, name: 'Nautilus 5711/1A',   brand: { name: 'Patek Philippe' },    stock: 1, price: 85000 },
        { id: 2, name: 'Cosmograph Daytona', brand: { name: 'Rolex' },             stock: 1, price: 42000 },
        { id: 3, name: 'GMT-Master II',      brand: { name: 'Rolex' },             stock: 2, price: 32000 },
    ];

    const orders   = recentOrders.length   > 0 ? recentOrders   : demoOrders;
    const lowStock = lowStockProducts.length > 0 ? lowStockProducts : demoLowStock;

    return (
        <AdminLayout title="Dashboard">
            {/* Greeting */}
            <div style={{ marginBottom: '2rem' }}>
                <p className="section-label" style={{ marginBottom: '0.35rem' }}>Overview</p>
                <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '1.6rem', fontWeight: 800,
                             color: 'white', letterSpacing: '-0.01em' }}>
                    Store Dashboard
                </h2>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                          gap: '1px', backgroundColor: 'var(--color-border)', marginBottom: '2rem' }}>
                {[
                    { label: 'Total Sales',      value: formatPrice(s.total_sales),    icon: DollarSign,   trend: '+12.5% this month', accent: true },
                    { label: 'Total Orders',     value: s.total_orders,               icon: ShoppingBag,  trend: '+8 this week' },
                    { label: 'Total Customers',  value: s.total_customers,             icon: Users,        trend: '+5 this week' },
                    { label: 'Low Stock Alerts', value: s.low_stock_count,             icon: AlertTriangle },
                ].map(card => (
                    <div key={card.label} style={{ backgroundColor: 'var(--color-bg)' }}>
                        <StatsCard {...card} />
                    </div>
                ))}
            </div>

            {/* Bottom Two Panels */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }}>

                {/* Recent Orders */}
                <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)',
                                  display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h3 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em',
                                     color: 'white', textTransform: 'uppercase' }}>
                            Recent Orders
                        </h3>
                        <Link href="/admin/orders" style={{ fontSize: '0.7rem', color: 'var(--color-accent)',
                                                            fontWeight: 600, letterSpacing: '0.08em' }}
                              className="hover:opacity-80 transition-opacity">
                            View All →
                        </Link>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    {['Order', 'Customer', 'Total', 'Status', 'Date'].map(h => (
                                        <th key={h} style={{ padding: '0.75rem 1.25rem', textAlign: 'left',
                                                             fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.14em',
                                                             color: 'var(--color-muted)', textTransform: 'uppercase',
                                                             backgroundColor: 'var(--color-surface-2)',
                                                             borderBottom: '1px solid var(--color-border)' }}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id} style={{ borderBottom: '1px solid var(--color-border)',
                                                                transition: 'background-color 0.15s' }}
                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'}
                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                                        <td style={{ padding: '0.875rem 1.25rem' }}>
                                            <Link href={`/admin/orders/${order.id}`}
                                                  style={{ color: 'var(--color-accent)', fontSize: '0.8rem',
                                                           fontWeight: 600, fontFamily: 'monospace' }}>
                                                {order.order_number || `#${order.id}`}
                                            </Link>
                                        </td>
                                        <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.8rem', color: 'white' }}>
                                            {order.customer?.name || order.user?.name || '—'}
                                        </td>
                                        <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.8rem',
                                                     color: 'white', fontWeight: 600 }}>
                                            {formatPrice(order.total)}
                                        </td>
                                        <td style={{ padding: '0.875rem 1.25rem' }}>
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.75rem',
                                                     color: 'var(--color-muted)' }}>
                                            {order.created_at?.split('T')[0] || order.created_at}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Low Stock Panel */}
                <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid rgba(220,38,38,0.25)' }}>
                    <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)',
                                  display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertTriangle size={14} style={{ color: 'var(--color-accent)' }} />
                        <h3 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em',
                                     color: 'white', textTransform: 'uppercase' }}>
                            Low Stock Alert
                        </h3>
                    </div>
                    <div style={{ padding: '0.5rem 0' }}>
                        {lowStock.map(product => (
                            <div key={product.id}
                                 style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid var(--color-border)',
                                          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <p style={{ color: 'white', fontSize: '0.8rem', fontWeight: 500,
                                                marginBottom: '0.2rem' }}>
                                        {product.name}
                                    </p>
                                    <p style={{ color: 'var(--color-muted)', fontSize: '0.7rem' }}>
                                        {product.brand?.name}
                                    </p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ display: 'inline-block', padding: '0.2rem 0.6rem',
                                                   backgroundColor: 'rgba(220,38,38,0.12)',
                                                   border: '1px solid rgba(220,38,38,0.3)',
                                                   fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-accent)',
                                                   letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                                        {product.stock} left
                                    </span>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>
                                        {formatPrice(product.price)}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div style={{ padding: '1rem 1.25rem' }}>
                            <Link href="/admin/products"
                                  style={{ fontSize: '0.7rem', color: 'var(--color-accent)',
                                           fontWeight: 600, letterSpacing: '0.08em' }}
                                  className="hover:opacity-80 transition-opacity">
                                Manage Products →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}