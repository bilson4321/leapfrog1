class GameOver
{
    constructor()
    {
        this.displayImage=new Image();
        this.displayImage.src='GameOverSprite.png';
    }
    handleInput()
    {
        
    }
    update()
    {
        /*
        let highScore=localStorage.getItem('highscore');
        if(highScore==Nan)
        {
            highScore=Game.score;
        }
        else if(Game.score>highScore)
        {
            highScore=Game.score;
        }*/
    }
    draw(canvasContext)
    {
        canvasContext.drawImage(this.displayImage,0,0,450,600);
        canvasContext.font = "16px Arial";
        canvasContext.fillStyle = "black";
        canvasContext.textAlign = "center";
        canvasContext.fillText(Game.score,335,230);
        canvasContext.fillText(Game.score,335,230);
    }
}