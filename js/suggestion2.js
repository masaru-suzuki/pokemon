"use strict";
{
  const enemyGauge = document.getElementById("enemyGauge");
  const enemyHpHtmlElement = document.getElementById("enemyHp");
  const enemyAttackBtn = document.getElementById("enemyAttackBtn");
  const playerGauge = document.getElementById("playerGauge");
  const playerHpHtmlElement = document.getElementById("playerHp");
  const playerAttackBtn = document.getElementById("playerAttackBtn");
  const enemyGaugeMotion = document.querySelector(".enemy-gauge");
  const playerGaugeMotion = document.querySelector(".player-gauge");

  //enemy
  const enemy = { name: "ギャラドス", hp: 120, lv: 80, remainingHp: 120 };
  enemyGauge.classList.add("enemy-gauge");
  //player
  const player = { name: "ピカチュウ", hp: 100, lv: 70, remainingHp: 100 };
  playerGauge.classList.add("player-gauge");

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

  const calculateDamage = () => {
    const minDamage = 50;
    const maxDamage = 100;
    return minDamage + Math.floor(Math.random() * (maxDamage - minDamage + 1));
  };

  const updateHp = (target, targetHpHtmlElement, damage) => {
    let interval;
    let remainingDamage = damage;

    return new Promise(resolve => {
      interval = setInterval(() => {
        target.remainingHp--;

        if (target.remainingHp <= 0) {
          targetHpHtmlElement.textContent = 0 + "/" + target.hp;
          console.log(target.remainingHp, remainingDamage);
          clearInterval(interval);
          resolve();
        }

        targetHpHtmlElement.textContent = target.remainingHp + "/" + target.hp;
        remainingDamage--;
        if (remainingDamage <= 0) {
          console.log("=====", target.remainingHp, remainingDamage);
          clearInterval(interval);
          resolve();
        }
      }, 10);
    });
  };

  const updateHpGauge = (target, targetHpGauge, damage) => {
    let remainingHp = target.remainingHp - damage;
    let remainingHpPercentage = (remainingHp / target.hp) * 100;
    targetHpGauge.style.width = remainingHpPercentage + "%";

    if (remainingHpPercentage < 20) {
      targetHpGauge.style.backgroundColor = "rgb(247, 79, 79)";
    } else if (remainingHpPercentage < 50) {
      targetHpGauge.style.backgroundColor = "rgb(252, 252, 119)";
    }
  };

  const checkWinner = () => {
    if (enemy.remainingHp > 0 && player.remainingHp > 0) return;
    if (enemy.remainingHp <= 0) alert("You are winner!");
    if (player.remainingHp <= 0) alert("you are loser...");
    init();
  };

  ///////////////////////////////////////////////////////
  init();
  //Player Turn
  enemyAttackBtn.addEventListener("click", e => {
    const damage = calculateDamage();
    updateHp(enemy, enemyHpHtmlElement, damage).then(() => {
      updateHpGauge(enemy, enemyGauge, damage);
      enableButton(playerAttackBtn);
      disableButton(enemyAttackBtn);
      checkWinner(enemy, enemyGauge, enemyHpHtmlElement, damage);
    });
  });

  //Enemy Turn
  playerAttackBtn.addEventListener("click", e => {
    const damage = calculateDamage();

    updateHp(player, playerHpHtmlElement, damage);
    updateHpGauge(player, playerGauge, damage);
    enableButton(enemyAttackBtn);
    disableButton(playerAttackBtn);
    checkWinner(player, playerGauge, playerHpHtmlElement, damage);
  });
}
