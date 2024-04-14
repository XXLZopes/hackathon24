const inputEL = document.getElementById("nameInput");
let datalistEl = document.getElementById("groupName");
const groupMembersEl = document.getElementById("groupMemberNameList");
let users;
let user;
let userNameArray = [];

async function findUser()  {
    await fetch("http://localhost:3500/user/userNames").then((result) => {
    return result.json().then((data) => {
      users = data;
    });
  })
  .then((_) => {
    users.forEach((element) => {
        let userNameOption = document.createElement("option");
        userNameOption.classList.add("userNameOption");
        userNameOption.classList.add(element.firstName + element.lastName)
        datalistEl.appendChild(userNameOption);
        userNameOption.innerHTML = element.firstName + " " + element.lastName;
        userNameArray.push(element.firstName + " " + element.lastName);
    });
  });
}

function addToGroup() {
    let nameToAdd = document.createElement("li");
    nameToAdd.innerHTML = inputEL.value;
    //datalistEl.removeChild(document.getElementsByClassName(inputEL.getAttribute('value').replaceAll(" ", "")));
    groupMembersEl.appendChild(nameToAdd);
}