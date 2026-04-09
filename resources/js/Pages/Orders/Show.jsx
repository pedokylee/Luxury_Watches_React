import { Head, router, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { formatCurrency } from '@/Utils/formatCurrency';
import { ArrowLeft, Clock, MapPin, Phone, Package, Truck, CreditCard, ShoppingBag } from 'lucide-react';
import ReviewForm from '@/Components/Order/ReviewForm';
import ReviewDisplay from '@/Components/Order/ReviewDisplay';
import { useState } from 'react';

export default function OrderShow({ order }) {
    const [reviewKey, setReviewKey] = useState(0);

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-amber-100 text-amber-800',
            processing: 'bg-blue-100 text-blue-800',
            shipped: 'bg-green-100 text-green-800',
            delivered: 'bg-emerald-100 text-emerald-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const parseAddress = (addressJson) => {
        try {
            const addr = JSON.parse(addressJson);
            return addr;
        } catch {
            return { full_name: 'N/A', address: addressJson };
        }
    };

    const address = parseAddress(order.shipping_address);

    return (
        <MainLayout>
            <Head title={`Order #${order.id}`} />

            <div className="max-w-6xl mx-auto py-12 px-6 sm:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-400">
                    <button 
                        onClick={() => router.visit('/orders')}
                        className="flex items-center gap-1 hover:text-white transition-colors p-2 -m-2 rounded-lg"
                    >
                        <ArrowLeft size={16} />
                        Orders
                    </button>
                    <span>/ #{order.id}</span>
                </nav>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <div className="bg-gray-900/30 border border-gray-700/50 backdrop-blur-xl rounded-2xl p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-light tracking-tight text-white mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                                    Order #{order.id}
                                </h1>
                                <span className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                    {order.status.toUpperCase()}
                                </span>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-semibold text-white mb-1">{formatCurrency(order.total)}</p>
                                <p className="text-sm text-gray-400">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="mb-6">
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                                <MapPin size={20} className="text-blue-400" />
                                Shipping Address
                            </h3>
                            <div className="bg-gray-800/50 p-6 rounded-xl">
                                <p className="font-semibold text-white mb-1">{address.full_name}</p>
                                <p className="text-gray-300 mb-1">{address.address}</p>
                                <p className="text-gray-300">{address.city}, {address.state} {address.zip}</p>
                                <p className="text-gray-300 mt-2 flex items-center gap-2">
                                    <Phone size={16} />
                                    {address.phone}
                                </p>
                            </div>
                        </div>

                        {order.payment_method && (
                            <div className="mb-6">
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                                    <CreditCard size={20} className="text-purple-400" />
                                    Payment
                                </h3>
                                <div className="bg-gray-800/50 p-6 rounded-xl">
                                    <p className="font-semibold text-white">{order.payment_method.toUpperCase()}</p>
                                    {order.payment && (
                                        <p className="text-sm text-gray-400 mt-1">Paid on {new Date(order.payment.created_at).toLocaleDateString()}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {order.notes && (
                            <div>
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                                    <Clock size={20} className="text-yellow-400" />
                                    Notes
                                </h3>
                                <div className="bg-gray-800/50 p-6 rounded-xl">
                                    <p className="text-gray-300 whitespace-pre-wrap">{order.notes}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Items */}
                    <div className="space-y-6">
                        <div className="bg-gray-900/30 border border-gray-700/50 backdrop-blur-xl rounded-2xl p-8">
                            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                                <Package size={24} className="text-blue-400" />
                                Order Items ({order.items.length})
                            </h2>
                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4 bg-gray-800/30 rounded-xl">
                                        <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex-shrink-0 overflow-hidden">
                                            {item.product?.images[0] ? (
                                                <img src={item.product.images[0].url} alt={item.product.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                                    <ShoppingBag size={24} className="text-gray-500" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <Link href={`/products/${item.product_id}`} className="block font-semibold text-white hover:text-blue-400 mb-1 line-clamp-2">
                                                {item.product?.name || 'Product'}
                                            </Link>
                                            <p className="text-sm text-gray-400 mb-2">
                                                {item.product?.brand?.name && `${item.product.brand.name} • `}
                                                {item.product?.category?.name}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm">
                                                <span className="font-semibold text-white">{formatCurrency(item.price)}</span>
                                                <span className="text-gray-400">x{item.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {order.status === 'pending' && (
                            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <Truck size={20} className="text-amber-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Order Status</h3>
                                        <p className="text-amber-200">Your order is being processed. We'll notify you when it ships.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Review Section */}
                <div className="mt-12 grid lg:grid-cols-2 gap-8">
                    {order.review ? (
                        <>
                            <ReviewDisplay key={reviewKey} review={order.review} />
                            <ReviewForm 
                                key={`form-${reviewKey}`}
                                order={order} 
                                existingReview={order.review}
                                onSubmitSuccess={() => {
                                    setReviewKey(prev => prev + 1);
                                    router.reload();
                                }}
                            />
                        </>
                    ) : (
                        <ReviewForm 
                            key={`form-${reviewKey}`}
                            order={order} 
                            existingReview={null}
                            onSubmitSuccess={() => {
                                setReviewKey(prev => prev + 1);
                                router.reload();
                            }}
                        />
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
