import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/router.js";

dotenv.config();
const app = express();
const PORT_SERVER = 3100;
mongoose
  .connect("mongodb://localhost/wordle")
  .then(() => console.log("Conexion Exitosa con la base de datos"))
  .catch((error) => {
    console.log(error);
  });

//middleware
app.use(cors());
app.use(express.json());
app.listen(PORT_SERVER, () => {
  console.log(
    `Servidor corriendo correctamente en http://localhost:${PORT_SERVER}`
  );
});
app.use("/", router);
