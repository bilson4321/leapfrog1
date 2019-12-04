class Obstacle
{
    constructor()
    {
        this.groundImage=new Image();
        this.groundImage.src="obstacle_ground.png";
        this.pipeUpImage=new Image();
        this.pipeUpImage.src="pipeUp.png";
        this.pipeDownImage=new Image();
        this.pipeDownImage.src="pipeDown.png";
        this.position={x:0,y:500};
        this.velocity={x:-2,y:0};
        this.height=100;
        this.width=300;

        this.gapBetweenTwoPipe=this.pipeUpImage.height+130;
        this.pipes=[];
        this.pipes[0]={x:450,y:-200};  
    }
    update()
    {
        for(var i=0;i<this.pipes.length;i++)
        {
            this.pipes[i].x-=2;
            if(this.pipes[i].x==4)
            {
                Game.score++;
            }
        }
        this.position.x+=this.velocity.x;
        if(this.position.x<-300)
        this.position.x=0;
    }
    draw(canvasContext)
    {
        //drawImage(image,x,y,width,height);
        for(var i=0;i<this.pipes.length;i++)
        {
            canvasContext.drawImage(this.pipeUpImage,this.pipes[i].x,this.pipes[i].y);
            canvasContext.drawImage(this.pipeDownImage,this.pipes[i].x,this.pipes[i].y+this.gapBetweenTwoPipe);

            if(this.pipes[i].x==180)
            {
                this.pipes.push({x:450,
                                y:Math.floor(Math.random()*this.pipeUpImage.height)-this.pipeUpImage.height});
            }
        }
        canvasContext.drawImage(this.groundImage,this.position.x,this.position.y,this.width,this.height);
        canvasContext.drawImage(this.groundImage,this.position.x+this.width,this.position.y,this.width,this.height);
        canvasContext.drawImage(this.groundImage,this.position.x+2*this.width,this.position.y,this.width,this.height);
    }
}