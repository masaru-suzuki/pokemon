// 課題
// ・targetHpHtmlElementがマイナスになったとき、０に戻るようにしたが、時差がある

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
  const minDamage = 10;
  const maxDamage = 30;
  damage = minDamage + Math.floor(Math.random() * (maxDamage + 1 -minDamage));
}
const updateHp = (target,targetHpHtmlElement,damage) => {
let interval;
let remainingDamage = damage;

interval = setInterval(() => {
  if (target.remainingHp <= 0){
    targetHpHtmlElement.textContent = 0 + '/' + target.hp
  }
  if(remainingDamage === 0) return clearInterval(interval);
  target.remainingHp --;
  targetHpHtmlElement.textContent = target.remainingHp + '/' + target.hp
  remainingDamage --;
}, 60);
}

const updateHpGauge = (target,targetHpGauge,damage) => {
  enemyGauge.classList.add('enemy-gauge')
  playerGauge.classList.add('player-gauge')
  let remainingHp = target.remainingHp - damage;
  let remainingHpPercentage = remainingHp / target.hp * 100;
  targetHpGauge.style.width = remainingHpPercentage + '%';

  if (remainingHpPercentage < 20){
    targetHpGauge.style.backgroundColor = 'rgb(247, 79, 79)';
  } else if (remainingHpPercentage < 50){
    targetHpGauge.style.backgroundColor = 'rgb(252, 252, 119)';
  }
}
const turnEnd = (target,targetHpGauge,targetHpHtmlElement,damage) =>{
  let remainingHp = target.remainingHp - damage;
  if(target === enemy){
    enemyAttackBtn.disabled = true;
    playerAttackBtn.disabled = false;
  } else if(target === player) {
    enemyAttackBtn.disabled = false;
    playerAttackBtn.disabled = true;
  }

  if(remainingHp <= 0) {
    targetHpHtmlElement.textContent = '0' + '/' + target.hp;
    targetHpGauge.style.width = 0;
    setTimeout(() => {
      if(target === enemy){
        alert('You are winner!')
      }else{
        alert('you are lose...')
      }
      return start();
    }, 2000);
  }
}

///////////////////////////////////////////////////////
start();
//Player Turn
enemyAttackBtn.addEventListener('click', (e) => {
  calculateDamage();
  updateHp(enemy,enemyHpHtmlElement,damage);
  updateHpGauge(enemy,enemyGauge,damage);
  turnEnd(enemy,enemyGauge,enemyHpHtmlElement,damage);
});

//Enemy Turn
playerAttackBtn.addEventListener('click', (e) => {
  calculateDamage();
  updateHp(player,playerHpHtmlElement,damage);
  updateHpGauge(player,playerGauge,damage);
  turnEnd(player,playerGauge,playerHpHtmlElement,damage);
  });


}