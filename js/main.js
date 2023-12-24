var logInEmail = document.querySelector("#signinEmail");
var logInPass = document.querySelector("#signinPassword");
var logInBtn = document.querySelector("#login")

  // console.log(btn);

var users = [
  {
    email: "1@",
    pass: "111",
  },
  {
    email: "2@",
    pass: "222",
  },
  {
    email: "3@",
    pass: "333",
  }
];

logInBtn.addEventListener("mousedown", function (eventinfo) {
  var isUser = logUser(logInEmail.value, logInPass.value);
  console.log(isUser);
});

function logUser(email, pass) {
  var user ={
    email: email,
    pass: pass,
  };

  for (var i = 0; i < users.length; i++){
    if ((user.email == users[i].email) && (user.pass == users[i].pass)) {
      return true;
    }
    else {
      return false;
    }
  }
}

