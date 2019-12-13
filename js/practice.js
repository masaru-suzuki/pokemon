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
const enemy = {name:'ギャラドス', hp:40, lv:80, remainingHp: 40};
enemyGauge.classList.add('enemy-gauge');
//player
const player = {name:'ピカチュウ', hp:40, lv:70, remainingHp: 40};
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
  constructor(target, HpHtmlElement) {
    this.target = target;
    this.HpHtmlElement = HpHtmlElement;
  }
  update() {
    let remainingHp = this.target.remainingHp - damage;
    if (remainingHp <= 0) {
      this.HpHtmlElement.textContent = 0 + '/' + this.target.hp;
    }
    }
}

const calculateDamage = () => {
  const minDamage = 10;
  const maxDamage = 30;
  damage = minDamage + Math.floor(Math.random() * (maxDamage + 1 -minDamage));
}
const updateHp = (target,HpHtmlElement,damage) => {
let interval;
let remainingDamage = damage;
interval = setInterval(() => {
    if(remainingDamage === 0) return clearInterval(interval);
    target.remainingHp --;
    HpHtmlElement.textContent = target.remainingHp + '/' + target.hp
    remainingDamage --;
    HpElements.update(target);
  }, 60);
}

const updateHpGauge = (target,targetHpGauge,damage) => {
  enemyGauge.classList.add('enemy-gauge')
  playerGauge.classList.add('player-gauge')
  let remainingHp = target.remainingHp - damage;
  let remainingHpPercentage = remainingHp / target.hp * 100;
  targetHpGauge.style.width = remainingHpPercentage + '%';
  if (remainingHpPercentage <= 0) {
    targetHpGauge.style.width = 0 + '%';
  } else if (remainingHpPercentage < 20) {
    targetHpGauge.style.backgroundColor = 'rgb(247, 79, 79)';
  } else if (remainingHpPercentage < 50) {
    targetHpGauge.style.backgroundColor = 'rgb(252, 252, 119)';
  }
}
const turnEnd = (target, damage) =>{
  let remainingHp = target.remainingHp - damage;
  if(target === enemy){
    enemyAttackBtn.disabled = true;
    playerAttackBtn.disabled = false;
  } else if(target === player) {
    enemyAttackBtn.disabled = false;
    playerAttackBtn.disabled = true;
  }
  // HpElements.update(target,remainingHp);
  if (remainingHp <= 0) {
    // targetHpHtmlElement.textContent = 0 + '/' + target.hp;
    setTimeout(() => {
      if(target === enemy){
        alert('You are winner!')
      }else{
        alert('you are lose...')
      }
      return init();
    }, 2000);
  }
}

///////////////////////////////////////////////////////
init();

new HpElements();
console.log(HpElements.update)

/*=====================class===================================================================================================================

//player turn



============================================================================================================================================*/


//Player Turn
enemyAttackBtn.addEventListener('click', (e) => {
  HpElements(enemy, enemyHpHtmlElement);
  calculateDamage();
  updateHp(enemy,enemyHpHtmlElement,damage);
  updateHpGauge(enemy,enemyGauge,damage);
  turnEnd(enemy,damage);
});

//Enemy Turn
playerAttackBtn.addEventListener('click', (e) => {
  HpElements(player, playerHpHtmlElement);
  calculateDamage();
  updateHp(player,playerHpHtmlElement,damage);
  updateHpGauge(player,playerGauge,damage);
  turnEnd(player,damage);
  });


}