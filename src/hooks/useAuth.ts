import { useAuthStore } from "../store/auth.store"

export const useAuth = () => {
    const { user, token, loading, login, logout } = useAuthStore()

    return {
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
    }
}