import { usePage, router } from '@inertiajs/react';

export function useCart() {
    const { cartCount = 0, cart = null } = usePage().props;

const addToCart = (productId, quantity = 1, options = {}) => {
        return new Promise((resolve, reject) => {
            router.post('/cart/add', { product_id: productId, quantity }, {
                onSuccess: resolve,
                onError: reject,
                preserveScroll: true,
                ...options,
            });
        });
    };

    const updateQuantity = (cartItemId, quantity, options = {}) => {
        return new Promise((resolve, reject) => {
            router.patch(`/cart/${cartItemId}`, { quantity }, {
                onSuccess: resolve,
                onError: reject,
                preserveScroll: true,
                ...options,
            });
        });
    };

    const removeItem = (cartItemId, options = {}) => {
        return new Promise((resolve, reject) => {
            router.delete(`/cart/${cartItemId}`, {
                onSuccess: resolve,
                onError: reject,
                preserveScroll: true,
                ...options,
            });
        });
    };

    const clearCart = (options = {}) => {
        return new Promise((resolve, reject) => {
            router.delete('/cart', {
                onSuccess: resolve,
                onError: reject,
                ...options,
            });
        });
    };

    const items = cart?.items || [];
    const subtotal = items.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0);

    return {
        cart,
        items,
        cartCount,
        subtotal,
        total: subtotal + (subtotal > 0 ? 250 : 0),
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        isEmpty: items.length === 0,
    };
}