var container=document.getElementById('image-wrapper');

//-----Image Wrapper-----//
function ImageWrapper()
{
  this.moveLeft=function(offset)
  {
    var start=parseInt(window.getComputedStyle(container,null).getPropertyValue("left"));
    offset=offset+start;
   
      var timer=setInterval(function(){
                                if(start>=offset)
                                  clearInterval(timer);
                                container.style.left=start+"px";
                                start+=20;
                             },1);                         
  }
  this.moveRight=function(offset)
  {
    var start=parseInt(window.getComputedStyle(container,null).getPropertyValue("left"));
    offset=start-offset;
   
      var timer=setInterval(function(){
                                if(start<=offset)
                                  clearInterval(timer);
                                container.style.left=start+"px";
                                start-=20;
                             },1);
                             
  }

}
var imageSlider=new ImageWrapper();

function left()
{
  imageSlider.moveLeft(1000);
}
function right()
{
  imageSlider.moveRight(1000);
}