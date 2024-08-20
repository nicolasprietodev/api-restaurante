import express, { json } from "express";
import { createRestauranteRouter } from "./routes/restauranteRouter.js";
import { corsMiddleware } from "./middleware/cors.js";

export const createApp = ({ restauranteModel }) => {
  const app = express();
  const PORT = process.env.PORT ?? 1235;

  app.disable("x-powered-by");
  app.use(json());
  app.use(corsMiddleware);
  app.use("/restaurante", createRestauranteRouter({ restauranteModel }));
  console.log("estamos en app");

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
  });
};
