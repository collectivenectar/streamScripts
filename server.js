const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const mongoose = require('mongoose')
require('dotenv').config()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    () => {console.log('Connected to database')}
)

app.get('/', async (request, response) => {
    try {
        response.render('index.ejs')
    } catch (err) {
        if (err) return response.status(500).send(err)
    }
})
app.get('/results', async (request, response) => {
    try {
        response.render('results.ejs')
    } catch (err) {
        if (err) return response.status(500).send(err)
    }
})
app.get('/browse', async (request, response) => {
    try {
        response.render('browse.ejs')
    } catch (err) {
        if (err) return response.status(500).send(err)
    }
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
