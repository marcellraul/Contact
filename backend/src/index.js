"use strict";

const db = require("./db");
const app = require("./app");
async function Main() {
  await app.listen(app.get("port"), () => {
    console.log("server on port:", app.get("port"));
  });
  db.startConnection();
}

Main();
