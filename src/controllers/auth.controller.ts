import { api } from "../services/api"
import type { LoginResponse } from "../types/auth.types"

export const loginController = async (
    username: string,
    password: string
): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>("/auth/login", {
        username,
        password,
    })

    return data
}