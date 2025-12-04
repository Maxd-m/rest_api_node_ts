import jwt from "jsonwebtoken";

export interface JWTPayload {
    id: number;
    email: string;
    role: 'user' | 'admin';
}

export function generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, process.env.JWT_SECRET || "tu_secreto_aqui", {
        expiresIn: "7d"
    });
}

export function verifyToken(token: string): JWTPayload | null {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || "tu_secreto_aqui") as JWTPayload;
        return payload;
    } catch (error) {
        return null;
    }
}
