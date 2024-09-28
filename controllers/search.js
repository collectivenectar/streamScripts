const Transcript = require('../models/transcriptModel');

module.exports = {
  root: async (request, response) => {
    try {
      response.render('index.ejs');
    } catch (err) {
      if (err) return response.status(500).send(err);
    }
  },
  findAllOrdered: async (request, response) => {
    // Pagination setup
    let perPage = 20;
    let page = request.query.page || 1;
    // query setup
    let lowerCasedEntry = String(request.query.entry)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/gi, '');
    if (lowerCasedEntry === '') {
      lowerCasedEntry = '___';
    }
    let query = { entry: { $regex: String(lowerCasedEntry) } };
    let sort = { _id: 1 };
    // query to mongodb
    Transcript.find(query)
      .sort(sort)
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec((error, transcriptsList) => {
        Transcript.countDocuments(query).exec((error, count) => {
          if (error) return response.status(500).send(error);
          if (count === 0) {
            response.render('results.ejs', {
              transcripts: {
                timestamp: '0-0',
                entry: `${request.query.entry}`,
              },
              current: 1,
              pages: 1,
              perPage: 1,
              entry: `${request.query.entry}`,
              urlBase: '/search/entry/allOrdered',
              count: 0,
            });
          } else {
            response.render('results.ejs', {
              transcripts: transcriptsList,
              current: page,
              pages: Math.ceil(count / perPage),
              perPage: perPage,
              entry: request.query.entry,
              urlBase: '/search/entry/allOrdered',
              count: count,
            });
          }
        });
      });
  },
  findAllUnordered: async (request, response) => {
    // Pagination setup
    let perPage = 20;
    let page = request.query.page || 1;

    // query setup
    const queryString = String(request.query.entry)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/gi, '');
    let allQueries = [];
    if (queryString === '') {
      allQueries = [{ entry: { $regex: String('___') } }];
    } else {
      let splitQuery = queryString.split(' ');
      splitQuery.forEach((element) => {
        allQueries.push({ entry: { $regex: String(element) } });
      });
    }

    const query = { $and: allQueries };
    let sort = { _id: 1 };

    // query to mongodb
    Transcript.find(query)
      .sort(sort)
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec((error, transcriptsList) => {
        Transcript.countDocuments(query).exec((error, count) => {
          if (error) return next(error);
          if (count == 0) {
            response.render('results.ejs', {
              transcripts: {
                timestamp: '0-0',
                entry: `${request.query.entry}`,
              },
              current: 1,
              pages: 1,
              perPage: 1,
              entry: `${request.query.entry}`,
              urlBase: '/search/entry/allUnordered',
              count: 0,
            });
          } else {
            response.render('results.ejs', {
              transcripts: transcriptsList,
              current: page,
              pages: Math.ceil(count / perPage),
              perPage: perPage,
              entry: request.query.entry,
              urlBase: '/search/entry/allUnordered',
              count: count,
            });
          }
        });
      });
  },
  findByCourseNumber: async (request, response) => {
    // Pagination setup
    let perPage = 20;
    let page = request.query.page || 1;

    // query setup
    const courseNumber = request.query.entry;
    let search;
    if (Number(courseNumber)) {
      search = '^' + courseNumber + '-';
    } else {
      search = '^' + 1 + '-';
    }
    const query = { timestamp: new RegExp(search) };
    let sort = { _id: 1 };

    Transcript.find(query)
      .sort(sort)
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec((error, transcriptsList) => {
        Transcript.countDocuments(query).exec((error, count) => {
          if (error) return next(error);
          if (count === 0) {
            response.render('results.ejs', {
              transcripts: {
                timestamp: '0-0',
                entry: `${request.query.entry}`,
              },
              current: 1,
              pages: 1,
              perPage: 1,
              entry: `${request.query.entry}`,
              urlBase: '/search/timestamp/byCourseNumber',
              count: '0',
            });
          } else {
            response.render('results.ejs', {
              transcripts: transcriptsList,
              current: page,
              pages: Math.ceil(count / perPage),
              perPage: perPage,
              entry: request.query.entry,
              urlBase: '/search/timestamp/byCourseNumber',
              count: count,
            });
          }
        });
      });
  },
  browse: async (request, response) => {
    try {
      response.render('browse.ejs');
    } catch (err) {
      if (err) return response.status(500).send(err);
    }
  },
};
