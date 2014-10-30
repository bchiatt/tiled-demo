var game = new Phaser.Game(300, 320, Phaser.CANVAS, 'tiled', {preload:preload, create:create, update:update});

function preload(){
  game.load.tilemap('map', '/assets/tiled.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('desert', '/assets/tmw_desert_spacing.png');
  game.load.spritesheet('dude', '/assets/dude.png', 32, 48);
  game.load.spritesheet('coin', '/assets/coin.png', 32, 32);
  game.load.spritesheet('balls', '/assets/balls.png', 17, 17);
}

function create(){
}

function update(){
}
