import express, { json } from 'express'
import { createRestauranteRouter } from './routes/restauranteRouter.js'

export const createApp = ({ restauranteModel }) => {
    const app = express()
    app.disable('x-powered-by')
    app.use(json())
    const PORT = process.env.PORT ?? 1235
    
    app.use ('/restaurante', createRestauranteRouter({ restauranteModel }))
    console.log('estamos en app')
    


    app.listen(PORT , () => {
        console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)
    })
}


