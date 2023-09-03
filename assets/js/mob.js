function mob(w, h, x, y, angle, type, scale, maxHP) {
  this.e = new entity(w, h, x, y, angle, type, "", scale, false, maxHP);
  this.e.parent=this;
  this.type=mobtype.FOLLOW;
  // this.e.bow = new Bow();
  // this.e.bow.rate=rndNo(0,3)+.5-(STAGE/10);

  this.bspd=150;
  this.spd = .5;
  this.noX=false;
  this.noY=false;
  this.waitX=1;
  this.waitY=1;
  this.time=0;
  this.tryXSpeed=this.spd;
  this.tryYSpeed=this.spd;
  this.facing=RIGHT;

  this.hit = function(delta, type, power) {
    this.e.hp -= 1+power;
  }

  this.update = function(delta) {
    this.time+=delta/1000;
    let x = this.e.x;
    let y = this.e.y;
    e = this.e;

    // basic follow with steering
    let steeringForce = this.steerFromNearbyMobs(cart.level.mobs, 26);
    e.y = y < cart.hero.e.y ? y += this.spd/2 + steeringForce.y : y += -this.spd/2 + steeringForce.y;
    e.x = x < cart.hero.e.x ? x += this.spd + steeringForce.x : x += -this.spd + steeringForce.x;

    if(this.e.x > cart.hero.e.x){
          this.e.flip=true;
    } else {
          this.e.flip=false;
    }

    //Draw HP
    //if(e.hp < e.maxHP){
      // drawImg(ctx, e.image, 0, 32, 16, 8, e.x, e.y+(64+10), .8, e.scale);
      // drawRect(ctx, e.x, e.y+(64+8),16,14,(48/e.maxHP)*e.hp,12,"#00dcf8",.8)
    //}

    // SHOOTING ARROWS and Attacks
    //this.e.gun.addBullets(this.e.x+32,this.e.y+32,cart.hero.e.x+32,cart.hero.e.y+32,true,this.e.type, this.bspd);
    //this.e.gun.drawBullets(delta, true);
  }

  this.steerFromNearbyMobs = function(allMobs, maxDist) {
    let steerX = 0;
    let steerY = 0;
    let count = 0;

    for(let i = 0; i < allMobs.length; i++) {
        let mob = allMobs[i];
        let d = Math.sqrt(Math.pow(this.e.x - mob.e.x, 2) + Math.pow(this.e.y - mob.e.y, 2));

        if (mob !== this && d < maxDist) {
            steerX += (this.e.x - mob.e.x);
            steerY += (this.e.y - mob.e.y);
            count++;
        }
    }

    if (count > 0) {
        steerX /= count;
        steerY /= count;
    }

    // Normalize steering force, and adjust its magnitude
    let magnitude = Math.sqrt(steerX * steerX + steerY * steerY);
    if (magnitude > 0) {
        steerX /= magnitude;
        steerY /= magnitude;
    }

    return { x: steerX, y: steerY };
};


}
