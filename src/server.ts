import express from "express";
import router from "./router";

const server = express()

// se ejecuta en todos los request
server.use('/api', router)

export default server