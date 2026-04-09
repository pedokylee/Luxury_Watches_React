import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
    if (!products || products.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>No products found.</p>
            </div>
        );
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px',
                      backgroundColor: 'var(--color-border)' }}>
            {products.map(product => (
                <div key={product.id} style={{ backgroundColor: 'var(--color-bg)' }}>
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
}