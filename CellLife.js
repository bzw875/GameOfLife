'use strict';
function CellLife(intervals, cellNumber) {
    this.intervals = intervals;
    this.cellNumber = cellNumber;
    this.life = this.createCellByRandom(cellNumber);
}

CellLife.prototype.tick = function (callback){
    const that = this;
    callback(this.life);
    const timer = setInterval(function(){
        
        const neighbor = that.findNeighbor(that.life);
        const frequency = that.countFrequency(neighbor, that.life);
        const newLife = that.filterCountIsThree(frequency);
        const countIsTwo = that.filterCountIsTwo(frequency);
        const nowlife = that.mergeNewLifeAndSurvive(newLife, countIsTwo, that.life);

        that.life = nowlife;
        
        callback(nowlife);
        
        if (newLife.length === 0) {
            clearInterval(timer);
            setTimeout(function(){
                callback([]);
            }, that.intervals);
        }

    }, this.intervals);
};

CellLife.prototype.createCellByRandom = function (cellNumber) {
    const life = new Set();
    while (life.size < cellNumber) {
        life.add({
            x: Math.floor(Math.random()*100),
            y: Math.floor(Math.random()*100)
        })
    }
    return [...life];
};

CellLife.prototype.findNeighbor = function (life) {
    const allNeighbor = [];
    life.forEach(cell => allNeighbor.push(...this.neighborCell(cell.x, cell.y)));
    return allNeighbor;
};

CellLife.prototype.neighborCell = function (self_x, self_y) {
    const neighbor = [];
    const that = this;
    [-1, 0, 1].forEach(function(i){
        [-1, 0, 1].forEach(function(j){
            const x = self_x + i;
            const y = self_y + j;
            if (that.isValidCell(x, y, self_x, self_y)) {
                neighbor.push({
                    x: x,
                    y: y
                });
            }
        });
    });
    return neighbor;
};

CellLife.prototype.isValidCell = function(x, y, self_x, self_y) {
    return x >= 0 && y >= 0 && x < 100 && y < 100 && (self_x !== x || self_y !== y);
};

CellLife.prototype.countFrequency = function (neighbor, life) {
    const frequency = [{
        x: neighbor[0].x,
        y: neighbor[0].y,
        count: 1
    }];
    for (let j = 1, length = neighbor.length; j < length; j++) {
        const ele = neighbor[j];
        const sameEle = frequency.find(obj => ele.x === obj.x && ele.y === obj.y);
        if (sameEle) {
            sameEle.count += 1;
        } else {
            frequency.push({
                x: ele.x,
                y: ele.y,
                count: 1
            });
        }
    }
    return frequency;
};

CellLife.prototype.filterCountIsThree = function (frequency) {
    return frequency.filter((obj, i) => obj.count === 3);
};

CellLife.prototype.filterCountIsTwo = function (frequency) {
    return frequency.filter((obj, i) => obj.count === 2);
};

CellLife.prototype.mergeNewLifeAndSurvive = function (newLife, countIsTwo, life) {
    const survive = countIsTwo.filter(ele => life.find(obj => ele.x === obj.x && ele.y === obj.y));
    return [...newLife, ...survive];
};

if (window.module && typeof module.exports === 'object') {
    exports.CellLife = CellLife;
}