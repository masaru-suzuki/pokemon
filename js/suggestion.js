const updateEnemyHp = () => {
  // 雑だけどsetIntervalでいける
  // JSに慣れてきたらpromiseとrecursionで書きたい
  let remainingDamage = damage;
  let interval;

  interval = setInterval(() => {
    console.log({ remainingDamage, remainingHp: enemy.remainingHp });
    if (remainingDamage <= 0) return clearInterval(interval);

    enemy.remainingHp--;
    enemyHp.textContent = enemy.remainingHp + "/" + enemy.hp;
    remainingDamage--;
  }, 20);
};

const updatePlayerHp = () => {
  player.remainingHp -= damage;
};

// Functionを使って、繰り返しを避ける
enemyAttackBtn.addEventListener("click", e => {
  calculateDamage(); // 同じ
  updateEnemyHp(); // playerかenemyか以外の処理は同じ
  updateEnemyHpGauge(); // playerかenemyか以外の処理は同じ
  if (enemy.remainingHp <= 0) return processKillEnemy();
  playerTurnEnd(); // playerかenemyか以外の処理は同じ
});
playerAttackBtn.addEventListener("click", e => {
  calculateDamage();
  updatePlayerHp();
  updatePlayerHpGauge();
  if (player.remainingHp <= 0) return processKilledPlayer();
  enemyTurnEnd();
});

// 例えばupdateEnemyHpは
const updateHp = (target, targetElement, damage) => {
  let remainingDamage = damage;
  let interval;

  interval = setInterval(() => {
    console.log({ remainingDamage, remainingHp: target.remainingHp });
    if (remainingDamage <= 0) return clearInterval(interval);

    target.remainingHp--;
    targetElement.textContent = target.remainingHp + "/" + target.hp;
    remainingDamage--;
  }, 20);
};

// のようにして、

const enemyHpHtmlElement = document.getElementById("enemyHp"); //enemyHpだとHTMLなのかJSのVariableなのか分かりづらい
calculateDamage();
updateHp(enemy, enemyHpHtmlElement, damage);
//...
calculateDamage();
updateHp(player, playerHpHtmlElement, damage);

// のように再利用するといいね
