const assert = require('assert');
let CellLife = require('../CellLife.js');




describe('new life', () => {
    it('should new a CellLife', function(){
        assert.notEqual(new CellLife(10, 10), null);
    });
    it('should create 10 cell', function(){
        const theCell = new CellLife(1000, 10);
        assert.equal(theCell.life.length, 10);
    });
    it('should return 8 neighbor cell', function(){
        const theCell = new CellLife(1000, 1);
        const neighbor = theCell.findNeighbor(theCell.life);
        assert.equal(neighbor.length, 8);
    });
});