
async function displayCourses() {
    const requestData = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };
    let user;
    await fetch("http://localhost:3500/user/", requestData).then((result) => {
        // console.log("result: ", result);
      return result.json().then((data)=>{
            // console.log("data: ", data);
            user=data;
      })
    })

    // console.log(user);
    let firstName = user.firstName;
    let lastName = user.lastName;
    let fullName = firstName + " "  + lastName
    let email = user.email;
    let classList = user.classList;

    let username = email.split('@')[0];


    console.log(firstName, lastName);
    console.log(email);
    console.log(classList);

    const hiUserNameEl = document.querySelector('#hiUserName');
    hiUserNameEl.innerText = firstName; 

    const welcomeUserNameEl = document.querySelector('#welcomeUserName');
    welcomeUserNameEl.innerText = firstName; 

    const userNameEl = document.querySelector('#profileDiv p span#userName');
    console.log(userNameEl)
    userNameEl.innerText = username;

    const userFullNameEl = document.querySelector('#profileDiv p span#userFullName');
    console.log(userFullNameEl)
    userFullNameEl.innerText = fullName;

    const userEmailEl = document.querySelector('#profileDiv p span#userEmail');
    console.log(userEmailEl)
    userEmailEl.innerText = email;




    
    // const coursesDivEl = document.querySelector(`#coursesDiv`);
    // user.classList.forEach((course) => {
    //     console.log("course: ", course)
    //     const courseCardEl = document.createElement(`div`);
    //     const courseArray = course.split("_");
    //     const p1El = document.createElement('p');
    //     const p2El = document.createElement('p');
    //     p1El.innerText = courseArray[0] + " " + courseArray[1];
    //     let p2ElText= "";
    //      courseArray.slice(2).forEach((element) => {
    //         p2ElText += element + " ";
    //     });
    //     p2El.innerText = p2ElText;
    //     courseCardEl.appendChild(p1El);
    //     courseCardEl.appendChild(p2El);

    //     courseCardEl.classList.add(`courseCard`);

    //     coursesDivEl.appendChild(courseCardEl);
    // });

    // const addCourseButtonEl = document.createElement(`div`);
    // addCourseButtonEl.classList.add(`addCourseButon`);

    // coursesDivEl.appendChild(addCourseButtonEl);
    
  }
  displayCourses();