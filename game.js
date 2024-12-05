const canvas = document.querySelector('.game')
const ctx = canvas.getContext("2d")

class GameSprite {
    constructor(image, x, y, height, width){
        this.image = new Image(width, height);
        this.image.src = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.moveRight = false;
        this.moveLeft = false;
        this.moveUp = false;
        this.moveDown = false;
    }
    drawSprite(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

class Player extends GameSprite {
    startKeysEvents(){
        document.addEventListener('keydown', function(e){
            switch (e.key) {
                case "d":
                  this.moveRight = false
                  break;
                case "w":
                  this.moveUp = false
                  break;
                case "a":
                  this.moveLeft = false
                  break;
                case "s":
                  this.moveDown = false
                  break;
                default:
                  break;
              }
        })
        
        document.addEventListener('keyup', function(e){
            if (e.key === "d"){
               this.moveRight = false;
               console.log("Поднята")
            }
            
            if(e.key === "a"){
                this.moveLeft = false;
            }
        
            if (e.key === "w"){
                this.moveUp = false;
            }
            
            if(e.key === "s"){
                this.moveDown = false;
            }
        })
    }

    movePlayer() {
        if(this.moveRight){
            this.x += 2;
        }
        if(this.moveLeft){
            this.x -= 2;
        }
        if(this.moveUp){
            this.y += 2;
        }
        if(this.moveDown){
            this.y -= 2;
        }
    }
}
const player = new Player('CM.png', 40, 40, 30, 30);
player.startKeysEvents()
function render(){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    player.drawSprite()
    player.movePlayer()
    window.requestAnimationFrame(render)
   
}
window.requestAnimationFrame(render)



