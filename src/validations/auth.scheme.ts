import * as Yup from "yup"

export const loginSchema = Yup.object({
    username: Yup.string()
        .required("Username wajib diisi")
        .min(3, "Minimal 3 karakter"),

    password: Yup.string()
        .required("Password wajib diisi")
        .min(6, "Minimal 6 karakter"),
})