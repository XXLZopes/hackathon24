const searchEl = document.getElementById("searchInput");
const divWrapperEl = document.getElementById("divCoursesModal")
let courses;

function displayCourses() {
  // This needs to be an array from the list of all courses
  fetch("http://localhost:3500/course/courseName").then((result) => {
    courses = result.parse();
  });
  courses.array.forEach(element => {
    courseDiv = document.createElement("div");
    courseDiv.innerHTML = element;
    divWrapperEl.appendChild(courseDiv);
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
