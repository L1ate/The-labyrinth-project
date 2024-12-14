const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const body = document.querySelector('body');


class GameSprite {
  constructor(x, y, image, width, height) {
    this.x = x;
    this.y = y;
    this.image = new Image(width, height);
    this.image.src = image;
    this.width = width;
    this.height = height;
    this.moveRight = false;
    this.moveLeft = false;
    this.moveUp = false;
    this.moveDown = false;
  }

  drawSprite() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Player extends GameSprite {
  startKeysEvents() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "d":
          this.moveRight = true
          break;
        case "w":
          this.moveUp = true
          break;
        case "a":
          this.moveLeft = true
          break;
        case "s":
          this.moveDown = true
          break;
        default:
          break;
      }
    });
    document.addEventListener("keyup", (e) => {
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
    });
  }

  movePlayer() {
    if (this.moveRight && this.x < canvas.width - this.width) {
      this.x += 1;
      if(isCollideObjects(walls)){
         
        this.x -= 1;
      }
    }
    if (this.moveLeft && this.x >= 0) {
      this.x -= 1;
      if(isCollideObjects(walls)){   
        this.x += 1;
      }
    }
    if (this.moveUp && this.y > 0) {
      this.y -= 1;
      if(isCollideObjects(walls)){   
        this.y += 1;
      }
    }
    if (this.moveDown && this.y < canvas.height - this.height) {
      this.y += 1;
      if(isCollideObjects(walls)){   
        this.y -= 1;
      }
    }
  }
}

const isCollide = (obj1, obj2) => {
  const dx = (obj1.width + obj2.width) / 2;
  const dy = (obj1.height + obj2.height) / 2;
  if (Math.abs(obj1.x - obj2.x) < dx && Math.abs(obj1.y - obj2.y) < dy) {
    return true;
  }
  return false;
}

const isCollideObjects = (list) => {
  for(let i of list){
    if(isCollide(player, i)){
      return true;
    }
  }
  return false;
}
const walls = [];
const player = new Player(20, 0, 'Player.png', 15, 30);
const wall1 = new GameSprite(0, 0, 'the_wall.png', 10, 50);
const wall2 = new GameSprite(50, 0, 'the_wall.png', 15, 20);
const wall3 = new GameSprite(0, 50, 'the_wall.png', 120, 5);
const wall4 = new GameSprite(115, 55, 'the_wall.png', 5, 35);
const wall5 = new GameSprite(65, 15, 'the_wall.png', 90, 5);
const wall6 = new GameSprite(150, 20, 'the_wall.png', 5, 40);
const wall7 = new GameSprite(150, 55, 'the_wall.png', 40, 5);


walls.push(wall1)
walls.push(wall2)
walls.push(wall3)
walls.push(wall4)
walls.push(wall5)
walls.push(wall6)
walls.push(wall7)
player.startKeysEvents();
player.image.onload = () => {
  const render = () => {
    ctx.clearRect(0, 0, 1000, 300);
    player.drawSprite();
    for(const i of walls){
      i.drawSprite();
    }
    player.movePlayer();

    window.requestAnimationFrame(render);
  };
  window.requestAnimationFrame(render);
};


