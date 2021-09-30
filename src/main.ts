// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


// function to generate random number

const generateRandomNum = (min: number, max: number): number => {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

class Ball {
  x;
  y;
  velX;
  velY;
  color;
  size;

  constructor(x: number, y: number, velX: number, velY: number, color: any, size: number) {
    this.x = x; // スタート地点X
    this.y = y; // スタート地点Y
    this.velX = velX; // 水平方向の速度
    this.velY = velY; // 垂直方向の速度
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    // ボールが画面右端に行ったら反転
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }

    // ボールが画面左端に行ったら反転
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }

    // ボールが画面下に行ったら反転
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }

    // ボールが画面上に行ったら反転
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }

    // 座標更新
    this.x += this.velX;
    this.y += this.velY;
  }
}


let balls = [];

while (balls.length < 50) {
  let size = generateRandomNum(5,30);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    generateRandomNum(0 + size,width - size),
    generateRandomNum(0 + size,height - size),
    generateRandomNum(-7,7),
    generateRandomNum(-7,7),
    'rgba(' + generateRandomNum(0,255) + ',' + generateRandomNum(0,255) + ',' + generateRandomNum(0,255) +',0.7)',
    size
  );

  balls.push(ball);
}

const animate = () => {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
  }

  requestAnimationFrame(animate);
}

animate();