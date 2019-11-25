/*---------------課題 ----------------------
ポケモンみたいにキャラクターを2体配置する
そしてキャラクターの下にHPのバーを表示する (現在のHP/最大HPも横に表示)
キャラの下に攻撃ボタンアイコンを表示する
ボタンを押すと、ランダムにダメージが相手に入る
ダメージが入るともちろんバーが減る(アニメーションが入れられるとなおよし)
ダメージ量が最大の50%をきるとバーが黄色、20%をきると赤になる
先にHPが無くなったほうが負け
注意点:ターン制にするので、そのキャラのターンでないと攻撃ボタンを押せない
-------------------------------------------*/
const enemyGauge = document.getElementById("enemyGauge");
const enemyHp = document.getElementById("enemyHp");
const enemyAttackBtn = document.getElementById("enemyAttackBtn");
const playerGauge = document.getElementById("playerGauge");
const playerHp = document.getElementById("playerHp");
const playerAttackBtn = document.getElementById("playerAttackBtn");
const enemyGaugeMotion = document.querySelector(".enemy-gauge");
const playerGaugeMotion = document.querySelector(".player-gauge");

//enemy
const enemy = { name: "ギャラドス", hp: 120, lv: 80, remainingHp: 120 };
let remainEnemyHpPercentage;
enemyHp.textContent = enemy.hp + "/" + enemy.hp;
enemyGauge.classList.add("enemy-gauge");
//player
const player = { name: "ピカチュウ", hp: 100, lv: 70, remainingHp: 100 };
let remainPlayerHp = player.hp;
let remainPlayerHpPercentage;
playerHp.textContent = player.hp + "/" + player.hp;
playerGauge.classList.add("player-gauge");

//Initial
let damage;
playerAttackBtn.disabled = true;

//////////////////////////function/////////////////////////////
const start = () => {
  enemy.remainingHp = enemy.hp;
  player.remainingHp = player.hp;
  enemyGauge.style.width = 100 + "%";
  playerGauge.style.width = 100 + "%";
  // 最初からゲージが赤く表示される
  // enemyGauge.classList.add('enemy-gauge');
  // playerGauge.classList.add('player-gauge');
  enemyGauge.style.backgroundColor = "green";
  playerGauge.style.backgroundColor = "green";
  enemyHp.textContent = enemy.remainingHp + "/" + enemy.hp;
  playerHp.textContent = player.remainingHp + "/" + player.hp;
  playerAttackBtn.disabled = true;
  enemyAttackBtn.disabled = false;
};
const calculateDamage = () => {
  //level差でダメージ幅変えたい
  const minDamage = 50;
  const maxDamage = 100;
  damage = minDamage + Math.floor(Math.random() * (maxDamage + 1) - minDamage);
};

const updateEnemyHp = () => {
  let remainingDamage = damage;
  let interval;

  interval = setInterval(() => {
    console.log({ remainingDamage, remainingHp: enemy.remainingHp });
    if (remainingDamage <= 0) return clearInterval(interval);

    enemy.remainingHp--;
    enemyHp.textContent = enemy.remainingHp + "/" + enemy.hp;
    remainingDamage--;
  }, 20);

  //  remainEnemyHp = enemy.hp -= damage;  // #### 複数回の代入は避ける
  //  にすると、最大Hpの表示がremainEnemyHpになる。なんで？
  //  remainEnemyHp = enemy.hp であり、そこから-= damageを処理するから

  ///////////////不明点1////////////////////////////////////
  //  ダメージを徐々にカウントダウンして表示する方法は？
  //  damage/damageで1づつダメージをカウント

  //### ループだと一瞬で計算が終わるので、アニメーションさせることができない ###

  //  for文でダメージ分繰り返し処理
  // for ( let i = 0; i < damage; i++){
  //   enemy.remainingHp -= 1;
  //   enemyHp.textContent = enemy.remainingHp + '/'+ enemy.hp
  // }
};

const updatePlayerHp = () => {
  player.remainingHp -= damage;
};
const updateEnemyHpGauge = () => {
  //cssに動きをつけているのがわかったほうがいい
  //cssなのか数値を変更しているのか
  if (enemy.remainingHp <= 0) console.log("============= player 0");
  //HP Status Update
  enemyHp.textContent = enemy.remainingHp + "/" + enemy.hp;

  //enemyGaugeのwidth調整
  enemyGauge.classList.add("enemy-gauge");
  let remainEnemyHpPercentage = (enemy.remainingHp / enemy.hp) * 100;
  enemyGauge.style.width = remainEnemyHpPercentage + "%";
  if (remainEnemyHpPercentage < 0) {
    enemyGauge.style.width = 0;
  }
  // Change Color EnemyHpGauge
  if (remainEnemyHpPercentage < 20) {
    enemyGauge.style.backgroundColor = "red";
  } else if (remainEnemyHpPercentage < 50) {
    enemyGauge.style.backgroundColor = "yellow";
  }
};
const updatePlayerHpGauge = () => {
  //cssに動きをつけているのがわかったほうがいい
  //cssなのか数値を変更しているのか
  playerHp.textContent = player.remainingHp + "/" + player.hp;
  playerGauge.classList.add("player-gauge");
  //playerGaugeのwidth調整
  let remainPlayerHpPercentage = (player.remainingHp / player.hp) * 100;
  playerGauge.style.width = remainPlayerHpPercentage + "%";
  if (remainPlayerHpPercentage < 0) {
    playerGauge.style.width = 0;
  }
  // Change Color PlayerHpGauge
  if (remainPlayerHpPercentage < 20) {
    playerGauge.style.backgroundColor = "red";
  } else if (remainPlayerHpPercentage < 50) {
    playerGauge.style.backgroundColor = "yellow";
  }
};

const playerTurnEnd = () => {
  enemyAttackBtn.disabled = true;
  playerAttackBtn.disabled = false;
};
const enemyTurnEnd = () => {
  enemyAttackBtn.disabled = false;
  playerAttackBtn.disabled = true;
};
/////////////////不明点２///////////////////////////
// alertのタイミングをHPゲージが０になってからにしたい
const processKillEnemy = () => {
  enemyHp.textContent = 0 + "/" + enemy.hp;
  // trasitionendを使ってもうまく行かない・・・
  // enemyGaugeMotion.addEventListener('transitionend',(e) => {
  alert("You Win!");
  start();
  return;
  // });
};
const processKilledPlayer = () => {
  player.textContent = 0 + "/" + player.hp;
  // playerGaugeMotion.addEventListener('transitionend',(e) => {
  alert("You Lose!");
  start();
  return;
  // });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
start();

//Player Turn
enemyAttackBtn.addEventListener("click", e => {
  //attack enemy
  calculateDamage();
  //attack Damage Motion
  //ダメージを与えたのをimgに動きをつけることで表現したい
  //HP ReduceMotion
  //leftHpが減少していくのをleftHpに動きをつけることで表現したい
  updateEnemyHp();

  //HP Gauge Motion
  updateEnemyHpGauge();
  //HPが０になったときの処理
  if (enemy.remainingHp <= 0) {
    processKillEnemy();
    //turn Switch
  } else {
    playerTurnEnd();
  }
});

//Enemy Turn
playerAttackBtn.addEventListener("click", e => {
  //receive damage
  calculateDamage();
  //receive Damage Motion
  //ダメージを受けたのをimgに動きをつけることで表現したい
  //HP ReduceMotion
  //leftHpが減少していくのをleftHpに動きをつけることで表現したい
  updatePlayerHp();
  //HP Gauge Motion
  updatePlayerHpGauge();
  //HPが０になったときの処理
  if (player.remainingHp <= 0) {
    processKilledPlayer();
  } else {
    //turn Switch
    enemyTurnEnd();
  }
});

////////////コメント///////////////////////
// なんで動かないか自分で探す
// 検証機能でエラーチェック

// function 動詞＋名詞
// コードを読んだ時に文章のように理解できることが理想
