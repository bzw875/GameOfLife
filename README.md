# Conway's Game of Life / 康威生命游戏


![demo gif](https://github.com/banzhaowu-ausxin/GameOfLife/blob/master/demo.gif)

## demo
用js写了这个游戏的demo，用ECMScript 6写，新版浏览器才可以运行

查看demo：clone或者下载代码zip，然后双击00.html就可以看到了




```javascript
// 随机生成2000个细胞
var theCell = new CellLife(2000);

// 刷新细胞
theCell.tick(function(life){});
```


## 测试
用了mocha做测试，所以install一下
```javascript
npm install

mocha
```
