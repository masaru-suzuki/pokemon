// 課題
// ・targetHpHtmlElementがマイナスになったとき、０に戻るようにしたが、時差がある
// promiseので非同期処理をしているので、ここからの修正は難しい。

'use strict'
{
  const enemyGauge = document.getElementById('enemyGauge')
  const enemyHpHtmlElement = document.getElementById('enemyHp')
  const enemyAttackBtn = document.getElementById('enemyAttackBtn')
  const playerGauge = document.getElementById('playerGauge')
  const playerHpHtmlElement = document.getElementById('playerHp')
  const playerAttackBtn = document.getElementById('playerAttackBtn')
  const resetDamage = target => (target.remainingHp = target.hp)
  const resetGaugeStyle = element => (element.style.width = 100 + '%')
  const resetBGC = element => (element.style.backgroundColor = 'green')
  const resetHpElement = (element, target) =>
    (element.textContent = target.remainingHp + '/' + target.hp)
  const disableButton = element => (element.disabled = true)
  const enableButton = element => (element.disabled = false)
  //enemy
  const enemy = {
    name: 'ギャラドス',
    hp: 40,
    lv: 80,
    remainingHp: 40,
    btn: enemyAttackBtn,
    HpHtmlElement: enemyHpHtmlElement,
    gauge: enemyGauge
  }
  enemyGauge.classList.add('enemy-gauge')
  //player
  const player = {
    name: 'ピカチュウ',
    hp: 40,
    lv: 70,
    remainingHp: 40,
    btn: playerAttackBtn,
    HpHtmlElement: playerHpHtmlElement,
    gauge: playerGauge
  }
  playerGauge.classList.add('player-gauge')

  class Character {
    constructor(target) {
      this.target = target
      this.damage
      this.remainingHp = this.target.remainingHp
      this.remainingHpPercentage

      this.init()

      this.target.btn.addEventListener('click', () => {
        this.calculateDamage()
        this.updateHp().then(this.updateHpGauge)
        this.turnEnd()
      })
    }

    init() {
      this.remainingHp = this.target.hp
      resetDamage(enemy)
      resetDamage(player)
      enemy.remainingHp = enemy.hp
      player.remainingHp = player.hp
      resetGaugeStyle(enemyGauge)
      resetGaugeStyle(playerGauge)
      resetBGC(enemyGauge)
      resetBGC(playerGauge)
      resetHpElement(enemyHpHtmlElement, enemy)
      resetHpElement(playerHpHtmlElement, player)
      disableButton(playerAttackBtn)
      enableButton(enemyAttackBtn)
      console.log(this.remainingHp)
    }
    calculateDamage() {
      const minDamage = 10
      const maxDamage = 30
      this.damage =
        minDamage + Math.floor(Math.random() * (maxDamage + 1 - minDamage))
      console.log(this.damage + '===this.damage---@calculateDamage()')
      console.log(this.remainingHp + '===this.remainingHp---@calculateDamage()')
    }

    updateHp = () => {
      let interval
      let remainingDamage = this.damage
      console.log(
        this.target.remainingHp + '===this.target.remainingHp---@updateHp()'
      )
      console.log(this.remainingHp + 'this.remainingHp---@updateHp()')
      const promise = new Promise(resolve => {
        interval = setInterval(() => {
          if (remainingDamage <= 1) {
            clearInterval(interval)
            resolve()
          }
          remainingDamage--
          this.remainingHp--
          this.target.HpHtmlElement.textContent =
            this.remainingHp + '/' + this.target.hp
          console.log(
            this.remainingHp + 'remainingHp---setInterval---@updateHp()'
          )
          if (this.remainingHp <= 0) {
            clearInterval(interval)
            this.playAgain()
          }
        }, 60)
      })
      return promise
    }
    updateHpGauge = () => {
      enemyGauge.classList.add('enemy-gauge')
      playerGauge.classList.add('player-gauge')
      this.remainingHpPercentage = (this.remainingHp / this.target.hp) * 100
      this.target.gauge.style.width = this.remainingHpPercentage + '%'

      console.log(this.remainingHp + 'this.remainingHp---@updateHpGauge')
      console.log(
        this.remainingHpPercentage +
          '%===remainingHpPercentage-----remainingHp / this.target.hp * 100;---@updateHpGauge()'
      )

      if (this.remainingHpPercentage <= 0) {
        this.target.gauge.style.width = 0 + '%'
      } else if (this.remainingHpPercentage < 20) {
        this.target.gauge.style.backgroundColor = 'rgb(247, 79, 79)'
      } else if (this.remainingHpPercentage < 50) {
        this.target.gauge.style.backgroundColor = 'rgb(252, 252, 119)'
      }
    }

    turnEnd = () => {
      if (this.target === enemy) {
        enemyAttackBtn.disabled = true
        playerAttackBtn.disabled = false
      } else if (this.target === player) {
        enemyAttackBtn.disabled = false
        playerAttackBtn.disabled = true
      }
    }

    playAgain = () => {
      this.target.HpHtmlElement.textContent = 0 + '/' + this.target.hp
      this.target.gauge.style.width = 0 + '%'
      setTimeout(() => {
        if (this.target === enemy) {
          alert('You are winner!')
        } else {
          alert('you are lose...')
        }
        return this.init()
      }, 1000)
    }
  }

  new Character(enemy)
  new Character(player)
}
