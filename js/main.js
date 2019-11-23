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
//character
const enemy = {name:'ギャラドス', hp:120, lv:80};
const player = {name:'ピカチュウ', hp:100, lv:70};

//damege
//level差でダメージ幅変えたい
const minDamege = 5;
const maxDamege = 20;
const damege = minDamege + Math.floor(Math.random() * (maxDamege + 1 -minDamege));


const enemyGauge = document.getElementById('enemyGauge');
const enemyHp = document.getElementById('enemyHp');
const enemyAttackBtn = document.getElementById('enemyAttackBtn');
const playerGauge = document.getElementById('playerGauge');
const playerHp = document.getElementById('playerHp');
const playerAttackBtn = document.getElementById('playerAttackBtn');

//startStatus
  //Enemy
  // let leftEnemyHp = enemy.hp
  enemyHp.textContent = enemy.hp + '/'+ enemy.hp
  //Enemy Hp Gauge
  enemyGauge.classList.add('enemy-hp-gauge');
  //Player
  let leftPlayerHp = player.hp
  playerHp.textContent = leftPlayerHp + '/'+ player.hp


//function
const attackDamege = () => {
  leftEnemyHp = enemy.hp - damege;
  //  leftEnemyHp = enemy.hp -= damege;
  //  にすると、最大Hpの表示がleftEnemyHpになる。なんで？

}
const hpGaugeReduce = () =>{
  enemyHp.textContent = leftEnemyHp + '/'+ enemy.hp
  enemyGauge.classList.add('enemy-hp-gauge')
  //enemyGaugeのwidth調整
  enemyGauge.style.width =  leftEnemyHp / enemy.hp * 100;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Atack
playerAttackBtn.addEventListener('click', (e) => {
  //attack Damege
  attackDamege();
  //attack Damege Motion
  hpGaugeReduce();
  //HP ReduceMotion

  //HP Gauge Motion
  //turn Switch
});




//Recive Damege

//Recive Damege Motion

//HP Gauge Motion


//Turn Switch

