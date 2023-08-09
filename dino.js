let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;


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
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 20;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}

var timer = 0;
var cactusArray = [];
var jumpTimer = 0;
var animation;


function frame(){
    animation = requestAnimationFrame(frame);
    timer++;

    document.querySelector('#score').innerHTML = timer

    ctx.clearRect(0,0, canvas.width, canvas.height);

    if(timer % 200 === 0){
        let cactus = new Cactus();
        cactusArray.push(cactus);
    }
    cactusArray.forEach((a, i, o)=>{
        if(a.x < 0){
            o.splice(i,1)
        };
        a.x-=2;
        crush(dino, a);
        a.draw();
    });
    jumpTimer+=2;
    if(jumping == true){
        dino.y-=2;
    }
    if(jumpTimer > 120){
        jumping = false
    }
    if(jumping == false){
        if(dino.y < 200){
            dino.y+=2;
        }else if(dino.y == 200){
            jumpTimer = 0;
        }
    }
    console.log(jumpTimer)
    dino.draw();
};

frame();

function crush(dino, cactus){
    var xA = cactus.x - (dino.x + dino.width);
    var yA = cactus.y - (dino.y + dino.height);
    if(xA < 0 && yA < 0){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation)
    }
}
var jumping = false;

document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        jumping = true;
    }else if(jumpTimer =! 0){
        jumping = false;
    }
})

