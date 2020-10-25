const { Router } = require("express");
const router = Router(); // para crear rutas
const contact = require("../services/contact.services");

//router.route("/").get((req, res) => res.send("entries "));
router.post("/", contact.createContact);
router.get("/", contact.getContacts);
router.get("/:id", contact.getContact);
router.put("/:id", contact.updateContact);
router.delete("/:id", contact.deleteContact);

module.exports = router; // enrutador del archivo
