const searchEl = document.getElementById("searchInput");
let divWrapperEl = document.getElementById("divCoursesModal");
let courses;
let course;
let divWrapperArray = [];

async function displayCourses() {
  // This needs to be an array from the list of all courses
  await fetch("http://localhost:3500/course/courseName").then((result) => {
    return result.json().then((data)=>{
        data.splice(0,1);
        courses=data;
    })
  })
  
  courses.forEach((element) => {
    const courseDiv = document.createElement("div");
    courseDiv.classList.add("modalContent");
    divWrapperEl.appendChild(courseDiv);
    let courseButton = document.createElement("button");
    courseDiv.appendChild(courseButton);
    courseButton.innerHTML = element.replaceAll("_", " ").split("");
  });
  
}

function startSearchListener() {
  searchEl.addEventListener("keyup", (event) => {
    const { value } = event.target;

    const searchQuery = value.toLowerCase();

    divWrapperArray.forEach((element) => {
      if (
        element
          .querySelector("button")
          .innerText.toLowerCase()
          .includes(searchQuery)
      ) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    });
  });
}
