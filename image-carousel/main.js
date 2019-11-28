// var slide = 1000;
// var count = 0;
// var noOfImages = 0;

// var roll = document.getElementById('image-wrapper');
// var rightButton = document.getElementById("right-button");
// var leftButton = document.getElementById("left-button");
// var indicators = document.getElementById("indicators");
// console.log(roll.ch);
// noOfImages = roll.childElementCount;
// for (var i = 0; i <noOfImages; i++) {
//   var dot=document.createElement("div");
//   dot.style.height="10px";
//   dot.style.width="10px";
//   dot.style.margin="10px";
//   dot.style.backgroundColor="green";
//   dot.style.display="inline-block";
//   indicators.appendChild(dot);
//   // indicators.appendChild();
// }

// rightButton.onclick = function () {
//   console.log("clicked");
//   if (count == noOfImages) {
//     count = (count) % noOfImages;
//   }
//   roll.style.left = -count * slide + "px";
//   count++;
// };
// leftButton.onclick = function () {
//   console.log("clicked");
//   if (count == 0) {
//     count = noOfImages;
//   }
//   count--;
//   roll.style.left = -count * slide + "px";

// };

// // var image=document.getElementsByTagName('img');

// setInterval(function () {
//   if (count == noOfImages) {
//     count = (count) % noOfImages;
//   }
//   roll.style.left = -count * slide + "px";
//   count++;
// }, 5000);

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
    
   dot.onclick= function(){ 
                  //           moveToDiv();
                            
                             console.log('data-id>>',dot.getAttribute("data-id"));
                              
                              };
                            
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
    console.log("index>>",currentIndex);
  }
  else if(index<currentIndex)
  {
    multiplier=currentIndex-index;
    currentIndex=index;
    console.log("multiplier>>",multiplier);
    moveLeft(container,multiplier*1000);    
    console.log("index>>",currentIndex);
  }
  indicators.children[currentIndex].style.border="4px solid green";
}

setInterval(right,4000);