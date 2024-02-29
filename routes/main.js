const express = require('express')
const router = express.Router()
const searchController = require('../controllers/search')

router.get('/', searchController.root)
router.get('/browse', searchController.browse)

module.exports = router