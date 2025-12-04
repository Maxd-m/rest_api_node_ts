import { safeParse} from 'valibot'
import axios from 'axios'
import { DraftProductSchema, ProductSchema, ProductsSchema, type Product } from "../types"
import { toBoolean } from '../utils'
import { getToken } from './AuthService'

type ProductData = {
    [k: string]: FormDataEntryValue;
}

function getHeaders() {
    const token = getToken()
    return {
        Authorization: `Bearer ${token}`
    }
}

export async function addProduct(data : ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if(result.success) {
            console.log("VITE_API_URL:", import.meta.env.VITE_API_URL)
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            console.log("URL completa:", url)
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            }, {
                headers: getHeaders()
            })
        } else {
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios(url, {
            headers: getHeaders()
        })
        const result = safeParse(ProductsSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log(error)
        return []
    }
}  

export async function getProductsById(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios(url, {
            headers: getHeaders()
        })
        const result = safeParse(ProductSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log(error)
    }
}  

export async function updateProduct( data : ProductData, id: Product['id']) {
    try {

        const result = safeParse(ProductSchema, {
            id: id,
            name: data.name,
            price: +data.price,
            availability: toBoolean(data.availability.toString())
        })
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, {
                name: result.output.name,
                price: result.output.price,
                availability: result.output.availability
            }, {
                headers: getHeaders()
            })
        } else {
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url, {
            headers: getHeaders()
        })
    } catch (error) {
        console.log(error)
    }
}

export async function updateProductAvailability (id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.patch(url, {}, {
                headers: getHeaders()
            })
    }
    catch (error) {
        console.log(error)
    }
}