#JS LED BOARD

##功能
- showWord(x, y, words, color) 在模拟的屏幕上显示**英文**句子（能自动换行），支持26个大小写字母，0-9十个数字，以及常见的符号，具体请参看font.js。参数说明：x,y是句子第一个字母左上角的坐标，words是字符串（可以含空格）。color是句子显示的颜色不支持rgb()，用十六进制表示。
- drawLine(x1, y1, x2, y2, color)在模拟屏幕上画直线，不支持斜线。参数说明：x1, y1, x2, y2,分别是起点终点坐标，color是直线颜色。
- colorPixel(x, y, color)给屏幕某一点着色。
- cls()清屏幕。
- update()主屏幕时钟。
- get(url, callback)获取指定url的文本，并交给回调函数处理。

##缺陷
- 性能不好
- 移动设备显示效果不好
- 还不能灵活的配置

