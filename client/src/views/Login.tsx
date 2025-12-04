import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login as loginService } from '../services/AuthService'
import { useAuth } from '../contexts/AuthContext'
import ErrorMessage from '../components/ErrorMessage'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const response = await loginService({ email, password })
            login(response.user, response.token)
            navigate('/')
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al iniciar sesión')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='mx-auto max-w-md'>
            <h2 className='text-4xl font-black text-slate-500 text-center mb-8'>Iniciar Sesión</h2>

            {error && <ErrorMessage message={error} />}

            <form className='bg-white shadow-md rounded-lg p-6' onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label
                        htmlFor='email'
                        className='block text-gray-700 text-sm font-bold mb-2'
                    >
                        Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='tu@email.com'
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600'
                        required
                    />
                </div>

                <div className='mb-6'>
                    <label
                        htmlFor='password'
                        className='block text-gray-700 text-sm font-bold mb-2'
                    >
                        Contraseña
                    </label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='••••••••'
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600'
                        required
                    />
                </div>

                <button
                    type='submit'
                    disabled={isLoading}
                    className='w-full rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50'
                >
                    {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
                </button>

                <p className='text-center text-gray-600 text-sm mt-4'>
                    ¿No tienes cuenta?{' '}
                    <Link to='/registro' className='text-indigo-600 hover:text-indigo-500 font-bold'>
                        Registrate
                    </Link>
                </p>
            </form>
        </div>
    )
}
