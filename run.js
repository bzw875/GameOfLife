
var theCell = new CellLife(10000, 100);


theCell.tick(function(life){
    console.log('———————————————— tick ————————————————');
    var checkerboard = new Array(51).join(' ') + '\n';
    checkerboard = new Array(51).join(checkerboard);
    for (var i = 0, len = life.length; i < len; i++) {
        var cell = life[i];
        var index = cell.x + (cell.y - 1) * 51;
        checkerboard = checkerboard.slice(0, index) + '*' + checkerboard.slice((index-1));
    }
    console.log(checkerboard);
});

