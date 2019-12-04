class GameWorld
{
    constructor()
    {
        this.obstacle=new Obstacle();
        this.bird=new Bird(this.obstacle);
        this.click=function()
        {
            this.bird.angle=10;
            this.bird.velocity.y=-7;
            console.log("clicked");
        }.bind(this);

    }
    handleClickInput()
    {   
           this.click();
    }
    update()
    { 
        if(this.bird.state=='alive')
        {
            console.log("bird state>>",this.bird.state);
            this.bird.update();
            this.obstacle.update();
        }
        else{
             Game.gameState.currentState=Game.gameState.gameOver;
        }
    }
    draw(canvasContext)
    {
        this.obstacle.draw(canvasContext);
        this.bird.draw(canvasContext);
        canvasContext.font = "60px Arial";
        canvasContext.fillStyle = "white";
        canvasContext.textAlign = "center";
        canvasContext.fillText(Game.score,220,100);
    }
    reset()
    {
        this.bird.state='alive';
        this.bird.velocity.y=1;
        this.obstacle.pipes.length=0;
        this.obstacle.pipes[0]={x:450,y:-200};  
        this.bird.position.y=300;
        Game.score=0;
    }
}