const express = require('express')
const ongController = require('./controllers/OngController')
const incidentsController = require('./controllers/IncidentController')
const especificIncident = require('./controllers/ProfileController')
const sessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/session', sessionController.create)

routes.get('/ongs', ongController.list)
routes.post('/ongs', ongController.create)

routes.get('/profile', especificIncident.list)

routes.post('/incidents', incidentsController.create)
routes.get('/incidents', incidentsController.list)
routes.delete('/incidents/:id', incidentsController.delete)

module.exports = routes