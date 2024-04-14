const searchEl = document.getElementById("searchInput");
let divWrapperEl = document.getElementById("wrapper");
let courses;
let course;
let divWrapperArray =[];

async function displayCourses() {
  // This needs to be an array from the list of all courses
  await fetch("http://localhost:3500/course/courseName", {
    credentials: "include",
  })
    .then((result) => {
      return result.json().then((data) => {
        data.splice(0, 1);
        courses = data;
      });
    })
    .then((_) => {
      courses.forEach((element) => {
        let courseDiv = document.createElement("div");
        courseDiv.classList.add("modalContent");
        divWrapperEl.appendChild(courseDiv);
        let courseButton = document.createElement("button");
        courseDiv.appendChild(courseButton);
        element = element.replaceAll("_", " ");
        element = element.split(" ");
        element = element[0] + " " + element[1];
        courseButton.innerHTML = element;
        divWrapperArray.push("0");
      });
    });
}
//divWrapperArray.splice(0, 2);
//console.log(divWrapperArray.splice(0, 2));
divWrapperArray[0] = 2;
divWrapperArray[3] = "3";
console.log(divWrapperArray);

searchEl.addEventListener("keyup", (event) => {
  const { value } = event.target;

  const searchQuery = value.toLowerCase();

  divWrapperArray.forEach((element) => {
    if (element.innerText.substring(searchQuery)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
