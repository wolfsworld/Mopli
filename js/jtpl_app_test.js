 //set global variables
$(document).ready(function(){

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
