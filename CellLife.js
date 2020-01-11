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
    constructor(options) {
        const { width, height, cycleTime, initialNumber, box} = options;
        this.width     = width;
        this.height    = height;
        this.cycleTime = cycleTime;
        this.initialNumber = initialNumber;
        this.box = box;

        this.life = this.createCellByRandom();
        this.createCheckerboard();
    }
    tick (callback) {
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

    createCellByRandom () {
        const life = new Set();
        while (life.size < this.initialNumber) {
            life.add({
                x: Math.floor(Math.random() * this.width),
                y: Math.floor(Math.random() * this.height)
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
        return x >= 0 && y >= 0 && x < this.width && y < this.height && (self_x !== x || self_y !== y);
    }

    countFrequency (neighbor) {
        var mapCell = {};
        const frequency = [];
        var len = neighbor.length;
        for (var i = 0; i < len; i++) {
            var ele = neighbor[i];
            var sameEle = mapCell[ele.x+''+ele.y];
            if (sameEle) {
                sameEle.count += 1;
            } else {
                sameEle = {
                    x: ele.x,
                    y: ele.y,
                    count: 1
                };
                mapCell[ele.x+''+ele.y] = sameEle;
                frequency.push(sameEle);
            }
        }
        mapCell = null;
        return frequency;
    }

    filterCountIsThree (frequency) {
        return frequency.filter(cell => cell.count === 3);
    }

    filterCountIsTwo (frequency) {
        return frequency.filter(cell => cell.count === 2);
    }

    mergeNewLifeAndSurvive (newLife, countIsTwo, life) {
        var len,
            ele,
            mapCell = {},
            survive = [];

        
        len = life.length;
        for (var i = 0; i < len; i++) {
            ele = life[i];
            mapCell[ele.x+''+ele.y] = ele;
        }

        
        len = countIsTwo.length;
        for (var i = 0; i < len; i++) {
            ele = countIsTwo[i];
            if (mapCell[ele.x+''+ele.y]) {
                survive.push(ele);
            }
        }

        return [...newLife, ...survive];
    }
    createCheckerboard(){
        var td = new Array(this.height+5).join( '<tr>'+(new Array(this.width+5)).join('<td></td>')+'</tr>' );
        var table = '<table><tbody>'+td+'</tbody></table>';
        this.box.innerHTML = table;

        var table = this.box.querySelector('tbody');
        var tds = table.querySelectorAll('td');
        var trs = table.querySelectorAll('tr');

        clearInterval(this.timer);
        this.timer = setInterval(()=> {
            this.tick(life =>{
                
                tds.forEach((ele, i)=>{
                    ele.className = '';
                });
                
                for (var i = 0, len = life.length; i < len; i++) {
                    var cell = life[i];
                    trs[cell.y+2].children[cell.x+2].className = 'life';
                }
                if (life.length === 0) {
                    clearInterval(this.timer);
                }
                
            });
            
        }, this.cycleTime);
    }

    destroy() {
        this.box.innerHTML = '';
        clearInterval(this.timer);
    }
}
return CellLife;

});