const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
const jumpBtn = document.querySelector('#jump');

let line = {
    draw(){
        ctx.beginPath();
        ctx.moveTo(0,250);
        ctx.lineTo(500,250);
        ctx.stroke();
    }
};

let img1 = new Image();
img1.src = 'dino2.png';

let img2 = new Image();
img2.src = 'dino3.png';

let dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(e){
        // ctx.fillStyle = 'green';
        // ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(e, this.x, this.y, 50, 50);
    }
};

let img3 = new Image();
img3.src = 'cactus1.png'

class Cactus{
    constructor(height){
        this.x = 500;
        this.y = 250 - height;
        this.width = 20;
        this.height = height;
    }
    draw(){
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(img3, this.x, this.y, 30, this.height)
    }
}

var jumping = false;
var timer = 0;
var score = 0;
var cactusArray = [];
var jumpTimer = 0;
var animation;
let j = 2;
let u = j-1;
let num = [30,50,70];
let i = img1;

function jump(){
    jumping = true
};

function frame(){
    animation = requestAnimationFrame(frame);
    timer++;

    document.querySelector('#score').innerHTML = timer
    if(timer >= score){
        score++;
        document.querySelector('#highscore').innerHTML = score
    }

    ctx.clearRect(0,0, canvas.width, canvas.height);

    if(timer % 1000 === 0){
        j+=1;
    }
    if(timer % (170-j*10) === 0){
        let random = num[Math.floor(Math.random()*num.length)];
        let cactus = new Cactus(random);
        cactusArray.push(cactus);
    }
    cactusArray.forEach((a, i, o)=>{
        if(a.x < 0){
            o.splice(i,1)
        };
        a.x-=j;
        crush(dino, a);
        a.draw();
    })
    jumpTimer+=j;
    if(jumping == true){
        dino.y-=j;
    }
    if(jumpTimer > 120){
        jumping = false
    }
    if(jumping == false){
        if(dino.y < 200){
            dino.y+=u;
        } else if(dino.y == 200){
            jumpTimer = 0;
            jumping = false;
            u = j-1;
        } else if(dino.y > 200){
            dino.y = 200;
        }
    }
    document.querySelector('#level').innerHTML = j-1;
    if(timer % 20 == 0){
        i = img2;
    }else if(timer % 30 == 0){
        i = img1;
    }
    dino.draw(i);
    line.draw();
    console.log(i);
};

frame();

function crush(dino, cactus){
    var xA = cactus.x - (dino.x + dino.width);
    var yA = cactus.y - (dino.y + dino.height);
    if(xA < 0 && yA < 0){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation)
    }
};

function restart(){
    cancelAnimationFrame(animation)
    timer = 0;
    cactusArray = [];
    jumpTimer = 0;
    j = 2;
    u = j-1;
    dino.y = 200;
    jumping = false;
    frame()
};

document.addEventListener('keydown', function(e){
    if(e.code === 'ArrowDown'){
        jumping=false;
        u = 10;
    }
});

document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        jump();
    }
});

jumpBtn.addEventListener('click', restart);