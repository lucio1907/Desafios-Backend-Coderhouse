const express = require('express')
const Container = require('./Classes/Contenedor.js')
const products = require('./Productos/productos.js')
const Files = require('./Classes/ReadFiles.js')

const files = new Files('productos.txt')
const productsArray = files.readFile()

const app = express()

app.get('/productos', (req, res) => {
    res.json(productsArray)
})

app.get('/productosRandom', (req, res) => {
    let totalIds = productsArray.length
    let random = Math.floor(Math.random() * totalIds)

    res.json(productsArray[random])
})

const PORT = 8080
const server = app.listen(PORT, () => console.log(`Server running in ${PORT}`))


const container = new Container()
container.save(products)

