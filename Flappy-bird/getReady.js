class GetReady
{
    constructor()
    {
        this.displayImage=new Image();
        this.displayImage.src='GetReadyState.png';
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