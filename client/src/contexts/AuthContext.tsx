import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { User } from '../types'
import { getUser, getToken } from '../services/AuthService'

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    isAdmin: boolean
    login: (user: User, token: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    // Inicializar estado desde localStorage
    useEffect(() => {
        const storedUser = getUser()
        const token = getToken()
        
        if (storedUser && token) {
            setUser(storedUser)
            setIsAuthenticated(true)
            setIsAdmin(storedUser.role === 'admin')
        }
    }, [])

    const login = (newUser: User, token: string) => {
        setUser(newUser)
        setIsAuthenticated(true)
        setIsAdmin(newUser.role === 'admin')
        localStorage.setItem('user', JSON.stringify(newUser))
        localStorage.setItem('token', token)
    }

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)
        setIsAdmin(false)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de AuthProvider')
    }
    return context
}
