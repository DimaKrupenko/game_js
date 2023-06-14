import { Player } from './player.js';
import { Projectile } from './projectile.js';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

let player;
let projectile = [];

startGame();

function startGame() {
  init();
  animate();
}

function init() {
  const movementLimits = {
    minX: 0,
    maxX: canvas.width,
    minY: 0,
    maxY: canvas.height,
  };
  player = new Player(
    canvas.width / 2,
    canvas.height / 2,
    context,
    movementLimits
  );
  addEventListener('click', createProjectile);
}

function createProjectile(e) {
  projectile.push(
    new Projectile(player.x, player.y, e.clientX, e.clientY, context)
  );
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  projectile = projectile.filter(projectileInsideWindow);

  projectile.forEach(projectile => projectile.update());
  player.update();
}

function projectileInsideWindow(projectile) {
  return (
    projectile.x + projectile.radius > 0 &&
    projectile.x - projectile.radius < canvas.width &&
    projectile.y + projectile.radius > 0 &&
    projectile.y - projectile.radius < canvas.height
  );
}
