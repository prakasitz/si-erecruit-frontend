export const substrFilename = (_str: string, maxChar = 15) => {
    if (_str != '') {
        let lst = _str.split('.')
        console.log(lst)
        if (lst[0].length > maxChar) {
            _str = `${lst[0].substr(0, maxChar - 2)}...${lst[1]}`
        }
    } else {
        _str = 'ไม่พบการแนบไฟล์'
    }
    return _str
}

export const trimAllSpace = (str: string) => {
    return str.replace(/\s/g, '')
}

export const isMatchRegex = (str: string, regex: RegExp): boolean => {
    const match = str?.match(regex)
    if (match) {
        const extractedPath = match[0]
        console.log('🚩 🟢 isMatchRegex: Extracted path:', extractedPath)
    } else {
        console.log(`🚩 🔴 isMatchRegex: Pattern not match. string: ${str}`)
    }
    return !!match
}

export const toLowerCase = (str: string) => {
    if (str) {
        return str.toLowerCase()
    } else return ''
}

export const checkURL = (url: string, urls: Array<string>) => {
    for (const string of urls) {
        if (string.endsWith('**')) {
            const prefix = string.slice(0, -2) // Remove the trailing '**'
            if (url.startsWith(prefix)) {
                return true // URL matches the prefix, return true
            }
        } else if (url === string) {
            return true // URL exactly matches the string, return true
        }
    }
    return false // URL does not match any of the strings
}

export const isStringNumber = (str: string) => {
    const numberRegex = /^-?\d+\.?\d*$/
    return numberRegex.test(str)
}

export const toCapitalizeCase = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}
