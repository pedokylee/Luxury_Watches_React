import { useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ChevronLeft, Upload, X } from 'lucide-react';
import { useState, useRef } from 'react';

export default function Edit({ product = null, categories = [], brands = [] }) {
    const demo = {
        id: 1, name: 'Royal Oak Offshore', brand_id: 4, category_id: 3,
        price: 45000, stock: 5, description: 'A bold and sporty timepiece.', is_active: true,
        image_url: 'https://images.europeanwatch.com/images/59/59988-1.jpg'
    };
    const p = product || demo;
    const existingImage = p.image_url || p.images?.[0]?.url || null;

    const [preview, setPreview] = useState(existingImage);
    const [dragActive, setDragActive] = useState(false);
    const [clientError, setClientError] = useState('');
    const fileRef = useRef();

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: p.name || '',
        brand_id: p.brand_id || '',
        category_id: p.category_id || '',
        price: p.price || '',
        stock: p.stock || '',
        description: p.description || '',
        is_active: p.is_active ?? true,
        image: null,
    });

    const processFile = (file) => {
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setClientError('Only image files can be uploaded.');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setClientError('Image must be 2MB or smaller.');
            return;
        }

        setClientError('');
        setData('image', file);

        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleFile = (e) => {
        processFile(e.target.files[0]);
    };

    const clearSelectedImage = () => {
        setPreview(null);
        setData('image', null);
        setClientError('');

        if (fileRef.current) {
            fileRef.current.value = '';
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        processFile(e.dataTransfer.files[0]);
    };

    const submit = (e) => {
        e.preventDefault();
        post(`/admin/products/${p.id}`, { forceFormData: true });
    };

    const demoBrands = [
        { id:1, name:'Rolex' }, { id:2, name:'Omega' }, { id:3, name:'Patek Philippe' },
        { id:4, name:'Audemars Piguet' }, { id:5, name:'Cartier' }, { id:6, name:'Tag Heuer' }
    ];
    const demoCategories = [
        { id:1, name:'Diving' }, { id:2, name:'Dress' }, { id:3, name:'Sports' },
        { id:4, name:'Chronograph' }, { id:5, name:'Travel' }, { id:6, name:'Racing' }
    ];

    const brandList = brands.length > 0 ? brands : demoBrands;
    const categoryList = categories.length > 0 ? categories : demoCategories;

    return (
        <AdminLayout title="Edit Product">
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link href="/admin/products"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem',
                               color: 'var(--color-muted)', fontSize: '0.75rem', letterSpacing: '0.08em' }}
                      className="hover:text-white transition-colors">
                    <ChevronLeft size={15} /> Products
                </Link>
                <span style={{ color: 'var(--color-border)' }}>/</span>
                <span style={{ fontSize: '0.75rem', color: 'white' }}>Edit Product</span>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <p className="section-label" style={{ marginBottom: '0.35rem' }}>Editing</p>
                <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '1.6rem', fontWeight: 800, color: 'white' }}>
                    {p.name}
                </h2>
            </div>

            <form onSubmit={submit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>
                    {/* Main Fields */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em',
                                         color: 'white', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                                Basic Information
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <Label>Product Name</Label>
                                    <input type="text" value={data.name}
                                           onChange={e => setData('name', e.target.value)}
                                           className="input-dark" required />
                                    <Err msg={errors.name} />
                                </div>
                                <div>
                                    <Label>Brand</Label>
                                    <select value={data.brand_id} onChange={e => setData('brand_id', e.target.value)}
                                            className="input-dark" required>
                                        <option value="">Select brand</option>
                                        {brandList.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                    </select>
                                    <Err msg={errors.brand_id} />
                                </div>
                                <div>
                                    <Label>Category</Label>
                                    <select value={data.category_id} onChange={e => setData('category_id', e.target.value)}
                                            className="input-dark" required>
                                        <option value="">Select category</option>
                                        {categoryList.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                    <Err msg={errors.category_id} />
                                </div>
                                <div>
                                    <Label>Price (USD)</Label>
                                    <div style={{ position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '0.875rem', top: '50%',
                                                       transform: 'translateY(-50%)', color: 'var(--color-muted)', fontSize: '0.875rem' }}>$</span>
                                        <input type="number" min="0" step="0.01" value={data.price}
                                               onChange={e => setData('price', e.target.value)}
                                               className="input-dark" style={{ paddingLeft: '1.75rem' }} required />
                                    </div>
                                    <Err msg={errors.price} />
                                </div>
                                <div>
                                    <Label>Stock Quantity</Label>
                                    <input type="number" min="0" value={data.stock}
                                           onChange={e => setData('stock', e.target.value)}
                                           className="input-dark" required />
                                    <Err msg={errors.stock} />
                                </div>
                            </div>
                        </div>

                        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em',
                                         color: 'white', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                                Description
                            </h3>
                            <textarea value={data.description}
                                      onChange={e => setData('description', e.target.value)}
                                      rows={5} className="input-dark" style={{ resize: 'vertical' }} />
                            <Err msg={errors.description} />
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Image */}
                        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em',
                                         color: 'white', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                                Product Image
                            </h3>
                            {preview ? (
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    style={{ position: 'relative', marginBottom: '1rem', border: `2px dashed ${dragActive ? 'var(--color-accent)' : 'transparent'}` }}
                                >
                                    <img src={preview} alt="Preview"
                                         style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', backgroundColor: '#0d0d0d' }} />
                                    <div style={{ position: 'absolute', left: '0.75rem', bottom: '0.75rem', padding: '0.4rem 0.6rem', backgroundColor: 'rgba(0,0,0,0.72)', color: 'white', fontSize: '0.68rem', letterSpacing: '0.06em' }}>
                                        {dragActive ? 'Drop to replace image' : 'Drag a new image here to replace'}
                                    </div>
                                    <button type="button"
                                            onClick={clearSelectedImage}
                                            style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', width: 28, height: 28,
                                                     borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.7)',
                                                     border: '1px solid var(--color-border)', display: 'flex',
                                                     alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}>
                                        <X size={14} />
                                    </button>
                                </div>
                            ) : (
                                <div onClick={() => fileRef.current.click()}
                                     onDragOver={handleDragOver}
                                     onDragLeave={handleDragLeave}
                                     onDrop={handleDrop}
                                     style={{ border: `2px dashed ${dragActive ? 'var(--color-accent)' : 'var(--color-border)'}`, aspectRatio: '1',
                                               display: 'flex', flexDirection: 'column', alignItems: 'center',
                                               justifyContent: 'center', gap: '0.75rem', cursor: 'pointer',
                                               backgroundColor: dragActive ? 'rgba(220,38,38,0.08)' : 'var(--color-surface-2)', marginBottom: '1rem',
                                               transition: 'border-color 0.2s, background-color 0.2s' }}
                                     className="hover:border-accent">
                                    <Upload size={28} style={{ color: 'var(--color-muted)' }} />
                                    <div style={{ textAlign: 'center' }}>
                                        <p style={{ fontSize: '0.8rem', color: 'white', fontWeight: 500, marginBottom: '0.2rem' }}>
                                            {dragActive ? 'Drop Image Here' : 'Upload Image'}
                                        </p>
                                        <p style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>
                                            Drag and drop or click to browse
                                        </p>
                                        <p style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>
                                            PNG, JPG, WEBP up to 2MB
                                        </p>
                                    </div>
                                </div>
                            )}
                            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
                            <button type="button" onClick={() => fileRef.current.click()}
                                    className="btn-outline" style={{ width: '100%', cursor: 'pointer', fontSize: '0.75rem' }}>
                                {preview ? 'Change Image' : 'Choose File'}
                            </button>
                            {clientError && <p style={{ color: 'var(--color-accent)', fontSize: '0.7rem', marginTop: '0.75rem' }}>{clientError}</p>}
                            <Err msg={errors.image || errors.images} />
                        </div>

                        {/* Visibility */}
                        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em',
                                         color: 'white', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                                Visibility
                            </h3>
                            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                                <div>
                                    <p style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500 }}>Active / Published</p>
                                    <p style={{ color: 'var(--color-muted)', fontSize: '0.75rem', marginTop: '0.2rem' }}>
                                        Visible to customers
                                    </p>
                                </div>
                                <div onClick={() => setData('is_active', !data.is_active)}
                                     style={{ width: 44, height: 24, borderRadius: 12, cursor: 'pointer',
                                              transition: 'background-color 0.2s', position: 'relative',
                                              backgroundColor: data.is_active ? 'var(--color-accent)' : 'var(--color-border)' }}>
                                    <div style={{ position: 'absolute', top: 2, transition: 'left 0.2s',
                                                  width: 20, height: 20, borderRadius: '50%', backgroundColor: 'white',
                                                  left: data.is_active ? 22 : 2 }} />
                                </div>
                            </label>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <button type="submit" disabled={processing} className="btn-primary"
                                    style={{ width: '100%', opacity: processing ? 0.7 : 1, cursor: processing ? 'not-allowed' : 'pointer' }}>
                                {processing ? 'Saving...' : 'Update Product'}
                            </button>
                            <Link href="/admin/products" className="btn-outline" style={{ display: 'block', textAlign: 'center' }}>
                                Cancel
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}

function Label({ children }) {
    return (
        <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em',
                        color: 'var(--color-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
            {children}
        </label>
    );
}

function Err({ msg }) {
    if (!msg) return null;
    return <p style={{ color: 'var(--color-accent)', fontSize: '0.7rem', marginTop: '0.3rem' }}>{msg}</p>;
}
