;(function(name, definition) {
    var hasDefine = typeof define === 'function',
        hasExports = typeof module !== 'undefined' && module.exports;
    if (hasDefine) {
        define(definition);
    } else if (hasExports) {
        module.exports = definition();
    } else {
        this[name] = definition();
    }
})('CellLife', function() {

'use strict';

class CellLife {
    constructor(cellNumber = 1000) {
        this.cellNumber = cellNumber;
        this.life = this.createCellByRandom(cellNumber);
    }
    tick (callback) {
        callback(this.life);
        var newLife = this.updateCell();
        callback(newLife);

        if (newLife.length === 0) {
            callback([]);
        }
    }

    updateCell () {
        const neighbor   = this.findNeighbor(this.life);
        const frequency  = this.countFrequency(neighbor, this.life);
        const newLife    = this.filterCountIsThree(frequency);
        const countIsTwo = this.filterCountIsTwo(frequency);
        const nowlife    = this.mergeNewLifeAndSurvive(newLife, countIsTwo, this.life);
        this.life = nowlife;
        return nowlife;
    }

    createCellByRandom (cellNumber) {
        const life = new Set();
        while (life.size < cellNumber) {
            life.add({
                x: Math.floor(Math.random() * 100),
                y: Math.floor(Math.random() * 100)
            });
        }
        return [...life];
    }

    findNeighbor (life) {
        const allNeighbor = [];
        life.forEach(cell => allNeighbor.push(...this.neighborCell(cell.x, cell.y)));
        return allNeighbor;
    }

    neighborCell (self_x, self_y) {
        const neighbor = [];
        const that = this;
        [-1, 0, 1].forEach(function(i) {
            [-1, 0, 1].forEach(function(j) {
                const x = self_x + i;
                const y = self_y + j;
                if (that.isValidCell(x, y, self_x, self_y)) {
                    neighbor.push({ x, y });
                }
            });
        });
        return neighbor;
    }

    isValidCell (x, y, self_x, self_y) {
        return x >= 0 && y >= 0 && x < 100 && y < 100 && (self_x !== x || self_y !== y);
    }

    countFrequency (neighbor) {
        const frequency = [];
        neighbor.forEach(function(ele) {
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
        });
        return frequency;
    }

    filterCountIsThree (frequency) {
        return frequency.filter(cell => cell.count === 3);
    }

    filterCountIsTwo (frequency) {
        return frequency.filter(cell => cell.count === 2);
    }

    mergeNewLifeAndSurvive (newLife, countIsTwo, life) {
        const survive = countIsTwo.filter(ele => life.find(obj => ele.x === obj.x && ele.y === obj.y));
        return [...newLife, ...survive];
    }
}
return CellLife;

});