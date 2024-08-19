import { createApp } from "./app.js"
import { RestauranteModel } from "./models/mysql/restauranteModel.js"

createApp({ restauranteModel: RestauranteModel })
console.log('Holi')