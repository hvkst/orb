let thingsArray = [
  new Obstacle(0, 200, width / 2 - 40, 20),
  new Obstacle(width - width / 2 + 40, 200, width / 2 - 40, 20),

  new Obstacle(0, 400, width / 2 - 52, 20),
  new Obstacle(width - width / 2 + 52, 400, width / 2 - 52, 20),
  // Maze Testing // x y w h
  new Obstacle(width / 2 - 100, 217, 20, 185),
  new Obstacle(width / 2 + 80, 17, 20, 185),
  new Obstacle(width - width / 2 + 40, 0, width / 2 - 40, 20),
  // LevelEnd
  new LevelFinish(-20, -100, width + 20, 20),

  new GrowParticle(width - 100, 100, 30, 20),
  new GrowParticle(0 + 100, 100, 30, 20),

  new ShrinkParticle(width - 100, 300, 20, 10),
  new ShrinkParticle(0 + 100, 300, 20, 10),

  new ShrinkParticle(width - 100, height - 410, 20, 10),
  new ShrinkParticle(0 + 100, height - 410, 20, 10),
];

player = new Player();
// finish = new Finish();
mid = width / 2; // need this to place obstacle on other side // x y w h
obstacle1 = new Obstacle(0, 200, mid - 40, 20);
obstacle2 = new Obstacle(width - mid + 40, 200, mid - 40, 20);

obstacle3 = new Obstacle(0, 400, mid - 52, 20);
obstacle4 = new Obstacle(width - mid + 52, 400, mid - 52, 20);
// Maze Testing // x y w h
obstacle5 = new Obstacle(mid - 100, 217, 20, 185);
obstacle6 = new Obstacle(mid + 80, 17, 20, 185);
obstacle7 = new Obstacle(width - mid + 40, 0, mid - 40, 20);
// LevelEnd
levelOneEnd = new LevelFinish(-20, -100, width + 20, 20);

growParticle1 = new GrowParticle(width - 100, 100, 30, 20);
growParticle2 = new GrowParticle(0 + 100, 100, 30, 20);

shrinkParticle1 = new ShrinkParticle(width - 100, 300, 20, 10);
shrinkParticle2 = new ShrinkParticle(0 + 100, 300, 20, 10);

shrinkParticle3 = new ShrinkParticle(width - 100, height - 410, 20, 10);
shrinkParticle4 = new ShrinkParticle(0 + 100, height - 410, 20, 10);
