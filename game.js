const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const body = document.querySelector("body");
// const game = document.querySelector('.game');

class GameSprite {
  constructor(x, y, image, width, height) {
    this.x = x;
    this.y = y;
    this.image = document.createElement('img');
    this.image.style.position = 'absolute';
    this.image.setAttribute('src', image);
    this.image.style.width = `${width}px`
    this.image.style.width = `${height}px`
    this.width = width;
    this.height = height;
    this.moveRight = false;
    this.moveLeft = false;
    this.moveUp = false;
    this.moveDown = false;
    document.querySelector('.game').append(this.image);
  }

  drawSprite() {
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.image.style.top = `${this.y - 10}px`;
    this.image.style.left = `${this.x}px`;
    
  }
}

class Player extends GameSprite {
  startKeysEvents() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "d":
          this.moveRight = true;
          break;
        case "w":
          this.moveUp = true;
          break;
        case "a":
          this.moveLeft = true;
          break;
        case "s":
          this.moveDown = true;
          break;
        default:
          break;
      }
    });
    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "d":
          this.moveRight = false;
          break;
        case "w":
          this.moveUp = false;
          break;
        case "a":
          this.moveLeft = false;
          break;
        case "s":
          this.moveDown = false;
          break;
        default:
          break;
      }
    });
  }
  movePlayer() {
    if (this.moveRight && this.x < canvas.width - this.width) {
      this.x += 5;
      if (isCollideObjects(walls)) {
        this.x -= 5;
      }
    }
    if (this.moveLeft && this.x >= 0) {
      this.x -= 5;
      if (isCollideObjects(walls)) {
        this.x += 5;
      }
    }
    if (this.moveUp && this.y > 0) {
      this.y -= 5;
      if (isCollideObjects(walls)) {
        this.y += 5;
      }
    }
    if (this.moveDown && this.y < canvas.height - this.height) {
      this.y += 5;
      if (isCollideObjects(walls)) {
        this.y -= 5;
      }
    }
  }
}

class Enemy extends GameSprite{

}
const isCollide = (obj1, obj2) => {
  const dx = (obj1.width + obj2.width) / 2;
  const dy = (obj1.height + obj2.height) / 2;
  const centerX1 = obj1.x + obj1.width / 2;
  const centerX2 = obj2.x + obj2.width / 2;
  const centerY1 = obj1.y + obj1.height / 2;
  const centerY2 = obj2.y + obj2.height / 2;


  if (Math.abs(centerX1 - centerX2) < dx && Math.abs(centerY1 - centerY2) < dy) {
    console.log(`x1: ${obj1.x}`, `x2: ${obj2.x}`);
    return true;
  }
  return false;
};

const isCollideObjects = (list) => {
  for (let i of list) {
    if (isCollide(player, i)) {
      return true;
    }
  }
  return false;
};
const walls = [];
const pounts = [[710, 100], [710, 650]];
const player = new Player(0, 0, "Player.png", 100, 100);
const point1 = new GameSprite(710, 100,'', 5, 5);                //
const point2 = new GameSprite(710, 580,'', 5, 5);                 //
const point3 = new GameSprite(515, 580,'', 5, 5);                 //
const point4 = new GameSprite(515, 100,'', 5, 5);                 //
const point5 = new GameSprite(310, 100,'', 5, 5);
const point6 = new GameSprite(310, 580,'', 5, 5);
const point7 = new GameSprite(900, 100,'', 5, 5);
const point8 = new GameSprite(900, 580,'', 5, 5);
const point9 = new GameSprite(1100, 580,'', 5, 5);
const wall1 = new GameSprite(200, 30, '', 20, 500);
const wall2 = new GameSprite(200, 30, '', 800, 20);
const wall3 = new GameSprite(200, 650, '', 800, 20);
const wall4 = new GameSprite(400, 150, '', 20, 500);
const wall5 = new GameSprite(600, 30, '', 20, 500);
const wall6 = new GameSprite(800, 150, '', 20, 500);


walls.push(wall1)
walls.push(wall2)
walls.push(wall3)
walls.push(wall4)
walls.push(wall5)
walls.push(wall6)

player.startKeysEvents();

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.drawSprite();
  for (const i of walls) {
    i.drawSprite();
  }
  player.movePlayer();
  point1.drawSprite();
  point2.drawSprite();
  point3.drawSprite();
  point4.drawSprite();
  point5.drawSprite();
  point6.drawSprite();
  point7.drawSprite();
  point8.drawSprite();
  point9.drawSprite();
  window.requestAnimationFrame(render);
};
window.requestAnimationFrame(render);
