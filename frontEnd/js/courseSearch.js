const searchEl = document.getElementById("searchInput");
const submitCoursesButton = document.querySelector("#submitButtonCourses");
const selectedCourses = [];

let divWrapperEl = document.getElementById("divCoursesModal");
let courses;
let course;
let divWrapperArray = [];

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
        courseButton.setAttribute('data-course-name', element);
        courseDiv.appendChild(courseButton);
        element = element.replaceAll("__", " ");
        element = element.replaceAll("_", " ");
        if(element.includes(" ")){
            element = element.split(" ");
            element = element[0] + " " + element[1];
        }
        courseButton.innerHTML = element;
      });
    })
    .then((_) => {
      Array.from(divWrapperEl.children).forEach((element) => {
        divWrapperArray.push(element);
      });
      divWrapperArray.splice(0, 4);
      startSearchListener();
    });
}

submitCoursesButton.addEventListener('click', postSelectedCourses);

async function postSelectedCourses() {
  let results = [];
  for (let courseName of selectedCourses) {  
      console.log("Submitting " + courseName);
      try {
          const response = await fetch(`http://localhost:3500/course/courseName/${encodeURIComponent(courseName)}`, {
              method: 'GET',
              credentials: 'include',
          });
          const data = await response.json();
          if (response.ok) {
              console.log('Course Data:', data);
              results.push(data);
          } else {
              throw new Error(`Server responded with status ${response.status}: ${data.message}`);
          }
      } catch (error) {
          console.error('Error fetching course data:', error);
          results.push(null);  
      }
  }
  await updateUserCourses();
  return results;
}

async function updateUserCourses() {
  const updateData = {
    classList: selectedCourses
  };

  console.log(selectedCourses);

  try {
      const response = await fetch(`http://localhost:3500/user/`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateData),
          credentials: 'include'
      });
      const result = await response.json();
      if (response.ok) {
          console.log('User updated successfully with course:', result);
      } else {
          throw new Error(`Failed to update user: ${response.status} ${result.message}`);
      }
  } catch (error) {
      console.error('Error updating user with course:',selectedCourses, error);
  }
}

document.addEventListener('DOMContentLoaded', function() {
    let divWrapperEl = document.getElementById("divCoursesModal");    

    divWrapperEl.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON' && event.target.parentElement.classList.contains('modalContent')) {
            var content = event.target.textContent.trim();
            toggleButtonHighlight(event.target);
            var originalCourseName = event.target.getAttribute('data-course-name');
            updateSelectedCourses(originalCourseName);
        }
    })});

    function toggleButtonHighlight(button) {
        button.classList.toggle('selected');
    }

    function updateSelectedCourses(courseName) {
      const index = selectedCourses.indexOf(courseName);
      if (index > -1) {
          selectedCourses.splice(index, 1);
      } else {
          selectedCourses.push(courseName);
      }
      console.log('Selected Courses:', selectedCourses);
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
