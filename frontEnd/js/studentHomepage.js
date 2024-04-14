console.log('help')


async function displayCourses() {
  const requestData = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
  const userData = await fetch("http://localhost:3500/user/", requestData).then((result) => {
      // console.log("result: ", result);
    return result.json().then((user)=>{
          // console.log("data: ", user);
          return user;
    })
  })
  console.log(userData.signedUpTutorSessions);

  // console.log(user);
  // let firstName = user.firstName;
  // let lastName = user.lastName;
  // let fullName = firstName + " "  + lastName;
  // let email = user.email;
  // let classList = user.classList;
  // let username = email.split('@')[0];


  // console.log(firstName, lastName);
  // console.log(email);
  // console.log(classList);

  const welcomeUserNameEl = document.querySelector('#welcomeUserName');
  welcomeUserNameEl.innerText = firstName; 

}
displayCourses();