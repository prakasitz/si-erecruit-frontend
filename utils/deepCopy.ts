export const deepCopy = (obj: object) => {
    let newObj = JSON.parse(JSON.stringify(obj))
    return newObj
}