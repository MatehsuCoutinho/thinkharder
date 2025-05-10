const express = require('express')
const router = express.Router()
const ToughtController = require('../controllers/toughts.controller')

const checkAuth = require('../helpers/auth').checkAuth

router.get('/', ToughtController.showToughts)
router.get('/add', checkAuth, ToughtController.createTought)
router.post('/add', checkAuth, ToughtController.createToughtSave)
router.get('/dashboard', checkAuth, ToughtController.dashboard)
router.post('/remove', checkAuth, ToughtController.ToughtRemove)

module.exports = router