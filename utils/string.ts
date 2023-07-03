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

export const isMatchRegex = (str: string, regex: RegExp): boolean => {
    const match = str?.match(regex)
    if (match) {
        const extractedPath = match[0]
        console.log('isMatchRegex: Extracted path:', extractedPath)
    } else {
        console.log(`isMatchRegex: Pattern not match. string: ${str}`)
    }
    return !!match
}
