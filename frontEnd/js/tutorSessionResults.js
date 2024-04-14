let courseInfoArray;

if (typeof data != "undefined") {
  courseInfoArray = [...data.info];
}

if (courseInfoArray)
  document.cookie = `courseData=${JSON.stringify(courseInfoArray)}`;

// Retrieving the cookie
const cookies = document.cookie.split(';');
let courseDataValue = null;
cookies.forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (name === 'courseData') {
        courseDataValue = JSON.parse(decodeURIComponent(value));
    }
});

// console.log(courseDataValue);

courseDataValue.forEach((course) => {
  const courseArray = course.split("\n\n")
  console.log(courseArray)
  const courseTitle = courseArray[0] + " " + courseArray[1];

  const courseDivEl = document.querySelector("#coursesDiv");

  console.log(courseDivEl);

  const courseConEl = document.createElement('div');
  const courseTitleEl = document.createElement('div');
  const tutorConEl = document.createElement('div');

  courseConEl.classList.add('courseCon');
  courseTitleEl.classList.add('courseTitle');
  tutorConEl.classList.add('tutorCon');

  courseTitleEl.innerHTML = `<p>${courseTitle}</p>`


  courseDivEl.appendChild(courseTitleEl)

})






// async function makeCourseHeaders() {
//     const requestData = {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//       };
//     let user;
//     await fetch("http://localhost:3500/user/", requestData).then((result) => {
//         console.log("result: ", result);
//       return result.json().then((data)=>{
//             console.log("data: ", data);
//             user=data;
//       })
//     })
    
//     const coursesDivEl = document.querySelector(`#coursesDiv`);
//     user.classList.forEach((course) => {
//         console.log("course: ", course)
//         const courseCardEl = document.createElement(`div`);
//         const courseArray = course.split("_");
//         const p1El = document.createElement('p');
//         const p2El = document.createElement('p');
//         p1El.innerText = courseArray[0] + " " + courseArray[1];
//         let p2ElText= "";
//          courseArray.slice(2).forEach((element) => {
//             p2ElText += element + " ";
//         });
//         p2El.innerText = p2ElText;
//         courseCardEl.appendChild(p1El);
//         courseCardEl.appendChild(p2El);

//         courseCardEl.classList.add(`courseCard`);

//         coursesDivEl.appendChild(courseCardEl);
//     });

//     const addCourseButtonEl = document.createElement(`div`);
//     addCourseButtonEl.classList.add(`addCourseButon`);

//     coursesDivEl.appendChild(addCourseButtonEl);
    
//   }
//   displayCourses();