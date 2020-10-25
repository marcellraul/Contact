const { Schema, model } = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const mongoose = require("mongoose"); //

const contactSchema = new Schema(
  {
    cod: { type: String, trim: true, unique: true },
    name: { type: String, required: true },
    namecompany: { type: String, required: true },
    category: { type: String, required: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
contactSchema.plugin(autoIncrement.plugin, {
  model: "contact", // collection or table name in which you want to apply auto increment
  field: "cod", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

module.exports = model("contact", contactSchema);
