var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    var tree;
    var buildings =[];
    var buildingsBackground =[];
    var buildingHeight = 300;
    var buildingBackgroundHeight = 267;
    var building;
    var buildingBackground;
            
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        
        // Add any variables that will be used by render AND update here:
        
        // add objects for display inb ackground
        // called at the start of game and whenever the page is resized
        function render() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            background.removeAllChildren();

            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,canvasHeight/2,'#314668');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            
            var circle;
            for(var i=0;i<100;i++) {
                circle = draw.circle(2,'white','LightGray',.5);
                circle.x = canvasWidth*Math.random();
                circle.y = groundY*Math.random();
                background.addChild(circle);
                                    }
            var moon = draw.bitmap('img/moon.png');
            moon.x = canvasWidth/1.5;
            moon.y = canvasHeight/10;
            moon.scaleX = .5;
            moon.scaleY = .5;
            background.addChild(moon);
            
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
    for(i=0;i<12;i++) {
    buildingBackground = draw.bitmap('img/buildingBackground.jpg');
    buildingBackground.x = 150*i;
    buildingBackground.y = groundY-buildingBackgroundHeight;
    background.addChild(buildingBackground);
    buildingsBackground.push(buildingBackground)
    buildingBackground.scaleX = .5
    buildingBackground.scaleY = .5
}
 
    for(var i=0;i<9;++i) {
    building = draw.bitmap('img/building.jpg');
    building.x = 200*i;
    building.y = groundY-buildingHeight;
    background.addChild(building);
    buildings.push(building);
    building.scaleX = .5;
    building.scaleY = .56;
}


            
            // TODO 4: Part 1 - Add a tree
            
        tree = draw.bitmap('img/tree.png');
        tree.x = canvasWidth/2.5;
        tree.y = groundY-200;
        tree.scaleX = .25
        tree.scaleY = .25
        background.addChild(tree);    
            
        }
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            
            tree.x = tree.x-1;
            if(tree.x < -500) {
            tree.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax
            
            for (var i = 0; i < buildings.length-1; i++ ) {
                if(i > 0) {buildings[i].x = buildings[i].x - 1.5;
                } else {buildings[i].x = buildings[i].x - 1.5;}
            }
            for (var i = 0; i < buildings.length-1; i++ ) {
                if(buildings[i].x <-210){
                    buildings[i].x = canvasWidth;
            }
            }
            for (var i = 0; i < buildingsBackground.length; i++ ) {
                if(i > 0) {buildingsBackground[i].x = buildingsBackground[i].x - 1;
                } else {buildingsBackground[i].x = buildingsBackground[i].x - 1;}
            }
            for (var i = 0; i < buildingsBackground.length-1; i++ ) {
                if(buildingsBackground[i].x <-210){
                    buildingsBackground[i].x = canvasWidth;
            }
            }
        }

        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
