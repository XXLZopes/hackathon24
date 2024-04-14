
    
console.log('help')

async function getTutorSession(tutorSessionId) {
  const requestData = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };
  console.log("tID: ", tutorSessionId)
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
// tutorSession
async function deleteTutorSession(tutorSessionId) {
  const requestData = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({tutorSessionId: tutorSessionId}),
    credentials: "include",
  };
const userData = await fetch("http://localhost:3500/user/tutorSession", requestData).then((result) => {
    // console.log("result: ", result);
  return result.json().then((data)=>{
    console.log("uhh")
        // console.log("data: ", data);
        window.location.reload();
        // return user;
  })
  
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



  let firstName = userData.firstName;
  console.log(firstName)

  const welcomeNameEl = document.querySelector('#welcomeUserName'); 
  welcomeNameEl.innerText = firstName; 

  const tutorSessions = userData.signedUpTutorSessions;
  // console.log(userData.signedUpTutorSessions);

  tutorSessions.forEach(async tutorSessionId => {
    console.log(tutorSessionId);
    const session = await getTutorSession(tutorSessionId);
    const courseId = session.courseId;
    const tutorId = session.tutorId
    console.log("id: ", session);
    let courseName = await getCourseName(courseId);

    const deleteButton = document.createElement('div');
    deleteButton.innerText = "Remove Tutor Session"
    deleteButton.classList.add('deleteTutorSessionButton');
    deleteButton.id = tutorSessionId;

    deleteButton.addEventListener('click', ()=>deleteTutorSession(tutorSessionId));
    // const tutorInfo = await getTutor(tutorId);

    // console.log(tutorInfo.firstName)
    // console.log(tutorInfo.lastName)

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
      hiddenInfoDiv.appendChild(deleteButton);


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