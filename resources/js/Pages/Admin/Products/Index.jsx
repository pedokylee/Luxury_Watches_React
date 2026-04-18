import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AppImage from '@/Components/UI/AppImage';
import { Plus, Search, Pencil, Trash2, ToggleLeft, ToggleRight, Eye } from 'lucide-react';

const formatPrice = (value) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(value || 0);

export default function Index({ products = { data: [], links: [] }, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const items = products.data || [];

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/products', { search }, { preserveState: true, replace: true });
    };

    const toggleActive = (id) => {
        router.patch(`/admin/products/${id}/toggle`, {}, { preserveScroll: true });
    };

    const handleDelete = (id) => {
        router.delete(`/admin/products/${id}`, {
            onSuccess: () => setDeleteConfirm(null),
        });
    };

    return (
        <AdminLayout title="Products">
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <p className="section-label" style={{ marginBottom: '0.35rem' }}>Inventory</p>
                    <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '1.6rem', fontWeight: 800, color: 'white' }}>
                        Product Management
                    </h2>
                </div>
                <Link href="/admin/products/create" className="btn-primary inline-flex items-center gap-2">
                    <Plus size={15} /> Add Product
                </Link>
            </div>

            <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '1rem 1.25rem', marginBottom: '1px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <form onSubmit={handleSearch} style={{ flex: 1, position: 'relative', maxWidth: '320px' }}>
                    <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input-dark"
                        style={{ paddingLeft: '2.25rem', height: '38px', fontSize: '0.8rem' }}
                    />
                </form>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginLeft: 'auto' }}>
                    {items.length} products
                </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderTop: 'none', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            {['Product', 'Brand', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map((heading) => (
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
                        {items.map((product) => (
                            <tr
                                key={product.id}
                                style={{ borderBottom: '1px solid var(--color-border)', transition: 'background-color 0.15s' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <td style={{ padding: '0.875rem 1.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                                        <div style={{ width: 48, height: 48, flexShrink: 0, backgroundColor: '#0d0d0d', overflow: 'hidden' }}>
                                            <AppImage
                                                src={product.image_url}
                                                alt={product.name}
                                                label={product.name}
                                                subtitle={product.brand?.name || ''}
                                                compact
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <span style={{ color: 'white', fontSize: '0.85rem', fontWeight: 500, maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                                            {product.name}
                                        </span>
                                    </div>
                                </td>
                                <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                                    {product.brand?.name || '-'}
                                </td>
                                <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                                    {product.category?.name || '-'}
                                </td>
                                <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.875rem', color: 'var(--color-accent)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                                    {formatPrice(product.price)}
                                </td>
                                <td style={{ padding: '0.875rem 1.25rem' }}>
                                    <span style={{
                                        display: 'inline-block',
                                        padding: '0.2rem 0.6rem',
                                        fontSize: '0.7rem',
                                        fontWeight: 700,
                                        backgroundColor: product.stock <= 2 ? 'rgba(220,38,38,0.12)' : 'rgba(34,197,94,0.08)',
                                        border: `1px solid ${product.stock <= 2 ? 'rgba(220,38,38,0.3)' : 'rgba(34,197,94,0.2)'}`,
                                        color: product.stock <= 2 ? 'var(--color-accent)' : '#22c55e',
                                    }}>
                                        {product.stock}
                                    </span>
                                </td>
                                <td style={{ padding: '0.875rem 1.25rem' }}>
                                    <button
                                        onClick={() => toggleActive(product.id)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.4rem',
                                            background: 'none',
                                            cursor: 'pointer',
                                            padding: 0,
                                            color: product.is_active ? '#22c55e' : 'var(--color-muted)',
                                            fontSize: '0.7rem',
                                            fontWeight: 600,
                                            letterSpacing: '0.08em',
                                            textTransform: 'uppercase',
                                            transition: 'color 0.2s',
                                        }}
                                    >
                                        {product.is_active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                                        {product.is_active ? 'Active' : 'Inactive'}
                                    </button>
                                </td>
                                <td style={{ padding: '0.875rem 1.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Link href={`/products/${product.id}`} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border)', color: 'var(--color-muted)', transition: 'all 0.2s' }} className="hover:border-white hover:text-white">
                                            <Eye size={14} />
                                        </Link>
                                        <Link href={`/admin/products/${product.id}/edit`} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border)', color: 'var(--color-muted)', transition: 'all 0.2s' }} className="hover:border-blue-400 hover:text-blue-400">
                                            <Pencil size={14} />
                                        </Link>
                                        <button
                                            onClick={() => setDeleteConfirm(product.id)}
                                            style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border)', color: 'var(--color-muted)', background: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                                            className="hover:border-red-500 hover:text-red-500"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {items.length === 0 && (
                    <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-muted)', fontSize: '0.875rem' }}>
                        No products found.
                    </div>
                )}
            </div>

            {products.links && products.links.length > 3 && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
                    {products.links.map((link, i) => (
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

            {deleteConfirm && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                    <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '2rem', maxWidth: '400px', width: '90%' }}>
                        <h3 style={{ color: 'white', fontWeight: 700, fontSize: '1rem', marginBottom: '0.75rem' }}>
                            Delete Product?
                        </h3>
                        <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                            This action cannot be undone. The product will be permanently removed.
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button onClick={() => setDeleteConfirm(null)} className="btn-outline" style={{ flex: 1, cursor: 'pointer' }}>
                                Cancel
                            </button>
                            <button onClick={() => handleDelete(deleteConfirm)} className="btn-primary" style={{ flex: 1, cursor: 'pointer', backgroundColor: '#ef4444' }}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
