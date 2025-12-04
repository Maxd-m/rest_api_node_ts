import { Router } from "express";
import { body } from "express-validator";
import { register, login, createAdmin } from "./auth";
import { handleInputErrors, authenticateToken, authorizeAdmin } from "../middleware";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      summary: Register a new user
 *      tags:
 *          - Auth
 *      description: Create a new user account
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Juan Perez"
 *                          email:
 *                              type: string
 *                              example: "juan@example.com"
 *                          password:
 *                              type: string
 *                              example: "password123"
 *      responses:
 *          201:
 *              description: User registered successfully
 *          400:
 *              description: Bad Request - Email already exists or invalid input
 */
router.post(
    "/register",
    body("name").notEmpty().withMessage("El nombre no puede ser vacío"),
    body("email").isEmail().withMessage("Email no válido"),
    body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
    handleInputErrors,
    register
);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      summary: Login user
 *      tags:
 *          - Auth
 *      description: Authenticate user and return JWT token
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: "juan@example.com"
 *                          password:
 *                              type: string
 *                              example: "password123"
 *      responses:
 *          200:
 *              description: Login successful
 *          401:
 *              description: Invalid credentials
 */
router.post(
    "/login",
    body("email").isEmail().withMessage("Email no válido"),
    body("password").notEmpty().withMessage("La contraseña es requerida"),
    handleInputErrors,
    login
);

/**
 * @swagger
 * /api/auth/admin:
 *  post:
 *      summary: Create a new admin user (admin only)
 *      tags:
 *          - Auth
 *      description: Create a new admin account (requires admin authentication)
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Admin User"
 *                          email:
 *                              type: string
 *                              example: "admin@example.com"
 *                          password:
 *                              type: string
 *                              example: "password123"
 *      responses:
 *          201:
 *              description: Admin user created successfully
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Not authorized (not admin)
 */
router.post(
    "/admin",
    authenticateToken,
    authorizeAdmin,
    body("name").notEmpty().withMessage("El nombre no puede ser vacío"),
    body("email").isEmail().withMessage("Email no válido"),
    body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
    handleInputErrors,
    createAdmin
);

export default router;
