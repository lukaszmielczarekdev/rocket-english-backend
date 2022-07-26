import mongoose from "mongoose";

const planetSchema = mongoose.Schema({
  name: String,
  description: String,
  infrastructure: String,
  climate: String,
  nhabitants: String,
  places: Object,
});

export default mongoose.model("Planet", planetSchema);
