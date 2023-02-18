import Vepp from 'vepp'
import { Uint8Array2String, string2Uint8Array } from './util.js'
import pinyin from './pinyin.js'

Page({
    build() {
        const standardCode = `echo('hello, world')`,
              defaultCode = `.tan3`,
              defaultPointerChar = '┃',
              blockPointerChar = '    ',
              totalLines = 8,
              PJLength = 10,
              posW = Math.floor(standardCode.length / 3),
              posH = 7 - 1
        let t
        const tt = { data: t } = new Vepp({
            ui: `
                #STROKE_RECT y: H * 0.1, h: H * 0.5, line_width: 3, radius: 20, color: displayPage ? 0xc9bdff : 0x49406d
                #TEXT        x: W * 0.05, y: H * 0.1, w: W * 0.9, h: H * 0.5, text: displayPage ? renderDisplay(output, pointer2) : renderDisplay(code, pointer), text_style: hmUI.text_style.ELLIPSIS, color: 0xc9bdff, align_h: hmUI.align.LEFT, align_v: hmUI.align.TOP, '@click_up': () => displayPage = ! displayPage
                #BUTTON      x: 0, y: H * 0.6, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: a, click_func: () => inputKey(a)
                #BUTTON      x: W * 0.2, y: H * 0.6, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: b, click_func: () => inputKey(b)
                #BUTTON      x: W * 0.4, y: H * 0.6, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: c, click_func: () => inputKey(c)
                #BUTTON      x: W * 0.6, y: H * 0.6, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: d, click_func: () => inputKey(d)
                #BUTTON      x: W * 0.8, y: H * 0.6, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: e, click_func: () => inputKey(e)
                #BUTTON      x: 0, y: H * 0.7, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: f, click_func: () => inputKey(f)
                #BUTTON      x: W * 0.2, y: H * 0.7, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: g, click_func: () => inputKey(g)
                #BUTTON      x: W * 0.4, y: H * 0.7, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: h, click_func: () => inputKey(h)
                #BUTTON      x: W * 0.6, y: H * 0.7, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: i, click_func: () => inputKey(i)
                #BUTTON      x: W * 0.8, y: H * 0.7, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: j, click_func: () => inputKey(j)
                #BUTTON      x: 0, y: H * 0.8, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: k, click_func: () => inputKey(k)
                #BUTTON      x: W * 0.2, y: H * 0.8, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: l, click_func: () => inputKey(l)
                #BUTTON      x: W * 0.4, y: H * 0.8, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: 'WS', click_func: () => inputKey('WS')
                #BUTTON      x: W * 0.6, y: H * 0.8, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: 'PP', click_func: () => switchKeys({ val: 0 })
                #BUTTON      x: W * 0.8, y: H * 0.8, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: 'NP', click_func: () => switchKeys({ val: 1 })
                #BUTTON      x: W * 0.2, y: H * 0.9, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: 'PL', click_func: () => inputKey('PL')
                #BUTTON      x: W * 0.4, y: H * 0.9, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: 'PR', click_func: () => inputKey('PR')
                #BUTTON      x: W * 0.6, y: H * 0.9, w: W * 0.2, h: H * 0.1, color: 0x49406d, normal_color: 0xc9bdff, press_color: 0xeae5ff, radius: 12, text: 'BP', click_func: () => inputKey('BP')
            `,
            data: {
                pinyin: pinyin,
                W: hmSetting.getDeviceInfo().width,
                H: hmSetting.getDeviceInfo().height,
                displayPage: 0,
                code: defaultCode,
                pointer: defaultCode.length,
                pointer2: 0,
                pointerChar: defaultPointerChar,
                output: '',
                inputPos: -1,
                inputOK: null,
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
                    'c v ( ) [ ] { } , ; CQ SQ'.split(' '),
                    '0 1 2 3 4 5 6 7 8 9 . OP'.split(' '),
                    '+ - * / % > < = & | BS `'.split(' '),
                    '? : ! ~ ^ $ _ @ # LU CN NL'.split(' '),
                    'EC CE RO OK WP JL JR SV SY GO NL NL'.split(' ')
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
                    'CN': 1949,
                    'RO': 'Reflect.ownKeys()',
                    'OK': 'Object.keys()',
                    'EC': 'echo()',
                    'CE': 'clearEcho()'
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
                        this[v] = keys[k]
                    }
                },
                echo(data) {
                    this.output += data + '\n'
                    this.displayPage = 1
                    this.pointer2 = this.output.length
                },
                echoSingle(data) {
                    this.output += data
                    this.displayPage = 1
                    this.pointer2 = this.output.length
                },
                clearEcho() {
                    this.output = ''
                    this.displayPage = 1
                    this.pointer2 = 0
                },
                input(callback = (data) => {}) {
                    this.inputPos = this.output.length;
                    let tmp = () => {
                        tt.unwatch('inputOK', tmp)
                        callback(t.inputOK)
                        t.inputOK = null
                    }
                    tt.watch('inputOK', tmp)
                    this.displayPage = ! this.displayPage
                    this.pointer2 = this.inputPos
                },
                cn(py) {
                    let arr = pinyin[py], res = ''
                    if (arr) {
                        for (let i = 0; i < arr.length; i ++) {
                            res += i + '' + arr[i] + ' '
                        }
                        this.echo('INFO: hanzi result: ' + res)
                    } else {
                        this.echo('INFO: no hanzi found.')
                    }
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
                inputKey(c) {
                    const d = this.dict
                    const general = [d.PL, d.PR, d.JL, d.JR]
                    if (c in d)
                        c = d[c]
                    let pointerId, outputId
                    let cond = general.indexOf(c) < 0 ? this.inputPos >= 0 : this.displayPage
                    if (cond) {
                        this.displayPage = 1
                        pointerId = 'pointer2'
                        outputId = 'output'
                    } else {
                        this.displayPage = 0
                        pointerId = 'pointer'
                        outputId = 'code'
                    }
                    
                    let llimit = this.inputPos > 0 ? this.inputPos : 0
                    if (typeof c == 'string' && this[pointerId] >= llimit) {
                        let arr = this[outputId].split('')
                        arr.splice(this[pointerId], 0, c)
                        this[outputId] = arr.join('')
                        this[pointerId] += c.length
                        if (this.inputPos >= 0 && c.indexOf('\n') >= 0) {
                            this.inputOK = this[outputId].substring(this.inputPos, this[outputId].length - 1 - 1)
                            this.inputPos = -1
                        }
                    } else if (c === d.BP) {
                        let arr = this[outputId].split('')
                        if ((this[pointerId] - 1) in arr && this[pointerId] - 1 >= llimit) {
                            arr.splice(this[pointerId] - 1, 1)
                            this[outputId] = arr.join('')
                            this[pointerId] -= 1
                        }
                    } else if (c === d.LU) {
                        let arr = this[outputId].split('')
                        if ((this[pointerId] - 1) in arr && this[pointerId] - 1 >= llimit) {
                            let lastc = arr[this[pointerId] - 1],
                                lu = lastc.toUpperCase() == lastc ? 1 : 0
                            lastc = ! lu ? lastc.toUpperCase() : lastc.toLowerCase()
                            arr.splice(this[pointerId] - 1, 1, lastc)
                            this[outputId] = arr.join('')
                        }
                    } else if (c === d.NL) {
                    } else if (c === d.GO) {
                        this.go()
                    } else if (c === d.SV) {
                        this.save()
                    } else if (c === d.SY) {
                        this.syncFromSaved()
                    } else if (c === d.PL) {
                        if (this[pointerId] > llimit)
                            this[pointerId] --
                    } else if (c === d.PR) {
                        if (this[pointerId] < this[outputId].length)
                            this[pointerId] ++
                    } else if (c === d.JL) {
                        if (this[pointerId] - PJLength >= llimit)
                            this[pointerId] -= PJLength
                        else
                            this[pointerId] = llimit
                    } else if (c === d.JR) {
                        if (this[pointerId] + PJLength <= this[outputId].length)
                            this[pointerId] += PJLength
                        else
                            this[pointerId] = this[outputId].length
                    } else if (c === d.CN) {
                        const reg = /^\.([a-zA-Z_]+)([0-9]+)\s*$/
                        let i = this[pointerId], s = ''
                        for (
                            ;
                            i >= llimit && ! reg.test(s = this[outputId].substring(i, this[pointerId]).toLowerCase());
                            i --
                        );
                        if (reg.test(s)) {
                            let res = s.match(reg)
                            if (res) {
                                let [, py, id] = res
                                id = + id
                                if (py in pinyin && id >= 0 && id < pinyin[py].length) {
                                    let arr = this[outputId].split('')
                                    let hanzi = pinyin[py][id]
                                    arr.splice(i, s.length, hanzi)
                                    this[pointerId] += hanzi.length - s.length
                                    this[outputId] = arr.join('')
                                }
                            }
                        }
                    }
                },
                go() {
                    try {
                        (new Function('$t', `
                            const { echo, echoSingle, clearEcho, input, pinyin, cn } = $t
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