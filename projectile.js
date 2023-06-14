export class Projectile {
  constructor(x, y, targetX, targetY, context) {
    this.x = x;
    this.y = y;
    this.context = context;
    this.radius = 3;
    this.color = '#810000';
    this.velocity = {
      x: cosBetweenTwoPoints(targetX, targetY, x, y) * 15,
      y: sinBetweenTwoPoints(targetX, targetY, x, y) * 15,
    };
  }
}
