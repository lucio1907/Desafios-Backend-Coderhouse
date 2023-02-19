import express, { urlencoded } from 'express'
import handlebars from 'express-handlebars'
import { routeProducts } from './routes/products.routes.js'

const app = express()
app.use(express.json())
app.use(urlencoded({extended: true}))

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Server running in http://localhost:${PORT}`))

app.engine('hbs', handlebars.engine())
app.set('views', './views')
app.set('view engine', 'hbs')


app.use('/api/productos', routeProducts)