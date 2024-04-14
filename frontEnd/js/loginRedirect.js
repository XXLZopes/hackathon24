const submitButton = document.querySelector("#submitButton");
let url = "http://localhost:3500";

window.onload = function() {
    fetch('http://localhost:3500/test', {
        credentials: 'include' // This tells the browser to include cookies with the request
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
    console.log('help')
};


function getForumData() {
    const fname = document.getElementById("fname_input").value;
    const lname = document.getElementById("lname_input").value;
    const courseList = (document.getElementById("coursesInput").value).split(',');
    let dataToUpdate = {};
    if (fname != "") {
        dataToUpdate.firstName = fname;
    }
    if (lname != "") {
        dataToUpdate.firstName = lname;
    }
    if (courseList != "") {
        dataToUpdate.firstName = courseList;
    }
    return JSON.stringify(dataToUpdate);
}



async function updateUser() {
    const submittedData = getForumData();
    

    await fetch(`${url}/user/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: submittedData,
        credentials: "include"
    })
    .then(response => {

        console.log(response);

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
    })
    .then(userData => {
        console.log("User updated successfully!", userData);
    })
    .catch(error => {
        console.error(`Error fetching user data: ${error}`);
    });
}


submitButton.addEventListener("click", updateUser);