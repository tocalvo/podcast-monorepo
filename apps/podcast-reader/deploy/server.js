const express = require('express')
const path = require('path')

const app = express()

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(__dirname))

// Manejar rutas no encontradas (200)
app.use((req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, 'index.html'))
})

module.exports.handleHTTP = app
