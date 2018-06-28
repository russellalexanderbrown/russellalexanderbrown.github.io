var level01 = function (window) {

    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400,y:groundY-110},
                {type: 'sawblade',x:600,y:groundY},
                {type: 'sawblade',x:800,y:groundY-30},
                {type: 'sawblade',x:1200,y:groundY},
                {type: 'sawblade',x:1700,y:groundY-110},
                {type: 'exDeath',x:2000,y:groundY-10},
                {type: 'enemy',x:1000,y:groundY-50},
                {type: 'enemy',x:1500,y:groundY-40},
                {type: 'ring',x:2300,y:groundY-30},
                {type: 'ring',x:2330,y:groundY-30},
                {type: 'ring',x:2360,y:groundY-30}
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitboxes
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
        
        
        function createSawBlade(x,y){
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.rotationalVelocity = 30
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            myObstacle.addChild(obstacleImage);
            obstacleImage.scaleX = 1;
            obstacleImage.scaleY = 1;
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
        
        function createExDeath(x,y){
            var hitZoneSize = 20;
            var damageFromObstacle = 9999;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/exDeath.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.scaleX = .05;
            obstacleImage.scaleY = .05;
            obstacleImage.x = -20;
            obstacleImage.y = -30;
        }
        
        function createEnemy(x,y) {
            var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.x = x;
            enemy. y = y;
            enemy.addChild(redSquare);
            game.addGameItem(enemy);
            enemy.velocityX = -3;
            enemy.rotationalVelocity = 15;
            enemy.onPlayerCollision = function(){
                game.changeIntegrity(-20);
                enemy.fadeOut();
            };
                enemy.onProjectileCollision = function(){
                    game.increaseScore(100);
                    enemy.fadeOut();
            };
        }
        
        function createRing(x,y) {
            var ring = game.createGameItem('ring',25);
            var ringImage = draw.bitmap('img/ring.png');
            ring.x = x;
            ring.y = y;
            game.addGameItem(ring);
            ring.addChild(ringImage);
            ring.scaleX=.5;
            ring.scaleY=.5;
            ringImage.x = -17
            ringImage.y = -18;
            ring.velocityX = -1
            ring.onPlayerCollision = function(){
            game.increaseScore(10);
            ring.fadeOut();
            };
        }
                            
        for (var i=0;i<levelData.gameItems.length;i++) {
            if(levelData.gameItems[i].type === 'sawblade'){
                createSawBlade(levelData.gameItems[i].x,levelData.gameItems[i].y);
            }else if(levelData.gameItems[i].type === 'exDeath') {
            createExDeath(levelData.gameItems[i].x,levelData.gameItems[i].y);
            }else if(levelData.gameItems[i].type === 'enemy') {
                createEnemy(levelData.gameItems[i].x,levelData.gameItems[i].y)
            }else if(levelData.gameItems[i].type === 'ring') {
                createRing(levelData.gameItems[i].x,levelData.gameItems[i].y);
            }
        }
        
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}