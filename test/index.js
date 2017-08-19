const assert = require('assert');
const CellLife = require('../CellLife.js');




describe('new life', () => {
    const tmpCell = new CellLife(1);
    it('should new a CellLife', function(){
        assert.notEqual(tmpCell, null);
    });
    it('should create 10 cell', function(){
        const theCell = new CellLife(10);
        assert.equal(theCell.life.length, 10);
    });
    it('should return 8 neighbor cell', function(){
        const neighbor = tmpCell.findNeighbor([{ x: 10, y: 10 }]);
        
        var cells = [
            { x: 9,  y: 9  },
            { x: 9,  y: 10 },
            { x: 9,  y: 11 },
            { x: 10, y: 9  },
            { x: 10, y: 11 },
            { x: 11, y: 9  },
            { x: 11, y: 10 },
            { x: 11, y: 11 }
        ];
        assert.deepEqual(neighbor, cells);
    });
    it('should 0 >= neighbor <= 100 and neighbor not equal current cell', function(){
        assert.equal(tmpCell.isValidCell(9,   9,   10, 10), true);
        assert.equal(tmpCell.isValidCell(-1,  -1,  10, 10), false);
        assert.equal(tmpCell.isValidCell(101, 101, 10, 10), false);
        assert.equal(tmpCell.isValidCell(10,  10,  10, 10), false);
    });
    it('should count frequency success', function(){
        var neighbor = [
            { x: 10, y: 10 },
            { x: 10, y: 10 },
            { x: 9, y: 9 },
            { x: 11, y: 10 },
            { x: 10, y: 30 }
        ];
        var frequency = [
            { x: 10, y: 10, count: 2 },
            { x: 9, y: 9, count: 1 },
            { x: 11, y: 10, count: 1 },
            { x: 10, y: 30, count: 1 }
        ];
        assert.deepEqual(tmpCell.countFrequency(neighbor), frequency);
    });
    it('should mergeNewLifeAndSurvive success', function(){
        var newLife = [
            { x: 1, y: 1 }
        ];
        var countIsTwo = [
            { x: 2, y: 2 },
            { x: 3, y: 3 },
            { x: 4, y: 4 },
            { x: 5, y: 5 }
        ];
        var life = [
            { x: 6, y: 6 },
            { x: 7, y: 7 },
            { x: 3, y: 3 },
            { x: 5, y: 5 }
        ];
        var survive = [
            { x: 1, y: 1 },
            { x: 3, y: 3 },
            { x: 5, y: 5 }
        ];
        assert.deepEqual(tmpCell.mergeNewLifeAndSurvive(newLife, countIsTwo, life), survive);
    });
});