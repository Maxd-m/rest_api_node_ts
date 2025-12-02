import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors"
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger'
import cors, {CorsOptions} from "cors";
import morgan from "morgan";

// conectar a db
export async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    //console.log(colors.blue("Conexion exitosa a DB"))
  } catch (error) {
    //console.log(error)
    console.log(colors.red.bold("Error de conexion a DB"))
  }
}

connectDB()

// INstancia de express
const server = express()

// Permitir conexiones
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error("No permitido por CORS"))
        }
    }
}

server.use(cors(corsOptions))

// leer datos de formulario
server.use(express.json())


server.use(morgan('dev'))
// se ejecuta en todos los request
server.use('/api/products', router)

// Documentacion de la API
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server