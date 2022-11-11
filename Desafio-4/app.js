import express from 'express'
import { routeProducts } from './routes/products.routes.js'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Server running in port ${PORT}`))

app.use('/', express.static('public'))
app.use('/api/productos', routeProducts)