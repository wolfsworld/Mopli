 //set global variables
$(document).ready(function(){

var counter=0;

var typingTimer;                //timer identifier
var doneTypingInterval = 1500;  //time in ms, 5 second for example

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
	$('#blist').empty();
	//alert('done');
   //window.p_validate=function(){return false;};
   //window.get_books=function(){return false;};
   //searchitem='';
   searchitem= $('#search_item').val();
   	p_searchitem=searchitem.replace(/\s+/g,"+");
	
	page_counter=1;
	
	$('#blist').append(p_searchitem);
	//p_validate(1,''+p_searchitem+'','','','','GET','',1);
}


/*
//var response='{"PAPIErrorCode":-2,"ErrorMessage":"","ItemRenewResult":{"BlockRows":[{"PAPIErrorType":2,"PolarisErrorCode":32768,"ErrorAllowOverride":false,"ErrorDesc":"Item fills a hold request, not allowed to renew","ItemRecordID":3368177}],"DueDateRows":[]}}';

var response='{"PAPIErrorCode":0,"ErrorMessage":"","ItemRenewResult":{"BlockRows":[],"DueDateRows":[{"ItemRecordID":54335,"DueDate":"\/Date(1456289999000-0500)\/"}]}}';

var response= jQuery.parseJSON(response);

//if(response.ItemRenewResult.BlockRows){
//block=true;}else{block=false;}
//alert(block);

$.each(response.ItemRenewResult, function(key, value) {
$.each(value, function(key2, value2) {

if(value2.PAPIErrorType){
ext_err_code=value2.PAPIErrorType;
ext_err_desc=value2.ErrorDesc;
ext_block=true;
}
else{
ext_block='hello';
}

});
});


alert(ext_block);
//alert(value.ErrorDesc);

//});
*/

//case 9 - items out all (list)
function prime (){
	
	for(i=0; i<4; i++){
	var indi=false;
	var a=2;
	var b=4+i;
	if(a>2){
		indi=true;
	}

if(a==2){
indi=alpha();
}

if(a*b>8){
indi=beta();
}

	if(indi==false){
	var c=a*b;
	alert(c);
	}
	else{
	alert('indi is true')
	}
	
	}//end loop
}//end prime





$('#thebutton').on('click', function () {
								   prime();
								   });



});
