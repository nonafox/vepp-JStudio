import Vepp from 'vepp'
import { Uint8Array2String, string2Uint8Array } from './util.js'

Page({
    build() {
        const defaultCode = `echo('hello, world')`,
              defaultPointerChar = '┃',
              blockPointerChar = '    ',
              totalLines = 8,
              PJLength = 10,
              posW = Math.floor(defaultCode.length / 2),
              posH = 7 - 1
        const { data: t } = new Vepp({
            ui: `
                #STROKE_RECT y: H * 0.1, h: H * 0.5, line_width: 3, radius: 20, color: displayPage ? 0xc9bdff : 0x49406d
                #TEXT        x: W * 0.05, y: H * 0.1, w: W * 0.9, h: H * 0.5, text: displayPage ? renderDisplay(output, pointer2) : renderDisplay(code, pointer), text_style: hmUI.text_style.ELLIPSIS, color: 0xc9bdff, align_h: hmUI.align.LEFT, align_v: hmUI.align.TOP, '@click_up': () => displayPage = ! displayPage
                #BUTTON      x: 0, y: H * 0.6, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: a, click_func: () => input(a)
                #BUTTON      x: W * 0.2, y: H * 0.6, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: b, click_func: () => input(b)
                #BUTTON      x: W * 0.4, y: H * 0.6, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: c, click_func: () => input(c)
                #BUTTON      x: W * 0.6, y: H * 0.6, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: d, click_func: () => input(d)
                #BUTTON      x: W * 0.8, y: H * 0.6, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: e, click_func: () => input(e)
                #BUTTON      x: 0, y: H * 0.7, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: f, click_func: () => input(f)
                #BUTTON      x: W * 0.2, y: H * 0.7, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: g, click_func: () => input(g)
                #BUTTON      x: W * 0.4, y: H * 0.7, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: h, click_func: () => input(h)
                #BUTTON      x: W * 0.6, y: H * 0.7, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: i, click_func: () => input(i)
                #BUTTON      x: W * 0.8, y: H * 0.7, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: j, click_func: () => input(j)
                #BUTTON      x: 0, y: H * 0.8, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: k, click_func: () => input(k)
                #BUTTON      x: W * 0.2, y: H * 0.8, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: l, click_func: () => input(l)
                #BUTTON      x: W * 0.4, y: H * 0.8, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: 'BP', click_func: () => input('BP')
                #BUTTON      x: W * 0.6, y: H * 0.8, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: 'PP', click_func: () => switchKeys({ val: 0 })
                #BUTTON      x: W * 0.8, y: H * 0.8, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: 'NP', click_func: () => switchKeys({ val: 1 })
                #BUTTON      x: W * 0.2, y: H * 0.9, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: 'PL', click_func: () => input('PL')
                #BUTTON      x: W * 0.4, y: H * 0.9, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: 'PR', click_func: () => input('PR')
                #BUTTON      x: W * 0.6, y: H * 0.9, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: 'WS', click_func: () => input('WS')
            `,
            data: {
                W: hmSetting.getDeviceInfo().width,
                H: hmSetting.getDeviceInfo().height,
                displayPage: 0,
                code: defaultCode,
                pointer: defaultCode.length,
                pointer2: 0,
                pointerChar: defaultPointerChar,
                output: '',
                renderDisplay(text, pointer) {
                    let arr = text.split('')
                    arr.splice(pointer, 0, this.pointerChar)
                    arr = arr.join('')

                    arr = arr.split('\n')
                    let y = this.calcYPointer(text, pointer)
                    arr = arr.slice(y, y + totalLines + 1 - 1)
                    let pointer2 = this.calcXPointer(text, pointer)
                    for (let k in arr) {
                        let v = arr[k]
                        v = v.substring(pointer2)
                        arr[k] = v
                    }
                    arr = arr.join('\n')

                    return arr
                },
                calcRPointer(text, pointer, returnType = 0) {
                    let arr = text.split('\n'),
                        ppos = pointer
                    let n = 0
                    for (let k in arr) {
                        let v = arr[k]
                        if (n <= ppos && n + v.length >= ppos) {
                            return returnType ? parseInt(k) : ppos - n
                        }
                        n += v.length + 1
                    }
                    return 0
                },
                calcXPointer(text, pointer) {
                    let pos = 0, spos = posW
                    let rpos = this.calcRPointer(text, pointer)
                    if (rpos >= spos)
                        pos = rpos - spos
                    return pos
                },
                calcYPointer(text, pointer) {
                    let pos = 0, spos = posH
                    let rpos = this.calcRPointer(text, pointer, 1)
                    if (rpos >= spos)
                        pos = rpos - spos
                    return pos
                },
                keysPage: 0,
                keys: [
                    'q w e r t a s d f g z x'.split(' '),
                    'y u i o p h j k l n m b'.split(' '),
                    'c v CQ SQ < > + - * / % ='.split(' '),
                    '[ ] & | BS ` ? : ; , ( )'.split(' '),
                    '0 1 2 3 4 5 6 7 8 9 . ~'.split(' '),
                    'LT IF EL FO WH EC CE MT TF JS { }'.split(' '),
                    '# ^ $ _ ! JL JR WP LU SV SY GO'.split(' ')
                ],
                dict: {
                    'WS': ' ',
                    'BP': null,
                    'CQ': '"',
                    'SQ': '\'',
                    'BS': '\\',
                    'WP': '\n',
                    'LU': false,
                    'NL': 0,
                    'GO': undefined,
                    'SV': 723,
                    'SY': 11,
                    'PL': 32,
                    'PR': 3,
                    'JL': 6,
                    'JR': 7,
                    'LT': 'let ',
                    'IF': 'if(',
                    'EL': '}else{',
                    'FO': 'for(',
                    'WH': 'while(',
                    'EC': 'echo(',
                    'CE': 'clearEcho()',
                    'MT': 'Math.',
                    'TF': '.toFixed(',
                    'JS': 'JSON.stringify('
                },
                charRWidths: {
                    null: 4 / 4,
                    'w': 4 / 3,
                    'r': 4 / 6,
                    't': 4 / 5,
                    'f': 4 / 5,
                    'y': 4 / 5,
                    'i': 4 / 8,
                    'j': 4 / 10,
                    'l': 4 / 8,
                    'm': 4 / 2.5,
                    'v': 4 / 3.5,
                    '"': 4 / 6,
                    "'": 4 / 10,
                    '-': 4 / 6,
                    '*': 4 / 5,
                    '/': 4 / 5,
                    '%': 4 / 3,
                    '[': 4 / 7,
                    ']': 4 / 7,
                    '&': 4 / 3.5,
                    '|': 4 / 8,
                    '\\': 4 / 5,
                    '`': 4 / 7,
                    '?': 4 / 4.5,
                    ':': 4 / 10,
                    ';': 4 / 10,
                    ',': 4 / 10,
                    '(': 4 / 6,
                    ')': 4 / 6,
                    '.': 4 / 8,
                    '~': 4 / 3,
                    '{': 4 / 6,
                    '}': 4 / 6,
                    '#': 4 / 3,
                    '^': 4 / 5,
                    '!': 4 / 10,
                    ' ': 4 / 6
                },
                a: '', b: '', c: '', d: '', e: '', f: '',
                g: '', h: '', i: '', j: '', k: '', l: '',
                switchKeys(p) {
                    if (typeof p == 'number') {
                        this.keysPage = p
                    } else if (typeof p == 'object') {
                        let np = p.val
                        if (np == 1) {
                            if (this.keysPage < this.keys.length - 1)
                                this.keysPage ++
                            else
                                this.keysPage = 0
                        } else {
                            if (this.keysPage > 0)
                                this.keysPage --
                            else
                                this.keysPage = this.keys.length - 1
                        }
                    }
                    let keys = this.keys[this.keysPage]
                    let vnames = 'abcdefghijkl'.split('')
                    for (let k in vnames) {
                        let v = vnames[k]
                        t[v] = keys[k]
                    }
                },
                echo(data) {
                    this.output += data + '\n'
                    this.displayPage = 1
                    this.pointer2 = this.output.length
                },
                clearEcho() {
                    this.output = ''
                    this.displayPage = 1
                    this.pointer2 = 0
                },
                save() {
                    try {
                        let handle = hmFS.open('data.txt', hmFS.O_RDWR | hmFS.O_CREAT | hmFS.O_TRUNC)
                        let buffer = string2Uint8Array(this.code)
                        hmFS.write(handle, buffer.buffer, 0, buffer.length)
                        hmFS.close(handle)
                        this.echo('INFO: saved.')
                    } catch (ex) {
                        this.echo('ERROR when saving: ' + ex)
                    }
                },
                syncFromSaved() {
                    try {
                        let handle = hmFS.open('data.txt', hmFS.O_RDWR | hmFS.O_CREAT)
                        let [stat] = hmFS.stat('data.txt'),
                            buffer = new Uint8Array(stat.size)
                        hmFS.read(handle, buffer.buffer, 0, stat.size)
                        let content = Uint8Array2String(buffer)
                        this.code = content
                        this.pointer = this.code.length
                        hmFS.close(handle)
                        this.echo('INFO: synced.')
                    } catch (ex) {
                        this.echo('ERROR when syncing: ' + ex)
                    }
                },
                input(c) {
                    const d = this.dict
                    if (c in d)
                        c = d[c]
                    
                    const general = [d.PL, d.PR, d.JL, d.JR]
                    if (general.indexOf(c) == -1)
                        this.displayPage = 0
                    
                    if (typeof c == 'string') {
                        let arr = this.code.split('')
                        arr.splice(this.pointer, 0, c)
                        this.code = arr.join('')
                        this.pointer += c.length
                    } else if (c === d.BP) {
                        let arr = this.code.split('')
                        if ((this.pointer - 1) in arr) {
                            arr.splice(this.pointer - 1, 1)
                            this.code = arr.join('')
                            this.pointer -= 1
                        }
                    } else if (c === d.LU) {
                        let arr = this.code.split('')
                        if ((this.pointer - 1) in arr) {
                            let lastc = arr[this.pointer - 1],
                                lu = lastc.toUpperCase() == lastc ? 1 : 0
                            lastc = ! lu ? lastc.toUpperCase() : lastc.toLowerCase()
                            arr.splice(this.pointer - 1, 1, lastc)
                            this.code = arr.join('')
                        }
                    } else if (c === d.NL) {
                    } else if (c === d.GO) {
                        this.go()
                    } else if (c === d.SV) {
                        this.save()
                    } else if (c === d.SY) {
                        this.syncFromSaved()
                    } else if (c === d.PL) {
                        if (this.displayPage) {
                            if (this.pointer2 >  0)
                                this.pointer2 --
                        } else {
                            if (this.pointer >  0)
                                this.pointer --
                        }
                    } else if (c === d.PR) {
                        if (this.displayPage) {
                            if (this.pointer2 < this.output.length)
                                this.pointer2 ++
                        } else {
                            if (this.pointer < this.code.length)
                                this.pointer ++
                        }
                    } else if (c === d.JL) {
                        if (this.displayPage) {
                            if (this.pointer2 - PJLength >= 0)
                                this.pointer2 -= PJLength
                            else
                                this.pointer2 = 0
                        } else {
                            if (this.pointer - PJLength >= 0)
                                this.pointer -= PJLength
                            else
                                this.pointer = 0
                        }
                    } else if (c === d.JR) {
                        if (this.displayPage) {
                            if (this.pointer2 + PJLength <= this.output.length)
                                this.pointer2 += PJLength
                            else
                                this.pointer2 = this.output.length
                        } else {
                            if (this.pointer + PJLength <= this.code.length)
                                this.pointer += PJLength
                            else
                                this.pointer = this.code.length
                        }
                    }
                },
                go() {
                    try {
                        (new Function('$t', `
                            const { echo, clearEcho } = $t
                            try {
                                ${this.code}
                            } catch (ex) {
                                echo('ERROR: ' + ex)
                            }
                        `))(this)
                    } catch (ex) {
                        this.echo('ERROR: ' + ex)
                    }
                }
            }
        })

        t.switchKeys(0)
        /*
        setInterval(function () {
            if (t.pointerChar == defaultPointerChar)
                t.pointerChar = blockPointerChar
            else
                t.pointerChar = defaultPointerChar
        }, 400)
        */
    }
})