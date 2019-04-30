const cors = require('cors');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const { importSchema } = require('graphql-import');

// ---------------------------
// <web app>
// ---------------------------

const app = express();

app.use(cors());

app.use('/css', express.static('css'));
app.use('/images', express.static('images'));
app.use('/js', express.static('js'));
app.use('/data', express.static('data'));

app.get('/', function (req, res, next) {
  res.sendFile('index.html', { root: __dirname });
});

app.listen(4001, () => console.log('server running at localhost:4001'));

// ---------------------------
// </web app>
// ---------------------------

// ---------------------------
// <GraphQL>
// ---------------------------

const gql = express();

gql.use(cors());

// GraphQL schema

const schema = buildSchema(importSchema('schemas/schema.graphql'));

let courses = require('./resolvers/courses.js');

let root = {
  course: courses.getCourse,
  courses: courses.getCourses,
  createCourse: courses.createCourse,
  updateCourse: courses.updateCourse,
  deleteCourse: courses.deleteCourse
};

gql.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
  rootValue: root,
  pretty: true
}));

gql.listen(4000, () => { console.log('Server running at localhost:4000') });

// ---------------------------
// </GraphQL>
// ---------------------------
