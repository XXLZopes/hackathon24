const submitButton = document.querySelector("#submitButton");

function getForumData() {
    const fname = document.getElementById("fname_input").value;
    const lname = document.getElementById("lname_input").value;
    const courseList = document.getElementById("coursesInput").value;


    return JSON.stringify(dataToUpdate = {
        firstName: fname,
        lastName: lname,
        classList: !courseList ? [] : courseList,
      })
}







submitButton.addEventListener("click", onForumSubmit);