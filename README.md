# Languages
- English (current)
- [Chinese](https://github.com/jwhgzs/vepp-jstudio/blob/master/README.chinese.md)

# Way to use
It's pretty easy to use! As you see, there is a displayer on top and a keyboard on bottom.

There are 2 modes for displayer: code mode and output mode. You can switch it by clicking it.

Especially, there is a pointer on the displayer, you can move by specific keys in keyboard (see below) it to view different part of the display code or output: just like rolling your eyeboll!

By the way, the way to output is a bit different: you need to use the built-in function `echo(data)` to output and `clearEcho()` to clear it. What's more, there is a function to accept user's input: `input((data) => { ... })`.

For more features and details, just see the next part!

# Specific keys
There are lots of specific keys in the keyboard. They are so important that you can ignore them at all!

Here is the list of them:

### Feature keys
- `PP`: previous page, only for keyboard
- `NP`: next page, only for keyboard
- `BP`: backspace
- `PL`: pointer left
- `PR`: pointer right
- `JL`: jump left (pointer)
- `JR`: jump right (pointer)
- `LU`: lower & upper (operates on the character before the pointer)
- `CN`: chinese charactor input (operates on the pattern that like `.tan10` (`.[pinyin][index]`, matched with the [pinyin table](https://github.com/jwhgzs/vepp-jstudio/tree/master/page/pinyin.js)) and that is before the pointer)
- `OP`: switch or input a operator (operates on the character before the pointer)
- `SV`: save
- `SY`: sync (from saved)
- `GO`: go (running)

### Escape keys
- `WS`: white space
- `WP`: wrap
- `BS`: back slash `\`
- `CQ`: common quote `"`
- `SQ`: single quote `'`

### Abbr keys
- `EC`: `echo()`
- `CE`: `clearEcho()`
- `RO`: `Reflect.ownKeys()`
- `OK`: `Object.keys()`

# Built-in APIs
There is the list of built-in APIs in the JStudio runtime environment:

- `echo(data)`: display the data on the displayer (with wrap)
- `echoSingle(data)`: display the data on the displayer (without wrap)
- `clearEcho()`: clear the displayer
- `input((data) => { ... })`: accept the data which user inputs
- `cn(pinyin)`: query the pinyin table according to the specific pinyin
- `pinyin`: the pinyin table