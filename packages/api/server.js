const cors = require('cors');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const { importSchema } = require('graphql-import');

// ---------------------------
// <mock data server>
// ---------------------------

const dataServer = express();
dataServer.use(cors());
dataServer.use('/', express.static('data'));
dataServer.listen(4001, () => { console.log('Data server running at localhost:4001') });

// ---------------------------
// </mock data server>
// ---------------------------

// ---------------------------
// <GraphQL server>
// ---------------------------

const gql = express();

gql.use(cors());

// GraphQL schema

const schema = buildSchema(importSchema('./schemas/schema.graphql'));

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

gql.listen(4000, () => { console.log('GraphQL server running at localhost:4000') });

// ---------------------------
// </GraphQL server>
// ---------------------------
