function Player(name, key) {
    this.points = 0;
    this.name = name;
    this.key  = key;
    this.fire('newplayer', this);
}

Player.prototype.play = function () {
    this.points += 1;
    this.fire('play', this);
};


