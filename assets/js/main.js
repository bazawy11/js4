var logInEmail = document.querySelector("#signinEmail");
var logInPass = document.querySelector("#signinPassword");
var logInBtn = document.querySelector("#login");
var signUpName = document.querySelector("#signUpName");
var signUpEmail = document.querySelector("#signUpEmail");
var signUpPass = document.querySelector("#signUpPassword");
var signUpBtn = document.querySelector("#signUp");

 var userName;
if (localStorage.getItem("userName") != null) {
  userName = localStorage.getItem("userName");
} else { 
  userName="Dear User"
}
var users = [];

if (localStorage.getItem("users") != null) {
  users = getLocaleStorage();
}



function signIn(logInEmail, logInPass) {
  if (checkSignInFields()) {
    logUser(logInEmail.value, logInPass.value);
  }
}

function signUp(signUpName, signUpEmail, signUpPass) {
  if (checkSignUpFields()) {
    addUser(signUpName.value, signUpEmail.value, signUpPass.value);
    console.log(users);
  }
}



function logUser(email, pass) {
  if (users.length > 0) {
    for (var i = 0; i < users.length; i++) {
      if (
        email.toLowerCase() == users[i].email.toLowerCase() &&
        pass == users[i].pass
      ) {

        localStorage.setItem("userName", users[i].name);
        
        window.location.href = "./pages/welcome.html";
        welcomingText.innerHTML = `Welcome ${userName}`;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Welcome ${users[i].name}`,
          showConfirmButton: false,
          timer: 1500,
        });
        sayWelcome(users[i].name);
         clear();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Wrong User Name or Password",
        });
      }
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Not existing",
    });
  }
}

function addUser(name, email, pass) {
  if (signUpVarification(name, email, pass)) {
    var user = {
      name: name,
      email: email,
      pass: pass,
    };

    if (newEmail(email)) {
      users.push(user);
      setLocaleStorage(users);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${name} You are now a user`,
        showConfirmButton: false,
        timer: 1500,
      });
      clear();
        window.location.href = "../index.html";

    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This email is already in use",
      });
    }
  }
}

function newEmail(email) {
  for (var i = 0; i < users.length; i++) {
    if (email == users[i].email) {
      console.log(email + " == " + users[i].email);
      return false;
    }
  }
  return true;
}

function setLocaleStorage(array) {
  localStorage.setItem("users", JSON.stringify(array));
}

function getLocaleStorage() {
  return JSON.parse(localStorage.getItem("users"));
}

function signUpVarification(name, email, pass) {
  var userNameCheck = /\w{3,}\s*/;
  var userEmailCheck = /[a-zA-Z]+\w*@\w+(.)\w{2,}$/;
  var userPassCheck = /\w{3,}/;

  var goodName = userNameCheck.test(name);
  var goodEmail = userEmailCheck.test(email);
  var goodPass = userPassCheck.test(pass);

 

  if (goodName == false) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "name must be at least 3 characters",
    });
    return false;
  }
  if (goodEmail == false) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Please enter a valid email address",
    });
    return false;
  }
  if (goodPass == false) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "password must be at least 3 characters",
    });
    return false;
  }

  if (goodName == true && goodEmail == true && goodPass == true) {
    return true;
  }
}

function checkSignUpFields() {
  if (
    signUpEmail.value == "" ||
    signUpName.value == "" ||
    signUpPass.value == ""
  ) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "All fields are mandatory!",
    });
    return false;
  } else {
    return true;
  }
}

function checkSignInFields() {
  if (logInEmail.value == "" || logInPass.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "All fields are mandatory!",
    });
    return false;
  } else {
    return true;
  }
}
function logOut() {
  window.location.href = "../index.html";
  userName = ``;
}

function clear() {
  logInEmail = "";
  logInPass = "";
  signUpName = "";
  signUpEmail = "";
  signUpPass = "";
  localStorage.setItem("userName", "");

}

function sayWelcome(userName) {

  welcomingText.innerHTML = `Welcome ${userName}`;
}


sayWelcome(userName);