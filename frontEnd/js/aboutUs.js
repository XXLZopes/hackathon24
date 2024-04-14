
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

    let firstName = user.firstName;

    console.log(firstName);

    const welcomeUserNameEl = document.querySelector('#welcomeUserName');
    welcomeUserNameEl.innerText = firstName; 
    
  }
  displayCourses();