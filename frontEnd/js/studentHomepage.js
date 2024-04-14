console.log('help')

async function getTutorSession(tutorSessionId) {
  const requestData = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };
  return await fetch("http://localhost:3500/tutor/tutorSessionId/" + tutorSessionId, requestData)
  .then((result) => {
    return result.json();
  });
}

async function getCourseName(courseId) {
  const requestData = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };
  return await fetch("http://localhost:3500/course/courseId/" + courseId, requestData)
  .then((result) => {
    console.log(result)
    return result.json();
  });
}

async function displayCourses() {
  const requestData = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
  const userData = await fetch("http://localhost:3500/user/", requestData).then((result) => {
      // console.log("result: ", result);
    return result.json().then((user)=>{
          // console.log("data: ", user);
          return user;
    })
  });

  const tutorSessions = userData.signedUpTutorSessions;
  // console.log(userData.signedUpTutorSessions);

  const tutorSessionArray = [];

  const mondayEl = document.getElementById('M');
  const tuesdayEl = document.getElementById('T');
  const wednsdayEl = document.getElementById('W');
  const thursdayEl = document.getElementById('R');
  const fridayEl = document.getElementById('F');
  const saturdayEl = document.getElementById('S');
  const sundayEl = document.getElementById('U');

  tutorSessions.forEach(async tutorSessionId => {
    const session = await getTutorSession(tutorSessionId);
    let courseName = await getCourseName(session.course);
    courseName = courseName.courseName.replaceAll('__', '_');
    const courseArray = courseName.split("_");
    courseName = courseArray[0] + " " + courseArray[1];
    const fullCourseName = courseArray.join(" ");

    // console.log("cn: ", courseName);
    // console.log(tutorSessionId)
    session.time.forEach((time) => {
      const day = time.day;
      const startTime = time.start_time;
      const endTime = time.end_time;
      const timeRange = startTime + "-" + endTime;
      const cardInfoEl = document.createElement('div');
      const pTimeEl = document.createElement('p');
      const pCourseEl = document.createElement('p');

      const hiddenInfoDiv = document.createElement('div');
      hiddenInfoDiv.classList.add('hiddenInfo');
      
      pTimeEl.innerText = timeRange;
      pCourseEl.innerText = courseName;

      cardInfoEl.appendChild(pCourseEl);
      cardInfoEl.appendChild(pTimeEl);

      const fullCourseP = document.createElement('p');
      const titleEl = document.createElement('p');

      titleEl.innerText ="Tutor Session"
      fullCourseP.innerText = fullCourseName;

      hiddenInfoDiv.appendChild(titleEl);
      hiddenInfoDiv.appendChild(fullCourseP);
      hiddenInfoDiv.appendChild(pTimeEl);

      cardInfoEl.classList.add('cardInfo');


      const dayEl = document.getElementById(day);

      dayEl.appendChild(cardInfoEl);

      

    })
    console.log("session",session.time)
    tutorSessionArray.push(session);
  })

  console.log(tutorSessionArray)

}
displayCourses();

const cardCons = document.querySelectorAll(".cardCon");

cardCons.forEach((cardCon) => {
  cardCon.addEventListener('click', ()=> {
    cardCon.classList.add('fullScreen');
  })
})