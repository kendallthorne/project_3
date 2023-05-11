class Person {

    constructor(col) {
      this.x = random(width);
      this.y = random(height);
      this.directions = ["left", "right", "up", "down"];
      this.radius = 25;
      this.color = col;
      this.r = random(1000);
      this.r2 = random(500)
    }
  
    display() {
      fill(this.color);
      ellipse(this.x, this.y, this.radius);
      this.move();
    }
  
    move() {
  
      // noise returns a number between 0 and 1
      // -.25 to make it -.25 to .25
      this.x += 0.5 * noise(millis() / 80000 + this.r*2, this.r2) - .25;
      this.y += 0.5 * noise(millis() / 100000+ this.r*3, this.r) - .25;
  
      if (this.x > width + this.radius) {
        this.x = 0 - this.radius;
      }
      else if (this.x < 0 - this.radius) {
        this.x = width + this.radius;
      }
  
      if (this.y > height + this.radius) {
        this.y = 0 - this.radius;
      }
      else if (this.y < 0 - this.radius) {
        this.y = height + this.radius;
      }
      // let dir = noise(this.directions)
      // if(dir == "left" && this.x > 0){
      //   this.x--;
      // }
  
      // else if(dir == "right" && this.x < width){
      //   this.x++;
      // }
  
      // else if(dir == "right" && this.y > 0){
      //   this.y--;
      // }
  
      // else if(dir == "right" && this.y < height){
      //   this.y++;
      // }
    }
  }