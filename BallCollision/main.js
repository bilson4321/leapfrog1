//utility function
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }


function Game(div,gameObject,objectCount)
{
    this.gameObject=gameObject;
    this.htmlElement=div;
    this.worldSize={
                    x:parseInt(window.getComputedStyle(this.htmlElement,null).getPropertyValue("width")),
                    y:parseInt(window.getComputedStyle(this.htmlElement,null).getPropertyValue("height"))
                   };
    var objects=[];
    var objectCount=objectCount;  
    
    //Initialization Task of Game
    this.init=function()
    {
        for(var i=0;i<objectCount;i++)
        {
            if(gameObject=='box')
            var temp=new Box(this.htmlElement,this.worldSize).init();
            else 
            var temp=new Ant(this.htmlElement,this.worldSize).init();

            objects[i]=temp;
            
            objects[i].position.x=getRandomArbitrary(0,(this.worldSize.x-temp.width));
            objects[i].position.y=getRandomArbitrary(0,(this.worldSize.y-temp.height));
            
            //objects[i].randomPosition(objects);
        }
    }
    //Check mechanism for Outside the Box
    this.outOfTheWorld=function()
    {
        for(var i=0;i<objects.length;i++)
        {
            if((objects[i].position.x+objects[i].width)>this.worldSize.x||objects[i].position.x<0)
            {
                objects[i].velocity.x=-objects[i].velocity.x;
                if((objects[i].position.x+objects[i].width)>this.worldSize.x)
                {
                    objects[i].position.x-=10;
                }
                else
                {
                    objects[i].position.x+=10;
                }
                this.htmlElement.style.borderColor=objects[i].htmlElement.style.backgroundColor;
            }
            if((objects[i].position.y+objects[i].height)>this.worldSize.y||objects[i].position.y<0)
            {
                if((objects[i].position.y+objects[i].height)>this.worldSize.y)
                {
                    objects[i].position.y-=10;
                }
                else
                {
                    objects[i].position.y+=10;
                }
                objects[i].velocity.y=-objects[i].velocity.y;
                this.htmlElement.style.borderColor=objects[i].htmlElement.style.backgroundColor;
            }
        }
    }
    //Render Task of Game
    this.start=function()
    {
        setInterval(render.bind(this),100);
    }
    function render()
    {
        //update
        this.worldSize.x=parseInt(window.getComputedStyle(this.htmlElement,null).getPropertyValue("width"));
        this.worldSize.y=parseInt(window.getComputedStyle(this.htmlElement,null).getPropertyValue("height"));
        for(var i=0;i<objects.length;i++)
        {
            objects[i].update();
        }
        for(var i=0;i<objects.length;i++)
        {
            for(var j=0;j<objects.length;j++)
            {
                if(i==j)
                break;
                objects[i].checkCollision(objects[j]);
            }
        }
        this.outOfTheWorld();
        //draw
        for(var i=0;i<objects.length;i++)
        {
            objects[i].draw();
        }
    }
}

function Box(parentDiv,worldSize)
{  
    this.worldSize=worldSize;
    this.htmlParentElement=parentDiv; 
    this.htmlElement=null;
    this.position={
                        x:10,
                        y:10
                };
    this.height=getRandomArbitrary(5,50);
    this.width=this.height;
    this.color="#"+Math.floor(Math.random()*900);
    this.velocity={
                        x:5,
                        y:5
                };
    this.init=function()
                {
                    var box=document.createElement("div");
                    box.style.height=this.height+'px';
                    box.style.width=this.width+'px';
                    box.style.backgroundColor=this.color;
                    box.classList.add('box');
                    this.htmlParentElement.appendChild(box);
                    this.htmlElement=box;

                    return this;
                }
    this.randomPosition=function(objects)
                {
                    var x=getRandomArbitrary(0,(this.worldSize.x-this.width));
                    var y=getRandomArbitrary(0,(this.worldSize.y-this.height));
                    for(var i=0;i<objects.length;i++)
                    {
                        if(x<objects[i].position.x+objects[i].width&&x+this.width>objects[i].position.x
                            &&y<objects[i].position.y+objects[i].height&&y+this.height>objects[i].position.y)
                            {
                                this.randomPosition(objects);
                            }  
                         else
                         {
                                this.position.x=x;
                                this.position.y=y;
                         }   
                    }
                }            
    this.update=function()
    {
        this.position.x=this.position.x+this.velocity.x;
        this.position.y=this.position.y+this.velocity.y;
    }
    this.draw=function()
    {
        this.htmlElement.style.left=this.position.x+'px';
        this.htmlElement.style.top=this.position.y+'px';
    }
    this.checkCollision=function(anotherBox)
    {
        if(this.position.x<anotherBox.position.x+anotherBox.width&&this.position.x+this.width>anotherBox.position.x
            &&this.position.y<anotherBox.position.y+anotherBox.height&&this.position.y+this.height>anotherBox.position.y)
            {
            console.log(this," collision ", anotherBox);
            this.velocity.x=-this.velocity.x;
                anotherBox.velocity.x=-anotherBox.velocity.x;
            this.velocity.y=-this.velocity.y;
              anotherBox.velocity.y=-anotherBox.velocity.y;
        }    
    }

}


//for Ant smasher

function Ant(parentDiv,worldSize)
{  
    this.worldSize=worldSize;
    this.htmlParentElement=parentDiv; 
    this.htmlElement=null;
    this.imageElement=null;
    this.angle=null;
    this.position={
                        x:10,
                        y:10
                };
    this.state='alive';
    this.height=50;
    this.width=this.height;
    this.velocity={
                        x:10,
                        y:10
                };
    this.init=function()
                {
                    var ant=document.createElement("div");
                    ant.style.height=this.height+'px';
                    ant.style.width=this.width+'px';
                    ant.classList.add('ant');
                    ant.style.transform = 'rotate(90deg)';

                    var image=document.createElement("img");
                    image.src="ant-walk.gif";
                    image.height="50";
                    image.width="50";
                    this.imageElement=image;
                    ant.appendChild(image);
                    this.htmlParentElement.appendChild(ant);
                    this.htmlElement=ant;
                    this.htmlElement.onclick=this.dead.bind(this);
                    return this;
                }
    this.randomPosition=function(objects)
    {
        var x=getRandomArbitrary(0,(this.worldSize.x-this.width));
        var y=getRandomArbitrary(0,(this.worldSize.y-this.height));
        for(var i=0;i<objects.length;i++)
        {
            if(x<objects[i].position.x+objects[i].width&&x+this.width>objects[i].position.x
                &&y<objects[i].position.y+objects[i].height&&y+this.height>objects[i].position.y)
                {
                    this.randomPosition(objects);
                }  
             else
             {
                    this.position.x=x;
                    this.position.y=y;
             }   
        }
    }
    this.update=function()
    {
        if(this.state=='alive')
        {
            this.angle=(Math.atan2(this.velocity.y,this.velocity.x)) * (180 / Math.PI);
            this.position.x=this.position.x+this.velocity.x;
            this.position.y=this.position.y+this.velocity.y;
        }
    }
    this.draw=function()
    {
        if(this.state=='alive')
        {
        this.htmlElement.style.left=this.position.x+'px';
        this.htmlElement.style.top=this.position.y+'px';
        this.htmlElement.style.transform = 'rotate('+this.angle+'deg)';
        }
    }
    this.checkCollision=function(anotherAnt)
    {
        if(this.state=='alive'&&anotherAnt.state=='alive')
        {
            if(this.position.x<anotherAnt.position.x+anotherAnt.width&&this.position.x+this.width>anotherAnt.position.x
                &&this.position.y<anotherAnt.position.y+anotherAnt.height&&this.position.y+this.height>anotherAnt.position.y)
                {
                    this.velocity.x=-this.velocity.x;
                    anotherAnt.velocity.x=-anotherAnt.velocity.x;
                    this.velocity.y=-this.velocity.y;
                    anotherAnt.velocity.y=-anotherAnt.velocity.y;
                }   
        } 
    }
   
    this.dead=function()
    {
        console.log("clicked");
        if(this.state='alive')
        {
            this.state='smashed';
            this.imageElement.src="dead-ant.png";
            setTimeout(function(obj){
                obj.state='alive';
                obj.position.x=10;
                obj.position.y=10;
                obj.imageElement.src="ant-walk.gif";
            }.bind(null,this),9000);
        }
    }
    

}
var mainDiv=document.getElementById('box-container');
var game=new Game(mainDiv,'box',10);
game.init();
game.start();

var secondDiv=document.getElementById('ant-container');
var game2=new Game(secondDiv,'ant',10);
game2.init();
game2.start();
