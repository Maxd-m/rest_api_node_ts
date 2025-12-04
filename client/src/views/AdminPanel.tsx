import { useState, type FormEvent } from 'react'
import { createAdmin } from '../services/AuthService'
import ErrorMessage from '../components/ErrorMessage'

export default function AdminPanel() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)

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
        setSuccess('')

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
            await createAdmin({
                name: formData.name,
                email: formData.email,
                password: formData.password
            })
            setSuccess('Admin creado exitosamente')
            setFormData({
                name: '',
                email: '',
                password: '',
                passwordConfirm: ''
            })
        } catch (err: any) {
            console.error('Error completo:', err)
            const errorMsg = err.response?.data?.message 
                || err.response?.data?.errors?.[0]?.msg
                || err.message 
                || 'Error al crear admin'
            setError(errorMsg)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <h2 className='text-4xl font-black text-slate-500 mb-8'>Panel de Administrador</h2>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div className='bg-blue-50 p-6 rounded-lg'>
                    <h3 className='text-2xl font-bold text-blue-900 mb-4'>Crear Nuevo Admin</h3>
                    
                    {error && <ErrorMessage message={error} />}
                    {success && (
                        <div className='mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded'>
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
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
                                placeholder='Nombre del admin'
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
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
                                placeholder='admin@example.com'
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
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
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
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
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
                                required
                            />
                        </div>

                        <button
                            type='submit'
                            disabled={isLoading}
                            className='w-full rounded-md bg-blue-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-blue-500 disabled:opacity-50'
                        >
                            {isLoading ? 'Creando...' : 'Crear Admin'}
                        </button>
                    </form>
                </div>

                <div className='bg-yellow-50 p-6 rounded-lg'>
                    <h3 className='text-2xl font-bold text-yellow-900 mb-4'>Información del Sitio</h3>
                    <ul className='list-disc list-inside space-y-2 text-gray-700'>
                        <li>Solo administradores pueden crear nuevos admins</li>
                        <li>Los admin tienen acceso a este panel</li>
                        <li>Todos los usuarios pueden ver y gestionar productos</li>
                        <li>Los token expiran en 7 días</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
