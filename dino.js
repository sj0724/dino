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

let dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
};

class Cactus{
    constructor(height){
        this.x = 500;
        this.y = 250 - height;
        this.width = 20;
        this.height = height;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x,this.y,this.width,this.height);
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
        console.log(cactus.y)
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
    dino.draw();
    line.draw();
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