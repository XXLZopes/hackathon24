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