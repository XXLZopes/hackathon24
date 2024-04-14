console.log('help')

async function getTutorSession(tutorSessionId) {

  const requestData = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };
  return await fetch("http://localhost:3500/tutor/tutorSessionId/" + tutorSessionId, requestData)
  .then((result) => {
    console.log("asdasdas", result.json())
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
    // console.log(result)
    return result.json();
  });
}

async function getTutor(userId) {
  const requestData = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };
  return await fetch("http://localhost:3500/user/userId/" + userId, requestData)
  .then((result) => {
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
          console.log("data: ", user);
          return user;
    })
  });

  const tutorSessions = userData.signedUpTutorSessions;
  // console.log(userData.signedUpTutorSessions);

  tutorSessions.forEach(async tutorSessionId => {
    const session = await getTutorSession(tutorSessionId);
    console.log("id: ", session.course);
    let courseName = await getCourseName(session.course);

    const tutorInfo = await getTutor(session.tutorId);

    console.log(tutorInfo.firstName)
    console.log(tutorInfo.lastName)

    // console.log(session);
    // const tutorInfo = getTutor()
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
      const pTimeEl2 = document.createElement('p');
      const pCourseEl = document.createElement('p');

      const hiddenInfoDiv = document.createElement('div');
      hiddenInfoDiv.classList.add('hiddenInfo');
      
      cardInfoEl.classList.add('cardInfo');
      
      pTimeEl.innerText = timeRange;
      pTimeEl2.innerText = timeRange;
      pCourseEl.innerText = courseName;

      cardInfoEl.appendChild(pCourseEl);
      cardInfoEl.appendChild(pTimeEl);

      const fullCourseP = document.createElement('p');
      const titleEl = document.createElement('p');

      titleEl.innerText ="Tutor Session"
      titleEl.classList.add('title')
      fullCourseP.innerText = fullCourseName;

      hiddenInfoDiv.appendChild(titleEl);
      hiddenInfoDiv.appendChild(fullCourseP);
      hiddenInfoDiv.appendChild(pTimeEl2);


      const dayEl = document.getElementById(day);

      dayEl.appendChild(cardInfoEl);
      dayEl.appendChild(hiddenInfoDiv);

      

    })
    console.log("session",session.time)
  })
}
displayCourses();

const cardCons = document.querySelectorAll(".cardCon");

cardCons.forEach((cardCon) => {
  cardCon.addEventListener('click', ()=> {
    if (cardCon.classList.contains('fullScreen')) {
      cardCon.classList.remove('fullScreen');
    }
    else {
      cardCon.classList.add('fullScreen');
    }
  })
})