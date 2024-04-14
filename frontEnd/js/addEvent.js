const addEventButtons = document.querySelectorAll(".addEventButton");
const modalCon = document.querySelector("#eventModalCon");
modalCon.querySelector("#closeEventModal").addEventListener("click", _=>{
    modalCon.style.display = "none";
})
// const addEventButtonsArray = Array.from(addEventButtons.children);
addEventButtons.forEach((button)=>{
    button.addEventListener("click", _=>{
        
        modalCon.style.display = "inline";
        console.log(modalCon)
    })
})