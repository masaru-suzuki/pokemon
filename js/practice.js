'use strict';
{

const enemyGauge = document.getElementById('enemyGauge');
const enemyHpHtmlElement = document.getElementById('enemyHp');
const enemyAttackBtn = document.getElementById('enemyAttackBtn');
const playerGauge = document.getElementById('playerGauge');
const playerHpHtmlElement = document.getElementById('playerHp');
const playerAttackBtn = document.getElementById('playerAttackBtn');
const enemyGaugeMotion = document.querySelector('.enemy-gauge');
const playerGaugeMotion = document.querySelector('.player-gauge');

//enemy
const enemy = {name:'ギャラドス', hp:120, lv:80, remainingHp: 120};
enemyGauge.classList.add('enemy-gauge');
//player
const player = {name:'ピカチュウ', hp:100, lv:70, remainingHp: 100};
playerGauge.classList.add('player-gauge');

//Initial
let damage;
playerAttackBtn.disabled = true;

const start = () => {
  enemy.remainingHp = enemy.hp;
  player.remainingHp = player.hp;
  enemyGauge.style.width = 100 + '%';
  playerGauge.style.width = 100 + '%';
  enemyGauge.style.backgroundColor = 'green';
  playerGauge.style.backgroundColor = 'green';
  enemyHpHtmlElement.textContent = enemy.remainingHp + '/'+ enemy.hp
  playerHpHtmlElement.textContent = player.remainingHp + '/'+ player.hp
  damage = 0;
  playerAttackBtn.disabled = true;
  enemyAttackBtn.disabled = false;
}
const calculateDamage = () => {
  const minDamage = 50;
  const maxDamage = 70;
  damage = minDamage + Math.floor(Math.random() * (maxDamage + 1 -minDamage));
}
const updateHp = (target,targetHpHtmlElement,damage) => {
let interval;
let remainingDamage = damage;
interval = setInterval(() => {
  if(remainingDamage === 0) return clearInterval(interval);

  target.remainingHp --;
  targetHpHtmlElement.textContent = target.remainingHp + '/' + target.hp
  remainingDamage --;
}, 20);
}

const updateHpGauge = (target,targetHpGauge,damage) => {
  enemyGauge.classList.add('enemy-gauge')
  playerGauge.classList.add('player-gauge')
  let remainingHp = target.remainingHp - damage;
  let remainingHpPercentage = remainingHp / target.hp * 100;
  targetHpGauge.style.width = remainingHpPercentage + '%';
  if(remainingHpPercentage < 0){
    targetHpGauge.style.width = 0;
  }
  // Change Color PlayerHpGauge
  if (remainingHpPercentage < 20){
    targetHpGauge.style.backgroundColor = 'red';
  } else if (remainingHpPercentage < 50){
    targetHpGauge.style.backgroundColor = 'yellow';
  }

}
const turnEnd = (target,damage) =>{
  let remainingHp = target.remainingHp - damage;
  if(target === enemy){
    enemyAttackBtn.disabled = true;
    playerAttackBtn.disabled = false;
  } else if(target === player) {
    enemyAttackBtn.disabled = false;
    playerAttackBtn.disabled = true;
  }
  if(remainingHp <= 0) {
    alert('end')
    return start();
  }
  console.log(target.remainingHp)
}

// const playerTurnEnd = () => {
//   enemyAttackBtn.disabled = true;
//   playerAttackBtn.disabled = false;
// }
// const enemyTurnEnd = () => {
//   enemyAttackBtn.disabled = false;
//   playerAttackBtn.disabled = true;
// }

// const processKillEnemy = () => {
//   enemyHpHtmlElement.textContent = 0 + '/'+ enemy.hp
//       alert('You Win!');
//       start();
//       return;
// }
// const processKilledPlayer = () => {
//   player.textContent = 0 + '/'+ player.hp
//   alert('You Lose!');
//   start();
//   return;
// }

///////////////////////////////////////////////////////
start();

//Player Turn
enemyAttackBtn.addEventListener('click', (e) => {
  calculateDamage();
  updateHp(enemy,enemyHpHtmlElement,damage);
  updateHpGauge(enemy,enemyGauge,damage);
  turnEnd(enemy,damage);
});

//Enemy Turn
playerAttackBtn.addEventListener('click', (e) => {
  calculateDamage();
    updateHp(player,playerHpHtmlElement,damage);
  updateHpGauge(player,playerGauge,damage);
  turnEnd(player,damage);
  });


}