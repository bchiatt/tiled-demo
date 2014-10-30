var game = new Phaser.Game(300, 320, Phaser.CANVAS, 'tiled', {preload:preload, create:create, update:update});

function preload(){
  game.load.tilemap('map', '/assets/tiled.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('desert', '/assets/tmw_desert_spacing.png');
  game.load.spritesheet('dude', '/assets/dude.png', 32, 48);
  game.load.spritesheet('coin', '/assets/coin.png', 32, 32);
  game.load.spritesheet('balls', '/assets/balls.png', 17, 17);
}

var map, background, plants, ground, dude, cursors;

function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);

  map = game.add.tilemap('map');
  map.addTilesetImage('Desert', 'desert');

  background = map.createLayer('Background');
  plants = map.createLayer('Plants');
  ground = map.createLayer('Ground');
  plants.resizeWorld();

  map.setCollision(26, true, 'Ground');

  money = game.add.group();
  money.physicsBodyType = Phaser.Physics.ARCADE;
  money.enableBody = true;
  map.createFromObjects('Money', 49, 'coin', 0, true, false, money);
  money.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
  money.callAll('animations.play', 'animations', 'spin');

  dude = game.add.sprite(30, 30, 'dude');
  dude.animations.add('left', [0, 1, 2, 3], 10, true);
  dude.animations.add('right', [5, 6, 7, 8], 10, true);
  game.physics.arcade.enable(dude);
  dude.body.gravity.y = 500;
  dude.body.bounce.y = 0.3;
  dude.body.collideWorldBounds = true;
  game.camera.follow(dude);

  cursors = game.input.keyboard.createCursorKeys();
}

function update(){
  game.physics.arcade.collide(dude, ground);
  game.physics.arcade.collide(money, ground);

  if(cursors.left.isDown){
    dude.body.velocity.x = -150;
    dude.animations.play('left');
  }else if(cursors.right.isDown){
    dude.body.velocity.x = 150;
    dude.animations.play('right');
  }else{
    dude.body.velocity.x = 0;
    dude.animations.stop();
    dude.frame = 4;
  }

  if(cursors.up.isDown){
    dude.body.velocity.y = -301;
  }
}
