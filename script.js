import { Player } from './player.js';
import { Projectile } from './projectile.js';
import { Enemy } from './enemy.js';
import { distanceBetweenTwoPoints } from './utilities.js';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

let player;
let projectile = [];
let enemies = [];

startGame();

function startGame() {
  init();
  animate();
  spawnEnemies();
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

function spawnEnemies() {
  enemies.push(new Enemy(canvas.width, canvas.height, context, player));
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  projectile = projectile.filter(projectileInsideWindow);
  enemies.forEach(enemy => checkHittingEnemy(enemy));
  enemies = enemies.filter(enemy => enemy.health > 0);

  projectile.forEach(projectile => projectile.update());
  player.update();
  enemies.forEach(enemy => enemy.update());
}

function projectileInsideWindow(projectile) {
  return (
    projectile.x + projectile.radius > 0 &&
    projectile.x - projectile.radius < canvas.width &&
    projectile.y + projectile.radius > 0 &&
    projectile.y - projectile.radius < canvas.height
  );
}

function checkHittingEnemy(enemy) {
  projectile.some((projectile, index) => {
    const distance = distanceBetweenTwoPoints(
      projectile.x,
      projectile.y,
      enemy.x,
      enemy.y
    );
    if (distance - enemy.radius - projectile.radius > 0) return false;

    removeProjectileByIndex(index);
    enemy.health--;

    return true;
  });
}

function removeProjectileByIndex(index) {
  projectile.splice(index, 1);
}
