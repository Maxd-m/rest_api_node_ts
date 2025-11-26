import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors"

// conectar a db
async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    //console.log(colors.blue("Conexion exitosa a DB"))
  } catch (error) {
    console.log(error)
    console.log(colors.red.bold("error al conectarse a DB"))
  }
}

connectDB()

// INstancia de express
const server = express()

// leer datos de formulario
server.use(express.json())

// se ejecuta en todos los request
server.use('/api/products', router)

server.get('/api', (req, res) => {
  res.json({msg: 'Desde API'})
})

export default server