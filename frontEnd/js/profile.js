
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
    userNameEl.innerText = username;

    const userFullNameEl = document.querySelector('#profileDiv p span#userFullName');
    userFullNameEl.innerText = fullName;

    const userEmailEl = document.querySelector('#profileDiv p span#userEmail');
    userEmailEl.innerText = email;

    const userCoursesList = document.querySelector('#profileDiv p ul#userCoursesList');

    for (var i = 0; i < classList.length; i++){
        var list = classList[i];
        list = document.createElement('li');
        list.innerText = classList[i];
        document.getElementById('userCoursesList').appendChild(list);
    }

  }
  displayCourses();