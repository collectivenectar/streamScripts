// set up variables

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const mainRoutes = require('./routes/main.js');
const path = require('path');
require('dotenv').config();

// set up middleware

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to mongodb

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.log(error);
    }
    console.log('Connected to database');
  }
);

// ROUTES

app.use('/', mainRoutes)

// listen to routes

app.listen(process.env.PORT || PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);
