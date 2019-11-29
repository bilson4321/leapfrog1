
var container=document.getElementById('image-wrapper');
var imageArray=container.children;

var noOfImages=imageArray.length;
var currentIndex=0;

var indicators=document.getElementById('indicators');


console.log("length>>",imageArray.length);
var c=0;
for(var a=0;a<imageArray.length;a++)
{
  
    var dot=document.createElement('div');
    dot.setAttribute("data-id",a);
    dot.style.height="20px";
    dot.style.width="20px";
    dot.style.border="1px solid black";
    dot.style.borderRadius="50%";
    dot.style.margin="5px";
    dot.style.backgroundColor="red";
    dot.style.cssFloat="left";
    
   dot.onclick= function(b){ 
                          moveToDiv(b);
                        }.bind(null,a);
                            
    indicators.appendChild(dot);
}

indicators.children[currentIndex].style.border="4px solid green";

function moveLeft(element,offset)
{
  var start=parseInt(window.getComputedStyle(container,null).getPropertyValue("left"));
  offset=offset+start;
 
    var timer=setInterval(function(){
                              if(start>=offset)
                                clearInterval(timer);
                              element.style.left=start+"px";
                              start+=20;
                           },1);
                           
}
function moveRight(element,offset)
{
  var start=parseInt(window.getComputedStyle(container,null).getPropertyValue("left"));
  offset=start-offset;
 
    var timer=setInterval(function(){
                              if(start<=offset)
                                clearInterval(timer);
                              element.style.left=start+"px";
                              start-=20;
                           },1);
                           
}
function left()
{
  indicators.children[currentIndex].style.border="1px solid black";
  if(currentIndex==0)
  {
    moveRight(container,1000*3);
    currentIndex=3;
  }
  else
  {
    moveLeft(container,1000);
    currentIndex--;
  }
  indicators.children[currentIndex].style.border="4px solid green";
}
function right()
{
  indicators.children[currentIndex].style.border="1px solid black";
  if(currentIndex==3)
  {
    moveLeft(container,1000*3);
    currentIndex=0;
  }
  else
  {
    moveRight(container,1000);
    currentIndex++;
  }
  indicators.children[currentIndex].style.border="4px solid green";
}

function moveToDiv(index)
{
  indicators.children[currentIndex].style.border="1px solid black";
  var multiplier=1;
  if(index>currentIndex)
  {
    multiplier=index-currentIndex;
    currentIndex=index;
    moveRight(container,multiplier*1000);
  }
  else if(index<currentIndex)
  {
    multiplier=currentIndex-index;
    currentIndex=index;
    moveLeft(container,multiplier*1000);    
  }
  indicators.children[currentIndex].style.border="4px solid green";
}

setInterval(right,4000);