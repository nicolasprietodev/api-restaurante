import express, { json } from "express";
import { createRestauranteRouter } from "./routes/restauranteRouter.js";
import { corsMiddleware } from "./middleware/cors.js";
import 'dotenv/config'

export const createApp = ({ restauranteModel }) => {
  const app = express();
  
  app.disable("x-powered-by");
  app.use(json());
  app.use(corsMiddleware());
  app.use("/restaurante", createRestauranteRouter({ restauranteModel }));
  console.log("estamos en app");
  const PORT = process.env.PORT ?? 1235;

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
  });
};
