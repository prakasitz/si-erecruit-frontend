export const substrFilename = (_str: string) => {
    if (_str != '') {
        let lst = _str.split('.')
        if (lst[0].length > 15) {
            _str = `${lst[0].substr(0, 13)}.. .${lst[1]}`
        }
    } else {
        _str = 'ไม่พบการแนบไฟล์'
    }
    return _str
}
