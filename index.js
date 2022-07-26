import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/users.js";
import npcRoutes from "./routes/npc.js";
import planetRoutes from "./routes/planets.js";
import trophyRoutes from "./routes/trophies.js";

const app = express();

app.use(bodyParser.json({ limit: "5mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(cors());
app.use("/user", userRoutes);
app.use("/npc", npcRoutes);
app.use("/planet", planetRoutes);
app.use("/trophy", trophyRoutes);

app.get("/", (req, res) => res.send("Rocket English API"));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))
  )
  .catch((error) => console.log(error.message));
