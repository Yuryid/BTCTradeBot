// в цьому файлі описані скрипти
//
//get request
// $(document).ready(function(){
//     $("#button1").click( function(){
//         $.get("https://btc-trade.com.ua/api/deals/btc_uah", function(data, status){
//           // $("#demo").text("ok");
//           alert("Data: " + data + "\nStatus: " + status);
//          });
//     });
// });
$(document).ready(function(){
  $("#button1").click( function(){
    $("#trades-list").empty();
    var trades = "Wait...", 
        tradesObj;
    $("#trades-list").append($("<li class='list-group-item'></li>").text("Wait..."));
    getreq("https://btc-trade.com.ua/api/deals/btc_uah");
    //if(trades!=null) {
      //tradesObj = JSON.parse(trades);
     
    //}
    //else 
     // $("#trades-list").append($("<li class='list-group-item'></li>").text("Error!"));
      // tradesObj = "Error!";
    });
});
function getreq(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        $("#trades-list").empty();
        $("#trades-list").append($("<li class='list-group-item'></li>").text(JSON.parse(xmlHttp.responseText)));
        //ret = xmlHttp.responseText;
      }
      
      if (xmlHttp.readyState == 4 && xmlHttp.status == 502) {
        $("#trades-list").empty();
        $("#trades-list").append($("<li class='list-group-item'></li>").text("Bad Gateway"));
      }
      //$("#trades-list").append($("<li class='list-group-item'></li>").text(xmlHttp.responseText));
        //return xmlHttp.responseText;
      // else
      //   return null;
  }
  xmlHttp.open("GET", theUrl, true); // true for asynchronous 
  xmlHttp.send(null);
}
//
function dojson(jsonreq) {
  document.getElementById("demo").innerHTML = jsonreq;
}
// Get the modal
var modal = document.getElementById('loginForm');
// Get the link that opens the modal
var ssl = document.getElementById("login");
// Get the <span> element that closes the modal
var cls = document.getElementsByClassName("close")[0];
//подія клік на ссилці
ssl.onclick = function(event){
	event.preventDefault(); /*не переходимо по ссилці*/
	//Якщо користувач залогінився, тоді виводимо запит на вихід
	// (не повинно спрацювати ніколи)
	if(logined) {
		alert('Ви вже залоговані на сайті.\n','<a href="/logout.php">Вийти</a>');
	} else {
		// інакше виводимо йому форму логіну
		modal.style.display = "block";
	}
};

// When the user clicks on <span> (x), close the modal
cls.onclick = function() {
    modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
