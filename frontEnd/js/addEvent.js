const addEventButtons = document.querySelectorAll(".addEventButton");
const modalCon = document.querySelector("#eventModalCon");
modalCon.querySelector("#closeEventModal").addEventListener("click", _=>{
    modalCon.style.display = "none";
})
addEventButtons.forEach((button)=>{
    button.addEventListener("click", _=>{
        modalCon.style.display = "inline";
        console.log(modalCon)
    })
})

  

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