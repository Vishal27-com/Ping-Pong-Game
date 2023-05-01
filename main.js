const canvas=document.getElementById('canvas');
const context=canvas.getContext('2d');

// Reactangle
function drawRect(x,y,w,h,c){
    context.fillStyle=c;
    context.fillRect(x,y,w,h);
}
// Dash line
function centerLine(){
context.beginPath();
context.setLineDash([10])
context.moveTo(0,canvas.height/2)
context.lineTo(canvas.width,canvas.height/2)
context.strokeStyle='white'
context.stroke()
}
// Circle
function drawCircle(x,y,r,c){
    context.fillStyle=c
    context.beginPath()
    context.arc(x,y,r,0,Math.PI*2,false)
    context.closePath()
    context.fill()
}
// Score
function drawText(text,x,y,c){
    context.fillStyle=c
    context.font='20px sans'
    context.fillText(text,x,y)
}
const comp={
    x:canvas.width/2-50/2,
    y:0,
    w:50,
    h:10,
    c:'white',
    score:0
}
const user={
    x:canvas.width/2-50/2,
    y:canvas.height-10,
    w:50,
    h:10,
    c:'white',
    score:0
}

const ball={
    x:canvas.width/2,
    y:canvas.height/2,
    r:10,
    c:'white',
    speed:1,
    velocityX:5,
    velocityY:5
}


function render(){
// draw rectangle ground 
drawRect(0,0,400,600,'black');
// draw paddle for computer
drawRect(comp.x,comp.y,comp.w,comp.h,comp.c);
// draw paddle for user
drawRect(user.x,user.y,user.w,user.h,user.c);
// dash line in center
centerLine()
// draw a ball
drawCircle(ball.x,ball.y,ball.r,ball.c)
// computer score
drawText(comp.score,20,canvas.height/2-30)
// user score
drawText(user.score,20,canvas.height/2+50)
}

// control the user paddle
canvas.addEventListener('mousemove',movepaddle);
function movepaddle(e){
    let rect = canvas.getBoundingClientRect();
    user.x=e.clientX -rect.left-user.w/2;
}
// collision detection
function collision(b,p){
    b.top=b.y -b.r;
    b.bottom=b.y +b.r;
    b.left=b.x -b.r;
    b.right=b.x +b.r;

    p.top=p.y;
    p.bottom=p.y + p.h;
    p.left=p.x;
    p.right=p.x+p.w;

    return (p.right > b.left &&
    p.left < b.right && 
    b.bottom > p.top &&
    b.top<p.bottom)

}
// gameover
function gameOver(){
// hide canvas
canvas.style.display='none'
const can=document.getElementById('cont');
can.style.display='none'
// result
const result=document.getElementById('result');
result.style.display='flex'
}

function update(){
    ball.x+=ball.velocityX*ball.speed;
    ball.y+=ball.velocityY*ball.speed;
    // control the computer paddle
    let computerLevel=0.1
     comp.x+=(ball.x -(comp.x+comp.w/2))+computerLevel
     if(ball.speed>2){
        comp.x+=ball.x+100;
     }
    // reflect from wall
    if(ball.x+ball.r>canvas.width || ball.x-ball.r<0){
        ball.velocityX=-ball.velocityX;
    }
    // if collision happens
    let player=(ball.y<canvas.height/2)?comp:user;
    if(collision(ball,player)){
        ball.velocityY=-ball.velocityY;
        ball.speed+=0.1
    }
    if(ball.y-ball.r<0){
        user.score++;
        resetBall()
    }
    else if(ball.y+ball.r>canvas.height){
        comp.score++;
        resetBall()
    }
    // gameover
    if(user.score>4 || comp.score>4){
        clearInterval(loop)
        gameOver()
    }
}

function resetBall(){
    ball.x=canvas.width/2
    ball.y=canvas.height/2

    ball.speed=1
    ball.velocityY=-ball.velocityY
}

function startGame(){
    update()
    render()
}

const loop=setInterval(()=>{
startGame()
},1000/50)



