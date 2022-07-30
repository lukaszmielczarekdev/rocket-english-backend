import Trophy from "../models/trophyModel.js";

export const getTrophies = async (req, res) => {
  try {
    const trophies = await Trophy.find();

    res.status(200).json(trophies);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
