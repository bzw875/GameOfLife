'use strict';
function CellLife(intervals, cellNumber) {
    this.intervals = intervals;
    this.cellNumber = cellNumber;
    this.life = this.createCellByRandom(cellNumber);
}

CellLife.prototype.tick = function (callback){
    let that = this;
    callback(this.life);
    let timer = setInterval(function(){
        
        let neighbor = that.findNeighbor(that.life);
        let frequency = that.countFrequency(neighbor, that.life);
        let newLife = that.filterCountIsThree(frequency);
        let countIsTwo = that.filterCountIsTwo(frequency);
        let nowlife = that.mergeNewLifeAndSurvive(newLife, countIsTwo, that.life);

        that.life = nowlife;
        
        callback(nowlife);
        
        if (newLife.length === 0) {
            clearInterval(timer);
            setTimeout(function(){
                callback([]);
            }, that.intervals);
        }

    }, this.intervals);
}

CellLife.prototype.createCellByRandom = function (cellNumber) {
    const life = new Set();
    while (life.size < cellNumber) {
        life.add({
            x: Math.floor(Math.random()*100),
            y: Math.floor(Math.random()*100)
        })
    }
    return [...life];
}

CellLife.prototype.findNeighbor = function (life) {
    let neighbor = [];
    for (let i = 0; i < life.length; i++) {
        let tmp = life[i];
        for (let j = -1; j <= 1; j++) {
            for (let t = -1; t <= 1; t++) {
                let xAxis = tmp.x + j;
                let yAxis = tmp.y + t;
                if (xAxis >= 0 && xAxis < 100 && yAxis >= 0 && yAxis < 100) {
                    let cell = {
                        x: xAxis,
                        y: yAxis
                    };
                    if (xAxis !== tmp.x || yAxis !== tmp.y) {
                        neighbor.push(cell);
                    }
                }
            }
        }
    }
    return neighbor;
}

CellLife.prototype.countFrequency = function (neighbor, life) {
    let frequency = [{
        x: neighbor[0].x,
        y: neighbor[0].y,
        count: 1
    }];
    for (let j = 1, length = neighbor.length; j < length; j++) {
        let ele = neighbor[j];
        let sameEle = frequency.find(obj => ele.x === obj.x && ele.y === obj.y);
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
}
// 当前细胞为存活状态时，当周围低于2个（不包含2个）存活细胞时， 该细胞变成死亡状态。（模拟生命数量稀少）
// 当前细胞为存活状态时，当周围有2个或3个存活细胞时， 该细胞保持原样。
// 当前细胞为存活状态时，当周围有3个以上的存活细胞时，该细胞变成死亡状态。（模拟生命数量过多）
// 当前细胞为死亡状态时，当周围有3个存活细胞时，该细胞变成存活状态。 （模拟繁殖）
CellLife.prototype.filterCountIsThree = function (frequency) {
    let newLife = frequency.filter((obj, i) => obj.count === 3);
    return newLife;
}

CellLife.prototype.filterCountIsTwo = function (frequency) {
    let countIsTwo = frequency.filter((obj, i) => obj.count === 2);
    return countIsTwo;
}

CellLife.prototype.mergeNewLifeAndSurvive = function (newLife, countIsTwo, life) {
    let survive = countIsTwo.filter(ele => life.find(obj => ele.x === obj.x && ele.y === obj.y));
    return [...newLife, ...survive];
}

if (window.module && typeof module.exports === "object") {
    exports.CellLife = CellLife;
}