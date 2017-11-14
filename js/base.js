// в цьому файлі описані скрипти
//

//do when document loaded
$(document).ready(function(){
  $("#button1").click( function(){
    $("#trades-list").empty();
    var trades = "Wait...", 
        tradesObj;
    $("#trades-list").append($("<li class='list-group-item'></li>").text("Wait..."));
    getreq("https://btc-trade.com.ua/api/deals/btc_uah");
  });
});
//get 
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
        trades.forEach(tradesListOut); 
  
        
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
//list of trades function
function tradesListOut(item, index) {
  var txt;
  var clr;
  txt = "<tr><th scope='row'>" + item.pub_date + "</th>";
  txt += "<td>" + item.user + "</td>";
  if(item.type=="buy") {
    clr = "text-success";
  }
  else {
    clr = "text-danger";
  }
  txt += "<td class='" + clr + "'>" + item.type + "</td>";
  txt += "<td>" + item.price + "</td>";
  txt += "<td>" + item.amnt_base + "</td>";
  txt += "<td>" + item.amnt_trade + "</td>";
  txt += '</tr>';
  $("#trades-list").append(txt);
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
