"use strict";
const Contact = require("../models/contact.models");

async function createContact(req, res) {
  try {
    const { name, namecompany, category, email, phone, message } = req.body;
    const newContact = {
      name: name,
      namecompany: namecompany,
      category: category,
      email: email,
      phone: phone,
      message: message,
    };
    const contact = new Contact(newContact);
    await contact.save();
    console.log(contact);
    return res.json({
      message: "contact saved successfully",
      contact,
    });
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getContacts(req, res) {
  try {
    const gets = await Contact.find().sort({ cod: -1 });
    console.log(gets);
    return res.json(gets);
    res.status(201).send({ gets });
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getContact(req, res) {
  try {
    const { id } = req.params;
    const get = await Contact.findById(id);
    console.log(get);
    return res.json(get);
  } catch (error) {
    res.status(404).send({ message: error.message || "Error Occured" });
  }
}

async function deleteContact(req, res) {
  try {
    const { id } = req.params;
    const d = await Contact.findByIdAndDelete(id).then((c) => {
      if (!c) {
        return res.status(404).send({
          message: "Contact not found with id ",
        });
      }
    });
    return res.json({
      message: "Contact deleted",
      d,
    });
  } catch (error) {
    res.status(404).send({ message: error.message || "Error Occured" });
  }
}

async function updateContact(req, res) {
  try {
    const { id } = req.params;
    const { name, namecompany, category, email, phone, message } = req.body;
    const u = await Contact.findByIdAndUpdate(
      id,
      { name, namecompany, category, email, phone, message },
      { new: true }
    );
    console.log(u);
    return res.json({
      message: "Successfuly updated",
      u,
    });
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = {
  createContact,
  getContacts,
  getContact,
  deleteContact,
  updateContact,
};
