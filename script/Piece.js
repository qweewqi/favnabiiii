(function (window) {
    var Piece = function (canvas, config) {
        this.initialize(canvas, config);
    }
    var p = Piece.prototype = new BasePiece();
    p.initialize = function (canvas, config) {
        BasePiece.prototype.initialize.call(this, canvas, config);
    }
    p.onKeyUp = function (e) {
        BasePiece.prototype.onKeyUp.call(this, e);
        if (!this.config.debug) return;
        var c = String.fromCharCode(e.which);
        if (c == "R") this.reset();
        if (c == "L") this.logging = !this.logging;
    }
    p.setSize = function (w, h, dpr) {
        this.dpr = dpr;
        w = this.width = Math.floor(w * dpr);
        h = this.height = Math.floor(h * dpr);
        var cfg = this.config,
            w2 = w / 2,
            h2 = h / 2,
            ratio = w / h;
        const os = cfg.originalSize,
            ow = os[0],
            oh = os[1];
        const scale = ratio > ow / oh ? h / oh : w / ow;
        this.stage.scaleX = this.stage.scaleY = scale * ArrayUtil.lookup(cfg.scaleByRatio, ratio, true);
        this.stage.x = w2 + ArrayUtil.lookup(cfg.xByRatio, ratio, true) * scale;
        this.stage.y = h2 + ArrayUtil.lookup(cfg.yByRatio, ratio, true) * scale;
        log("setSize", this.width, this.height, this.dpr);
    }
    p.start = function () {
        BasePiece.prototype.start.apply(this);
        this.onCollision = this.onCollision.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.onClosed = this.onClosed.bind(this);
        this.onCenter = this.onCenter.bind(this);
        this.onOpening = this.onOpening.bind(this);
        this.doors = [];
        this.counter = 0;
        this.doorInCenter = null;
        this.toRemove = [];
        this.initSound();
        this.initializeAssets();
        this.addDoor(true);
        this.updatePlinth(0);
        this.done = false;
        createjs.Touch.enable(this.stage);

    }
    p.update = function () {
        //if (this.done) return;
        let maxFrame = 0,
            minFrame = this.totalFrames;
        const drs = this.doors,
            n = drs.length;
        for (var i = 0; i < n; i++) {
            var d = drs[i];
            d.step();
            const f = d.frame;
            maxFrame = Math.max(maxFrame, f);
            minFrame = Math.min(minFrame, f);
        }
        if (minFrame > 0) {
            if (this.counter > 25){
            //if (this.counter > 9){
                if (!this.done){
                    //console.log("STOP!!!!");
                    //add
                    this.bbM(true);

                }
                this.done = true;
            }
            else {
                this.addDoor(true);
            }
        }

        if (maxFrame < this.totalFrames - 1 && this.counter > this.doors.length){
            this.addDoor(false);
        }
        this.updatePlinth(maxFrame);
        this.knob.visible = false;
        if (this.doorInCenter != null && Door.CENTER_FRAMES.indexOf(this.doorInCenter.frame) > -1) {
            this.knob.gotoAndStop(this.doorInCenter.frame - Door.CENTER_FRAMES[0]);
            this.knob.visible = true;
        }
        this.toRemove.forEach(idx => {
            drs[idx].destroy();
            drs.splice(idx, 1);
            if (idx == n - 1) {
                this.counter--;
                console.log(this.counter);
                document.title = `YES hAhA d0 iT! ${this.counter}`;
                if (this.counter < 10 && this.done){
                    //console.log("STOPDELL!!!!");
                    this.done = false;
                    //del
                    this.bbM(false);
                }
            }
        });
        this.toRemove.length = 0;
        this.orderDoors();
        return true;
    }
    p.orderDoors = function () {
        const drs = this.doors,
            n = drs.length,
            cf = Door.CENTER_FRAMES[0];
        for (let i = n - 1; i >= 0; i--) {
            const d = drs[i];
            if (d.frame > cf) break;
            d.setDepth(n - 1);
        }
        for (let i = 0; i < n; i++) {
            const d = drs[i];
            if (d.frame <= cf) break;
            d.setDepth(n - 1);
        }
    }
    p.onCollision = function (e) {
        const force = e.data.force,
            frame = e.data.frame;
        const vol = this.getVolumeForSpeed(force);
        const refPos = this.refPos,
            n = refPos.length;
        const pan = -1 + 2 * (refPos[frame] - refPos[n - 1]) / (refPos[0] - refPos[n - 1]);
        this.playSound(this.config.sounds.hit, vol, pan);
    }
    p.onComplete = function (e) {
        const door = e.data;
        if (door != this.doors[0]) {
            this.toRemove.push(0);
        }
        this.playSound(this.config.sounds.close, this.getVolumeForSpeed(door.speed), -1);
    }
    p.onClosed = function (e) {
        const door = e.data,
            n = this.doors.length;
        if (door != this.doors[n - 1]) {
            this.toRemove.push(n - 1);
        }
        this.playSound(this.config.sounds.close, this.getVolumeForSpeed(door.speed), 1);
    }
    p.onCenter = function (e) {
        this.doorInCenter = e.data;
    }
    p.onOpening = function (e) {
        const door = e.data;
        const pan = (door.frame < this.totalFrames / 2) ? 1 : -1;
        this.playSound(this.config.sounds.open, 1, pan);
    }
    p.updatePlinth = function (maxFrame) {
        this.plinth.gotoAndStop(maxFrame);
    }
    p.addDoor = function (append) {
        const dr = this.createDoor(this.counter);
        if (append) {
            this.counter++;
            console.log(this.counter);
            document.title = `U cAN't d0 iT! ${this.counter}`;
            this.doors.push(dr);
            dr.gotoFrame(0, true);
            var len = this.doors.length;
            if (len > 1) {
                this.doors[len - 1].doorPrev = this.doors[len - 2];
                this.doors[len - 2].doorNext = this.doors[len - 1];
            }
        } else {
            this.doors.unshift(dr);
            dr.gotoFrame(this.totalFrames - 1, true);
            var len = this.doors.length;
            if (len > 1) {
                this.doors[1].doorPrev = dr;
                dr.doorNext = this.doors[1];
            }
        }
    }
    p.createDoor = function (n) {
        const door = this.doorsContainer.addChild(new Assets.door());
        this.doorsContainer.gotoAndStop(0);
        var shadow = this.shadowsContainer.addChild(new Assets.shadow());
        var dr = new Door(door, shadow, this.refPos, this.config);
        dr.addEventListener(Door.COLLISION, this.onCollision);
        dr.addEventListener(Door.COMPLETE, this.onComplete);
        dr.addEventListener(Door.CLOSED, this.onClosed);
        dr.addEventListener(Door.CENTER, this.onCenter);
        dr.addEventListener(Door.OPENING, this.onOpening);
        return dr;
    }
    p.initializeAssets = function () {
        this.movie = this.stage.addChild(new Assets.door_HTML5Canvas());
        this.movie.x = -.5 * this.config.originalSize[0];
        this.movie.y = -.5 * this.config.originalSize[1];
        this.total = this.movie.total;
        this.knob = this.total.knob;
        this.knob.stop();
        this.knob.visible = false;
        this.plinth = this.total.plinth;
        this.plinth.stop();
        this.doorsContainer = this.total.doorsContainer;
        this.shadowsContainer = this.total.shadowsContainer;
        const reference = this.total.reference,
            n = reference.totalFrames;
        this.refPos = [];
        for (var i = 0; i <= n; i++) {
            reference.gotoAndStop(i);
            this.refPos[i] = reference.mc_circle.x;
        }
        this.total.removeChild(reference);
        this.totalFrames = n;
    }
    p.initSound = function () {
        const sounds = Object.values(this.config.sounds).flat();
        SoundManager.init(sounds, this.onSoundsLoaded.bind(this));
        this.soundStarted = false;
        this.handleClickToInitiateSound = this.handleClickToInitiateSound.bind(this);
        this.stage.addEventListener("stagemousedown", this.handleClickToInitiateSound);
    }
    p.onSoundsLoaded = function () {
        log("onSoundsLoaded");
    }
    p.bbM = function (need) {
        log("need bbM??");
        if (!need){
            //console.log("deellllll")
            console.log(this.stage.removeChild(this.cont));
            return
        }
        this.cont = new createjs.Container();
        this.bb = new createjs.Shape();
        this.bb.graphics.beginFill('#e50000').setStrokeStyle(4).beginStroke('#ff0154').drawRect(0, 0, 170, 80); // Customize the button appearance
        this.bb.y = -150;
        this.bb.alpha = 1;

        this.label = new createjs.Text('DON\'T\n CLICK ME', '35px Barkentina', '#ffeb00'); // Set the button's label text, font, and color
        this.label.textAlign = 'center';
        this.label.textBaseline = 'middle';
        this.label.x = 77; // Set the label's position relative to the button's dimensions
        this.label.y = -125;
        //this.bb.addChild(this.label);

        //this.bb.y = 50;
        this.stage.enableMouseOver(10);
        this.cont.cursor = 'pointer'; // Enable cursor interaction
        this.cont.addEventListener("mouseover", function(event) {event.target.parent.getChildAt(0).graphics.clear().beginFill('#466baf').setStrokeStyle(4).beginStroke('#fff').drawRect(0, 0, 130, 60); event.target.parent.getChildAt(1).color = '#fff';});
        this.cont.addEventListener("mouseout", function(event) {event.target.parent.getChildAt(0).graphics.clear().beginFill('#33aebb').setStrokeStyle(4).beginStroke('#ff0154').drawRect(0, 0, 130, 60); event.target.parent.getChildAt(1).color = '#ffeb00';});
        this.cont.addEventListener("click", function(event) {console.log("DO SOMETHING!!!"); sss();});
        this.cont.addChild(this.bb);
        this.cont.addChild(this.label);
        this.stage.addChild(this.cont);


    }
    p.playSound = function (pool, volume = 1, pan = 0) {
        const snd = RandomUtil.pick(pool);
        return SoundManager.play(snd, {
            volume: volume,
            pan: pan
        });
    }
    p.handleClickToInitiateSound = function () {
        document.getElementsByClassName("song")[0].play();
        if (!this.soundStarted) {
            this.playSound(this.config.sounds.dingdong);
            this.soundStarted = true;
        }
        this.stage.removeEventListener("stagemousedown", this.handleClickToInitiateSound);
    }
    p.getVolumeForSpeed = function (speed) {
        const cfg = this.config;
        return cfg.volMin + (1 - cfg.volMin) * Math.abs(speed) / cfg.maxVolAtForce;
    }
    window.Piece = Piece;
}(window));
