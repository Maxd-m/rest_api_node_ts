import express from "express";
import router from "./router";
import db from "./config/db";

// conectar a db
async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    console.log("Conexion exitosa a DB")
  } catch (error) {
    console.log(error)
    console.log("error al conectarse a DB")
  }
}

connectDB()

const server = express()

// se ejecuta en todos los request
server.use('/api', router)

export default server