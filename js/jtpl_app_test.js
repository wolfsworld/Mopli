 //set global variables
$(document).ready(function(){



var response='{"PAPIErrorCode":42,"ErrorMessage":"","OrganizationsGetRows":[{"OrganizationID":1,"OrganizationCodeID":1,"Name":"Morris Automated Information Network","Abbreviation":"MAININC","DisplayName":"MAIN Inc."},{"OrganizationID":2,"OrganizationCodeID":2,"Name":"M.A.I.N. INC","Abbreviation":"MAIN","DisplayName":"M.A.I.N. INC"},{"OrganizationID":3,"OrganizationCodeID":3,"Name":"Bernards Township Library","Abbreviation":"BER","DisplayName":"Bernards Township Library"},{"OrganizationID":4,"OrganizationCodeID":3,"Name":"Boonton Holmes Library  ","Abbreviation":"BO","DisplayName":"Boonton Holmes Library  "},{"OrganizationID":5,"OrganizationCodeID":3,"Name":"Butler Library","Abbreviation":"BU","DisplayName":"Butler Library"},{"OrganizationID":6,"OrganizationCodeID":3,"Name":"Chatham Borough-Chatham Township Library","Abbreviation":"CHA","DisplayName":"Chatham Borough-Chatham Township Library"},{"OrganizationID":7,"OrganizationCodeID":3,"Name":"Chester Library ","Abbreviation":"CHS","DisplayName":"Chester Library"},{"OrganizationID":8,"OrganizationCodeID":3,"Name":"Denville Library","Abbreviation":"DEN","DisplayName":"Denville Library"},{"OrganizationID":9,"OrganizationCodeID":3,"Name":"Dover Library","Abbreviation":"DOV","DisplayName":"Dover Library"},{"OrganizationID":10,"OrganizationCodeID":3,"Name":"East Hanover Library","Abbreviation":"EHN","DisplayName":"East Hanover Library"},{"OrganizationID":11,"OrganizationCodeID":3,"Name":"Florham Park Library","Abbreviation":"FLO","DisplayName":"Florham Park Library"},{"OrganizationID":12,"OrganizationCodeID":3,"Name":"Harding Township (Kemmerer) Library","Abbreviation":"HAR","DisplayName":"Harding Township (Kemmerer) Library"},{"OrganizationID":13,"OrganizationCodeID":3,"Name":"Jefferson Township Library","Abbreviation":"JEF","DisplayName":"Jefferson Township Library"},{"OrganizationID":14,"OrganizationCodeID":3,"Name":"Kinnelon Library","Abbreviation":"KIN","DisplayName":"Kinnelon Library"},{"OrganizationID":15,"OrganizationCodeID":3,"Name":"Lincoln Park Library","Abbreviation":"LPK","DisplayName":"Lincoln Park Library"},{"OrganizationID":16,"OrganizationCodeID":3,"Name":"Long Hill Library","Abbreviation":"LHT","DisplayName":"Long Hill Library"},{"OrganizationID":17,"OrganizationCodeID":3,"Name":"Madison Library ","Abbreviation":"MAD","DisplayName":"Madison Library "},{"OrganizationID":18,"OrganizationCodeID":3,"Name":"Mendham Borough Library","Abbreviation":"MNB","DisplayName":"Mendham Borough Library"},{"OrganizationID":19,"OrganizationCodeID":3,"Name":"Mendham Township Library","Abbreviation":"MNT","DisplayName":"Mendham Township Library"},{"OrganizationID":20,"OrganizationCodeID":3,"Name":"Montville Township Library","Abbreviation":"MON","DisplayName":"Montville Township Library"},{"OrganizationID":21,"OrganizationCodeID":3,"Name":"Morris County Library","Abbreviation":"MCL","DisplayName":"Morris County Library"},{"OrganizationID":22,"OrganizationCodeID":3,"Name":"Morris Plains Library","Abbreviation":"MP","DisplayName":"Morris Plains Library"},{"OrganizationID":23,"OrganizationCodeID":3,"Name":"Morristown-Morris Township Library","Abbreviation":"MMT","DisplayName":"Morristown-Morris Township Library"},{"OrganizationID":24,"OrganizationCodeID":3,"Name":"Mount Arlington Library","Abbreviation":"MTA","DisplayName":"Mount Arlington Library"},{"OrganizationID":25,"OrganizationCodeID":3,"Name":"Mount Olive Library","Abbreviation":"MTO","DisplayName":"Mount Olive Library"},{"OrganizationID":26,"OrganizationCodeID":3,"Name":"Mountain Lakes Library","Abbreviation":"MTL","DisplayName":"Mountain Lakes Library"},{"OrganizationID":27,"OrganizationCodeID":3,"Name":"Pequannock Library","Abbreviation":"PEQ","DisplayName":"Pequannock Library"},{"OrganizationID":28,"OrganizationCodeID":3,"Name":"Randolph Township Library","Abbreviation":"RAN","DisplayName":"Randolph Township Library"},{"OrganizationID":29,"OrganizationCodeID":3,"Name":"Riverdale Library","Abbreviation":"RIV","DisplayName":"Riverdale Library"},{"OrganizationID":30,"OrganizationCodeID":3,"Name":"Rockaway Borough Library","Abbreviation":"RCB","DisplayName":"Rockaway Borough Library"},{"OrganizationID":31,"OrganizationCodeID":3,"Name":"Roxbury Library","Abbreviation":"ROX","DisplayName":"Roxbury Library"},{"OrganizationID":32,"OrganizationCodeID":3,"Name":"Washington Township Library","Abbreviation":"WAS","DisplayName":"Washington Township Library"},{"OrganizationID":33,"OrganizationCodeID":3,"Name":"Wharton Library","Abbreviation":"WHA","DisplayName":"Wharton Library"},{"OrganizationID":34,"OrganizationCodeID":3,"Name":"Whippanong Library","Abbreviation":"WIP","DisplayName":"Whippanong Library"},{"OrganizationID":35,"OrganizationCodeID":2,"Name":"Parsippany-Troy Hills Public Library System","Abbreviation":"PARTROY","DisplayName":"Parsippany-Troy Hills Public Library System"},{"OrganizationID":36,"OrganizationCodeID":3,"Name":"Parsippany-Troy Hills Library","Abbreviation":"PT","DisplayName":"Parsippany-Troy Hills Library"},{"OrganizationID":37,"OrganizationCodeID":3,"Name":"Lake Hiawatha Library","Abbreviation":"LKH","DisplayName":"Lake Hiawatha Library"},{"OrganizationID":38,"OrganizationCodeID":3,"Name":"Mount Tabor Library","Abbreviation":"MTT","DisplayName":"Mount Tabor LIbrary"},{"OrganizationID":39,"OrganizationCodeID":2,"Name":"Rockaway Township Free Public Library","Abbreviation":"ROCTWP","DisplayName":"Rockaway Township Free Public Library"},{"OrganizationID":40,"OrganizationCodeID":3,"Name":"Rockaway Township Library ","Abbreviation":"ROC","DisplayName":"Rockaway Township Library "},{"OrganizationID":41,"OrganizationCodeID":3,"Name":"Hibernia Library ","Abbreviation":"HIB","DisplayName":"Hibernia Library "},{"OrganizationID":42,"OrganizationCodeID":3,"Name":"_Digital Library","Abbreviation":"DL","DisplayName":"_Digital Library"}]}';

var response= jQuery.parseJSON(response);
//alert(response);
//if(response.ItemRenewResult.BlockRows){
//block=true;}else{block=false;}
//alert(block);

$.each(response.OrganizationsGetRows, function(key, value) {
//$.each(value, function(key2, value2) {
//alert(''+value.OrganizationID+': '+value.DisplayName+'');
alert(key);
//if(value2.PAPIErrorType){
//var org_id=value.OrganizationID;
//var org_name=value.DisplayName;

//}
//else{
//ext_block='hello';
//}

//});
});


//alert(org_name);
//alert(value.ErrorDesc);



/*var thedate="\/Date(1454129999000-0500)\/";
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


/*
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
*/

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
*/
});

/*
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



});*/
