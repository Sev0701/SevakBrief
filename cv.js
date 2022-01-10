import { itemes } from "./data.js";

let storedItemes = [];
if (getFromStorage("users")) {
  storedItemes = getFromStorage("users");
} else {
  storedItemes = saveToStorage(itemes);
}
initList();
function initList() {
  let box = document.querySelector(".grid");
  if (box) {
    storedItemes.forEach(function (nan) {
      box.innerHTML += `<div class="item">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGnaRi58Yefunsk2tU7IL5YFeFzrw6_9b3eA&usqp=CAU"width="200px" height="200px" >
        <a href="#Main?id=${nan.id}">${nan.firstName} ${nan.lastName}</a></div>`;
    });
  }
  console.log(storedItemes);
}

window.addEventListener("hashchange", function () {
  console.log(window.location.hash);
  let container = document.querySelector(".grid");
  let personalPage = document.querySelector(".cv");
  let linkContact = document.querySelector(".linkContact");
  let linkHome = document.querySelector(".linkHome");
  let divContact = document.querySelector(".divContact");
  let newperson = document.querySelector(".home");

  if (window.location.hash.includes("Main")) {
    container.classList.add("hidden");
    personalPage.classList.remove("hidden");
    divContact.classList.add("hidden");
    newperson.classList.add("hidden");
    let hashArr = window.location.hash.split("=");
    let id = hashArr[1];
    let personObj = getPersonObj(id);
    addUserData(personObj);
  } else if (window.location.hash.includes("contact")) {
    container.classList.add("hidden");
    personalPage.classList.add("hidden");
    divContact.classList.remove("hidden");
    newperson.classList.add("hidden");
  } else if (window.location.hash.includes("home")) {
    container.classList.add("hidden");
    personalPage.classList.add("hidden");
    divContact.classList.add("hidden");
    newperson.classList.remove("hidden");
  } else {
    container.classList.remove('hidden');
    personalPage.classList.add("hidden");
    divContact.classList.add("hidden");
    newperson.classList.add("hidden");
    console.log("go to index.html page, show grid");
  }
});

document.getElementById("submit-button")
  .addEventListener("click", function (e) {
    e.preventDefault();
    let firstName = document.getElementById("name-field").value;
    let lastName = document.getElementById("lastName-field").value;
    let phone = document.getElementById("phone-field").value;
    let email = document.getElementById("email-field").value;
    let education = document.getElementById("education-field").value;
    let workExperience = document.getElementById("workExperience-field").value;
    let trainings = document.getElementById("trainings-field").value;
    const newMember = {
      id: new Date().valueOf().toString(),
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      education: education,
      workExperience: workExperience,
      trainings: trainings,
    };

    storedItemes.push(newMember);
    saveToStorage(storedItemes);

    window.location.href = "/index3.html";
  });
  
function getPersonObj(id) {
  let person = storedItemes.find(function (item) {
    return item.id === id;
  });
  return person;
}
function addUserData(person) {
  console.log("personalData===", person);
  document.querySelector(".firstname").innerHTML = person.firstName;
  document.querySelector(".lastname").innerHTML = person.lastName;
  document.querySelector(".phone").innerHTML = person.phone;
  document.querySelector(".email").innerHTML = person.email;
  document.querySelector(".education").innerHTML = person.education;
  document.querySelector(".workExperience").innerHTML = person.workExperience;
  document.querySelector("trainings").innerHTML = person.trainings;
}
function saveToStorage(data) {
  let stringifiedData = JSON.stringify(data);
  window.localStorage.setItem("users", stringifiedData);
  return data;
};

function getFromStorage(users) {
  let dataFromStorage = window.localStorage.getItem(users);
  if (dataFromStorage) {
    return JSON.parse(dataFromStorage);
  }
  return false;
};