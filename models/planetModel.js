import mongoose from "mongoose";

const planetSchema = mongoose.Schema({
  name: String,
  description: String,
  infrastructure: String,
  climate: String,
  inhabitants: String,
  places: [String],
});

export default mongoose.model("Planet", planetSchema);
