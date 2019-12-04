class GameOver
{
    constructor()
    {
        this.displayImage=new Image();
        this.displayImage.src='GameOverSprite.png';
        this.highScore=localStorage.getItem('highscore');
    }
    handleInput()
    {
        
    }
    update()
    {
        if(this.highScore==null)
        {
            this.highScore=Game.score;
        }
        else if(Game.score>this.highScore)
        {
            this.highScore=Game.score;
        }
        localStorage.setItem('highscore',this.highScore);
    }
    draw(canvasContext)
    {
        canvasContext.drawImage(this.displayImage,0,0,450,600);
        canvasContext.font = "16px Arial";
        canvasContext.fillStyle = "black";
        canvasContext.textAlign = "center";
        canvasContext.fillText(Game.score,335,230);
        canvasContext.fillText(this.highScore,335,280);
    }
}