function drawCountdown(ctx, elapsedTime, totalTime) {
  const centerX = 400;
  const centerY = 35;
  const radius = 30;

  // Calculate the angle for the countdown
  angle = (Math.PI * 2) * (elapsedTime / totalTime);
  if (elapsedTime >= totalTime) angle=Math.PI * 2;

  // Draw the full circle background (time passed)
  ctx.beginPath();
  ctx.fillStyle = '#cccccc'; // Color of the elapsed time
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  // Draw the countdown part (remaining time)
  ctx.beginPath();
  ctx.fillStyle = 'white'; // Color of the remaining time
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, angle - Math.PI / 2, false);
  ctx.closePath();
  ctx.fill();

  // Draw the hand
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(
      centerX + radius * Math.cos(angle - Math.PI / 2),
      centerY + radius * Math.sin(angle - Math.PI / 2)
  );
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3;
  ctx.stroke();
}

function drawBar(ctx, hp, maxHp, colour, yOff) {
    ctx.save();
    ctx.translate(0,yOff);
    const hpBarWidth = 200;
    const hpBarHeight = 20;
    const margin = 10;

    // Draw the black background of the HP bar
    ctx.fillStyle = 'black';
    ctx.fillRect(margin, margin, hpBarWidth, hpBarHeight);

    // Calculate the width of the red inner HP bar based on current health
    const hpPercentage = hp / maxHp;
    const redBarWidth = hpBarWidth * hpPercentage;

    ctx.fillStyle = 'grey';
    ctx.fillRect(margin+2, margin+2, hpBarWidth-4, hpBarHeight-4);

    ctx.fillStyle = colour;
    ctx.fillRect(margin+2, margin+2, redBarWidth-4, hpBarHeight-4);

    // Set text properties
   ctx.font = '14px Arial';
   ctx.fillStyle = 'white';
   ctx.textAlign = 'center';
   ctx.textBaseline = 'middle';

   // Calculate text position
   const textX = margin + hpBarWidth / 2;
   const textY = margin + hpBarHeight / 2;

   // Draw text (current HP and max HP)
   ctx.fillText(`${hp} / ${maxHp}`, textX, textY);

   ctx.restore();
}

// Useful Functions and classes
function rectanlge(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}

function rndNo(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function cloneRectanlge(rec) {
  return new rectanlge(rec.x, rec.y, rec.w, rec.h);
}

function rectColiding(rec1, rec2) {
  return (rec1.x < rec2.x + rec2.w &&
    rec1.x + rec1.w > rec2.x &&
    rec1.y < rec2.y + rec2.h &&
    rec1.y + rec1.h > rec2.y)
}

function vec2(x,y){
  this.x = x;
  this.y = y;

  this.set = function(x,y) {
    this.x = x;
    this.y = y;
  }
}

function drawRect(ctx, ox, oy, x, y, w, h, col, alpha){
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(ox, oy);
  ctx.fillStyle = col;
  ctx.fillRect(x,y,w,h);
  ctx.restore();
}

function lerp (start, end, amt){
  return (1-amt)*start+amt*end
}

function isoCen(nc, nr) {
    const size = 16;

    // Finding the center tile
    cenX = Math.floor(nc / 2);
    cenY = Math.floor(nr / 2);

    // Calculating the pixel coordinates of the center tile
    return { x: (cenX - cenY) * size / 2, y: (cenX + cenY) * size / 2 };
}

function getResponsiveFontSize(percent) {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  // You might want to adjust the scaling factor (0.1) to get the best size for your design.
  return Math.round(vw * percent); // This sets the font size to 10% of the viewport width.
}

function drawBox(ctx,a,colour,x,y,w,h) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = a;
  ctx.fillStyle = colour;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}

function writeTxt(ctx,a,font,colour,txt,x,y) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = a;
  ctx.font = font;
  ctx.fillStyle = colour;

  ctx.fillText(txt, x, y);
  ctx.restore();
}

function writeStroke(ctx,a,font,colour,txt,x,y, strokeW) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = a;
  ctx.font = font;
  ctx.fillStyle = colour;
  ctx.strokeStyle = colour; // Color of the stroke
  ctx.lineWidth = strokeW; // Width of the stroke
  ctx.strokeText(txt, x, y);
  ctx.restore();
}


function getTile(x,y,h,offY){
  let gridX = x / 32;
  let gridY = (y+h*2+offY) / 32 * 2;

  // Convert this grid position to isometric grid position based on your setup
  let isoRow = gridY - gridX;
  let isoCol = gridX + gridY;

  r = Math.floor(isoRow);
  c = Math.floor(isoCol);

  return getTileRC(r,c);
}

function getTileRC(r,c){
  return cart.level.tiles[c + (cart.levels[cart.hero.e.curLevel].cols * r)];
}

function knockback(hero, src, amt) {
    // calculate direction based on position of damage source and hero's position
    let dx = hero.e.x > src.x ? 1 : -1;
    let dy = hero.e.y > src.y ? 1 : -1;

    // apply knockback
    hero.e.x += dx * amt;
    hero.e.y += dy * amt;
}

const fontMap = {
    '0': [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
    ],
    '1': [
        [0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
    ],
    '2': [
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1]
    ],
    '3': [
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1],
        [0, 1, 1, 1, 1],
        [0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
    ],
    '4': [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1]
    ],
    '5': [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
    ],
    '6': [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
    ],
    '7': [
        [1, 1, 1, 1, 1],
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0]
    ],
    '8': [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
    ],
    '9': [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
    ]
};


   function drawNumber(x, y, number, scale) {
       for (let i = 0; i < fontMap[number].length; i++) {
           for (let j = 0; j < fontMap[number][i].length; j++) {
               if (fontMap[number][i][j] === 1) {
                   ctx.fillStyle = 'white';
                   ctx.fillRect(x + j * scale, y + i * scale, scale, scale);
               }
           }
       }
   }

   function displayFPS(fps) {
     mg.context.fillStyle = "yellow";
     mg.context.font = "16px Arial";
     mg.context.fillText("FPS: " + fps.toFixed(2), nativeWidth-100, 20);
   }

   function displayEnemyCount(n) {
     mg.context.fillStyle = "white";
     mg.context.font = "16px Arial";
     mg.context.fillText("Mobs: " + n, nativeWidth-100, 50);
   }

   function drawHeroBox(x, y, width, height, borderRadius) {
     ctx.save();
     ctx.scale(3,3)
     // Set shadow properties
     ctx.shadowColor = '#3CB371'; // Dark mint green shadow
     ctx.shadowBlur = 10;
     ctx.shadowOffsetX = 5;
     ctx.shadowOffsetY = 5;

    // Box fill color
    ctx.fillStyle = 'white';
    ctx.fill();

    // Box stroke color
    ctx.strokeStyle = '#3CB371';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.roundRect(50, 40, 150, 100, 40);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
}
