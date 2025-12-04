import {Request, Response, NextFunction} from 'express'
import { validationResult } from 'express-validator';
import { verifyToken, JWTPayload } from '../utils/jwt';

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err: any) => err.msg).join(', ');
        console.log('Errores de validación:', errorMessages);
        return res.status(400).json({ 
            message: errorMessages,
            errors: errors.array() 
        });
    }
    next()
}

// Extender Express Request para incluir datos del usuario autenticado
declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload
        }
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    const payload = verifyToken(token);
    if (!payload) {
        return res.status(403).json({ message: "Token inválido o expirado" });
    }

    req.user = payload;
    next();
}

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({ message: "No autenticado" });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "No tienes permisos de administrador" });
    }

    next();
}