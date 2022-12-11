# 多语言
- [English](https://github.com/jwhgzs/vepp-jstudio/blob/master/README.md)
- 中文（当前）

# 使用说明

如你所见，JStudio的界面是非常直观的——显示器+键盘。显示器有两个模式，分别用来显示代码和输出。你可以点击显示器以切换模式。

JStudio的一大特色即是指针追踪视野——你可以移动指针，以浏览不同的视野——就像你的眼球一样！

还有一点是，JStudio中JS代码的输出实现有一点不同：你需要使用内建方法`echo(data)`和`clearEcho()`实现输出和清除。

更多功能请见下——特殊键！

# 特殊键

JStudio中有很多特殊键，都分布在键盘的各个页面上。这有所有特殊键的名称及解释：

### 功能键
- `PP`: previous page（上一页），仅用于键盘
- `NP`: next page（下一页），仅用于键盘
- `BP`: back space（退格），仅用于代码模式
- `PL`: pointer left（指针向左）
- `PR`: pointer right（指针向右）
- `JL`: jump left（指针左跳）
- `JR`: jump right（指针右跳）
- `LU`: lower & upper（大小写更换，仅操作指针前一个字符），仅用于代码模式
- `SV`: save（保存代码）
- `SY`: sync（回档已保存的代码）
- `GO`: go（运行代码）

### 缩写键
- `WS`: white space（空格）
- `WP`: wrap（换行）
- `BS`: back slash（反斜杠） `\`
- `CQ`: common quote（双引号） `"`
- `SQ`: single quote（单引号） `'`

### 快速键
- `LT`: `let `
- `IF`: `if(`
- `EL`: `}else{`
- `FO`: `for(`
- `WH`: `while(`
- `EC`: `echo(`
- `CE`: `clearEcho()`
- `MT`: `Math.`
- `TF`: `.toFixed(`
- `JS`: `JSON.stringify(`