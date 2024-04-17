let user;
async function displayCourses() {
  const requestData = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };
  await fetch("http://localhost:3500/user/", requestData).then((result) => {
    return result.json().then((data) => {
      user = data;
    });
  });

  let firstName = user.firstName;
  let lastName = user.lastName;
  let fullName = firstName + " " + lastName;
  let email = user.email;
  let classList = user.classList;
  let username = email.split("@")[0];

  const welcomeUserNameEl = document.querySelector("#welcomeUserName");
  welcomeUserNameEl.innerText = firstName;
}
displayCourses();

const addSessionButtons = document.querySelectorAll(".addSessionButton");
const modalCon = document.querySelector("#sessionModalCon");
modalCon.querySelector("#closeSessionModal").addEventListener("click", (_) => {
  modalCon.style.display = "none";
});
addSessionButtons.forEach((button) => {
  button.addEventListener("click", (_) => {
    modalCon.style.display = "inline";
  });
  
});

async function submitSession() {
  console.log(user);
  let submittedCourseId = "";
  let submittedCourseName = "";
  let submittedTutorId = user._id;
  let submittedStartTime = "";
  let submittedEndTime = "";
  let submittedLocation = "";
  console.log(submittedCourseId);
  console.log(submittedCourseName);
  console.log(submittedTutorId);
  console.log(submittedStartTime);
  console.log(submittedEndTime);
  console.log(submittedLocation);
  /*const data = {
    method: "POST",
    credentials: "include",
    body: {
      courseId: submittedCourseId,
      courseName: submittedCourseName,
      tutorId: submittedTutorId,
      time: [submittedStartTime, submittedEndTime],
      location: submittedLocation,
    },
  };
  await fetch("http://localhost:3500/tutor/", data).then((result) => {
    return result.json().then((result) => {});
  });*/
}
