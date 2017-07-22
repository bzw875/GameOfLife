function CellLife(intervals, cellNumber) {
    this.intervals = intervals;
    this.cellNumber = cellNumber;
    this.life = this.createCellByRandom(cellNumber);
}

CellLife.prototype.tick = function (callback){
    var that = this;
    callback(this.life);
    var timer = setInterval(function(){
        
        var neighbor = that.findNeighbor(that.life);
        var frequency = that.countFrequency(neighbor, that.life);
        var newLife = that.filterCountIsThree(frequency);
        var countIsTwo = that.filterCountIsTwo(frequency);
        var nowlife = that.mergeNewLifeAndSurvive(newLife, countIsTwo, that.life);

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
    var life = [];
    
    while (life.length < cellNumber) {
        var obj = {};
        obj.x = Math.floor(Math.random()*100);
        obj.y = Math.floor(Math.random()*100);
        life.push(obj);
    }
    life = life.filter(function(obj, j){
        var isFind;
        for (var i = 0; i < life.length; i++) {
            var tmp = life[i];
            if (j !== i) {
                if (obj.x === tmp.x && obj.y === tmp.y) {
                    isFind = true;
                }
            }
        }
        return !isFind;
    });
    return life;
}

CellLife.prototype.findNeighbor = function (life) {
    var neighbor = [];
    for (var i = 0; i < life.length; i++) {
        var tmp = life[i];
        for (var j = -1; j <= 1; j++) {
            for (var t = -1; t <= 1; t++) {
                var xAxis = tmp.x + j;
                var yAxis = tmp.y + t;
                if (xAxis >= 0 && xAxis < 100 && yAxis >= 0 && yAxis < 100) {
                    var cell = {
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
    var frequency = [];
    for (var j = 0, length = neighbor.length; j < length; j++) {
        var ele = neighbor[j];
        if (frequency.length == 0) {
            frequency.push({
                x: ele.x,
                y: ele.y,
                count: 1
            });
        } else {
            var isFind = false;
            for (var i = 0, len = frequency.length; i < len; i++) {
                var obj = frequency[i];
                if (ele.x === obj.x && ele.y === obj.y) {
                    isFind = true;
                    obj.count += 1;
                    break;
                }
            }
            if (!isFind) {
                frequency.push({
                    x: ele.x,
                    y: ele.y,
                    count: 1
                });
            }
        }
    }
    return frequency;
}
// 当前细胞为存活状态时，当周围低于2个（不包含2个）存活细胞时， 该细胞变成死亡状态。（模拟生命数量稀少）
// 当前细胞为存活状态时，当周围有2个或3个存活细胞时， 该细胞保持原样。
// 当前细胞为存活状态时，当周围有3个以上的存活细胞时，该细胞变成死亡状态。（模拟生命数量过多）
// 当前细胞为死亡状态时，当周围有3个存活细胞时，该细胞变成存活状态。 （模拟繁殖）
CellLife.prototype.filterCountIsThree = function (frequency) {
    var newLife = frequency.filter(function(obj, i){
        if (obj.count === 3) {
            return true;
        }
    });
    return newLife;
}

CellLife.prototype.filterCountIsTwo = function (frequency) {
    var countIsTwo = frequency.filter(function(obj, i){
        if (obj.count === 2) {
            return true;
        }
    });
    return countIsTwo;
}

CellLife.prototype.mergeNewLifeAndSurvive = function (newLife, countIsTwo, life) {
    var survive = countIsTwo.filter(function(obj, i){
        for (var i = 0; i < life.length; i++) {
            var tmp = life[i];
            if (obj.x === tmp.x && obj.y === tmp.y) {
                return true;
            }
        }
    });
    return newLife.concat(survive);
}