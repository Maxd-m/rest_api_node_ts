import express from "express";

const server = express()

// routing
//              request (lo que se pide)
//              response (lo que se obtiene)
server.get('/', (req, res) => {

  const datos = [
    { id: 1, nombre: "Juan" },
    { id: 2, nombre: "Juan" },
  ];
  res.json(datos)
})

export default server