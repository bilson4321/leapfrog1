class GameWorld
{
    constructor()
    {
        this.backgroundImage=new Image();
        this.backgroundImage.src="background.png";
        this.obstacle=new Obstacle();
        this.bird=new Bird(this.obstacle);
    }
    handleClickInput()
    {   

            this.bird.angle=10;
            this.bird.velocity.y=-7;
            console.log("clicked");
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
           // Game.gameState.currentState=Game.gameState.gameOver;
        }
    }
    draw(canvasContext)
    {
       
        canvasContext.drawImage(this.backgroundImage,0,0,450,600);
        this.obstacle.draw(canvasContext);
        this.bird.draw(canvasContext);
        canvasContext.font = "60px Arial";
        canvasContext.fillStyle = "white";
        canvasContext.textAlign = "center";
        canvasContext.fillText(Game.score,220,100);
    }
}