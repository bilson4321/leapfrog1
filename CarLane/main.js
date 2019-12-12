//utility
/*



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
function BackGround(screenDiv)
{
    this.htmlParentElement=screenDiv;
    this.init=function()
    {
        return this;
    }
    this.update=function()
    {

    }
    this.draw=function()
    {

    }
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
*/
//--------------------------------Utility-----------------------------------//
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

//-----------------------------------Game-------------------------------------//
function Game(screenDiv)
{
    this.screenHtmlElement=screenDiv;
    this.state={'playing':null,'title':null,'highScore':null,'gameOver':null};
    this.gameScreen={
                        height:parseInt(window.getComputedStyle(this.screenHtmlElement,null).getPropertyValue("height")),
                        width:parseInt(window.getComputedStyle(this.screenHtmlElement,null).getPropertyValue("width"))
                    };
    this.currentState='title';
    this.init=function()
    {
        this.state.title=new TitleScreen(this.screenHtmlElement,this).init();
        this.state.playing=new PlayingScreen(this.screenHtmlElement,this).init();
        this.state.playing.htmlElement.style.display='none';
    }
    
    this.start=function()
    {
        setInterval(render.bind(this),20);
    }
    function render()
    {
        //Handle Input
        //this.state[this.currentState].handleInput();
        //update
        this.gameScreen.width=parseInt(window.getComputedStyle(this.screenHtmlElement,null).getPropertyValue("width"));
        this.gameScreen.height=parseInt(window.getComputedStyle(this.screenHtmlElement,null).getPropertyValue("height"));
        this.state[this.currentState].update();

        //draw
        this.state[this.currentState].draw();
    }
}
//---------------------------Title Screen------------------------------///
function TitleScreen(screenDiv,gameInfo)
{
    this.parentHtmlElement=screenDiv;
    this.htmlElement=null;
    this.gameClass=gameInfo;
    this.init=function()
    {
        var div=document.createElement('div');
        div.style.height=this.gameClass.gameScreen.height+"px";
        div.style.width=this.gameClass.gameScreen.width+"px";
        div.style.backgroundImage="url('titlescreen.png')";
       
        var button=document.createElement('BUTTON');
        button.innerHTML="play";
        button.onclick=this.handleInput.bind(this);
    
        div.appendChild(button);
        this.parentHtmlElement.appendChild(div);
        this.htmlElement=div;
        return this;
    }
    this.handleInput=function()
    {
        this.gameClass.currentState='playing';
        this.gameClass.state.title.htmlElement.style.display="none";
        this.gameClass.state.playing.htmlElement.style.display="block";
    }
    this.update=function()
    {

    }
    this.draw=function()
    {

    }
}
//-----------------------------------Playing Screen---------------------------------//
function PlayingScreen(screenDiv,gameInfo)
{
    this.parentHtmlElement=screenDiv;
    this.gameClass=gameInfo;
    this.htmlElement=null;
    this.gameObjects=[];
    this.score=0;
    this.gameOver=false;
    this.init=function()
    {
        var div=document.createElement('div');
        div.style.height=this.gameClass.gameScreen.height+"px";
        div.style.width=this.gameClass.gameScreen.width+"px";
        div.style.position='relative';
        this.htmlElement=div;
       
        this.parentHtmlElement.appendChild(div);
        var road=new Road(this.htmlElement).init();
        this.gameObjects.push(road);
        var bullet=new Bullet(this.htmlElement).init();
        this.gameObjects.push(bullet);
        var player=new Player(this.htmlElement,this).init();
        this.gameObjects.push(player);
        var opponent=new Opponent(this.htmlElement,this,90).init();
        this.gameObjects.push(opponent);
        var opponent1=new Opponent(this.htmlElement,this,159).init();
        this.gameObjects.push(opponent1);
        var opponent2=new Opponent(this.htmlElement,this,228).init();
        this.gameObjects.push(opponent2);
        var opponent3=new Opponent(this.htmlElement,this,297).init();
        this.gameObjects.push(opponent3);
        return this;
    }
    this.handleInput=function()
    {
        
    }
    this.update=function()
    {
        this.gameObjects.forEach(function(item,index,arr){
            arr[index].update();
        });
    }
    this.draw=function()
    {
        this.gameObjects.forEach(function(item,index,arr){
            arr[index].draw();
        });
    }
}
function Bullet(screenDiv)
{
    this.state='idle';
    this.htmlParentElement=screenDiv;
    this.htmlElement=null;
    this.position={
                    x:90,
                    y:0
                    };
    this.velocity={
                    x:0,
                    y:-9
                    };
    this.height=16;
    this.width=10;
    this.init=function()
    {
        var temp=document.createElement('img');
        temp.src="bullet.png";
        temp.classList.add('opponent');
        temp.style.height=this.height+'px';
        temp.style.width=this.width+'px';
        temp.style.position='absolute';
        temp.style.top=this.position.y+'px';
        temp.style.left=this.position.x+'px';
        this.htmlParentElement.appendChild(temp);
        this.htmlElement=temp;
        return this;
    }
    this.update=function()
    {
        if(this.state='shooting')
        this.position.y=this.position.y+this.velocity.y;
        if(this.position.y<-10)
        this.state='idle';
    }
    this.draw=function()
    {
        this.htmlElement.style.left=this.position.x+'px';
        this.htmlElement.style.top=this.position.y+'px';
    }

}
function Opponent(screenDiv,gameInfo,positionX)
{
    this.gameClass=gameInfo;
    this.htmlParentElement=screenDiv;
    this.htmlElement=null;
    this.position={
                    x:positionX,
                    y:800
                    };
    this.velocity={
                    x:0,
                    y:6
                    };
    this.height=100;
    this.width=60;
    this.State='visible';
    this.counter=Math.floor(getRandomArbitrary(60,400));;
    this.init=function()
    {
        var temp=document.createElement('img');
        temp.src="audi.png";
        temp.classList.add('opponent');
        temp.style.height=this.height+'px';
        temp.style.width=this.width+'px';
        temp.style.position='absolute';
        temp.style.top=this.position.y+'px';
        temp.style.left=this.position.x+'px';
        this.htmlParentElement.appendChild(temp);
        this.htmlElement=temp;
        return this;
    }
    this.update=function()
    {
        if(!this.gameOver)
        {
        if(this.State!='away')
        this.position.y=this.position.y+this.velocity.y;

        if(this.position.y>700)
        {
            this.State='away';
            this.counter=Math.floor(getRandomArbitrary(100,600));
            this.position.y=-40;
        }
          
        this.counter--;
        if(this.counter==0)
        {
            this.State='visible';
            
        }
        
        var enemy=this.gameClass.gameObjects[2];
        if (enemy.position.x < this.position.x + this.width &&
            enemy.position.x + enemy.width > this.position.x &&
            enemy.position.y < this.position.y + this.height &&
            enemy.position.y + enemy.height > this.position.y) 
            this.gameOver=true;
        }  
        if(this.gameOver)  
        {
            this.htmlParentElement.innerHTML="Game Over your Score is:"+this.gameClass.score;
            this.htmlParentElement.style.textAlign='center';
        }
    }
    this.draw=function()
    {
        if(this.State!='away')
        {
            this.htmlElement.style.left=this.position.x+'px';
            this.htmlElement.style.top=this.position.y+'px';
        } 
    }

}
function Road(screenDiv)
{
    this.htmlParentElement=screenDiv;
    this.htmlElement=null;
    this.position={
                    x:0,
                    y:-600
                    };
    this.velocity={
                    x:0,
                    y:5
                    };  
    this.width=450;          

    this.init=function()
    {
        var temp=document.createElement('img');
        temp.src="road.png";
        temp.classList.add('player');
        temp.style.width=this.width+"px";
        temp.style.position='absolute';
        temp.style.top=this.position.y+"px";
        temp.style.left=this.position.x+"px";
        this.htmlParentElement.appendChild(temp);
        this.htmlElement=temp;
        return this;
    }
    this.update=function()
    {
        this.position.x=this.position.x+this.velocity.x;
        this.position.y=this.position.y+this.velocity.y;

        if(this.position.y>0)
        this.position.y=-600;
    }
    this.draw=function()
    {
        this.htmlElement.style.left=this.position.x+'px';
        this.htmlElement.style.top=this.position.y+'px';
    }
}
function Player(screenDiv,gameInfo)
{
    this.gameClass=gameInfo;
    this.htmlParentElement=screenDiv;
    this.htmlElement=null;
    this.position={
                    x:90,
                    y:450
                    };
    this.velocity={
                    x:0,
                    y:0
                    };
    this.height=120;   
    this.width=60;          

    this.init=function()
    {
        var temp=document.createElement('img');
        temp.src="ambulance.gif";
        temp.classList.add('player');
        temp.style.width=this.width+"px";
        temp.style.height=this.height+"px";
        temp.style.position='absolute';
        temp.style.top=this.position.y+"px";
        temp.style.left=this.position.x+"px";
        document.addEventListener('keyup', function (event) 
        {
            if(event.keyCode==68)
            {
                if(this.position.x<297)
                this.velocity.x=69;
            }
            else if(event.keyCode==65)
            {
                if(this.position.x>90)
                this.velocity.x=-69;
            }
            
            else if(event.keyCode==87||event.keyCode==36)
            {
                if(this.gameClass.gameObjects[1].state=="idle")
                {
                this.gameClass.gameObjects[1].position.y=500;
                this.gameClass.gameObjects[1].position.x=this.position.x+30;
                this.gameClass.gameObjects[1].state="shooting";
                }
            }
            else if(event.keyCode==36&&this.gameClass.gameOver)
                location.reload();
        }.bind(this));
        this.htmlParentElement.appendChild(temp);
        this.htmlElement=temp;
        return this;
    }
    this.update=function()
    {
        this.position.x=this.position.x+this.velocity.x;
        this.velocity.x=0;
        
    }
    this.draw=function()
    {
        this.htmlElement.style.left=this.position.x+'px';
        this.htmlElement.style.top=this.position.y+'px';
    }
}
//----------------------------------  ------------------------------------------//
var div=document.getElementById('screen');
var game=new Game(div);
game.init();
game.start();
