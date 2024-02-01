(function (window) {
    const Door = function (door, shadow, refXs, config) {
        this.door = door;
        door.mouseChildren = false;
        this.shadow = shadow;
        this.refPos = refXs;
        this.config = config;
        this.door.stop();
        this.shadow.stop();
        this.dragging = false;
        this.maxSpeed = config.maxStepSize * config.dxPerFrame;
        this.totalFrames = this.door.totalFrames;
        this.counter = 0;
        this.speed = 0;
        this.doorPrev = null;
        this.doorNext = null;
        this.initInteraction();
    }
    const p = Door.prototype;
    createjs.EventDispatcher.initialize(p);
    Door.CENTER_FRAMES = [48, 49];
    const COLLISION_TABLE = [
        [1, 0],
        [8, 2],
        [12, 3],
        [18, 4],
        [83, 3],
        [89, 2],
        [93, 1],
        [101, 0]
    ];
    Door.COLLISION = "Door.COLLISION";
    Door.COMPLETE = "Door.COMPLETE";
    Door.CLOSED = "Door.CLOSED";
    Door.CENTER = "Door.CENTER";
    Door.OPENING = "Door.OPENING";
    p.destroy = function () {
        this.removeAllEventListeners();
        this.door.parent.removeChild(this.door);
        this.shadow.parent.removeChild(this.shadow);
        if (this.doorPrev != null) {
            this.doorPrev.doorNext = this.doorNext;
        }
        if (this.doorNext != null) {
            this.doorNext.doorPrev = this.doorPrev;
        }
    }
    p.step = function () {
        const refPos = this.refPos,
            frame = this.frame,
            nf = this.totalFrames;
        let goalframe;
        if (this.dragging) {
            var refDx = this.curpos - this.origpos;
            if (frame < nf - 1 && refDx < refPos[frame + 1]) {
                var dir = 1;
                for (var i = frame + 1; i < nf; i++) {
                    if (refDx > refPos[i]) {
                        goalframe = frame + Math.ceil(((i - 1) - frame) / 2);
                        break;
                    }
                }
                if (goalframe == null) goalframe = frame + Math.ceil((nf - frame) / 2);
            } else if (frame > 0 && refDx > refPos[frame - 1]) {
                var dir = -1;
                for (var i = frame - 1; i >= 0; i--) {
                    if (refDx < refPos[i]) {
                        goalframe = frame + Math.floor(((i + 1) - frame) / 2);
                        break;
                    }
                }
                if (goalframe == null) goalframe = frame + Math.floor((1 - frame) / 2);
            }
            this.speed = goalframe == null ? 0 : Math.round(refPos[goalframe] - refPos[frame]);
        } else {
            const dx = this.config.dxPerFrame;
            this.counter += Math.abs(this.speed);
            if (this.counter / dx >= 1) {
                var stepsize = Math.floor(this.counter / dx);
                this.counter = this.counter % dx;
                var dir = -this.speed / Math.abs(this.speed);
                goalframe = Math.min(nf - 1, Math.max(0, frame + dir * stepsize));
            }
        }
        if (goalframe != null) {
            if (goalframe != nf - 1 && goalframe != 0) {
                if (dir == 1) {
                    if (this.doorPrev != null) {
                        const cf = this.getCollisionFrame(this.doorPrev.frame, dir);
                        if (cf < goalframe) {
                            this.onCollision(this.doorPrev, dir);
                            goalframe = cf;
                        }
                    }
                } else {
                    if (this.doorNext != null) {
                        const cf = this.getCollisionFrame(this.doorNext.frame, dir);
                        if (cf > goalframe) {
                            this.onCollision(this.doorNext, dir);
                            goalframe = cf;
                        }
                    }
                }
            }
            this.gotoFrame(goalframe);
        }
        this.speed *= this.config.friction;
    }
    p.onCollision = function (doorNeighbour, dir) {
        this.notifyListeners(Door.COLLISION, {
            force: Math.abs(this.speed) + Math.abs(doorNeighbour.speed),
            frame: doorNeighbour.frame
        });
        doorNeighbour.addSpeed(this.speed * this.config.damping);
        this.speed = 0;
    }
    p.getCollisionFrame = function (fr, dir) {
        const ct = COLLISION_TABLE,
            n = ct.length;
        var d = 0;
        for (var i = 0; i < n; i++) {
            var c = ct[i];
            if (fr < c[0]) break;
            d = c[1];
        }
        return fr - dir * d;
    }
    p.setDepth = function (idx) {
        this.door.parent.addChildAt(this.door, idx);
        this.shadow.parent.addChildAt(this.shadow, idx);
    }
    p.gotoFrame = function (n, dontNotify) {
        const old = this.frame,
            max = this.totalFrames - 1;
        n = Math.min(max, Math.max(0, n));
        this.door.gotoAndStop(n);
        this.shadow.gotoAndStop(n);
        if (dontNotify) return;
        if ((old == 0 && n > 0) || (old == max && n < max)) {
            this.notifyListeners(Door.OPENING, this);
        } else if (Door.CENTER_FRAMES.indexOf(n) > -1) {
            this.notifyListeners(Door.CENTER, this);
        } else if (n >= max) {
            this.notifyListeners(Door.COMPLETE, this);
            this.speed = 0;
            this.counter = 0;
            if (this.config.stopDraggingOnEnd) this.dragging = false;
        } else if (n <= 0) {
            this.notifyListeners(Door.CLOSED, this);
            this.speed = 0;
            this.counter = 0;
            if (this.config.stopDraggingOnEnd) this.dragging = false;
        }
    }
    p.notifyListeners = function (type, params) {
        this.dispatchEvent({
            type: type,
            data: params
        });
    }
    Object.defineProperty(p, "frame", {
        get() {
            return this.door.currentFrame;
        }
    });
    Object.defineProperty(p, "speed", {
        get() {
            return this._speed;
        },
        set(value) {
            this._speed = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, value));
        }
    });
    p.addSpeed = function (n) {
        this.speed += n;
    }
    p.initInteraction = function () {
        this.door.addEventListener("mousedown", this.handleMouseDown.bind(this));
        this.door.addEventListener("pressmove", this.handleMouseMove.bind(this));
        this.door.addEventListener("pressup", this.handleMouseUp.bind(this));
    }
    p.handleMouseDown = function (e) {
        if (this.pointerID) return;
        this.pointerID = e.pointerID;
        var x = e.localX;
        this.speed = 0;
        this.dragging = true;
        this.curpos = x;
        this.origpos = x - this.refPos[this.frame];
    }
    p.handleMouseMove = function (e) {
        if (e.pointerID != this.pointerID) return;
        this.curpos = e.localX;
    }
    p.handleMouseUp = function (e) {
        if (e.pointerID != this.pointerID) return;
        this.pointerID = null;
        this.dragging = false;
    }
    window.Door = Door;
}(window));