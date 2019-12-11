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
//enemy
const enemy = {name:'ギャラドス', hp:120, lv:80, remainingHp: 120};
enemyGauge.classList.add('enemy-gauge');
//player
const player = {name:'ピカチュウ', hp:100, lv:70, remainingHp: 100};
playerGauge.classList.add('player-gauge');

//Initial
let damage;

const resetDamage = target => (target.remainingHp = target.hp);
const resetGaugeStyle = element => (element.style.width = 100 + "%");
const resetBGC = element => (element.style.backgroundColor = "green");
const resetHpElement = (element, target) =>
  (element.textContent = target.remainingHp + "/" + target.hp);
const disableButton = element => (element.disabled = true);
const enableButton = element => (element.disabled = false);

const init = () => {
  resetDamage(enemy);
  resetDamage(player);
  resetGaugeStyle(enemyGauge);
  resetGaugeStyle(playerGauge);
  resetBGC(enemyGauge);
  resetBGC(playerGauge);
  resetHpElement(enemyHpHtmlElement, enemy);
  resetHpElement(playerHpHtmlElement, player);
  disableButton(playerAttackBtn);
  enableButton(enemyAttackBtn);
};
class HpElements {
  static update(target, HpHtmlElement, remainingHp) {
    console.log(remainingHp);
    if (remainingHp <= 0) {
      HpHtmlElement.textContent = 0 + '/' + target.hp;
    }
    }
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
  // if (target.remainingHp <= 0){
    // targetHpHtmlElement.textContent = 0 + '/' + target.hp
    // }
    if(remainingDamage === 0) return clearInterval(interval);
    target.remainingHp --;
    targetHpHtmlElement.textContent = target.remainingHp + '/' + target.hp
    remainingDamage --;
    HpElements.update(target, targetHpHtmlElement, target.remainingHp)
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

  // HpElements.update(target, targetHpHtmlElement, remainingHp);
  if (target.remainingHp <= 0){
    targetHpHtmlElement.textContent = 0 + '/' + target.hp
  }
    setTimeout(() => {
      if(target === enemy){
        alert('You are winner!')
      }else{
        alert('you are lose...')
      }
      return init();
    }, 2000);
  // }
}

///////////////////////////////////////////////////////
init();
new HpElements();
/*=====================class===================================================================================================================

//player turn



============================================================================================================================================*/


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