import Mercenary from "../models/mercenaryModel.js";

export const getMercenaries = async (req, res) => {
  try {
    const mercenaries = await Mercenary.find();

    res.status(200).json(mercenaries);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
