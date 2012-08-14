



var i=0;
stoped=false;
	

	function stopTimer()
 {
 
       postMessage(0);

    
 }


function timedCount()
{
 if(stoped===false){
	i+=1;
   postMessage(i);
   setTimeout('timedCount()',1000);

}else{
	stopTimer();
  	
  }
   stoped=false;
  
}
timedCount();
 addEventListener("message",function(event){if (event.data==="stop")stoped=true;},true);


//Math.floor(d.getTime()/1000%100);