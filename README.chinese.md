# 多语言
- [English](https://github.com/jwhgzs/vepp-jstudio/blob/master/README.md)
- 中文（当前）

# 使用说明
如你所见，JStudio的界面是非常直观的——显示器+键盘。显示器有两个模式，分别用来显示代码和输出。你可以点击显示器以切换模式。

JStudio的一大特色即是指针追踪视野——你可以移动指针，以浏览不同的视野——就像你聪明的眼珠一样！

还有一点是，JStudio中JS代码的输出实现有一点不同：你需要使用内建方法`echo(data, flags = echoOps.W)`和`clearEcho()`实现输出和清除，当然你也可以用`input((data) => { ... })`方法来接受用户输入。

更多功能请见下——特殊键！

# 特殊键
JStudio中有很多特殊键，都分布在键盘的各个页面上。这有所有特殊键的名称及解释：

### 功能键
- `PP`: 上一页，仅用于键盘
- `NP`: 下一页，仅用于键盘
- `BP`: 退格
- `B2`: 长退格
- `PL`: 指针左移
- `PR`: 指针右移
- `JL`: 指针左跳
- `JR`: 指针右跳
- `LU`: 大小写转换，操作指针前一字符
- `CN`: 汉字输入，操作指针前的汉字识别符，形如 `.tan10`（`.[拼音][序号]`, 与 [拼音表](https://github.com/jwhgzs/vepp-jstudio/blob/master/page/pinyin.js) 相匹配）
- `OP`: 运算符转换，操作指针前一字符
- `SV`: 保存文件
- `SY`: 归档文件
- `C2`: 清空输出区
- `GO`: 执行

### 转义键
- `WS`: 空格
- `WP`: 换行
- `BS`: 反斜杠 `\`
- `CQ`: 双引号 `"`
- `SQ`: 单引号 `'`

### 浓缩键
- `EC`: `echo()`
- `EO`: `echoOps.`
- `CE`: `clearEcho()`

# 内置API
这是JStudio运行时环境中内置的API列表：

- `echo(data, flags = echoOps.W)`: 输出数据（枚举`echoOps`的值列表：`W`（输出后换行）, `P`（输出对象原型成员）, `L`（输出长文本）, `F`（输出函数内容））
- `clearEcho()`: 清除输出区
- `input((data) => { ... })`: 接受用户输入
- `cn(pinyin)`: 从拼音表，根据给定拼音查询汉字序号表
- `pinyin`: 拼音表