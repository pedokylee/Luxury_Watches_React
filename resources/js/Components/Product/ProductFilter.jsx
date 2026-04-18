import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function ProductFilter({ filters = {}, categories = [], brands = [] }) {
    const [search, setSearch] = useState(filters.search || '');

    const applyFilter = (key, value) => {
        router.get('/products', { ...filters, [key]: value }, { preserveState: true, replace: true });
    };

    const handleSearch = (value) => {
        setSearch(value);
        applyFilter('search', value);
    };

    return (
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Search - Full width on mobile, flex: 1 on desktop */}
            <form onSubmit={e => e.preventDefault()} style={{ flex: '1', minWidth: '200px', position: 'relative', order: 1 }}>
                <Search size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%',
                                           transform: 'translateY(-50%)', color: 'var(--color-muted)' }} />
                <input
                    type="text"
                    placeholder="Search watches..."
                    value={search}
                    onChange={e => handleSearch(e.target.value)}
                    className="input-dark"
                    style={{ paddingLeft: '2.5rem', width: '100%', minHeight: '44px' }}
                />
            </form>

            {/* Category Filter Dropdown */}
            <select
                value={filters.category || ''}
                onChange={e => applyFilter('category', e.target.value)}
                style={{ 
                    border: '1px solid var(--color-border)', 
                    backgroundColor: 'var(--color-surface-2)',
                    color: 'var(--color-text)', 
                    fontSize: '0.875rem', 
                    padding: '0.75rem 1rem',
                    minHeight: '44px', 
                    outline: 'none', 
                    cursor: 'pointer',
                    borderRadius: '2px',
                    order: 2
                }}>
                <option value="">All</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>

            <select
                value={filters.brand || ''}
                onChange={e => applyFilter('brand', e.target.value)}
                style={{
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface-2)',
                    color: 'var(--color-text)',
                    fontSize: '0.875rem',
                    padding: '0.75rem 1rem',
                    minHeight: '44px',
                    outline: 'none',
                    cursor: 'pointer',
                    borderRadius: '2px',
                    order: 2,
                }}>
                <option value="">All brands</option>
                {brands.map(brand => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
            </select>

            {/* Sort Dropdown */}
            <select
                value={filters.sort || ''}
                onChange={e => applyFilter('sort', e.target.value)}
                style={{ 
                    border: '1px solid var(--color-border)', 
                    backgroundColor: 'var(--color-surface-2)',
                    color: 'var(--color-text)', 
                    fontSize: '0.875rem', 
                    padding: '0.75rem 1rem',
                    minHeight: '44px', 
                    outline: 'none', 
                    cursor: 'pointer',
                    borderRadius: '2px',
                    order: 3
                }}>
                <option value="">Sort by</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name_asc">Name A-Z</option>
                <option value="newest">Newest</option>
            </select>
        </div>
    );
}
