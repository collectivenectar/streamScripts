const express = require('express')
const router = express.Router()
const searchController = require('../controllers/search')

router.get('/', searchController.root)
router.get('/search/entry/allOrdered', searchController.findAllOrdered)
router.get('/search/entry/allUnordered', searchController.findAllUnordered)
router.get('/search/timestamp/byCourseNumber', searchController.findByCourseNumber)
router.get('/browse', searchController.browse)

module.exports = router