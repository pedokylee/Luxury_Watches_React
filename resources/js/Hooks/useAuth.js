import { usePage, router } from '@inertiajs/react';

export function useAuth() {
    const { auth = {} } = usePage().props;
    const user = auth?.user || null;

    const logout = (options = {}) => {
        router.post('/logout', {}, options);
    };

    return {
        user,
        isLoggedIn: !!user,
        isAdmin: user?.is_admin === true || user?.is_admin === 1,
        logout,
    };
}