import {createBrowserRouter, Navigate} from 'react-router-dom';
import Layout from './layouts/Layout';
import Products, {loader as productsLoader, action as updateAvailabilityAction} from './views/Products';
import NewProduct, {action as NewProductAction} from './views/NewProduct';
import EditProduct, { loader as EditProductLoader, action as editProductAction} from './views/EditProduct';
import { action as deleteProductAction } from './components/ProductDetails';
import Login from './views/Login';
import Register from './views/Register';
import AdminPanel from './views/AdminPanel';
import { getToken } from './services/AuthService';

// Funciones para verificar autenticación en tiempo de navegación
function isAuthenticated() {
    return !!getToken()
}

function checkIsAdmin() {
    const user = localStorage.getItem('user')
    if (!user) return false
    try {
        const parsedUser = JSON.parse(user)
        return parsedUser.role === 'admin'
    } catch {
        return false
    }
}

// Componente protector de rutas para usuarios autenticados
function ProtectedRoute({ element }: { element: React.ReactNode }) {
    return isAuthenticated() ? element : <Navigate to="/login" />;
}

// Componente protector de rutas para admins
function AdminRoute({ element }: { element: React.ReactNode }) {
    return isAuthenticated() && checkIsAdmin() ? element : <Navigate to="/" />;
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <ProtectedRoute element={<Products />} />,
                loader: productsLoader,
                action: updateAvailabilityAction
            },
            {
                path: "productos/nuevo",
                element: <AdminRoute element={<NewProduct />} />,
                action: NewProductAction
            },
            {
                path: "productos/:id/editar",
                element: <AdminRoute element={<EditProduct />} />,
                loader: EditProductLoader,
                action: editProductAction
            },
            {
                path: "productos/:id/eliminar",
                action: deleteProductAction
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "registro",
                element: <Register />
            },
            {
                path: "admin",
                element: <AdminRoute element={<AdminPanel />} />
            }
        ]
    }
])