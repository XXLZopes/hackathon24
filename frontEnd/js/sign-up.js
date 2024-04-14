const addCourseInput = document.querySelector("#coursesInput");
const modalCon = document.querySelector("#coursesModalCon");
modalCon.querySelector("#closeCoursesModal").addEventListener("click", _=>{
    modalCon.style.display = "none";
})

addCourseInput.addEventListener("focus", _=>{
    modalCon.style.display = "inline";
    console.log(modalCon)
})