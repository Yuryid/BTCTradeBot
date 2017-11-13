// в цьому файлі описані скрипти
//

$(document).ready(function(){
  $("#button1").click( function(){
    $("#trades-list").empty();
    var trades = "Wait...", 
        tradesObj;
    $("#trades-list").append($("<li class='list-group-item'></li>").text("Wait..."));
    getreq("https://btc-trade.com.ua/api/deals/btc_uah");
  });
});
function getreq(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    /*success request status ok*/
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      if(xmlHttp.responseText!=null) {
        var trades = "Wait...", 
            tradesObj;
        trades = JSON.parse(xmlHttp.responseText);
        $("#trades-list").empty();

        $("#trades-list").append($("<li class='list-group-item'></li>").text(trades[0].user));
      }
    }
    /* Bad gateway 502 error*/
    if (xmlHttp.readyState == 4 && xmlHttp.status == 502) {
      $("#trades-list").empty();
      $("#trades-list").append($("<li class='list-group-item'></li>").text("502 Bad Gateway"));
    }
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
