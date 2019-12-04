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

    }
    draw(canvasContext)
    {
        canvasContext.drawImage(this.displayImage,25,50);
    }
}