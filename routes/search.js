const express = require('express')
const router = express.Router()
const searchController = require('../controllers/search')

router.get('/entry/allOrdered', searchController.findAllOrdered)
router.get('/entry/allUnordered', searchController.findAllUnordered)
router.get('/timestamp/byCourseNumber', searchController.findByCourseNumber)

module.exports = router