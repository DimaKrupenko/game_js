export class Particle {
  constructor(x, y, context) {
    this.x = x;
    this.y = y;
    this.context = context;
    this.radius = Math.random() + 2;
    this.color = '#920101';
    this.velocity = {
      x: (Math.random() - 0.5) * Math.random() * 5,
      y: (Math.random() - 0.5) * Math.random() * 5,
    };
    this.alpha = 1;
  }
}
