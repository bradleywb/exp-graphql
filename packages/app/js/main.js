(function () {
  'use strict';

  let search = encodeURIComponent(`query {
    courses {
      ... CourseData
    }
  }

  fragment CourseData on Course {
    title
    author
    topic
    description
  }`);

  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ search })
  };

  let resultsContainer = document.getElementById('results');

  getCourses().then(function (res) {
    let courses = res.data.courses;

    for (let i=0;i<courses.length;i++) {
      let result = document.createElement('li');

      for (let key in courses[i]) {
        let elem = document.createElement('div');
        let text = document.createTextNode(key + ': ' + courses[i][key]);

        elem.appendChild(text);

        result.appendChild(elem);
      }

      resultsContainer.appendChild(result);
    }
  });

  function getCourses() {
    return fetch('http://localhost:4000/graphql?query=' + search, opts)
      .then(function (res) {
        return res.json();
      }).catch(function (err) {
        console.log(err);
      });
  }
})();
