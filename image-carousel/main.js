var slide=1000;
var count=0;
var noOfImages=0;
    
var roll=document.getElementById('image-wrapper');
var rightButton=document.getElementById("right-button");
var leftButton=document.getElementById("left-button");
var indicators=document.getElementById("indicators");

for(var i=0;i<=noOfImages;i++)
{

   // indicators.appendChild();
}
    noOfImages=roll.childElementCount;
    rightButton.onclick=function()
    {
        console.log("clicked");
        if(count==noOfImages)
        {
            count=(count)%noOfImages;
        }
        roll.style.left=-count*slide+"px";
        count++;   
    };
    leftButton.onclick=function()
    {
        console.log("clicked");
        if(count==0)
        {
            count=noOfImages;
        }
        count--; 
        roll.style.left=-count*slide+"px";
          
    };
 
   // var image=document.getElementsByTagName('img');
   
    setInterval(function(){
        if(count==noOfImages)
        {
            count=(count)%noOfImages;
        }
        roll.style.left=-count*slide+"px";
        count++;  
    },5000);
    