import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { formatCurrency } from '@/Utils/formatCurrency';
import { Clock, Package, Truck, ShoppingBag } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function OrdersIndex({ orders = [] }) {
    const { auth } = usePage().props;

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

    return (
        <MainLayout>
            <Head title="My Orders" />

            <div className="max-w-7xl mx-auto py-12 px-6 sm:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-light tracking-tight text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                        My Orders
                    </h1>
                    <p className="text-gray-400">Track and view details of your recent orders</p>
                </div>

                {orders.length === 0 ? (
                    <div className="text-center py-20">
                        <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-6" />
                        <h3 className="text-2xl font-medium text-white mb-4">No orders yet</h3>
                        <Link 
                            href="/products" 
                            className="inline-flex items-center px-6 py-3 border border-gray-700 text-white bg-transparent hover:bg-gray-800 rounded-xl transition-all duration-200"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <Link 
                                key={order.id}
                                href={`/orders/${order.id}`}
                                className="block bg-gray-900/30 border border-gray-700/50 backdrop-blur-xl rounded-2xl p-6 hover:border-gray-600 hover:bg-gray-900/50 transition-all"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                                    {/* Products */}
                                    <div className="md:col-span-2">
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Products</p>
                                        <div className="space-y-3">
                                            {order.items?.slice(0, 2).map((item) => (
                                                <div key={item.id} className="flex gap-3 justify-between items-start">
                                                    <div className="flex gap-3 min-w-0 flex-1">
                                                        <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex-shrink-0 overflow-hidden">
                                                            {item.product?.images?.[0] ? (
                                                                <img src={item.product.images[0].url} alt={item.product.name} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                                                    <Package size={16} className="text-gray-500" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="font-medium text-white text-sm line-clamp-1">
                                                                {item.product?.name || 'Product'}
                                                            </p>
                                                            <p className="text-xs text-gray-400">
                                                                {item.product?.brand?.name && `${item.product.brand.name} • `}
                                                                Qty: {item.quantity}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex-shrink-0 text-right">
                                                        <p className="font-semibold text-white text-sm">
                                                            {formatCurrency(item.price)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                            {order.items?.length > 2 && (
                                                <p className="text-xs text-gray-400 italic">
                                                    +{order.items.length - 2} more item{order.items.length - 2 > 1 ? 's' : ''}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Order ID */}
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Order</p>
                                        <p className="font-semibold text-white text-lg">#{order.id}</p>
                                    </div>

                                    {/* Date */}
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Date</p>
                                        <p className="text-sm text-white">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </p>
                                    </div>

                                    {/* Status & Total */}
                                    <div className="flex flex-col gap-3">
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Status</p>
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                {order.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Total</p>
                                            <p className="font-semibold text-white">
                                                {formatCurrency(order.total)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
