import Planet from "../models/planetModel.js";

export const createPlanet = async (req, res) => {
  const planet = req.body;

  const newPlanet = new Planet({ ...planet });

  try {
    await newPlanet.save();

    res.status(201).json(newPlanet);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getPlanets = async (req, res) => {
  try {
    const planets = await Planet.find();

    res.status(200).json(planets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePlanet = async (req, res) => {
  const { id: _id } = req.params;

  const planet = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Planet not found");

  const updatedPlanet = await Planet.findOneAndUpdate({ _id }, planet, {
    new: true,
  });
  res.json(updatedPlanet);
};

export const deletePlanet = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Planet not found");

  await Planet.findOneAndRemove({ _id });

  res.json({ message: "Planet deleted" });
};
