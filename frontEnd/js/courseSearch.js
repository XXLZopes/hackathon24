const searchEl = document.getElementById("searchInput");

const courses = document.getElementsByClassName("course");

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
