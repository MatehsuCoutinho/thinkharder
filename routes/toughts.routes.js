const express = require('express')
const router = express.Router()
const ToughtController = require('../controllers/toughts.controller')

router.get('/', ToughtController.showToughts)

module.exports = router