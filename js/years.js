// Years of Experience Calculation

const yearsOfExperienceDiv = document.querySelector("#years-of-experience");

let years = new Date().getFullYear() - 1967;
let yearsEveryFive = parseInt(years / 5) * 5;
yearsOfExperienceDiv.innerHTML = yearsEveryFive;
