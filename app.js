// Constructor function to create user objects
function User(name, username, email, password) {
  this.name = name;
  this.username = username;
  this.email = email;
  this.password = password;
}

// Getting the name of the page
var pageURL = window.location.toString();
var pageName = pageURL.slice(pageURL.lastIndexOf("/"));

// Function to validate input fields
function validateInput() {
  if (localStorage.getItem("reloaded") === null) {
    var arrOfUserObjs = [];
    localStorage.setItem("arrOfUserObjs", JSON.stringify(arrOfUserObjs));
  }
  localStorage.setItem("reloaded", "true");
  arrOfUserObjs = JSON.parse(localStorage.getItem("arrOfUserObjs"));
  var fields = document.getElementsByTagName("input");
  var validInput = false;
  var regex;
  for (var i = 0; i < fields.length; i++) {
    if (fields[i].id === "name-field") {
      regex = /^(?=.{3,30}$)[a-z]+(?:['_.\s][a-z]+)*$/gim;
      if (!regex.test(fields[i].value)) {
        fields[i].focus();
        fields[i].value = "";
        fields[i].placeholder = "Invalid name!";
        document.querySelector("#name-message").className = "message";
        return false;
      } else {
        fields[i].placeholder = "";
        document.querySelector("#name-message").className = "hidden";
      }
    }
    if (fields[i].id === "username-field") {
      regex = /^(?=.*[a-zA-Z]{1,})(?=.*[\d]{0,})[a-zA-Z0-9]{5,15}$/gim;
      if (!regex.test(fields[i].value)) {
        fields[i].focus();
        fields[i].value = "";
        fields[i].placeholder = "Invalid username!";
        document.querySelector("#username-message").className = "message";
        return false;
      } else {
        fields[i].placeholder = "";
        document.querySelector("#username-message").className = "hidden";
        for (j = 0; j < arrOfUserObjs.length; j++) {
          if (arrOfUserObjs[j].username === fields[i].value) {
            fields[i].focus();
            fields[i].value = "";
            fields [i].placeholder = "This username is not available!";
            return false;
          }
        }
      }
    }
    if (fields[i].id === "email-field") {
      regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
      if (!regex.test(fields[i].value)) {
        fields[i].focus();
        fields[i].value = "";
        fields[i].placeholder = "Invalid email!";
        document.querySelector("#email-message").className = "message";
        return false;
      } else {
        fields[i].placeholder = "";
        document.querySelector("#email-message").className = "hidden";
        if (pageName !== "/login.html") {
          for (j = 0; j < arrOfUserObjs.length; j++) {
            if (arrOfUserObjs[j].email === fields[i].value) {
              fields[i].focus();
              fields[i].value = "";
              fields [i].placeholder = "This email is not available!";
              return false;
            }
          }
        }
      }
    }
    if (fields[i].id === "pass-field") {
      regex = /^((?=\S*?[a-zA-Z])(?=\S*?[0-9]).{6,})\S$/;
      if (!regex.test(fields[i].value)) {
        fields[i].focus();
        fields[i].value = "";
        fields[i].placeholder = "Invalid password!";
        document.querySelector("#pass-message").className = "message";
        return false;
      } else {
        fields[i].placeholder = "";
        document.querySelector("#pass-message").className = "hidden";
        if (pageName !== "/login.html") {
          for (j = 0; j < arrOfUserObjs.length; j++) {
            if (arrOfUserObjs[j]. password === fields[i].value) {
              fields[i].focus();
              fields[i].value = "";
              fields [i].placeholder = "This password is not available!";
              return false;
            }
          }
        }
      }
    }
  }
  return true;
}

// Function to store array of user objects in local storage
function storeUser() {
  var isValidInput = validateInput();
  if (!isValidInput) {
    return;
  } else {
    var name = document.getElementById("name-field").value;
    var username = document.getElementById("username-field").value;
    var email = document.getElementById("email-field").value;
    var password = document.getElementById("pass-field").value;
    var user = new User(name, username, email, password);
    arrOfUserObjs = JSON.parse(localStorage.getItem("arrOfUserObjs"));
    arrOfUserObjs.push(user);
    localStorage.setItem("arrOfUserObjs", JSON.stringify(arrOfUserObjs));
    alert(localStorage.getItem("arrOfUserObjs"));
    window.location = "login.html";
  }
}

// Function to check for user attributes in local storage
function checkUser() {
  var isValidInput = validateInput();
  if (!isValidInput) {
    return;
  } else {
    var email = document.getElementById("email-field").value;
    var password = document.getElementById("pass-field").value;
    var arrOfUserObjs = JSON.parse(localStorage.getItem("arrOfUserObjs"));
    var emailFound = false;
    var passFound = false;
    for (var i = 0; i < arrOfUserObjs.length; i++) {
      if (arrOfUserObjs[i].email === email) {
        emailFound = true;
      }
      if (emailFound) {
        if (arrOfUserObjs[i].password === password) {
          passFound = true;
          localStorage.setItem("userKey", i);
        }
      }
    }
    if (!emailFound) {
      var emailField = document.getElementById("email-field");
      emailField.value = "";
      emailField.placeholder = "Email not found!";
    } else if (!passFound) {
      var passField = document.getElementById("pass-field");
      passField.value = "";
      passField.placeholder = "Incorrect password!";
    } else {
      window.location = "home.html";
    }
  }
}

// Function to logout the user
function logoutUser() {
  window.location.replace("login.html");
}

/* Sign Up Page Scripts - Start */
if (pageName === "/" || pageName === "/index.html") {
  var signUpBtn = document.getElementById("sign-up-btn");
  signUpBtn.onclick = storeUser;
}
/* Sign Up Page Scripts - End */

/* Login Page Scripts - Start */
else if (pageName === "/login.html") {
  var loginBtn = document.getElementById("login-btn");
  loginBtn.onclick = checkUser;
}
/* Login Page Scripts - End */

/* Home Page Scripts - Start */
else {
  var userKey = localStorage.getItem("userKey");
  var logoutBtn = document.getElementById("logout-btn");
  var delAccountBtn = document.getElementById("del-account-btn");
  var nameP = document.getElementById("name");
  var uNameP = document.getElementById("username");
  var emailP = document.getElementById("email");
  var arrOfUserObjs = JSON.parse(localStorage.getItem("arrOfUserObjs"));
  nameP.innerHTML = arrOfUserObjs[userKey].name;
  uNameP.innerHTML = arrOfUserObjs[userKey].username;
  emailP.innerHTML = arrOfUserObjs[userKey].email;
  logoutBtn.onclick = logoutUser;
  delAccountBtn.onclick = function () {
    var toDelete = confirm("Are you sure?");
    if (toDelete) {
      arrOfUserObjs.splice(userKey, 1);
      localStorage.setItem("arrOfUserObjs", JSON.stringify(arrOfUserObjs));
      window.location.replace("index.html");
    }
  };
}
/* Home Page Scripts - End */

//localStorage.removeItem("reloaded");
//localStorage.removeItem("arrOfUserObjs")