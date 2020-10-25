const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
//const ejs = require('ejs') //para renderizar, express lo usa pñor defecto, solo lo configuramos
const app = express();

// Importing Routes
const routescotact = require("./routes/contac.routes");

//settings
app.set("port", process.env.PORT || 3000);

//middlewares --> necesita entender la imagen o lo que le estas enviando y uno vez lo hace pasa a las rutas.. por eso se hace antes de las rutas
//Configuramos bodyParser para que convierta el body de nuestras peticiones a JSON
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes
app.use("/contact", routescotact);

module.exports = app;
