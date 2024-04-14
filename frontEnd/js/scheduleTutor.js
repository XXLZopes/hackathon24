let coursesToRequest = [];

async function displayCourses() {
    const requestData = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };
    let user;
    await fetch("http://localhost:3500/user/", requestData).then((result) => {
        console.log("result: ", result);
      return result.json().then((data)=>{
            console.log("data: ", data);
            user=data;
      })
    })
    
    const coursesDivEl = document.querySelector(`#coursesDiv`);
    user.classList.forEach((course) => {
        // console.log("course: ", course)
        let courseCardEl = document.createElement(`button`);
        courseCardEl.setAttribute('onclick', 'addToArray(this.innerText, this)');
        course = course.replaceAll("__", "_");
        const courseArray = course.split("_");
        const p1El = document.createElement('p');
        const p2El = document.createElement('p');
        p1El.innerText = courseArray[0] + " " + courseArray[1];

        console.log("p1El:", p1El.innerHTML)
        let p2ElText= "";
         courseArray.slice(2).forEach((element) => {
            p2ElText += element + " ";
        });
        p2El.innerText = p2ElText;
        courseCardEl.appendChild(p1El);
        courseCardEl.appendChild(p2El);

        courseCardEl.classList.add(`courseCard`);

        coursesDivEl.appendChild(courseCardEl);
    });

    const addCourseButtonEl = document.createElement(`div`);
    
  }
  displayCourses();

  function addToArray(self, item) {
    if (coursesToRequest.indexOf(self) > -1) {
      const indexToRemove = coursesToRequest.indexOf(self);
      coursesToRequest.splice(indexToRemove, 1);
      item.style.backgroundColor = "#FFC72C";
    }
    else {
      coursesToRequest.push(self);
      item.style.backgroundColor = "#F2A900";
    }
    console.log(coursesToRequest);
  }


const findTutorsButton = document.getElementById("findTutorButton");
findTutorsButton.addEventListener('click', () => {
  const data = {info: coursesToRequest}
  const w = window.location.replaec("tutorSessionResults.html")
  w.data = data;

})