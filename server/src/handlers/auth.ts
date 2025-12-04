import { Request, Response } from "express";
import User from "../models/User.model";
import { hashPassword, comparePassword } from "../utils/auth";
import { generateToken } from "../utils/jwt";

export async function register(req: Request, res: Response) {
    try {
        const { email, password, name } = req.body;

        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: "El email ya está registrado" });
        }

        // Hashear contraseña
        const hashedPassword = await hashPassword(password);

        // Crear usuario
        const user = await User.create({
            email,
            password: hashedPassword,
            name,
            role: 'user'
        });

        // Generar token
        const token = generateToken({ id: user.id, email: user.email, role: user.role });

        res.status(201).json({
            message: "Usuario registrado exitosamente",
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al registrar usuario" });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        // Buscar usuario
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Email o contraseña incorrectos" });
        }

        // Validar contraseña
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Email o contraseña incorrectos" });
        }

        // Generar token
        const token = generateToken({ id: user.id, email: user.email, role: user.role });

        res.json({
            message: "Sesión iniciada exitosamente",
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
}

export async function createAdmin(req: Request, res: Response) {
    try {
        const { email, password, name } = req.body;

        console.log('Datos recibidos:', { email, password, name });

        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            console.log('Email ya registrado:', email);
            return res.status(400).json({ message: "El email ya está registrado" });
        }

        // Hashear contraseña
        const hashedPassword = await hashPassword(password);

        // Crear usuario admin
        const user = await User.create({
            email,
            password: hashedPassword,
            name,
            role: 'admin'
        });

        res.status(201).json({
            message: "Usuario admin creado exitosamente",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error: any) {
        console.error('Error en createAdmin:', error.message);
        console.error('Stack:', error.stack);
        res.status(500).json({ message: `Error al crear usuario admin: ${error.message}` });
    }
}
