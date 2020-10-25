"use strict";

const mongoose = require("mongoose");
async function startConnection() {
  //mongo crear a la db por mi, no es necesrio crearla
  //lo hacemos de manera asincrona
  const db = await mongoose.connect("mongodb://localhost/testmarcellcontact", {
    useNewUrlParser: true, // para que cuando conecte no de ningun error por consola
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log("Database is connected");
}

exports.startConnection = startConnection;
