import { create } from "zustand"

type ToastType = "success" | "error" | "warning"

interface ToastState {
    message: string | null
    type: ToastType
    show: boolean
    showToast: (message: string, type?: ToastType) => void
    hideToast: () => void
}

export const useToastStore = create<ToastState>((set) => ({
    message: null,
    type: "success",
    show: false,

    showToast: (message, type = "success") => {
        set({ message, type, show: true })

        setTimeout(() => {
            set({ show: false })
        }, 3000)
    },

    hideToast: () => set({ show: false }),
}))