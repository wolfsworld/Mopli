
$(document).ready(function(){
	
function a(bib_id){	

		var reqstring="reqstring_a_"+bib_id+"";
		var thedate=(new Date()).toUTCString();
		p_method="GET";
		p_pwd ='';	
/////////////////////////////////
	return $.ajax({
        type: "POST",
		url: "http://www.jeffersonlibrary.net/MOPLI/INTERMED_test_a.php",
        crossDomain: "true",
		dataType: "json",
        data: {"uri": ""+reqstring+"", "rdate": ""+thedate+"", "method":""+p_method+"", "patron_pin":""+p_pwd+""},						   
	});
};//end function a
	
function b(data_from_a){
		//alert(JSON.stringify(data_from_a));
		return $.ajax({
        type: "GET",
			//dataType: "json",
		data: {"pasword":""+data_from_a.the_uri+""},
		url: "http://www.jeffersonlibrary.net/MOPLI/INTERMED_test_b.php",
        crossDomain: "true",
			dataType: "json"       
			//headers: {
			//"polarisdate": ""+thedate2+"",
			//"authorization": ""+code2+"" 
		//},

});	
};


function c(data_from_b){	
data_from_b=JSON.stringify(data_from_b);
	
	tadaa(data_from_b);
	return data_from_b;
}

//var thetally=[];
	//var theall=[];
function thetrigger(){

var all_books=['book1', 'book2', 'book3', 'book4', 'book5'];
var string_length=all_books.length;


$.each(all_books, function(key, value) {	
	a(value).then(b).then(c).then (function(data){
	thetally.push(value);
	});	
});
	
//setTimeout(showme,1000,all_books);
	function showme(){
	var mam=JSON.stringify(thetally);
	alert(''+all_books+' coming in:'+mam);
	};
	
	
//here comes teh next each//	
	
};
	
var iter=0;
var thetally=[];	
var cnt=0;
	
function builder(bib_id,cnt){
iter++;
	thetally.push(bib_id);	

		if (iter==cnt){
			match(thetally);
			//alert(iter);
		}	
}	

function tadaa(){
	var theal=	[1064934,1061702,1072559];
	var cnt=theal.length;	
		$.each(theal, function(key, value) {	
		builder(value,cnt);
		});
}

			   
function match(thetally){
	if(thetally.constructor === Array){
		alert('tally is <br>array');
	}		
	var theall=[1064934,1061702,1072559,111111,222222,333333,444444];
	$.each(theall, function(key, value) {	
	//alert('hello'+key+','+value);
	
	//if($.inArray(value, thetally)!== -1){
		if(thetally.indexOf(value)!== -1){
	alert('hit at '+value);
		hold_ind=true;   
	};
	
	});
}


$('#demo').click(function(){
	tadaa();
});
});


