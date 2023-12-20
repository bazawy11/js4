var siteName = document.getElementById("siteName");
var siteLink = document.getElementById("siteLink");
var table = document.getElementById("table");

var sitesList = [];





function addSite() {
    var site = {
        name: siteName.value,
        link: siteLink.value,
    };

    sitesList.push(site);
    console.log(site);

    display(sitesList);
}


function display(list) {
    var cartona = ``;

    for (var i = 0; i < list.length; i++){
       
       
        cartona +=` 
      <tr>
 <td>${i+1}</td>
  <td>${list[i].name}</td>
  <td><button class="btn btn-success w-50" onclick="window.open('${checkLink(list[i].link)}', '_blank')">Visit</button></td>
  <td><button class="btn btn-warning w-50" >Edit</button></td>
  <td><button class="btn btn-danger w-50" onclick="deleteRecord (${i})">Delete</button></td>
  </tr>`  
    }
    table.innerHTML = cartona;
}


function checkLink(link) {
    webText = "http";
    for (var i = 0; i < webText.length; i++) {
        if (link[i] != webText[i]) {
            return ("https://" + link);
        }
    }
            return (link);

}


function deleteRecord (index){
    sitesList.splice(index,1);
    display(sitesList);
}