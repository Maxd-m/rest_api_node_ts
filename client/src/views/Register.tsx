import { FormEvent, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register as registerService } from '../services/AuthService'
import { useAuth } from '../contexts/AuthContext'
import ErrorMessage from '../components/ErrorMessage'

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        if (formData.password !== formData.passwordConfirm) {
            setError('Las contraseñas no coinciden')
            return
        }

        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            return
        }

        setIsLoading(true)

        try {
            const response = await registerService({
                name: formData.name,
                email: formData.email,
                password: formData.password
            })
            login(response.user, response.token)
            navigate('/')
        } catch (err: any) {
            console.error('Error en registro:', err)
            const errorMsg = err.response?.data?.message 
                || err.message 
                || 'Error al registrarse'
            setError(errorMsg)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='mx-auto max-w-md'>
            <h2 className='text-4xl font-black text-slate-500 text-center mb-8'>Crear Cuenta</h2>

            {error && <ErrorMessage message={error} />}

            <form className='bg-white shadow-md rounded-lg p-6' onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label
                        htmlFor='name'
                        className='block text-gray-700 text-sm font-bold mb-2'
                    >
                        Nombre
                    </label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='Tu nombre'
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600'
                        required
                    />
                </div>

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
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='tu@email.com'
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600'
                        required
                    />
                </div>

                <div className='mb-4'>
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
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='••••••••'
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600'
                        required
                    />
                </div>

                <div className='mb-6'>
                    <label
                        htmlFor='passwordConfirm'
                        className='block text-gray-700 text-sm font-bold mb-2'
                    >
                        Confirmar Contraseña
                    </label>
                    <input
                        type='password'
                        id='passwordConfirm'
                        name='passwordConfirm'
                        value={formData.passwordConfirm}
                        onChange={handleChange}
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
                    {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                </button>

                <p className='text-center text-gray-600 text-sm mt-4'>
                    ¿Ya tienes cuenta?{' '}
                    <Link to='/login' className='text-indigo-600 hover:text-indigo-500 font-bold'>
                        Inicia sesión
                    </Link>
                </p>
            </form>
        </div>
    )
}
