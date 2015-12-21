 //set global variables
var dest="https://catalog.mainlib.org/PAPIService";
var counter=0;
var framehistory=[];
var framehistory2=[];
var page_counter=1;

if(page_counter<1){
var page_counter=1;
}

var newtitle_list=0;

var today= new Date();
var today_epoch= today.getTime()-500;

var overdue=false;

var net_status=true;

//device detection and homepage size
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	
//$('#the_latest_frame').css({"width":"100px"});	
	
//check network connection	
function checkConnection() {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';


	if (networkState == Connection.NONE) {
	net_status=false;
	//$.jAlert({
    //'title': 'Alert!',
   // 'content': 'Connection type: ' +states[networkState]+'',
    //'theme': 'blue',
  	//});
	}
}
checkConnection();	

if(net_status==false){
	$("iframe").each(function() { 
	   //$(this).attr('src','');
        $(this).replaceWith("<h4 align='center'>This page needs Internet connection.<br>It appears that you are currently not online.</h4>");
	});
}

//enable back button in ios9	
if(device.platform === "iOS" && parseInt(device.version) === 9){
       $.mobile.hashListeningEnabled = false;
   }
//homepage spacing in iphone6plus	
//var whatis=navigator.userAgent;
//alert('this is'+whatis+'');
var deviceType = (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : 'NULL';
//alert(deviceType);
if(deviceType!='NULL'){
	//$('.ui-btn').css({'margin-top':'1px', 'margin-bottom': '1px'}); 
}

var model = device.model;
alert('this is a: '+model+'');
if(model=='iPhone8,1'){
	//alert('this is an iphone 6plus');
	//$('.ui-btn').css({'margin-top':'', 'margin-bottom':''}); 
}
}

//function media material conversion
function matconv(val2){
switch(val2){
case 1:	var val2="Book"; break;
case 2: var val2="Printed or Manuscript Music"; break;
case 3: var val2="Cartographic Material"; break; 
case 4:	var val2="Visual Materials"; break; 
case 5: var val2="Sound Recording"; break; 
case 6:	var val2="Electronic Resources"; break; 
case 7:	var val2="Archival Mixed Materials"; break; 
case 8:	var val2="Serial"; break; 
case 9:	var val2="Printed Music"; break; 
case 10: var val2="Manuscript Music"; break; 
case 11: var val2="Printed Cartographic Material"; break; 
case 12: var val2="Manuscript Cartographic Material"; break; 
case 13: var val2="Map"; break; 
case 14: var val2="Globe"; break; 
case 15: var val2="Manuscript Material"; break; 
case 16: var val2="Projected Medium"; break; 
case 17: var val2="Motion Picture"; break; 
case 18: var val2="Video Recording"; break; 
case 19: var val2="Two Dimensional Non-projected Graphic"; break; 
case 20: var val2="Three Dimensional Object"; break; 
case 21: var val2="Musical Sound Recording"; break; 
case 22: var val2="Nonmusical Sound Recording"; break; 
case 23: var val2="Kit"; break; 
case 24: var val2="Periodical"; break; 
case 25: var val2="Newspaper"; break; 
case 26: var val2="Microform"; break; 
case 27: var val2="Large Print"; break; 
case 28: var val2="Braille"; break; 
case 33: var val2="DVD"; break; 
case 34: var val2="Videotape"; break; 
case 35: var val2="Music CD"; break; 
case 36: var val2="eBook"; break; 
case 37: var val2="Audio Book"; break;
case 40: var val2="Blue-Ray DVD"; break;
default: var val2="other media format"; break;
}
return val2;
}

//case2 - BARCODE SCANNER
function getData(barcode,referer){  
p_searchitem=barcode;
var thedate=(new Date()).toUTCString();
var reqstring="https://catalog.mainlib.org/PAPIService/REST/public/v1/1033/100/13/search/bibs/keyword/ISBN?q="+p_searchitem+"";
var p_method="GET";

$.ajax({
        type       : "POST",
		url: "http://www.jeffersonlibrary.net/INTERMED_short.php",
        crossDomain: true,
        data: {"uri": ""+reqstring+"", "rdate": ""+thedate+"", "method":""+p_method+""},
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
			//stop_spin();
			var code=response;
			p_response={"code": ""+code+"", "reqstring": ""+reqstring+"", "thedate": ""+thedate+""};
			getit_bc(p_response.code,p_response.reqstring,p_response.thedate,referer);
        },
        error      : function() {
            console.error("error");
            alert('Could not process.You might have no network connection.');                  
        }
});
}
//case 2 - get barcode detail
function getit_bc(code,reqstring,thedate,referer){
//if(referer=='nyt'){
//$.mobile.changePage("#bib_detail");
//}
var detlist_html='';
var settings = {
  "async": true,
  "crossDomain": true,
  "url": ""+reqstring+"",
  "method": "GET",
  "headers": {
    "polarisdate": ""+thedate+"",
    "authorization": ""+code+"",
    "content-type": "application/json"
  }
}

$.ajax(settings).done(function (response) {

var selection= ['Title', 'Author', 'PublicationDate', 'Description', 'ISBN', 'PrimaryTypeOfMaterial', 'LocalItemsTotal', 'LocalItemsIn', 'SystemItemsTotal','CurrentHoldRequests', 'Summary'];
$( "#bcode" ).empty();
$( "#bdetail" ).empty();

var detlist_html='';
  
$.each(response.BibSearchRows, function(key, value) {
cont_no=value.ControlNumber;
media=value.PrimaryTypeOfMaterial;
ISBN=value.ISBN;

switch(media){
	case 35: detlist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/cd_icon.png" /></td ><td class="txtbox">'; break;
	case 40: detlist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/blueray_icon.png" /></td ><td class="txtbox">'; break;
	case 33: detlist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/dvd_icon.png" /></td ><td class="txtbox">'; break;
	default: if(ISBN==''){
		detlist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/Jacket.jpg" /></td ><td class="txtbox">';
	} else{
detlist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+ISBN+'&userID=MAIN37789&password=CC10073" /></td ><td class="txtbox">';
}
}
								  
$.each(value, function(key2, value2) {
	
	if(jQuery.inArray( key2, selection )!== -1){
		switch(key2){
			case "PublicationDate":
			key2="Publication Date";
			break;
			case "LocalItemsTotal":
			key2="Local Items Total";
			break;
			case "LocalItemsIn":
			key2="Local Items In";
			break;
			case "CurrentHoldRequests":
			key2="Current Hold Requests";
			break;
			case "SystemItemsTotal":
			key2="System Items Total";
			break;
			case "PrimaryTypeOfMaterial":
			key2="Media Tyoe";
			value2=matconv(value2);
			break;
		}
	detlist_html += key2 + ": " + value2 + "<br>";
	}

});
detlist_html +="<p class='hold_req'><a id=" + cont_no + " href='#login' data-role='button' data-inline='true' data-mini='true' data-icon='arrow-r' data-theme='a'>Put on Hold</a></p>";
detlist_html +="</td></tr></table>";
});
 
//if(referer=='nyt'){
//$( "#bdetail" ).append(detlist_html);
//} else{
$( "#bcode" ).append(detlist_html);
//}

$('.hold_req a').button();
});
};


$(document).ready(function(){

//make keyboard disappear on "go"
/*$('input').keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        	if ( (code==13) || (code==10)){
            jQuery(this).blur();
            return false;
            }
});*/

//$('exportform').css("display", "none");

//$('#events_frame_cal').load(function() {
									// alert('loaded');
  //var css = '<style type="text/css">body{display: none};</style>';
 // $('#events_frame_cal').contents().find("head").append(css);
 //$("#events_frame_cal").contents().find("head").append(css);
//});

//open in app browser
$('#3m_btn').on('click', function () {
window.open('http://ebook.3m.com/library/jtpl/Featured', '_blank', 'location=yes');
});
$('#zinio_btn').on('click', function () {
window.open('https://www.rbdigital.com/mainincnj/service/zinio/landing?', '_blank', 'location=yes');
});
$('#oneclick_btn').on('click', function () {
window.open('http://jeffersontwpnj.oneclickdigital.com/', '_blank', 'location=yes');
});
$('#freegal_btn').on('click', function () {
window.open('http://jeffersonlibrary.freegalmusic.com/homes/index', '_blank', 'location=yes');
});

//google map
var map;
    $(document).on("pageshow", "#direction", function () {

      map = new GMaps({
        div: '#map_canvas',
        lat: 41.0205399,
        lng: -74.5490396,
		width: '100%',
        height: '250px',
		zoom: 15,
        zoomControl: true,
        zoomControlOpt: {
            style: 'SMALL',
            position: 'TOP_LEFT'
        },
        panControl: false
      });
	  
	    map.addMarker({
        lat: 41.0205399,
        lng: -74.5490396,
        title: 'JTPL',
        infoWindow: {
          content: '<p>Jefferson Township Public Library, 1031 Weldon Road, Oak Ridge, NJ 07438</p>'
        }
      });
});

//navigator
$('#dir_start').on ("tap", function () {
//start_spin();									   
launchnavigator.navigate(
  [41.0204913,-74.5491630],
  null,
  function(){
    //alert("Plugin success");
  },
  function(error){
    alert("Plugin error: "+ error);
  },
  {
    preferGoogleMaps: true,
    enableDebug: true,
    disableAutoGeolocation: true
});
});

//busy spinner
function start_spin(){
window.plugins.spinnerDialog.show();
}
function stop_spin(){
window.plugins.spinnerDialog.hide();
}

//clear searchfield
$(document).on("pagecreate", function () {
  $(".ui-input-clear").on("click", function() {
    counter=0;
  });
});

//Clean the hidden hold field upon entering main account page
$('#main_login').on('click', function () {
$('#cn_holdreq').val("");								   
});

//Home Button workaround to work with IOS 9
$('.home').on('click', function () {
self.location.href = 'index.html';
});

$(document).ready(function(){

//create browsing array for list and calendar view
$("#events_frame_cal").load(function(){
var frame=window.frames[0];									 
framehistory.push(frame.window.location.href);
});
$("#events_frame_list").load(function(){
var frame2=window.frames[1];									 
framehistory2.push(frame2.window.location.href);
});
});
//create go-back logic for calendar view
$('#clr_ifr_cal0').on('click', function () {
var frame=window.frames[0];										 
if(framehistory.length<=1 || frame.window.location.href=="http://jeffersonlibrary.net/WebCalendar/month_ap.php"){
$.mobile.changePage("#events_main");
framehistory=framehistory.slice(0,1);
}
else if (framehistory.length>2){
framehistory.pop();									 
var hist= (framehistory.length)-1;
var thetarget=framehistory[hist];
window.frames['events_frame_cal'].location=thetarget;
framehistory.pop();
}
else{
framehistory.pop();									 
var hist= (framehistory.length)-1;
var thetarget=framehistory[hist];
window.frames['events_frame_cal'].location=thetarget;
}
});
//create go-back logic for list view
$('#clr_ifr_list0').on('click', function () {
var frame=window.frames[1];											  
if(framehistory2.length<=1 || frame.window.location.href=="http://jeffersonlibrary.net/forms/eventsprobe_all_app.php"){
$.mobile.changePage("#events_main");
framehistory2=framehistory2.slice(0,1);
}
else if (framehistory2.length>2){
framehistory2.pop();									 
var hist2= (framehistory2.length)-1;
var thetarget2=framehistory2[hist2];
//alert(thetarget);
window.frames['events_frame_list'].location=thetarget2;
framehistory2.pop();
}
else{
framehistory2.pop();									 
var hist2= (framehistory2.length)-1;
var thetarget2=framehistory2[hist2];
//alert(thetarget);
window.frames['events_frame_list'].location=thetarget2;
}
});
//empty go-back buffers upon leaving event section
$('#clr_ifr').on('click', function () {
framehistory=framehistory.slice(0,1);
framehistory2=framehistory2.slice(0,1);
$.mobile.changePage("#pageone");
});

//toggle borrow_box and hold_box
$('#borrowed_box').on('click', function () {
$('#hold_box').collapsible( "collapse" );
});
$('#hold_box').on('click', function () {
$('#borrowed_box').collapsible( "collapse" );
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ENCRYPTION/VALIDATION
function p_validate(p_query, p_searchitem, p_pwd, p_cn, p_bc, p_method, p_type, p_holdID ){
if(p_pwd ==='undefined') p_pwd ='';
if(p_cn ==='undefined') p_cn ='';
if(p_bc ==='undefined') p_bc ='';
if(p_type ==='undefined') p_type ='';
if(p_holdID ==='undefined') p_holdID ='';
if(p_searchitem ==='undefined') p_searchitem ='';
switch(p_query){
case 1:	var reqstring=""+dest+"/REST/public/v1/1033/100/13/search/bibs/keyword/KW?q="+p_searchitem+"&bibsperpage=20&page="+p_holdID+""; break;
case 2: var reqstring=""+dest+"/REST/public/v1/1033/100/13/search/bibs/keyword/ISBN?q="+p_searchitem+""; break;
case 3: var reqstring=""+dest+"/REST/public/v1/1033/100/13/search/bibs/keyword/CN?q="+p_searchitem+""; break;
case 4: var reqstring=""+dest+"/REST/public/v1/1033/100/13/search/bibs/boolean?q=CN=%7Blist%7D"+p_searchitem+"%7B/list%7D+sortby+PD/sort.descending&bibsperpage=40&page="+p_holdID+""; break;
case 5: var reqstring=""+dest+"/REST/public/v1/1033/100/1/patron/"+p_bc+""; break;
case 6: var reqstring=""+dest+"/REST/public/v1/1033/100/1/holdrequest"; break;
case 7: var reqstring=""+dest+"/REST/public/v1/1033/100/1/patron/"+p_bc+"/holdrequests/"+p_holdID+"/cancelled?wsid=1&userid=1"; break;
case 8: var reqstring=""+dest+"/REST/public/v1/1033/100/1/patron/"+p_bc+"/holdrequests/all"; break;
case 9: var reqstring=""+dest+"/REST/public/v1/1033/100/1/patron/"+p_bc+"/itemsout/all"; break;
case 10: var reqstring=""+dest+"/REST/public/v1/1033/100/1/patron/"+p_bc+"/itemsout/overdue"; break;
case 11: var reqstring=""+dest+"/REST/public/v1/1033/100/1/patron/"+p_bc+"/itemsout/"+p_holdID+""; break;
case 12: var reqstring=""+dest+"/REST/public/v1/1033/100/13/search/bibs/boolean?q=COL=7+sortby+MP/sort.descending&page="+p_holdID+"";break;
case 13: var reqstring=""+dest+"/REST/public/v1/1033/100/13/search/bibs/keyword/ISBN?q="+p_searchitem+""; break;
}

var thedate=(new Date()).toUTCString();
if(p_searchitem){
	//start_spin();
}
$.ajax({
        type: "POST",
		async: true,
		url: "http://www.jeffersonlibrary.net/INTERMED_short.php",
        crossDomain: true,
        data: {"uri": ""+reqstring+"", "rdate": ""+thedate+"", "method":""+p_method+"", "patron_pin":""+p_pwd+""},
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
			//stop_spin();
			var code=response;
			p_response={"code": ""+code+"", "reqstring": ""+reqstring+"", "thedate": ""+thedate+""};
			switch(p_query){
			case 1:	get_books(p_response.code,p_response.reqstring,p_response.thedate); break;
			case 2: getit_bc(p_response.code,p_response.reqstring,p_response.thedate); break;
			case 3: get_detail(p_response.code,p_response.reqstring,p_response.thedate); break;
			case 4: get_news(p_response.code,p_response.reqstring,p_response.thedate); break;
			case 5: checklogin(p_response.code,p_response.reqstring,p_response.thedate,p_type,p_cn); break;
			case 6: createhold(p_holdID,p_cn,p_response.code,p_response.reqstring,p_response.thedate,p_bc); break;
			case 7: cancelhold(reqstring,thedate,code); break;
			case 8: getholds(reqstring,thedate,code); break;
			case 9: items_out_all(reqstring,thedate,code); break;
			case 10: items_out_over(reqstring,thedate,code); break;
			case 11: item_renew(reqstring,thedate,code,p_bc); break;
			case 12: most_popular(code,reqstring,thedate); break;
			case 13: get_det_nyt(p_response.code,p_response.reqstring,p_response.thedate); break;
			}
        },
        error      : function() {
            console.error("error");
            alert('Could not process.You might have no network connection.');                  
        }
});
}

//case 1 - book search reqstring (get encryption data)
var typingTimer;                //timer identifier
var doneTypingInterval = 500;  //time in ms, 5 second for example

$('#search_item').on('keyup',function () {
counter +=1;
  searchitem=0;
  	if(counter>2){
	//doneTyping();
	clearTimeout(typingTimer);
    if ($('#myInput').val) {
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
	}
	}
});

function doneTyping () {
   window.p_validate=function(){return false;};
   window.get_books=function(){return false;};
   searchitem= $('#search_item').val();
   	p_searchitem=searchitem.replace(/\s+/g,"+");
	$('#most_popular').empty();
	page_counter=1;
	p_validate(1,''+p_searchitem+'','','','','GET','',1);
}

//case 1 - get books
function get_books(code,reqstring,thedate){
$('#selection').collapsible( "collapse" );
var blist_html='';
var settings = {
  "async": true,
  "crossDomain": true,
  "url": ""+reqstring+"",
  "method": "GET",
  "headers": {
    "polarisdate": ""+thedate+"",
    "authorization": ""+code+"",
    "content-type": "application/json"
  }
}

$.ajax(settings).done(function (response) {
var selection= ['Title', 'Author', 'PublicationDate', 'PrimaryTypeOfMaterial'];

$( "#most_popular" ).empty();
$( "#news" ).empty();
$( "#blist" ).empty();
$( "#news_dvd" ).empty();
$( "#nyt" ).empty();

var blist_html='';
var next_batch='';

$.each(response.BibSearchRows, function(key, value) {
cont_no=value.ControlNumber;
media=value.PrimaryTypeOfMaterial;
ISBN=value.ISBN;

switch(media){
	case 35: blist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/cd_icon.png" /></td ><td class="txtbox">'; break;
	case 40: blist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/blueray_icon.png" /></td ><td class="txtbox">'; break;
	case 33: blist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/dvd_icon.png" /></td ><td class="txtbox">'; break;
	default: if(ISBN==''){
		blist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/Jacket.jpg" /></td ><td class="txtbox">';
	} else{
		blist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+ISBN+'&userID=MAIN37789&password=CC10073" /></td ><td class="txtbox">';};
}

$.each(value, function(key2, value2) {
	
	if(jQuery.inArray( key2, selection )!== -1){
		
	switch(key2){
		case "PublicationDate":
		key2="Publication Date";
		break;
		case "PrimaryTypeOfMaterial":
		key2="Media Type";
		value2=matconv(value2);
		break;
	}
	
	blist_html += "<strong>" + key2 + "</strong>: " + value2 + "<br>";
	}

});
blist_html +="<p class='trail'><a id=" + cont_no + " href='#bib_detail' data-role='button' data-inline='true' data-mini='true' data-icon='arrow-r' data-theme='a'>Detail</a></p>";
blist_html +="</td></tr></table>";

$('.trail a[data-role=button]').button();
$('.trail a').button('refresh');
});

$( "#blist" ).append(blist_html);
$('.trail a').button();
if(page_counter==1){
next_batch +="<a href='#' id='fwd_btn' class='ui-btn ui-corner-all ui-icon-cloud ui-btn-icon-left'>...next 20 results</a>";
$( "#blist" ).append(next_batch);
}
if(page_counter>1){
next_batch +="<div data-role='controlgroup' data-type='horizontal' data-mini='true'><a href='#' id='rev_btn' class='ui-btn ui-corner-all ui-icon-carat-l ui-btn-icon-left'>show last 20</a><a href='#' id='fwd_btn' class='ui-btn ui-corner-all ui-icon-carat-r ui-btn-icon-left'>show next 20</a></div>";
$( "#blist" ).append(next_batch);
}
});
}

//create the "next"/"previous" batch search buttons
//next batch general book search
$(document).on('click', '#fwd_btn', function () {
page_counter=page_counter+1;
next_search(page_counter);
});
$(document).on('click', '#rev_btn', function () {
page_counter=page_counter-1;
next_search(page_counter);
});

function next_search(next_page){
searchitem= $('#search_item').val();
   	p_searchitem=searchitem.replace(/\s+/g,"+");
	p_validate(1,''+p_searchitem+'','','','','GET','',''+next_page+'');
}
//next batch most popular button
$(document).on('click', '#fwd_btn_mp', function () {
page_counter=page_counter+1;
next_mp_search(page_counter);
});
$(document).on('click', '#rev_btn_mp', function () {
page_counter=page_counter-1;
next_mp_search(page_counter);
});

function next_mp_search(next_page){
	p_validate(12,'','','','','GET','',''+next_page+'');
}
//next batch new books and dvds
$(document).on('click', '#fwd_btn_news', function () {
page_counter=page_counter+1;
next_news_search(page_counter);
});
$(document).on('click', '#rev_btn_news', function () {
page_counter=page_counter-1;
next_news_search(page_counter);
});

function next_news_search(next_page){
searchitem= newtitle_list;
   	p_validate(4,''+searchitem+'','','','','GET','',''+next_page+'');
}

//case 3 - get book detail (get encryption data)
$(document).on('click', '.trail a', function () {
p_searchitem=$(this).attr("id");
p_validate(3,''+p_searchitem+'','','','','GET','','');
});
//case 3 - get detail
function get_detail(code,reqstring,thedate){
var detlist_html='';

var settings = {
  "async": true,
  "crossDomain": true,
  "url": ""+reqstring+"",
  "method": "GET",
  "headers": {
    "polarisdate": ""+thedate+"",
    "authorization": ""+code+"",
    "content-type": "application/json"
  }
}

$.ajax(settings).done(function (response) {

var selection= ['Title', 'Author', 'PublicationDate', 'Description', 'ISBN', 'PrimaryTypeOfMaterial', 'LocalItemsTotal', 'LocalItemsIn', , 'SystemItemsTotal', 'CurrentHoldRequests', 'Summary','CallNumber'];

$( "#bdetail" ).empty();
var detlist_html='';
  
$.each(response.BibSearchRows, function(key, value) {
cont_no=value.ControlNumber;
media=value.PrimaryTypeOfMaterial;
ISBN=value.ISBN;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
UPC=value.UPC;
if(ISBN){cover_no=ISBN;}else{cover_no=UPC;}
if(UPC!=''){
selection= ['Title', 'Author', 'PublicationDate', 'Description', 'PrimaryTypeOfMaterial', 'LocalItemsTotal', 'LocalItemsIn', , 'SystemItemsTotal', 'CurrentHoldRequests', 'Summary','CallNumber'];
}

if(cover_no==''){
switch(media){
	case 35: np_list_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/cd_icon.png" /></td ><td class="txtbox">'; break;
	case 40: np_list_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/blueray_icon.png" /></td ><td class="txtbox">'; break;
	case 33: np_list_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/dvd_icon.png" /></td ><td class="txtbox">'; break;
	default: np_list_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/book_icon.png" /></td ><td class="txtbox">'; break;
}
}else{	
detlist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+cover_no+'&userID=MAIN37789&password=CC10073" /></td ><td class="txtbox">';
}
								  
$.each(value, function(key2, value2) {
	
	if(jQuery.inArray( key2, selection )!== -1){
		switch(key2){
			case "PublicationDate":
			key2="Publication Date";
			break;
			case "LocalItemsTotal":
			key2="Local Items Total";
			break;
			case "LocalItemsIn":
			key2="Local Items In";
			break;
			case "SystemItemsTotal":
			key2="System Items Total";
			break;
			case "CallNumber":
			key2="Call Number";
			break;
			case "CurrentHoldRequests":
			key2="Current Hold Requests";
			break;
			case "PrimaryTypeOfMaterial":
			key2="Media Type";
			value2=matconv(value2);
			break;
		}
	detlist_html += "<strong>" + key2 + "</strong>: " + value2 + "<br>";
	}

});
detlist_html +="<p class='hold_req'><a id=" + cont_no + " href='#login' data-role='button' data-inline='true' data-mini='true' data-icon='arrow-r' data-theme='a'>Put on Hold</a></p>";
detlist_html +="</td></tr></table>";
});
 
$( "#bdetail" ).append(detlist_html);
$('.hold_req a').button();
});
};

//case 4 - get new publications - book & dvd  (encrypt)
$(document).on('click', '#nb_btn', function () {
page_counter=1;										 
$('#selection').collapsible( "collapse" );
$( "#most_popular" ).empty();
$( "#news" ).empty();
$( "#blist" ).empty();
$( "#news_dvd" ).empty();
$( "#nyt" ).empty();

$.ajax({
        type: "GET",
		async: true,
		url: "http://www.jeffersonlibrary.net/newbook.php",
        crossDomain: true,
        success : function(response) {
			newtitle_list=response;
			p_validate(4,''+response+'','','','','GET','',1);
			start_spin();
        },
        error      : function() {
            console.error("error");
            alert('Could not process.You might have no network connection.');                  
        }
});
});

$(document).on('click', '#ndvd_btn', function () {
page_counter=1;	
$('#selection').collapsible( "collapse" );
$('#blist').empty();
$('#most_popular').empty();
$('#news').empty();
$.ajax({
        type: "GET",
		async: true,
		url: "http://www.jeffersonlibrary.net/newdvd.php",
        crossDomain: true,
        success : function(response) {
			newtitle_list=response;
			p_validate(4,''+response+'','','','','GET','',1);
			start_spin();
        },
        error      : function() {
            console.error("error");
            alert('Could not process.You might have no network connection.');                  
        }
});
});
//case 4 - get news list - book and dvd
function get_news(code,reqstring,thedate){
var np_list_html='';
var next_batch_news='';

var settings = {
  "async": true,
  "crossDomain": true,
  "url": ""+reqstring+"",
  "method": "GET",
  "headers": {
    "polarisdate": ""+thedate+"",
    "authorization": ""+code+"",
    "content-type": "application/json"
  }
}

$.ajax(settings).done(function (response) {

var selection= ['Title', 'Author', 'PublicationDate', 'Description', 'PrimaryTypeOfMaterial'];
$( "#news" ).empty();
var np_list_html='';
var next_batch_news='';
  
$.each(response.BibSearchRows, function(key, value) {
cont_no=value.ControlNumber;
media=value.PrimaryTypeOfMaterial;
ISBN=value.ISBN;
UPC=value.UPC;
if(ISBN){cover_no=ISBN;}else{cover_no=UPC;}

if(UPC!=''){
selection= ['Title', 'PublicationDate', 'Description', 'PrimaryTypeOfMaterial'];
}



if(cover_no==''){
switch(media){
	case 35: np_list_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/cd_icon.png" /></td ><td class="txtbox">'; break;
	case 40: np_list_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/blueray_icon.png" /></td ><td class="txtbox">'; break;
	case 33: np_list_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/dvd_icon.png" /></td ><td class="txtbox">'; break;
	default: np_list_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/book_icon.png" /></td ><td class="txtbox">'; break;
}
}else{	
np_list_html +='<table class="bibtbl"><tr><td class="picbox"><img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+cover_no+'&userID=MAIN37789&password=CC10073" /></td ><td class="txtbox">';
}

$.each(value, function(key2, value2) {
	
	if(jQuery.inArray( key2, selection )!== -1){
	switch(key2){
		case "PublicationDate":
		key2="Publication Date";
		break;
		case "PrimaryTypeOfMaterial":
		key2="Media Type";
		value2=matconv(value2);
		break;
	}
	np_list_html += key2 + ": " + value2 + "<br>";
	}

});
np_list_html +="<p class='trail'><a id=" + cont_no + " href='#bib_detail' data-role='button' data-inline='true' data-mini='true' data-icon='arrow-r' data-theme='a'>Detail</a></p>";
np_list_html +="</td></tr></table>";

$('.trail a[data-role=button]').button();
$('.trail a').button('refresh');

});
$( "#news" ).append(np_list_html);
$('.trail a').button();
stop_spin();

if(page_counter==1){
next_batch_news +="<a href='#' id='fwd_btn_news' class='ui-btn ui-corner-all ui-icon-cloud ui-btn-icon-left'>...next 40 results</a>";
$( "#news" ).append(next_batch_news);
}
if(page_counter>1){
next_batch_news +="<div data-role='controlgroup' data-type='horizontal' data-mini='true'><a href='#' id='rev_btn_news' class='ui-btn ui-corner-all ui-icon-carat-l ui-btn-icon-left'>show last 40</a><a href='#' id='fwd_btn_news' class='ui-btn ui-corner-all ui-icon-carat-r ui-btn-icon-left'>show next 40</a></div>";
$( "#news" ).append(next_batch_news);
}
});
}

//case 5 - Hold Request or Login (get encryption)
$(document).on('click', '.hold_req a', function () {
var cont_num;
cont_num=$(this).attr("id");
$('#cn_holdreq').val(cont_num);
});
//Login
$('#loginsubmit').on ("click", function () {
var hold;
if($('#cn_holdreq').val()){hold=true;cont_num=$('#cn_holdreq').val();}else{	hold=false;cont_num='';}
p_barcode=$("#libcard").val();
p_pin=$("#libpin").val();
p_validate(5,'',''+p_pin+'',''+cont_num+'',''+p_barcode+'','GET',''+hold+'','');
});
//case 5 - check login with indicator for hold or no hold (-> to putonhold or prepgetholds)
function checklogin(code,reqstring,thedate,hold,p_cn){
var settings = {
  "async": true,
  "crossDomain": true,
  "url": ""+reqstring+"",
  "method": "GET",
  "headers": {
    "polarisdate": ""+thedate+"",
    "authorization": ""+code+"",
    "content-type": "application/json"
  }
}
$.ajax(settings).done(function (response) {
var res_pat_id=response.PatronID;
var pat_barcode=response.PatronBarcode;
var valid_pat=response.ValidPatron;
//alert(valid_pat);
if(valid_pat==true){
	if(hold=='true'){
	putonhold(res_pat_id, pat_barcode,p_cn);
	$('#cn_holdreq').val("");
	}else{
	prep_getholds(pat_barcode);
	}
	$('#patron_bc').val(pat_barcode);
} else{
alert('Login information not valid. Please try again');
}
//end ajax
}).fail(function() {
	alert ('Your login failed. Please try again');
});
//end checklogin
}

//case 6 - function putonhold (get encryption)
function putonhold(res_pat_id,pat_barcode,p_cn){
p_validate(6,'','',''+p_cn+'',''+pat_barcode+'','POST','',''+res_pat_id+'');
};
//case 6 - function createhold & -> 8 prep getholds
function createhold(res_pat_id,cont_num,code,reqstring,thedate,pat_barcode){

var d = new Date();
var str_time = d.toISOString();

var settings = {
  "async": true,
  "crossDomain": true,
  "url": ""+reqstring+"",
  "method": "POST",
  "headers": {
    "polarisdate": ""+thedate+"",
    "authorization": ""+code+"",
    "content-type": "application/xml"
  },
  "processData": false,
  
  "data": '<HoldRequestCreateData><PatronID>'+res_pat_id+'</PatronID><BibID>'+cont_num+'</BibID><ItemBarcode/><VolumeNumber/><Designation/><PickupOrgID>13</PickupOrgID><PatronNotes/><ActivationDate>'+str_time+'</ActivationDate><WorkstationID>1</WorkstationID><UserID>1</UserID><RequestingOrgID>13</RequestingOrgID><TargetGUID></TargetGUID></HoldRequestCreateData>'
}

$.ajax(settings).done(function (response) {
var h_cont=false;
//parse the xml object
var the_status = response.getElementsByTagName("StatusType")[0].childNodes[0].nodeValue;
var the_value = response.getElementsByTagName("StatusValue")[0].childNodes[0].nodeValue;
var the_pos = response.getElementsByTagName("QueuePosition")[0].childNodes[0].nodeValue;
var the_queue = response.getElementsByTagName("QueueTotal")[0].childNodes[0].nodeValue;
var the_message = response.getElementsByTagName("Message")[0].childNodes[0].nodeValue;
the_message = the_message.replace(/<br\s*[\/]?>/gi, "\n");

//Status type
//1 - Error
//2 - Answer
//3 - Conditional

	if(the_status==1){
		h_cont=false;
			$.jAlert({
				'type': 'modal',
				'title': 'Error',
				'content': 'Hold can not be processed',
				'theme': 'blue'
			});
		//alert('Can not process.\n'+the_message+'.');
		
	}
	if(the_status==2){
		h_cont=true;
		if(the_value==1){
			$.jAlert({
				'type': 'modal',
				'title': 'Hold Confirmation',
				'content': ''+the_message+'\nYour are # '+the_pos+' in the waiting queue of '+the_queue+'',
				'theme': 'blue',
				'onClose':function(){ 
				prep_getholds (pat_barcode);
				return false; }
			});
		}else{
			$.jAlert({
				'type': 'modal',
				'title': 'Hold Confirmation',
				'content': ''+the_message+'',
				'theme': 'blue',
				'onClose':function(){ 
				prep_getholds (pat_barcode);
				return false; }
			});
			//alert(''+the_message+'\nYour are # '+the_pos+' in the waiting queue of '+the_queue+'');}else{alert(the_message);
		}
		//h_cont=true;
	}
	if(the_status==3){
			$.jAlert({
				'type': 'confirm',
				'title': 'Hold Request',
				'content': ''+the_message+'',
				'theme': 'blue',
				'onConfirm': 
				function(){
				prep_getholds (pat_barcode);
				return false;}
			});
		//var dec = confirm(the_message);
	  	//if (dec==true){h_cont=true;}else{h_cont=false;}
	}

////if(h_cont==true){
//prep_getholds (pat_barcode);	
//alert('now we process');
//}
//else{
//alert('Request could not be processed');
//}
}).fail(function() {
	alert ('Sorry, your hold request failed.');
});
}

//case 7 - Cancel Hold - take hold id, validate patron and -> cancelhold
$(document).on('click', '.hold_cancel a', function () {
hold_id=$(this).attr("id");	
});
//modal dialog
$("#cancel_hold_conf").on('click', function(){
p_barcode=$("#patron_bc").val();
p_pin=$("#libpin").val();
$( "#loginresponse" ).empty();
p_validate(7,'',''+p_pin+'','',''+p_barcode+'','PUT','',''+hold_id+'');
});
//case 7 - cancelhold and -> prep_getholds
function cancelhold(reqstring, thedate, code){

var settings = {
  "async": true,
  "crossDomain": true,
  "url": ""+reqstring+"",
  "method": "PUT",
  "headers": {
    "polarisdate": ""+thedate+"",
    "authorization": ""+code+"",
    "content-type": "application/json"
  }
}
$.ajax(settings).done(function (response) {
var cancel_confirm=response.PAPIErrorCode;
//if error code =0
if(cancel_confirm==0){
var pwd=$('#libpin').val();
var pat_barcode=$("#patron_bc").val();
p_validate(8,'',''+pwd+'','',''+pat_barcode+'','GET','','');
}else{
alert('your hold cancel request failed');
}
//end ajax
});
//end cancelhold
}

//case 8 - prep_getholds and -> 8 getholds or 9 items out all
function prep_getholds(pat_barcode){
	//searchitem1=pat_barcode;
	var pwd=$('#libpin').val();
p_validate(8,'',''+pwd+'','',''+pat_barcode+'','GET','','');
p_validate(9,'',''+pwd+'','',''+pat_barcode+'','GET','','');
};
//case 8 getholds (list)
function getholds(reqstring,thedate,code){	
$.mobile.changePage("#inside");
////var response='';	
var settings = {
  "async": true,
  "crossDomain": true,
  "url": ""+reqstring+"",
  "method": "GET",
  "headers": {
    "polarisdate": ""+thedate+"",
    "authorization": ""+code+"",
    "content-type": "application/json"
  }
}

$.ajax(settings).done(function (response) {

var response=JSON.stringify(response);
var response= jQuery.parseJSON(response);

var my_holds='';
var hold_selection= ['Title', 'Author', 'StatusDescription', 'FormatDescription'];

$( "#loginresponse" ).empty();
//alert('loginresponse should be empty now');

////sort by value.StatusID
response=response.PatronHoldRequestsGetRows;
response.sort(function(a, b){
return b.StatusID - a.StatusID;
});  


$.each(response, function(key, value) {

if(value.StatusDescription!="Cancelled"){

media=value.FormatID;
switch(media){
	case 35: my_holds +='<table class="bibtbl"><tr><td class="picbox"><img src="img/cd_icon.png" /></td ><td class="txtbox">'; break;
	case 40: my_holds +='<table class="bibtbl"><tr><td class="picbox"><img src="img/blueray_icon.png" /></td ><td class="txtbox">'; break;
	case 33: my_holds +='<table class="bibtbl"><tr><td class="picbox"><img src="img/dvd_icon.png" /></td ><td class="txtbox">'; break;
	default: my_holds +='<table class="bibtbl"><tr><td class="picbox"><img src="img/book_icon.png" /></td ><td class="txtbox">'; break;
}
//check if item is in an change gradient of textbox
var is_in=value.StatusID;
if(is_in >= 6){
my_holds +="<div class='p_alert'>Please Pick-up</div>";
//$('.txtbox').removeClass('.txtbox').addClass(".txtbox_in");
}

			$.each(value, function(key2, value2) {
								   
				if(key2=="HoldRequestID"){
				hold_req_id=value2;
				}				   
								   
				if(value2!=''){
				if(jQuery.inArray( key2, hold_selection )!== -1){
				
				switch(key2){
				case "StatusDescription":
				key2="Status";
				break;
				case "FormatDescription":
				key2="Media Type";
				break;
				}

					if(key2=="Title"){
					my_holds += "<strong>" + key2 + ": " + value2 + "</strong><br>";
					}else{
					my_holds += key2 + ": " + value2 + "<br>";
					}

				}
				}
		});

my_holds +="<p class='hold_cancel'><a id=" + hold_req_id + " href='#popupDialog_cancelhold' data-rel='popup' data-position-to='window' data-transition='pop' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-icon-delete ui-btn-icon-left ui-btn-b'>Cancel Hold...</a></p>";

my_holds +="</td></tr></table>";
}//end screen out cancelled
});
								
$( "#loginresponse" ).append(my_holds);

});//end ajax 
};//end getholds function

//case 9 - items out all (list)
function items_out_all(reqstring,thedate,code){
window.plugins.spinnerDialog.show(null,"...processing");

var settings = {
  "async": true,
  "crossDomain": true,
  "url": ""+reqstring+"",
  "method": "GET",
  "headers": {
    "polarisdate": ""+thedate+"",
    "authorization": ""+code+"",
    "content-type": "application/json"
  }
}

$.ajax(settings).done(function (response) {
var my_outs='';
var out_selection= ['FormatDescription', 'Title', 'Author', 'CheckOutDate', 'DueDate', 'RenewalCount'];

$( "#borrowed" ).empty();

$.each(response.PatronItemsOutGetRows, function(key, value) {

media=value.FormatID;
ISBN=value.ISBN;

//UPC=value.UPC;
//if(ISBN){cover_no=ISBN;}else{cover_no=UPC;}									 

RENCT=value.RenewalCount;
RENLIM=value.RenewalLimit;
var RENPOS=RENLIM-RENCT;
bib_id=value.BibID;
var hold_ind=false;

var reqstring=""+dest+"/REST/public/v1/1033/100/13/bib/"+bib_id+"";
var thedate=(new Date()).toUTCString();

p_method="GET";
p_pwd ='';

$.ajax({
        type       : "POST",
		url: "http://www.jeffersonlibrary.net/INTERMED_short.php",
        async: false,
		crossDomain: true,
        data: {"uri": ""+reqstring+"", "rdate": ""+thedate+"", "method":""+p_method+"", "patron_pin":""+p_pwd+""},
		error: function(jqXHR,text_status,strError){
			alert("no connection");},
		timeout:60000,
		cache: false,
        success : function(response) {
			var code=response;
			p_response={"code": ""+code+"", "reqstring": ""+reqstring+"", "thedate": ""+thedate+""};
			//alert('ready to send to filter holds');
			filter_holds(p_response.code,p_response.reqstring,p_response.thedate, bib_id);
        },
        error      : function() {
            console.error("error");
            alert('Could not process.You might have no network connection.');                  
        }
});

function filter_holds (code,reqstring,thedate,bibID){

var settings = {
  "async": false,
  "crossDomain": true,
  "url": ""+reqstring+"",
  "method": "GET",
  "headers": {
    "polarisdate": ""+thedate+"",
    "authorization": ""+code+"",
    "content-type": "application/json"
  }
}
$.ajax(settings).done(function (response) {

$.each(response.BibGetRows, function(key, value) {
overdue=false;									 
if(value.ElementID=='8'){
$.each(value, function(key2, value2) {
if(key2=='Value'){
var holds=value2;
if(holds>0){hold_ind=true;}else{hold_ind=false;}
};
});
};
});
});
};

switch(media){
	case 35: my_outs +='<table class="bibtbl"><tr><td class="picbox"><img src="img/cd_icon.png" /></td ><td class="txtbox">'; break;
	case 40: my_outs +='<table class="bibtbl"><tr><td class="picbox"><img src="img/blueray_icon.png" /></td ><td class="txtbox">';hold_ind=true; break;
	case 33: my_outs +='<table class="bibtbl"><tr><td class="picbox"><img src="img/dvd_icon.png" /></td ><td class="txtbox">'; hold_ind=true; break;
	default: if(ISBN==''){
		my_outs +='<table class="bibtbl"><tr><td class="picbox"><img src="img/Jacket.jpg" /></td ><td class="txtbox">';
	} else{
	my_outs +='<table class="bibtbl"><tr><td class="picbox"><img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+ISBN+'&userID=MAIN37789&password=CC10073" /></td ><td class="txtbox">';};
}
			$.each(value, function(key2, value2) {
				if(key2=="ItemID"){
				out_req_id=value2;
				}
				if(key2=="RenewalCount"){
					if(hold_ind==true){value2='not renewable';}
					if(RENPOS<=0){value2='not renewable';hold_ind=true;}
					else{value2=""+value2+"";}
				}
				
				if(value2!=''){
				if(jQuery.inArray( key2, out_selection )!== -1){
				
				switch(key2){
				case "RenewalCount":
				key2="Renewals Count";
				break;
				case "DueDate":
				var cod_epoch= parseFloat(value2.substr(6 ));
				if(cod_epoch<today_epoch){overdue=true;}
				var DDate= new Date( parseFloat(value2.substr(6 )));
				value2=DDate.toDateString();
				key2="Due Date";
				break;
				case "CheckOutDate":
				var CODate= new Date( parseFloat(value2.substr(6 )));
				value2=CODate.toDateString();
				key2="Check Out Date";
				break;
				}	
					
				if(key2=="Title"){
				my_outs += "<strong>" + key2 + ": " + value2 + "</strong><br>";
				}else{
				my_outs += key2 + ": " + value2 + "<br>";
				}
								
				}
				}

			});
if(overdue==true){my_outs +="<div class='p_duealert'>Item Due</div>";}
if(hold_ind==false){
my_outs +="<p class='out_extend'><a id=" + out_req_id + " href='#popupDialog_extend' data-rel='popup' data-position-to='window' data-transition='pop' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-icon-carat-r ui-btn-icon-left ui-btn-b'>Renew Item...</a></p>";
}
			
my_outs +="</td></tr></table>";
//}//end screen out cancelled
});
$( "#borrowed" ).append(my_outs);
window.plugins.spinnerDialog.hide();
});//end ajax 
};//end items_out_all function

//case 11 - extend (encrypt) - take: out_extend id, p_bc, p_pin
$(document).on('click', '.out_extend a', function () {
extend_id=$(this).attr("id");
});
//modal dialog
$("#extend_out_conf").on('click', function(){
p_barcode=$("#patron_bc").val();
p_pin=$("#libpin").val();
//alert('ready to extend'+extend_id+'');
$("#borrowed" ).empty();
//alert('this is ppin:'+p_pin+' - pbarcode:'+p_barcode+' - extendid:'+extend_id+'');
p_validate(11,'',''+p_pin+'','',''+p_barcode+'','PUT','',''+extend_id+'');
});
//case 11 - extend (ajax & go to prep_getholds)
function item_renew(reqstring,thedate,code,pat_barcode){

var settings = {
  "async": true,
  "crossDomain": true,
  "url": ""+reqstring+"",
  "method": "PUT",
  "headers": {
    "polarisdate": ""+thedate+"",
    "authorization": ""+code+"",
    "content-type": "application/json"
  },
  "processData": false,
  "data": '{"Action": "renew","LogonBranchID": "13","LogonUserID": "1","LogonWorkstationID": "1","RenewData": { "IgnoreOverrideErrors": "true" }}'
}

$.ajax(settings).done(function (response) {
pwd=$('#libpin').val();
  p_validate(9,'',''+pwd+'','',''+pat_barcode+'','GET','','');
});
}

//case 12 - get most popular (encrypt)
$(document).on('click', '#mp_btn', function () {
page_counter=1;
$( "#most_popular" ).empty();
$( "#news" ).empty();
$( "#blist" ).empty();
$( "#news_dvd" ).empty();
$( "#nyt" ).empty();
$('#selection').collapsible( "collapse" );
p_validate(12,'','','','','GET','',1);
start_spin();
});
//case 12 - list most popular
function most_popular(code,reqstring,thedate){

var settings = {
  "async": true,
  "crossDomain": true,
  "url": ""+reqstring+"",
  "method": "GET",
  "headers": {
    "polarisdate": ""+thedate+"",
    "authorization": ""+code+"",
    "content-type": "application/json"
  }
}

$.ajax(settings).done(function (response) {

var selection= ['Title', 'Author', 'PublicationDate', 'PrimaryTypeOfMaterial', 'LocalItemsTotal','LocalItemsIn', 'SystemItemsTotal', 'SystemItemsIn'];
$( "#most_popular" ).empty();
var mplist_html='';
var next_mplist_html='';

$.each(response.BibSearchRows, function(key, value) {
cont_no=value.ControlNumber;
media=value.PrimaryTypeOfMaterial;
ISBN=value.ISBN;

switch(media){
	case 35: mplist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/cd_icon.png" /></td ><td class="txtbox">'; break;
	case 40: mplist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/blueray_icon.png" /></td ><td class="txtbox">'; break;
	case 33: mplist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/dvd_icon.png" /></td ><td class="txtbox">'; break;
	default: if(ISBN==''){
		mplist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/Jacket.jpg" /></td ><td class="txtbox">';
	} else{
		mplist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+ISBN+'&userID=MAIN37789&password=CC10073" /></td ><td class="txtbox">';};
}

$.each(value, function(key2, value2) {
	
	if(jQuery.inArray( key2, selection )!== -1){
		
	switch(key2){
		case "PublicationDate":
		key2="Publication Date";
		break;
		case "PrimaryTypeOfMaterial":
		key2="Media Type";
		value2=matconv(value2);
		break;
	}
	
	mplist_html += "<strong>" + key2 + "</strong>: " + value2 + "<br>";
	}

});
mplist_html +="<p class='trail'><a id=" + cont_no + " href='#bib_detail' data-role='button' data-inline='true' data-mini='true' data-icon='arrow-r' data-theme='a'>Detail</a></p>";
mplist_html +="</td></tr></table>";

$('.trail a[data-role=button]').button();
$('.trail a').button('refresh');
});

$( "#most_popular" ).append(mplist_html);
stop_spin();
$('.trail a').button();
if(page_counter==1){
next_mplist_html +="<a href='#' id='fwd_btn_mp' class='ui-btn ui-corner-all ui-icon-cloud ui-btn-icon-left'>...next 20 results</a>";
$( "#most_popular" ).append(next_mplist_html);
}
if(page_counter>1){
next_mplist_html +="<div data-role='controlgroup' data-type='horizontal' data-mini='true'><a href='#' id='rev_btn_mp' class='ui-btn ui-corner-all ui-icon-carat-l ui-btn-icon-left'>show last 20</a><a href='#' id='fwd_btn_mp' class='ui-btn ui-corner-all ui-icon-carat-r ui-btn-icon-left'>show next 20</a></div>";
$( "#most_popular" ).append(next_mplist_html);

}
});
}

//case 13 take the ISBN to the library
$(document).on('click', '.bc a', function () {
var the_isbn=$(this).attr("id");
//$.mobile.changePage("#scanner");
start_spin();
p_validate(13,''+the_isbn+'','','','','GET','','');
});
//case 13 Get NYT Detail in the Detail Page
function get_det_nyt(code,reqstring,thedate){

var det_nyt_html='';
var settings = {
  "async": true,
  "crossDomain": true,
  "url": ""+reqstring+"",
  "method": "GET",
  "headers": {
    "polarisdate": ""+thedate+"",
    "authorization": ""+code+"",
    "content-type": "application/json"
  }
}

$.ajax(settings).done(function (response) {

var selection= ['Title', 'Author', 'PublicationDate', 'Description', 'ISBN', 'PrimaryTypeOfMaterial', 'LocalItemsTotal', 'LocalItemsIn', 'SystemItemsTotal','CurrentHoldRequests', 'Summary'];
$( "#bdetail" ).empty();

var det_nyt_html='';
  
$.each(response.BibSearchRows, function(key, value) {
cont_no=value.ControlNumber;
media=value.PrimaryTypeOfMaterial;
ISBN=value.ISBN;

switch(media){
	case 35: detlist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/cd_icon.png" /></td ><td class="txtbox">'; break;
	case 40: detlist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/blueray_icon.png" /></td ><td class="txtbox">'; break;
	case 33: detlist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/dvd_icon.png" /></td ><td class="txtbox">'; break;
	default: if(ISBN==''){
		detlist_html +='<table class="bibtbl"><tr><td class="picbox"><img src="img/Jacket.jpg" /></td ><td class="txtbox">';
	} else{
det_nyt_html +='<table class="bibtbl"><tr><td class="picbox"><img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+ISBN+'&userID=MAIN37789&password=CC10073" /></td ><td class="txtbox">';
}
}
								  
$.each(value, function(key2, value2) {
	
	if(jQuery.inArray( key2, selection )!== -1){
		switch(key2){
			case "PublicationDate":
			key2="Publication Date";
			break;
			case "LocalItemsTotal":
			key2="Local Items Total";
			break;
			case "LocalItemsIn":
			key2="Local Items In";
			break;
			case "CurrentHoldRequests":
			key2="Current Hold Requests";
			break;
			case "SystemItemsTotal":
			key2="System Items Total";
			break;
			case "PrimaryTypeOfMaterial":
			key2="Media Type";
			value2=matconv(value2);
			break;
		}
	det_nyt_html += "<strong>" + key2 + "</strong>: " + value2 + "<br>";
	}

});
det_nyt_html +="<p class='hold_req'><a id=" + cont_no + " href='#login' data-role='button' data-inline='true' data-mini='true' data-icon='arrow-r' data-theme='a'>Put on Hold</a></p>";
det_nyt_html +="</td></tr></table>";
});

$( "#bdetail" ).append(det_nyt_html);
stop_spin();
$('.hold_req a').button();
});
};

//GET NYT Bestseller JSON
$(document).on('click', '#nyt_f_btn', function () {
var type="fiction";
nyt_bestseller(type);											
});
$(document).on('click', '#nyt_nf_btn', function () {
var type="nonfiction";
nyt_bestseller(type);											
});
//source Bestseller data
function nyt_bestseller(type){
start_spin();
$('#selection').collapsible( "collapse" );
if(type=='fiction'){
var the_url="http://www.wolfsworld1.com/NYT_HCF.php";
}
if(type=='nonfiction'){
var the_url="http://www.wolfsworld1.com/NYT_HCNF.php";
}

$.ajax({
        type: "GET",
		dataType: "json",
		async: true,
		url: ""+the_url+"",
        crossDomain: true,
        success : function(response) {
		//alert('success');
		NYT_HC_FIC(response);
		},
        error      : function() {
            console.error("error");
            alert('Could not process.You might have no network connection.');                  
        }
});
}
//populate Bestseller Field
function NYT_HC_FIC (response){
	//alert(response);
		var response=JSON.stringify(response);
		var response= jQuery.parseJSON(response);
//alert(response);
var selection= ['title', 'author', 'publisher', 'description', 'primary_isbn13'];

$( "#most_popular" ).empty();
$( "#news" ).empty();
$( "#blist" ).empty();
$( "#news_dvd" ).empty();
$( "#nyt" ).empty();

var nyt_link='';

$.each(response.results, function(key, value) {
var nyt1_html='';
var rank=key+1;

the_isbn=value.book_details[0].primary_isbn13;
the_cover=value.book_details[0].book_image;

//nyt1_html +='<table class="bibtbl"><tr><td class="picbox">'+the_cover+'<img src="'+the_cover+'" width="90px" /></td ><td class="txtbox">';
nyt1_html +='<table class="bibtbl"><tr><td class="picbox"><img src="http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?Return=T&Type=S&Value='+the_isbn+'&userID=MAIN37789&password=CC10073" /></td ><td class="txtbox">';
nyt1_html += "<strong>Rank: " + rank + "</strong><br>";

$.each(value.book_details[0], function(key2, value2) {
//alert('this is rank: '+key+' key2: '+ key2 +' and value2: '+ value2 +'');

	if(jQuery.inArray( key2, selection )!== -1){
	
		switch(key2){
		case "title":
		key2="Title";
		break;
		case "author":
		key2="Author";
		break;
		case "publisher":
		key2="Publisher";
		break;
		case "description":
		key2="Summary";
		break;
		case "primary_isbn13":
		key2="ISBN";
		break;
	}
	
	
	nyt1_html += "<strong>" + key2 + "</strong>: " + value2 + "<br>";
	}
});
nyt1_html +="<p class='bc'><a id='"+the_isbn+"' href='#bib_detail' data-role='button' data-inline='true' data-mini='true' data-icon='arrow-r' data-theme='a'>Detail</a></p>";
nyt1_html +="</td></tr></table>";

$('.bc a[data-role=button]').button();
$('.bc a').button('refresh');

$( "#nyt" ).append(nyt1_html);
$('.bc a').button();
stop_spin();
});

nyt_link +='<div align="center"><a href="#" onclick="window.open(encodeURI(\'http://developer.nytimes.com\'), \'_blank\', \'location=yes\')"><img src="img/NYT2.png"></a></div>';
$( "#nyt" ).append(nyt_link);
}

//populate static pages
//selection ajax
pop_gen('hours',1);
pop_gen('holidays',2);
pop_gen('contacts',3 );
//general ajax
function pop_gen(page_categ,fctn){
var categ=page_categ;
var fctn=fctn;
$.ajax({
        type: "GET",
		async: true,
		url: "http://www.jeffersonlibrary.net/forms/"+categ+".php",
        crossDomain: true,
		dataType: "json",
        success : function(response) {
		switch(fctn){
		case 1:	populate_hours(response,1); break;
		case 2: populate_holidays(response,1); break;
		case 3: populate_contacts(response,1); break;
		}
        },
        error      : function() {
        console.error("error");
        switch(fctn){
		case 1:	populate_hours('',2); break;
		case 2: populate_holidays('',2); break;
		case 3: populate_contacts('',2); break;
		}
			//alert('Could not process.You might have no network connection.');                  
        }
});
}

function populate_holidays(response, status){
var status=status;
var holidays_html='';
if(status==1){
holidays_html +="<table class='bibtbl'>";
	$.each(response, function(key, value) {
			hol_name=key;
				$.each(value, function(key1, value1) {
						hol_date1=key1;
							$.each(value1, function(key2, value2) {
								if(!key2){hol_date2='';}else{hol_date2=' - '+key2+'';}
								if(!value2){hol_com='';}else{hol_com=''+value2+'';}										
holidays_html +='<tr><td class="txtbox" width="143" valign="top">'+hol_name+'</td><td class="txtbox" width=212>'+hol_date1+''+hol_date2+'<br>'+hol_com+'</td></tr>';
}); }); });
holidays_html +="</table>";	
}
else{
holidays_html +="<div>This section requires an internet connection to populate data.<br>It appears you are currently offline.</div>";
}
$('#holiday_block').append(holidays_html);
}

function populate_hours(response, status){
var status=status;	
var hours_html='';
if(status==1){
hours_html +="<table>";	
	$.each(response, function(key, value) {
			hour_day=key;
				$.each(value, function(key1, value1) {
						hour_from=key1;
							$.each(value1, function(key2, value2) {
								if(!key2){hour_to='';}else{hour_to=''+key2+'';}
								if(!value2){hour_com='';}else{hour_com=''+value2+'';}										

hours_html +="<tr><td width=143>"+hour_day+"</td><td width=212>"+hour_from+"-"+hour_to+"</td></tr>";
}); }); });
hours_html +="</table>";
}
else{
hours_html +="<div>This section requires an internet connection to populate data.<br>It appears you are currently offline.</div>";
}
$('#hour_block').append(hours_html);
}

function populate_contacts(response, status){
var status=status;	
var contact_html='';
if(status==1){
contact_html +="<table>";
	$.each(response, function(key, value) {
			con_title=key;
				$.each(value, function(key1, value1) {
						con_name=key1;
								$.each(value1, function(key2, value2) {
								if(!key2){con_phone='';}else{con_phone=''+key2+'';}
								$.each(value2, function(key3, value3) {
									 if(!key3){con_email='';}else{con_email=''+key3+'';}
									 if(!value3){con_pic='';}else{con_pic=''+value3+'';}		
										contact_html +='<div class="contacts"><div class="portrait"><img src="'+con_pic+'" align="center"  /></div>'+con_title+':<br />'+con_name+'<br />Phone: '+con_phone+'<br /><a href="mailto:'+con_email+'">'+con_email+'</a></div>';
}); }); }); });
contact_html +="</table>";
}
else{
contact_html +="<div>This section requires an internet connection to populate data.<br>It appears you are currently offline.</div>";
}
$('#contact_block').append(contact_html);
}

//change page
function login(){
	$.mobile.changePage("#inside");
}

//fastclick
window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);

//Flashlight
$('#flashlight').on('click', function () {
//alert('clicky');
$('.ui-grid-solo .flash .ui-btn').css({'background-color': '#FF0', 'background': '-webkit-radial-gradient(white 15%, yellow 85%)','background': '-o-radial-gradient(white 15%, yellow 85%)','background':' -moz-radial-gradient(white 15%, yellow 85%)',' background': 'radial-gradient(white 15%, yellow 85%)'});
window.plugins.flashlight.available(function(isAvailable) {
  if (isAvailable) {

    // switch on
    window.plugins.flashlight.switchOn(); // success/error callbacks may be passed

    // switch off after 5 seconds
    setTimeout(function() {
     window.plugins.flashlight.switchOff(); // success/error callbacks may be passed
   $('.ui-grid-solo .flash .ui-btn').css({'background-color': '#FC3', 'background': '-webkit-radial-gradient(white 0%, yellow 0%)','background': '-o-radial-gradient(white 0%, yellow 0%)','background':' -moz-radial-gradient(white 0%, yellow 0%)',' background': 'radial-gradient(white 0%, yellow 0%)'});
	}, 5000);
	//$('.ui-grid-solo .flash .ui-btn').css({'background-color': '#FFF7B7'});
  } 
 else {
    alert("Flashlight not available on this device");
  }
});
});

});
