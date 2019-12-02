//utility




//Game Object
function Lane(screenDiv)
{
    this.htmlParentElement=screenDiv;

    this.total_width=window.getComputedStyle(this.htmlParentElement,null).getPropertyValue("width");
    this.lane=[];
    this.lane[0]=this.total_width/3;
    this.lane[1]=this.total_width/2;
    this.lane[2]=this.total_width;
}
function Opponent(screenDiv)
{
    this.htmlParentElement=screenDiv;
    this.htmlElement=null;
    this.position={
                    x:20,
                    y:50
                    };
    this.velocity={
                    x:0,
                    y:0.5
                    };

    this.init=function()
    {
        var temp=document.createElement('img');
        temp.src="ambulance.gif";
        temp.classList.add('opponent');
        
        this.htmlParentElement.appendChild(temp);
        this.htmlElement=temp;
        return this;
    }
    this.update=function()
    {
        this.position.y=this.position.y+this.velocity.y;
        if(this.position.y>700)
        this.position.y=0;
    }
    this.draw=function()
    {
        this.htmlElement.style.left=this.position.x+'px';
        this.htmlElement.style.top=this.position.y+'px';
    }

}
function Player(screenDiv)
{
    this.htmlParentElement=screenDiv;
    this.htmlElement=null;
    this.position={
                    x:20,
                    y:450
                    };
    this.velocity={
                    x:0,
                    y:0
                    };

    this.init=function()
    {
        var temp=document.createElement('img');
        temp.src="audi.png";
        temp.classList.add('player');
        
        this.htmlParentElement.appendChild(temp);
        this.htmlElement=temp;
        return this;
    }
    this.update=function()
    {
        this.position.x=this.position.x+this.velocity.x;
    }
    this.draw=function()
    {
        this.htmlElement.style.left=this.position.x+'px';
        this.htmlElement.style.top=this.position.y+'px';
    }
}

//Main Game Class
function Game(div)
{
    this.htmlElement=div;
    this.gameScreen=this.htmlElement.childNodes[1];
    this.worldSize={
                    x:parseInt(window.getComputedStyle(this.htmlElement,null).getPropertyValue("width")),
                    y:parseInt(window.getComputedStyle(this.htmlElement,null).getPropertyValue("height"))
                   };
    var gameObjects=[];
    var objectCount=objectCount;  
    
    //Initialization Task of Game
    this.init=function()
    {
        var lane=new Lane(this.gameScreen);
        var temp=new Opponent(this.gameScreen).init();
        gameObjects.push(temp);
        var temp2=new Opponent(this.gameScreen).init();
        temp2.position.x=lane.lane[1];
        gameObjects.push(temp2);
        var temp3=new Opponent(this.gameScreen).init();
        temp3.position.x=lane.lane[2];
        gameObjects.push(temp3);
        var temp4=new Player(this.gameScreen).init();
        gameObjects.push(temp4);
    }
   
    //Render Task of Game
    this.start=function()
    {
        setInterval(render.bind(this),1);
    }
    function render()
    {
        //update
        this.worldSize.x=parseInt(window.getComputedStyle(this.htmlElement,null).getPropertyValue("width"));
        this.worldSize.y=parseInt(window.getComputedStyle(this.htmlElement,null).getPropertyValue("height"));
        for(var i=0;i<gameObjects.length;i++)
        {
            gameObjects[i].update();
        }
 
        //draw
        for(var i=0;i<gameObjects.length;i++)
        {
            gameObjects[i].draw();
        }
    }
}

var mainDiv=document.getElementById('container')
var game=new Game(mainDiv);
game.init();
game.start();
