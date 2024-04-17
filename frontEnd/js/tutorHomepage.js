
async function displayCourses() {
    const requestData = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };
    let user;
    await fetch("http://localhost:3500/user/", requestData).then((result) => {
      return result.json().then((data)=>{
            user=data;
      })
    })
  
    let firstName = user.firstName;
    let lastName = user.lastName;
    let fullName = firstName + " "  + lastName;
    let email = user.email;
    let classList = user.classList;
    let username = email.split('@')[0];
  
    const welcomeUserNameEl = document.querySelector('#welcomeUserName');
    welcomeUserNameEl.innerText = firstName; 
}
displayCourses();

const addSessionButtons = document.querySelectorAll(".addSessionButton");
const modalCon = document.querySelector("#sessionModalCon");
modalCon.querySelector("#closeSessionModal").addEventListener("click", _=>{
    modalCon.style.display = "none";
})
addSessionButtons.forEach((button)=>{
    button.addEventListener("click", _=>{
        modalCon.style.display = "inline";
    })
})