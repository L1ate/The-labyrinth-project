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
      console.log(e.key);
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
      if(isCollide(this, player2)){   
        this.x -= 1;
      }
    }
    if (this.moveLeft && this.x >= 0) {
      this.x -= 1;
      if(isCollide(this, player2)){   
        this.x += 1;
      }
    }
    if (this.moveUp && this.y > 0) {
      this.y -= 1;
      if(isCollide(this, player2)){   
        this.y += 1;
      }
    }
    if (this.moveDown && this.y < canvas.height - this.height) {
      this.y += 1;
      if(isCollide(this, player2)){   
        this.y -= 1;
      }
    }
  }
}

const isCollide = (obj1, obj2) => {
  const dx = (obj1.width + obj2.width) / 2;
  const dy = (obj1.higth + obj2.higth) / 2;
  if (Math.abs(obj1.x - obj2.x) < dx && Math.abs(obj1.y - obj2.y) < dy) {
    return true;
  }
  return false;
}


const player = new Player(40, 40, 'CM.png', 30, 30);
const player2 = new GameSprite(0, 0, 'dog.jpg', 30, 30);
//const wall = new GameSprite(60, 40, 'wall.png', 30, 30);
player.startKeysEvents();
player.image.onload = () => {
  const render = () => {
    ctx.clearRect(0, 0, 1000, 300);
    player.drawSprite();
    player2.drawSprite();
    //wall.drawSprite();
    player.movePlayer();

    if (isCollide(player, player2)) {
      player.x = 50;
      player.y = 50;
      console.log('Коснулось');
    }

    window.requestAnimationFrame(render);
  };
  window.requestAnimationFrame(render);
};


