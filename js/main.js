var siteName = document.getElementById("siteName");
var siteLink = document.getElementById("siteLink");
var table = document.getElementById("table");

var sitesList = [];

console.log(localStorage.getItem("storeManagement"));

if (localStorage.getItem("storeManagement") != null) {
  sitesList = JSON.parse(localStorage.getItem("storeManagement"));
  display(sitesList);
}

function setLocalStorage(sitesList) {
  localStorage.setItem("storeManagement", JSON.stringify(sitesList));
}

function addSite() {
  var site = {
    name: siteName.value,
    link: siteLink.value,
  };
  if (checkName(site.name) && checkUrl(site.link)) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    sitesList.push(site);
    console.log(site);
    setLocalStorage(sitesList);
    display(sitesList);
    clear();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "you need to: \n # enter a valid email address \n # enter at least 3 characters in the site name",
    });
  }
}

function display(list) {
  var cartona = ``;

  for (var i = 0; i < list.length; i++) {
    cartona += ` 
      <tr>
 <td>${i + 1}</td>
  <td>${list[i].name}</td>
  <td><button class="btn btn-success w-50" onclick="window.open('${checkLink(
    list[i].link
  )}', '_blank')">Visit</button></td>

  <td><button class="btn btn-danger w-50" onclick="deleteRecord (${i})">Delete</button></td>
  </tr>`;
  }
  table.innerHTML = cartona;
}

function checkLink(link) {
  webText = "http";
  for (var i = 0; i < webText.length; i++) {
    if (link[i] != webText[i]) {
      return "https://" + link;
    }
  }
  return link;
}

function deleteRecord(index) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your record has been deleted.",
          icon: "success",
        });
        sitesList.splice(index, 1);
        setLocalStorage(sitesList);
        display(sitesList);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your record is safe :)",
          icon: "error",
        });
      }
    });
}

function clear() {
  siteLink.value = "";
  siteName.value = "";
}

function checkUrl(url) {
  var urlValidator = /\w+[.]\w{2,}/;

  if (urlValidator.test(url)) {
    return true;
  } else {
    return false;
  }
}

function checkName(name) {
  var nameValidator = /\w{3,}/;

  if (nameValidator.test(name)) {
    return true;
  } else {
    return false;
  }
}

function helpEntry(inputField, functionTrue) {
  if (functionTrue == true) {
    inputField.classList.add("border-success");
    inputField.classList.add("border-5");
    console.log("perfect!");
  } else {
    inputField.classList.remove("border-success");
  }

  if (inputField.value != "" && functionTrue == false) {
    inputField.classList.add("border-danger");
    inputField.classList.add("border-5");

    console.log("not yet!");
  } else {
    inputField.classList.remove("border-danger");
  }

  if (inputField.value == "") {
    inputField.classList.remove("border-5");
  }
}
