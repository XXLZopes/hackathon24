const coursesDivEl = document.querySelector("#coursesDiv"); 

const courseCardEl = document.createElement("div"); 
console.log(courseCardEl); 

const courseParEl = document.createElement("p"); 
courseCardEl.appendChild(courseParEl); 

const addCourseBtn = document.createElement("button"); 
courseCardEl.appendChild(addCourseBtn); 

courseCardEl.classList.add("courseCardDiv"); 

coursesDivEl.appendChild(courseCardEl); 
