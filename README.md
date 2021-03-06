# Conway's Game of Life / 康威生命游戏

生命游戏中，对于任意细胞，规则如下：

* 每个细胞有两种状态 - 存活或死亡，每个细胞与以自身为中心的周围八格细胞产生互动（如图，黑色为存活，白色为死亡）
* 当前细胞为存活状态时，当周围的存活细胞低于2个时（不包含2个），该细胞变成死亡状态。（模拟生命数量稀少）
* 当前细胞为存活状态时，当周围有2个或3个存活细胞时，该细胞保持原样。
* 当前细胞为存活状态时，当周围有超过3个存活细胞时，该细胞变成死亡状态。（模拟生命数量过多）
* 当前细胞为死亡状态时，当周围有3个存活细胞时，该细胞变成存活状态。（模拟繁殖）
可以把最初的细胞结构定义为种子，当所有在种子中的细胞同时被以上规则处理后，可以得到第一代细胞图。按规则继续处理当前的细胞图，可以得到下一代的细胞图，周而复始。


![demo gif](https://github.com/bzw875/GameOfLife/blob/master/demo.gif)

## demo
用js写了这个游戏的[demo](https://raw.githack.com/bzw875/GameOfLife/master/00.html)，新版浏览器才可以运行

查看demo：clone或者下载代码zip，然后双击00.html就可以看到了




```javascript
new CellLife({
    width        : 100, // 网格宽度
    height       : 100, // 网格高度
    initialNumber: 500, // 初始化生命个数
    cycleTime    : 200, // 生命更新毫秒数
    box          : document.getElementById('root') // dom
});
```

