import axios from 'axios'
import type { AuthResponse, User } from '../types'

type LoginData = {
    email: string
    password: string
}

type RegisterData = {
    name: string
    email: string
    password: string
}

export async function login(data: LoginData) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/auth/login`
        const response = await axios.post<AuthResponse>(url, data)
        
        // Guardar token en localStorage
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function register(data: RegisterData) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/auth/register`
        console.log('Intentando registrar en:', url)
        const response = await axios.post<AuthResponse>(url, data)
        
        // Guardar token en localStorage
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        
        return response.data
    } catch (error) {
        console.error('Error en register:', error)
        throw error
    }
}

export async function createAdmin(data: RegisterData) {
    try {
        const token = getToken()
        const url = `${import.meta.env.VITE_API_URL}/api/auth/admin`
        console.log('Creando admin con datos:', data)
        const response = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        return response.data
    } catch (error: any) {
        console.error('Error detallado:', error.response?.data || error.message)
        throw error
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}

export function getToken(): string | null {
    return localStorage.getItem('token')
}

export function getUser(): User | null {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
}

export function isAuthenticated(): boolean {
    return !!getToken()
}

export function isAdmin(): boolean {
    const user = getUser()
    return user?.role === 'admin'
}
