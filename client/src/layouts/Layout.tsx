import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Layout() {
    const { user, isAuthenticated, isAdmin, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <>
            <header className="bg-slate-800">
                <div className="mx-auto max-w-6xl py-10 flex justify-between items-center">
                    <h1 className="text-4xl font-extrabold text-white">Administrador de Productos</h1>
                    <div className="flex gap-4 items-center">
                        {isAuthenticated && user ? (
                            <>
                                <div className="text-white text-sm">
                                    <p>Bienvenido, {user.name}</p>
                                    {isAdmin && <p className="text-xs text-yellow-400">👑 Admin</p>}
                                </div>
                                {isAdmin && (
                                    <Link
                                        to="/admin"
                                        className="rounded-md bg-yellow-600 px-4 py-2 text-sm font-bold text-white hover:bg-yellow-500"
                                    >
                                        Panel Admin
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-500"
                                >
                                    Salir
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-500"
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link
                                    to="/registro"
                                    className="rounded-md bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-500"
                                >
                                    Registrate
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>
            <main className="mt-10 mx-auto max-w-6xl p-10 bg-white shadow">
                <Outlet />
            </main>
        </>
    );
}
