import { object, string, number, boolean, array } from 'valibot'

export const DraftProductSchema = object({
    name: string(),
    price: number()
})

export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean()
})

export const ProductsSchema = array(ProductSchema)
export type Product = {
    id: number
    name: string
    price: number
    availability: boolean
}

export type User = {
    id: number
    email: string
    name: string
    role: 'user' | 'admin'
}

export type AuthResponse = {
    message: string
    token: string
    user: User
}