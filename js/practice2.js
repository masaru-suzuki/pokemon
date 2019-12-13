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

const resetDamage = target => (target.remainingHp = target.hp);
const resetGaugeStyle = element => (element.style.width = 100 + '%');
const resetBGC = element => (element.style.backgroundColor = 'green');
const resetHpElement = (element, target) =>
  (element.textContent = target.remainingHp + '/' + target.hp);
const disableButton = element => (element.disabled = true);
const enableButton = element => (element.disabled = false);
//enemy
const enemy = {name:'ギャラドス', hp:40, lv:80, remainingHp: 40, btn: enemyAttackBtn, HpHtmlElement: enemyHpHtmlElement, gauge: enemyGauge};
enemyGauge.classList.add('enemy-gauge');
//player
const player = {name:'ピカチュウ', hp:40, lv:70, remainingHp: 40, btn: playerAttackBtn, HpHtmlElement: playerHpHtmlElement, gauge: playerGauge};
playerGauge.classList.add('player-gauge');


class character {
  constructor(target) {
    this.target = target;
    this.damage;
    this.remainingHp = this.target.remainingHp;
    this.remainingHpPercentage;

    this.init();

    this.target.btn.addEventListener('click', () => {
      // this.calculateDamage();
      // this.updateHp();
      // this.updateHpGauge();
      this.game();
    });
    }
    async game() {
      //ここにまとめようと思ったんだけど、error
    }
    init() {
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
    }
  calculateDamage() {
    const minDamage = 10;
    const maxDamage = 30;
    this.damage = minDamage + Math.floor(Math.random() * (maxDamage + 1 -minDamage));
    console.log(this.damage + '===this.damage---@calculateDamage()');
    console.log(this.remainingHp + '===this.remainingHp---@calculateDamage()');
  }
  updateHp() {
    let interval;
    let remainingDamage = this.damage;
    // this.remainingHp -= this.damage;←したのsetIntervalでもremainingHp--するから二重で引いてしまうことになる
    console.log(this.target.remainingHp + '===this.target.remainingHp---@updateHp()');
    console.log(this.remainingHp + 'this.remainingHp---@updateHp()');
    interval = setInterval(() => {
        if(remainingDamage === 0) return clearInterval(interval);
        this.remainingHp --;
        this.target.HpHtmlElement.textContent = this.remainingHp + '/' + this.target.hp;
        remainingDamage --;
        console.log(this.remainingHp + 'remainingHp---@updateHp()---setInterval');
      }, 60);
      console.log(this.remainingHp + 'remainingHp---@updateHp()');
    }
    updateHpGauge() {
      enemyGauge.classList.add('enemy-gauge');
      playerGauge.classList.add('player-gauge');
      console.log(this.remainingHp + 'this.remainingHp---@updateHpGauge');
      console.log(this.remainingHpPercentage + '%===remainingHpPercentage-----remainingHp / this.target.hp * 100;');
      this.remainingHpPercentage = this.remainingHp / this.target.hp * 100;
      this.target.gauge.style.width = this.remainingHpPercentage + '%';
      if (this.remainingHpPercentage <= 0) {
        this.target.gauge.style.width = 0 + '%';
      } else if (this.remainingHpPercentage < 20) {
        this.target.gauge.style.backgroundColor = 'rgb(247, 79, 79)';
      } else if (this.remainingHpPercentage < 50) {
        this.target.gauge.style.backgroundColor = 'rgb(252, 252, 119)';
      }
    }
  }
//Initial



/*
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
};
const updateHp = (target,HpHtmlElement,damage) => {
let interval;
let remainingDamage = damage;
interval = setInterval(() => {
    if(remainingDamage === 0) return clearInterval(interval);
    target.remainingHp --;
    HpHtmlElement.textContent = target.remainingHp + '/' + target.hp;
    remainingDamage --;
    HpElements.update(target);
  }, 60);
};

const updateHpGauge = (target,targetHpGauge,damage) => {
  enemyGauge.classList.add('enemy-gauge');
  playerGauge.classList.add('player-gauge');
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
};
const turnEnd = (target, damage) =>{
  let remainingHp = target.remainingHp - damage;
  if(target === enemy){
    enemyAttackBtn.disabled = true;
    playerAttackBtn.disabled = false;
  } else if(target === player) {
    enemyAttackBtn.disabled = false;
    playerAttackBtn.disabled = true;
  }
  if (remainingHp <= 0) {
    targetHpHtmlElement.textContent = 0 + '/' + target.hp;
    setTimeout(() => {
      if(target === enemy){
        alert('You are winner!');
      }else{
        alert('you are lose...');
      }
      return init();
    }, 2000);
  }
};
*/
new character(enemy);
new character(player);


///////////////////////////////////////////////////////
// init();
/*=====================class===================================================================================================================

//player turn



============================================================================================================================================*/


// //Player Turn
// enemyAttackBtn.addEventListener('click', (e) => {
//   calculateDamage();
//   updateHp(enemy,enemyHpHtmlElement,damage);
//   updateHpGauge(enemy,enemyGauge,damage);
//   turnEnd(enemy,damage);
// });

// //Enemy Turn
// playerAttackBtn.addEventListener('click', (e) => {
//   calculateDamage();
//   updateHp(player,playerHpHtmlElement,damage);
//   updateHpGauge(player,playerGauge,damage);
//   turnEnd(player,damage);
//   });


}