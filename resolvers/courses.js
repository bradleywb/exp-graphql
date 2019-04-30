// ---------------------------
// <imports>
// ---------------------------

const fetch = require('node-fetch');
const fs = require('fs');

// ---------------------------
// </imports>
// ---------------------------

const dataURI = 'http://localhost:4001/data/courses.json';

// ---------------------------
// <api>
// ---------------------------

module.exports = {
  getCourse: getCourse,
  getCourses: getCourses,
  createCourse: createCourse,
  updateCourse: updateCourse,
  deleteCourse: deleteCourse
};

// ---------------------------
// </api>
// ---------------------------

// ---------------------------
// <method defs>
// ---------------------------

function getData() {
  return fetch(dataURI).then(function (res) {
    return res.json();
  });
}

function updateData(data) {
  fs.writeFile('./data/courses.json', JSON.stringify(data), (err) => {
    if (err) throw err;
  });
}

function getCourse(args) {
  return getData().then(function (courses) {
    return courses.filter(course => {
      return course.id == args.id;
    })[0];
  });
}

function getCourses(args) {
  return getData().then(function(courses) {
    return args.topic ? courses.filter(course => course.topic === args.topic) : courses;
  });
}

function createCourse(args) {
  return getData().then(function (courses) {
    let id = courses[courses.length - 1].id + 1;

    let course = {
      id: id,
      ... args.input
    };

    courses.push(course);

    updateData(courses);

    return course;
  });
}

function updateCourse(args) {
  if (!args.id) throw new Error('missing ID');

  return getData().then(function (courses) {
    let course = null;
    let i;

    for (i=0;i<courses.length;i++) {
      if (courses[i].id == args.id) {
        if (args.input.title) {
          courses[i].title = args.input.title;
        }
        if (args.input.author) {
          courses[i].author = args.input.author;
        }
        if (args.input.description) {
          courses[i].description = args.input.description;
        }
        if (args.input.topic) {
          courses[i].topic = args.input.topic;
        }
        if (args.input.url) {
          courses[i].url = args.input.url;
        }

        course = courses[i];
        break;
      }
    }

    if (!course) throw new Error('course ' + args.id + ' not found');

    updateData(courses);

    return course;
  });
}

function deleteCourse(args) {
  if (!args.id) throw new Error('missing ID');

  return getData().then(function (courses) {
    let course = null;
    let i;

    for (i=0;i<courses.length;i++) {
      if (courses[i].id == args.id) {
        course = courses[i];
        courses.splice(i, 1);
        break;
      }
    }

    if (!course) throw new Error('course ' + args.id + ' not found');

    updateData(courses);

    return course;
  });
}

// ---------------------------
// </method defs>
// ---------------------------
