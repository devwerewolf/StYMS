class Battler {
  constructor({health, maxHealth, exp, atk, def, levels}) {
    this.health = health;
    this.maxHealth = maxHealth;
    this.exp = exp;
    this.atk = atk;
    this.def = def;
    this.levels = levels;
    
    this.levelIndex = 0;
  }
  
  attack(opponent) {
    opponent.battler.defend(this);
  }
  
  defend(opponentBattler) {
    let damage = opponentBattler.atk - this.def;
    
    if (damage > 0) {
      this.decreaseHealth(damage);
    }
  }
  
  decreaseHealth(amount) {
    this.health -= amount;
    
    if (this.health <= 0) {
      this.health = 0;
    }
  }
  
  increaseHealth(amount) {
    this.health += amount;
    
    if (this.health > this.maxHealth) {
      this.health = this.maxHealth;
    }
  }
  
  gainExperience(amount) {
    this.exp += amount;
    
    if (this.exp >= this.levels[this.levelIndex]) {
      this.levelIndex++;
    }
  }
  
  isDead() {
    return this.health == 0;
  }
  
  drawHealthBar(dx = 1, dy = 1) {
    // Variables
    let healthBarWidth = 10 * window.tilemap.tileWidth;
    let healthBarHeight = 2 * window.tilemap.tileHeight;
    let remainingHealthRatio = this.health / this.maxHealth;
    let x = dx * window.tilemap.tileWidth;
    let y = dy * window.tilemap.tileHeight;
    
    // Render (max health)
    fill('orange');
    rect(x, y, healthBarWidth, healthBarHeight);
    
    // Render (current health)
    fill('blue');
    rect(x, y, healthBarWidth * remainingHealthRatio, healthBarHeight);
  }
  
  drawExpBar(dx = 12, dy = 1) {
    // NOTE: Reverse of "drawHealthBar()"
    
    // Variables
    let expBarWidth = 10 * window.tilemap.tileWidth;
    let expBarHeight = 2 * window.tilemap.tileHeight;
    let remainingExpRatio = this.exp / this.levels[this.levelIndex];
    let x = dx * window.tilemap.tileWidth;
    let y = dy * window.tilemap.tileHeight;
    
    // Render (max)
    fill('orangered');
    rect(x, y, expBarWidth, expBarHeight);
    
    // Render (current)
    fill('cyan');
    rect(x, y, expBarWidth * remainingExpRatio, expBarHeight);
  }
}






