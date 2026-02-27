export interface User {
    id: number
    firstName: string
    lastName: string
    email: string
}

export interface LoginResponse {
    id: number
    firstName: string
    lastName: string
    email: string
    accessToken: string
}

export interface AuthState {
    user: User | null
    token: string | null
    loading: boolean


    setUser: (user: User | null) => void
    login: (username: string, password: string) => Promise<boolean>
    logout: () => void
}
export interface ApiError {
    message: string
}