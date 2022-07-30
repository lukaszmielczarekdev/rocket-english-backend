import mongoose from "mongoose";

const trophySchema = mongoose.Schema({
  name: String,
  type: String,
  conditions: Object,
  reward: Number,
});

export default mongoose.model("Trophy", trophySchema);
