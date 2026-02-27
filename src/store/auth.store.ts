import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { ApiError, AuthState, User } from "../types/auth.types"
import { loginController } from "../controllers/auth.controller"
import { useToastStore } from "./toast.store"
import axios from "axios"


export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            loading: false,

            setUser: (user: User | null) => set({ user }),

            login: async (username: string, password: string) => {
                set({ loading: true })
                try {
                    const data = await loginController(username, password)
                    const user: User = {
                        id: data.id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                    }
                    set({
                        user,
                        token: data.accessToken,
                        loading: false,
                    })
                    return true
                } catch (error) {
                    set({ loading: false })
                    if (axios.isAxiosError<ApiError>(error)) {
                        const message = error.response?.data?.message || "Something went wrong"
                        useToastStore.getState().showToast(message, "error")
                    } else {
                        useToastStore.getState().showToast("Unexpected error occurred", "error")
                    }
                    return false
                }
            },

            logout: () => {

                set({
                    user: null,
                    token: null,
                })
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                token: state.token
            }),
        }
    )
)