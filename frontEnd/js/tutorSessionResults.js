let courseInfoArray;

const addedModalCon = document.querySelector("#addedModalCon");

addedModalCon.addEventListener("click", () => {
  console.log(addedModalCon);
  if (addedModalCon.style.display == "flex") {
    addedModalCon.style.display = "none";
  }
});

if (typeof data != "undefined") {
  courseInfoArray = [...data.info];
}

if (courseInfoArray)
  document.cookie = `courseData=${JSON.stringify(courseInfoArray)}`;

// Retrieving the cookie
const cookies = document.cookie.split(";");
let courseDataValue = null;
cookies.forEach((cookie) => {
  const [name, value] = cookie.trim().split("=");
  if (name === "courseData") {
    courseDataValue = JSON.parse(decodeURIComponent(value));
  }
});

const dayMap = {
  M: "Monday",
  T: "Tuesday",
  W: "Wednsday",
  R: "Thursday",
  F: "Friday",
  S: "Saturday",
  U: "Sunday",
};

async function addTutorSession(tutorSessionId) {
  const updateData = {
    signedUpTutorSessions: [tutorSessionId],
  };
  const requestData = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
    credentials: "include",
  };
  return await fetch(
    "http://localhost:3500/user/tutorSession/",
    requestData
  ).then((stuff) => {});
}

async function findTutorSessions(courseName, parentEl) {
  await fetch(`http://localhost:3500/tutor/courseName/${courseName}`)
    .then((result) => {
      return result.json();
    })
    .then((tutorSessions) => {
      const createdDays = [];
      if (tutorSessions.length <= 0) {
        parentEl.querySelector(".tutorCon").innerHTML = `
      <div class="noTutorSessions">
        <p>No tutor sessions available</p>
        <div onclick="window.location.href ='tutorHomepage.html';" class="becomeATutorButton">Become a Tutor</div>
      </div>`;
      }
      tutorSessions.forEach((element) => {
        element.time.forEach((d) => {
          const day = d.day;
          if (createdDays.indexOf(day) == -1) {
            createdDays.push(day);
            const calEl = document.createElement("div");
            calEl.innerHTML = `<p class="calTitle">${dayMap[day]}</p>`;
            calEl.id = day;
            calEl.classList.add("calDiv");
            parentEl.querySelector(".tutorCon").appendChild(calEl);
          }
          const startTime = d.start_time;
          const endTime = d.end_time;
          const timeRange = startTime + "-" + endTime;
          const timeEl = document.createElement("p");
          timeEl.id = element._id;
          timeEl.addEventListener(`click`, () => {
            addTutorSession(timeEl.id);
            timeEl.classList.add("selectedTime");
            addedModalCon.style.display = "flex";
          });
          timeEl.classList.add(`timeButton`);
          timeEl.innerText = timeRange;
          parentEl.querySelector(`#${day}`).appendChild(timeEl);
        });
      });
    });
}

courseDataValue.forEach(async (course) => {
  const courseArray = course.split("\n\n");
  let courseName = courseArray.join("_");
  courseName = courseName.replaceAll(" ", "_");

  const courseDivEl = document.querySelector("#coursesDiv");

  const courseTitle = courseArray[0] + " " + courseArray[1];

  const courseConEl = document.createElement("div");
  const courseTitleEl = document.createElement("div");
  const tutorConEl = document.createElement("div");

  courseConEl.classList.add("courseCon");
  courseTitleEl.classList.add("courseTitle");
  tutorConEl.classList.add("tutorCon");

  courseTitleEl.innerHTML = `<h2>${courseTitle}</h2>`;

  courseConEl.appendChild(courseTitleEl);
  courseConEl.appendChild(tutorConEl);

  const tutorSessions = await findTutorSessions(courseName, courseConEl);

  courseDivEl.appendChild(courseConEl);
});

async function displayCourses() {
  const requestData = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };
  let user;
  await fetch("http://localhost:3500/user/", requestData).then((result) => {
    return result.json().then((data) => {
      user = data;
    });
  });

  let firstName = user.firstName;

  const welcomeUserNameEl = document.querySelector("#welcomeUserName");
  welcomeUserNameEl.innerText = firstName;
}
displayCourses();
