import express from "express";
import mongoose from "mongoose";
import "dotenv/config.js";
import "./src/database.js";

const app = express();
app.use(express.json());

//CABECERAS con métodos permitidos
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

const port = process.env.PORT || 8088;

app.get("/", async function (req, res) {
    return res.json("Microservicio operacional / V. 01 / Brenda Pilozo ");
});

const personas = [
    {
      "nombre": "Brenda",
      "apellido": "Perez",
      "edad": "28"
    },
    {
      "nombre": "Camila",
      "apellido": "Muñoz",
      "edad": "25"
    },
    {
      "nombre": "Enrique",
      "apellido": "Lopez",
      "edad": "40"
    },
    {
      "nombre": "Daniela",
      "apellido": "Martinez",
      "edad": "23"
    },
    {
      "nombre": "Laura",
      "apellido": "Yagual",
      "edad": "55"
    },
    {
      "nombre": "Juan",
      "apellido": "Dominguez",
      "edad": "40"
    },
    {
      "nombre": "Karla",
      "apellido": "Rojas",
      "edad": "34"
    },
    {
      "nombre": "Lissette",
      "apellido": "Dominguez",
      "edad": "32"
    },
    {
      "nombre": "Valentina",
      "apellido": "Davila",
      "edad": "25"
    },
    {
      "nombre": "Oscar",
      "apellido": "Suarez",
      "edad": "32"
    }
];

function getDatosPersonas(nombre, apellido) {
    return personas.filter(persona => {
        if (nombre && apellido) {
            return persona.nombre.toLowerCase().includes(nombre.toLowerCase()) && 
                   persona.apellido.toLowerCase().includes(apellido.toLowerCase());
        } else if (nombre) {
            return persona.nombre.toLowerCase().includes(nombre.toLowerCase());
        } else if (apellido) {
            return persona.apellido.toLowerCase().includes(apellido.toLowerCase());
        } else {
            return false;
        }
    });
}

// Listar todos los registros: http://localhost:8088/personas
app.get("/personas", async function (req, res) {
  try {
      return res.status(200).json({resp: true, data: personas});
  } catch (error) {
      console.error(error.message);
      return res.status(400).json({resp: false, mensaje: "Error al obtener la listado de personas", error: error.message});
  }
});


// Por nombre: http://localhost:8088/persona?nombre=Brenda
// Nombre y apellido: http://localhost:8088/persona?apellido=Martinez&nombre=Daniela
app.get("/persona", async function (req, res) {
    try {
        const {nombre, apellido} = req.query;
        const datosPersonas = getDatosPersonas(nombre, apellido);

        if (datosPersonas.length > 0) {
            return res.status(200).json({resp: true, data: datosPersonas});
        } else {
            return res.status(404).json({resp: false, mensaje: "No se encontraron personas con los parámetros especificados"});
        }
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({resp: false, mensaje: "Error al obtener los datos de las personas", error: error.message});
    }
});


//Por edad: http://localhost:8088/edad/25
app.get('/edad/:edad', (req, res) => {
  const edad = parseInt(req.params.edad);
  const filteredPersonas = personas.filter(persona => parseInt(persona.edad) === edad);
  res.json(filteredPersonas);
  
});

// MENSAJE DE EJECUCION DE SERVICIO
app.listen(port, ()=>{
    console.log("Servidor en", port)
});