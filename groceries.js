window.onload = loadCookieList;

var myList = [];
//courtesy of w3schools, from: http://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
//courtesy of w3schools, from: http://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function addItem(){

  var input = document.getElementById("newItem").value;
  displayItem(input);

}

function removeParentlistItem(){


  var mom = this.parentNode;
  var itemRemove = mom.firstChild.textContent;
  var itemIndex = myList.indexOf(itemRemove);
  myList.splice(itemIndex,1);
  console.log(myList);
  var grandma = mom.parentNode;
  grandma.removeChild(mom);

}

function saveList() {
  var list = myList.toString();
  setCookie("groceryList",list,1);
}

function clearList() {
  var display = document.getElementById("listDisplay");

  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }
  myList = [];
}

function displayItem(input) {
  if (myList.indexOf(input) == -1 && input != ""){
    myList.push(input);
    console.log(myList);
    var list = document.getElementById("listDisplay");
    var item = document.createElement("li");
    var btnClose = document.createElement("button");
    btnClose.classList.add("btn");
    btnClose.classList.add("btn-danger");
    btnClose.classList.add("btn-xs");
    btnClose.addEventListener("click", removeParentlistItem);
    var itemName = document.createTextNode(input);
    item.appendChild(itemName);
    list.appendChild(item);
    document.getElementById("newItem").value = "";
    var iconClose = document.createElement("span");
    iconClose.classList.add("glyphicon");
    iconClose.classList.add("glyphicon-remove");
    btnClose.appendChild(iconClose);
    item.appendChild(btnClose);
  }
}

function loadCookieList(){
  var groceryListCookie = getCookie("groceryList");
  var arrayCookie = groceryListCookie.split(",");

  for(var i = 0; i < arrayCookie.length; i++){
    displayItem(arrayCookie[i]);

  }

}
