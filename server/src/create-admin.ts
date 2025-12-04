import db from "./config/db";
import User from "./models/User.model";
import { hashPassword } from "./utils/auth";
import colors from "colors";

async function createFirstAdmin() {
    try {
        await db.authenticate();
        // Sincronizar modelos (alter table si es necesario)
        await db.sync({ alter: true });

        const email = "admin@example.com";
        const password = "admin123456";
        const name = "Administrador";

        // Verificar si ya existe
        const exists = await User.findOne({ where: { email } });
        if (exists) {
            console.log(colors.yellow("El admin ya existe"));
            process.exit(0);
        }

        // Crear admin
        const hashedPassword = await hashPassword(password);
        await User.create({
            email,
            password: hashedPassword,
            name,
            role: 'admin'
        });

        console.log(colors.green.bold("✓ Admin creado exitosamente"));
        console.log(colors.cyan("Email: " + email));
        console.log(colors.cyan("Password: " + password));
        console.log(colors.yellow("\n⚠️  Cambia la contraseña después de iniciar sesión"));
        process.exit(0);
    } catch (error) {
        console.log(colors.red.bold("Error: " + error));
        process.exit(1);
    }
}

createFirstAdmin();
