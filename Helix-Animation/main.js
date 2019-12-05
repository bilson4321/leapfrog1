/*var mainDiv=document.getElementById('container');
var canvas=document.createElement('CANVAS');

canvas.height=600;
canvas.width=600;
mainDiv.appendChild(canvas);

var canvasContext=canvas.getContext('2d');
var radius=100;
var posy=200;
function animate(radius,y)
{
canvasContext.beginPath();
canvasContext.rect(0,0,600,600);
canvasContext.fillStyle="black";
canvasContext.fill();

canvasContext.beginPath();
canvasContext.arc(200, y, radius, 0, 2 * Math.PI);
canvasContext.fillStyle="pink";
canvasContext.fill();
}
function randomRadius()
{
    radius--;
    posy+=8;
    animate(radius,posy);
    if(radius<10)
    radius=100;
    if(posy>600)
    posy=100;
}
setInterval(randomRadius,50);*/
/*
class Ball
{
    constructor(x,y)
    {
        this.maxRadius=20;
        this.minRadius=5;
        this.radius=this.maxRadius;
        this.position={x:x,y:y};
        this.incrementDecrement=0.01;
    }
    update()
    {
        this.position.y+=1;
        if(this.position.y==300)
        this.position.y=100;
        if(this.maxRadius<=this.radius)
        this.incrementDecrement=-0.1;
        if(this.minRadius>=this.radius)
        this.incrementDecrement=0.1;


        this.radius+=this.incrementDecrement;
    }
    draw(canvasContext)
    {
        canvasContext.beginPath();
        canvasContext.arc(this.position.x,this.position.y,this.radius,0, 2 * Math.PI);
        canvasContext.fillStyle="pink";
        canvasContext.fill();
    }
}

/*
var a=new Ball(400,100);

var render=function()
{
    canvasContext.beginPath();
    canvasContext.rect(0,0,600,600);
    canvasContext.fillStyle="black";
    canvasContext.fill();

    a.update();
    a.draw(canvasContext);
}

setInterval(render,10);
var a=[];

for(var i=0;i<10;i++)
{
    a[i]=new Ball(400,i*20);
}

var render=function()
{
    canvasContext.beginPath();
    canvasContext.rect(0,0,1200,1200);
    canvasContext.fillStyle="black";
    canvasContext.fill();

    for(var i=0;i<10;i++)
    {
        a[i].update();
        a[i].draw(canvasContext);
    }     
}

setInterval(render,10);*/

class Column
{
    constructor(x,y)
    {
        this.position={x:x,y:y};
        //console.log(this.position.x,',',this.position.y);
        this.height=300;
        this.ballGroup={};
    }
    init()
    {
        for(var i=0;i<2;i++)
        {
            this.ballGroup[i]=new BallGroup(this.position.x,this.position.y+i*200);
            //this.ballGroup[i]=new Ball(this.position.x,this.position.y+i*300);
            this.ballGroup[i].init();
        }
    }
    update()
    {
        this.position.y=this.position.y+1;
        if(this.position.y<this.height)
            this.position.y=100;
    }
    draw(canvasContext)
    {
        for(var i=0;i<2;i++)
        {
            this.ballGroup[i].draw(canvasContext);
        }
    }
    
}
class BallGroup
{
    constructor(x,y)
    {
        this.position={x:x,y:y};
       
        this.balls={};
    }
    init()
    {
        for(var i=0;i<10;i++)
        {
            this.balls[i]=new Ball(this.position.x,this.position.y+i*20);
        }
    }
    draw(canvasContext)
    {
        for(var i=0;i<10;i++)
        {
            this.balls[i].update();
            this.balls[i].draw(canvasContext);
        }
    }
}
class Ball
{
    constructor(x,y)
    {
        this.maxRadius=15;
        this.minRadius=5;
        this.radius=this.maxRadius;
        this.position={x:x,y:y};
        this.incrementDecrement=0.09;
        this.positionincrementdecrement=8;
    }
    update()
    {
        
        if(this.position.y>600)
        {
            this.positionincrementdecrement=-8;
        }    
        if(this.position.y<100)
        {
            this.positionincrementdecrement=8;
        }
                
        if(this.maxRadius<=this.radius)
        this.incrementDecrement=-0.09;
        if(this.minRadius>=this.radius)
        this.incrementDecrement=0.09;

        this.position.y+=this.positionincrementdecrement;
        this.radius+=this.incrementDecrement;
    }
    draw(canvasContext)
    {
        canvasContext.beginPath();
        canvasContext.arc(this.position.x,this.position.y,this.radius,0, 2 * Math.PI);
        if(this.positionincrementdecrement>0)
            canvasContext.fillStyle="pink";
        else
            canvasContext.fillStyle="red";
        canvasContext.fill();
    }
}
var mainDiv=document.getElementById('container');
var canvas=document.createElement('CANVAS');

canvas.height=700;
canvas.width=1200;
mainDiv.appendChild(canvas);

var canvasContext=canvas.getContext('2d');

var animation=[];
var angle=90;
for(var i=0;i<15;i++)
{
    animation[i]=new Column((i*45)+100,(100+(80*Math.cos(angle*3.47/180))));
    animation[i].init();
    angle-=10;
}
var render=function()
{
    canvasContext.beginPath();
    canvasContext.rect(0,0,1200,1200);
    canvasContext.fillStyle="black";
    canvasContext.fill();

    for(var i=0;i<15;i++)
    {
        animation[i].update();
        animation[i].draw(canvasContext);
    }     
}

setInterval(render,50);