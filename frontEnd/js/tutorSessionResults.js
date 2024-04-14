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

const dayMap = {M: 'Monday', T: 'Tuesday', W: 'Wednsday', R: 'Thursday', F: 'Friday', S: 'Saturday', U: 'Sunday'}


async function addTutorSession(tutorSessionId) {
  const updateData = {
    signedUpTutorSessions: [tutorSessionId]
  }
  const requestData = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
    credentials: "include",
  };
return await fetch("http://localhost:3500/user/tutorSession/", requestData)
.then((stuff) => {
  //console.log(stuff)
})
}

async function findTutorSessions(courseName, parentEl)  {
  await fetch(`http://localhost:3500/tutor/courseName/${courseName}`).then((result) => {
    // console.log("asdasddas", result.json());
  return result.json()
})
.then((tutorSessions) => {
  const createdDays = [];
  if (tutorSessions.length <= 0) {
    parentEl.querySelector(".tutorCon").innerHTML = `
      <div class="noTutorSessions">
        <p>No tutor sessions available</p>
        <div onclick="window.location.href ='tutorHomepage.html';" class="becomeATutorButton">Become a Tutor</div>
      </div>`
    //console.log(parentEl)
  }
  tutorSessions.forEach((element) => {
    element.time.forEach((d)=> {
      //console.log("element", element);
      const day = d.day;
      if (createdDays.indexOf(day) == -1) {
        createdDays.push(day);
        const calEl = document.createElement('div');
        calEl.innerHTML = `<p class="calTitle">${dayMap[day]}</p>`
        calEl.id = day;
        calEl.classList.add('calDiv');
        parentEl.querySelector(".tutorCon").appendChild(calEl)
      }
      const startTime = d.start_time;
      const endTime = d.end_time;
      const timeRange = startTime + "-" + endTime;
      const timeEl = document.createElement('p');
      timeEl.id = element._id;
      timeEl.addEventListener(`click`, ()=>{addTutorSession(timeEl.id)})
      timeEl.classList.add(`timeButton`);
      timeEl.innerText = timeRange;
      parentEl.querySelector(`#${day}`).appendChild(timeEl)
      //console.log("day:", day)
    })
    //console.log("adddds", element);


  })
  // console.log("ts: ", tutorSessions)
})
}

courseDataValue.forEach( async (course) => {
  const courseArray = course.split("\n\n")
  let courseName = courseArray.join("_");
  // courseName = courseName.replaceAll("__", "_")
  courseName = courseName.replaceAll(" ", "_")

  // console.log("cNj:", courseName);

  const courseDivEl = document.querySelector("#coursesDiv");

  const courseTitle = courseArray[0] + " " + courseArray[1];

  

  const courseConEl = document.createElement('div');
  const courseTitleEl = document.createElement('div');
  const tutorConEl = document.createElement('div');

  courseConEl.classList.add('courseCon');
  courseTitleEl.classList.add('courseTitle');
  tutorConEl.classList.add('tutorCon');

  courseTitleEl.innerHTML = `<h2>${courseTitle}</h2>`

  courseConEl.appendChild(courseTitleEl);
  courseConEl.appendChild(tutorConEl);

  const tutorSessions = await findTutorSessions(courseName, courseConEl);
  
  courseDivEl.appendChild(courseConEl)

})


async function displayCourses() {
  const requestData = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
  let user;
  await fetch("http://localhost:3500/user/", requestData).then((result) => {
      // console.log("result: ", result);
    return result.json().then((data)=>{
          // console.log("data: ", data);
          user=data;
    })
  })

  let firstName = user.firstName;

  //console.log(firstName);

  const welcomeUserNameEl = document.querySelector('#welcomeUserName');
  welcomeUserNameEl.innerText = firstName; 
  
}
displayCourses();