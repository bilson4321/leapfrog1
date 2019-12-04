class Bird
{
    constructor(obstacle)
    {
        this.state='alive';
        this.position={x:70,y:300};
        this.velocity={x:0,y:1};
        this.gravity=0.5;
        this.height=34;
        this.width=40;
        //For Animation
        this.angle=0;
        this.birdFrame=[];
        this.birdFrame[0]=new Image();
        this.birdFrame[0].src="bird-1.png";
        this.birdFrame[1]=new Image();
        this.birdFrame[1].src="bird-2.png";
        this.birdFrame[2]=new Image();
        this.birdFrame[2].src="bird-3.png";
        this.birdFrame[3]=new Image();
        this.birdFrame[3].src="bird-4.png";
        this.currentFrame=0;
        this.tickCount=0;
        //
        document.onclick=function() 
        {
            this.angle=10;
            this.velocity.y=-7;
            console.log("clicked");
        }.bind(this);  
        document.onkeyup=function() 
        {
            this.angle=10;
            this.velocity.y=-7;
            console.log("clicked");
        }.bind(this); 
        
        this.obstacles=obstacle;
        this.pipesObstacle=this.obstacles.pipes;
    }
    update()
    {
        if(this.position.y>480)
        {
            this.state='dead';
        }
      
        for(var i=0;i<this.pipesObstacle.length;i++)
        {
            if(this.position.x+this.width>=this.pipesObstacle[i].x
            &&this.position.x<=this.pipesObstacle[i].x+this.obstacles.pipeUpImage.width    
            &&(this.position.y<=this.pipesObstacle[i].y+this.obstacles.pipeUpImage.height
            ||this.position.y+this.height>=this.pipesObstacle[i].y+this.obstacles.gapBetweenTwoPipe))
                this.state='dead';
        }
        if(this.state=='alive')
        {
        this.velocity.y+=this.gravity;
        this.position.y+=this.velocity.y;
        }
        
    }
    draw(canvasContext)
    {
        if(this.state=='alive')
        {
            /*canvasContext.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
            canvasContext.rotate(this.angle * Math.PI / 180);
            canvasContext.drawImage(this.birdFrame[this.currentFrame],this.position.x,this.position.y,this.width,this.height, -this.width / 2, -this.height / 2, this.width, this.height);
            canvasContext.rotate(-this.angle * Math.PI / 180);
            canvasContext.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2);*/
            canvasContext.drawImage(this.birdFrame[this.currentFrame],this.position.x,this.position.y,this.width,this.height);
            this.tickCount++;
            if(this.tickCount<100)
            {
                this.tickCount=0;
                this.currentFrame++;
                if(this.currentFrame==4)
                {
                   this.currentFrame=0;
                }
            }
        }
        else
        {
            canvasContext.drawImage(this.birdFrame[this.currentFrame],this.position.x,this.position.y,this.width,this.height);
        }
    }
}