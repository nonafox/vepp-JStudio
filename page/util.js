export function Uint8Array2String(buf) {
    let res = '';
    for (var i = 0; i < buf.length; i++) {
        res += String.fromCharCode(buf[i]);
    }
    return res
}
export function string2Uint8Array(str) {
    let arr = []
    for (var i = 0, j = str.length; i < j; ++ i) {
        arr.push(str.charCodeAt(i))
    }
    return new Uint8Array(arr)
}