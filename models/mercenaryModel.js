import mongoose from "mongoose";

const mercenarySchema = mongoose.Schema({
  name: String,
  lvl: Number,
  price: Number,
  strength: Number,
  planet: String,
});

export default mongoose.model("Mercenary", mercenarySchema);
