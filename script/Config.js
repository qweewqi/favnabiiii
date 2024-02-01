var Config = {};
Config.debug = false;
Config.framerate = 60;
Config.backgroundColor = '#000';
Config.originalSize = [1000, 800];
Config.scaleByRatio = [.5, 1.5, 1, 1, 2, 1];
Config.xByRatio = [.8, -73, 1, 0, 2, 0];
Config.yByRatio = [.5, 100, 1, 0, 2, 0];
Config.delayDingdong = 300;
Config.dxPerFrame = 10;
Config.maxStepSize = 25;
Config.friction = .95;
Config.damping = .7;
Config.stopDraggingOnEnd = false;
Config.volMin = .4;
Config.maxVolAtForce = 70;
Config.soundPanFactor = 1;
Config.sounds = {
    dingdong: ["sounds/doorbell"],
    open: ["sounds/open"],
    close: ["sounds/close01", "sounds/close02"],
    hit: ["sounds/hit01", "sounds/hit02", "sounds/hit03"]
}