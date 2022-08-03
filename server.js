// set up variables

const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const mongoose = require('mongoose')
const Transcript = require('./models/transcriptModel.js')
const path = require('path')
const mongodb = require('mongodb');
require('dotenv').config()
const fixieData = process.env.FIXIE_SOCKS_HOST.split(new RegExp('[/(:\\/@/]+'));

// set up middleware

app.set('view engine', 'ejs')
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// connect to db using fixie SOCKS proxy

mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: mongodb.ServerApiVersion.v1,
      proxyUsername: fixieData[0],
      proxyPassword: fixieData[1],
      proxyHost: fixieData[2],
      proxyPort: fixieData[3]},
    (error) => {
      if(error){
        console.log(error)
      }
      console.log('Connected to database')}
)

// no proxy setup
// mongoose.connect(process.env.DB_CONNECTION, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }, (error) => {
//   if(error){
//     console.log(error)
//   }
//   console.log("Connected to database")
// })

// ROUTES

// Main page

app.get('/', async (request, response) => {
    try {
      response.render('index.ejs')
    } catch (err) {
        if (err) return response.status(500).send(err)
    }
})

// This setup is for regex search of any ENTRY field containing all words, in that order
app.get("/search/entry/allOrdered", async (request, response) => {

  // Pagination setup
  let perPage = 20
  let page = request.query.page || 1
  // query setup
  let lowerCasedEntry = String(request.query.entry).toLowerCase().trim().replace(/[^a-z0-9]/gi,'')
  if(lowerCasedEntry === ""){
    lowerCasedEntry = '___'
  }
  let query = {"entry": {$regex: String(lowerCasedEntry)}}
  let sort = {_id: 1}
  // query to mongodb
  Transcript.find(query).sort(sort).skip((perPage * page) - perPage).limit(perPage)
  .exec((error, transcriptsList) => {
    Transcript.countDocuments(query).exec((error, count) => {
      if(error) return next(error)
      if(count === 0){
        response.render('results.ejs', {
            transcripts: {
              timestamp: "0-0",
              entry: `${request.query.entry}`
            },
            current: 1,
            pages: 1,
            perPage: 1,
            entry: `${request.query.entry}`,
            urlBase: "/search/entry/allOrdered",
            count: 0
        })
      } else{
        response.render('results.ejs', {
          transcripts: transcriptsList,
          current: page,
          pages: Math.ceil(count / perPage),
          perPage: perPage,
          entry: request.query.entry,
          urlBase: "/search/entry/allOrdered",
          count: count
        })
      }
    })
  })
})

// This setup is for regex search of any ENTRY field containing all of the
// words (except allows any order)
app.get("/search/entry/allUnordered", async (request, response) => {

  // Pagination setup
  let perPage = 20
  let page = request.query.page || 1

  // query setup
  const queryString = String(request.query.entry).toLowerCase().trim().replace(/[^a-z0-9]/gi,'')
  let allQueries = []
  if(queryString === ""){
    allQueries = [{"entry": {$regex: String("___")}}]
  } else{
    let splitQuery = queryString.split(" ")
    splitQuery.forEach(element => {
      allQueries.push({"entry": {$regex: String(element)}})
    })
  }

  const query = {$and: allQueries}
  let sort = {_id: 1}

  // query to mongodb
  Transcript.find(query).sort(sort).skip((perPage * page) - perPage).limit(perPage)
  .exec((error, transcriptsList) => {
    Transcript.countDocuments(query).exec((error, count) => {
      if(error) return next(error)
      if(count == 0){
        response.render('results.ejs', {
          transcripts: {
              timestamp: "0-0",
              entry: `${request.query.entry}`
            },
            current: 1,
            pages: 1,
            perPage: 1,
            entry: `${request.query.entry}`,
            urlBase: "/search/entry/allUnordered",
            count: 0
        })
      } else{
        response.render('results.ejs', {
          transcripts: transcriptsList,
          current: page,
          pages: Math.ceil(count / perPage),
          perPage: perPage,
          entry: request.query.entry,
          urlBase: "/search/entry/allUnordered",
          count: count
        })
      }
    })
  })
})

// This setup is for regex search of any TIMESTAMP related to a course number (1-41 currently)
app.get("/search/timestamp/byCourseNumber", async (request, response) => {

  // Pagination setup
  let perPage = 20
  let page = request.query.page || 1

  // query setup
  const courseNumber = request.query.entry
  let search
  if(Number(courseNumber)){
    search = "^" + courseNumber + "-"
  } else{
    search = "^" + 1 + "-"
  }
  const query = {timestamp: new RegExp(search)}
  let sort = {_id: 1}
  Transcript.find(query).sort(sort).skip((perPage * page) - perPage).limit(perPage)
  .exec((error, transcriptsList) => {
    Transcript.countDocuments(query).exec((error, count) => {
      if(error) return next(error)
      if(count === 0){
        response.render('results.ejs', {
            transcripts: {
              timestamp: "0-0",
              entry: `${request.query.entry}`
            },
            current: 1,
            pages: 1,
            perPage: 1,
            entry: `${request.query.entry}`,
            urlBase: "/search/timestamp/byCourseNumber",
            count: "0"
        })
      } else{
        response.render('results.ejs', {
          transcripts: transcriptsList,
          current: page,
          pages: Math.ceil(count / perPage),
          perPage: perPage,
          entry: request.query.entry,
          urlBase: "/search/timestamp/byCourseNumber",
          count: count
        })
      }
    })
  })
})

// Browse by course, browse by topic?

app.get('/browse', async (request, response) => {
    try {
        response.render('browse.ejs')
    } catch (err) {
        if (err) return response.status(500).send(err)
    }
})


// listen to routes

app.listen(process.env.PORT || PORT, () => console.log(`Server is running on port ${PORT}`))
