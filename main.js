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
    p.bottom=p.y + p.height;
    p.left=p.x;
    p.right=p.x+width;

    return p.right > b.left &&
    p.left < b.right && 
    b.bottom > p.top &&
    b.top<p.bottom

}



function update(){
    ball.x+=ball.velocityX;
    ball.y+=ball.velocityY;
    if(ball.x+ball.r>canvas.width || ball.x-ball.r<0){
        ball.velocityX=-ball.velocityX;
    }
    // if(ball.y+ball.r>canvas.height || ball.y-ball.r<0){
    //     ball.velocityY=-ball.velocityY;
    // }
}

function startGame(){
    update()
    render()
}

setInterval(()=>{
startGame()
},1000/50)



