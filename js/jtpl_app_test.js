 //set global variables
$(document).ready(function(){

var thedate="\/Date(1454129999000-0500)\/";
var cod_epoch= parseFloat(thedate.substr(6));

var today= new Date();
var today_epoch= today.getTime()-500;

var differ=today_epoch-cod_epoch;
var diff_in_days=Math.floor(differ/(86400*1000));
//var real=today_epoch.getTime()
alert(diff_in_days);

//var timeDiff = Math.abs(cod_epoch.getTime() - today_epoch.getTime());
//var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
//alert(diffDays);

//if(cod_epoch<today_epoch){overdue=true;}
//var DDate= new Date( parseFloat(value2.substr(6 )));
//value2=DDate.toDateString();


/*var d = new Date();
var str_time = d.toISOString();
alert(str_time);

var counter=0;

$(".ui-input-clear").on("click", function () {
	counter=0;
	$('#thecount').empty();
	$('#thetrigger').empty();
	$('#blist').empty();
});*/



var typingTimer;                //timer identifier
var doneTypingInterval = 500;  //time in ms, 5 second for example

gen_words=['the ', 'The ', 'for ', 'For ', 'how ', 'How '];

$('#search_item').on('keyup',function () {
counter +=1;
//$('#thetrigger').empty();
  searchitem=0;
 	var trigger=$('#search_item').val();
	if($('#search_item').val()==''){counter=0;}
	if(counter>4){

	if(jQuery.inArray(trigger, gen_words )== -1){
	clearTimeout(typingTimer);
    if ($('#myInput').val) {
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
	}
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
