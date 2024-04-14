const searchEl = document.getElementById("searchInput");
const divWrapperEl = document.getElementById("divCoursesModal");
let courses;

async function displayCourses() {
  // This needs to be an array from the list of all courses
  await fetch("http://localhost:3500/course/courseName").then((result) => {
    return result.json().then((data)=>{
        data.splice(0,1);
        courses=data;
    })
  })
  
  courses.forEach((element) => {
    let courseDiv = document.createElement("div");
    courseDiv.classList.add("class=modalContent");
    divWrapperEl.appendChild(courseDiv);
    let courseButton = document.createElement("button");
    courseDiv.appendChild(courseButton);
    courseButton.innerHTML = element;
  });
  
}

searchEl.addEventListener("keyup", (event) => {
  const { value } = event.target;

  const searchQuery = value.toLowerCase();

  for (const courseName of courses) {
    let course = courseName.textContent.toLowerCase();

    if (course.includes(searchQuery)) {
      courseName.style.display = "block";
    } else {
      courseName.style.display = "none";
    }
  }
});
