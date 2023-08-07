export const deepCopy = (obj: object) => {
    let newObj = JSON.parse(JSON.stringify(obj))
    return newObj
}

/**
 * Extract the data and filter out null or empty values
 * */
export const extractObject = (obj: any) => {
    return Object.entries(obj)
        .filter(([, value]) => value !== null)
        .reduce((acc: any, [key, value]) => {
            acc[key] = value
            return acc
        }, {})
}

export const compareObjects = (obj1: any, obj2: any) => {
    // Get the keys of the objects
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    // Check if the number of properties is the same
    if (keys1.length !== keys2.length) {
        return false
    }

    // Compare the values of each property
    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false
        }
    }

    // All properties have the same values
    return true
}

export const isTrue = (obj: any) => Object.values(obj).every((item) => item)

export const checkObjectPropertiesNull = (obj: any) => {
    return Object.values(obj).every((prop) => prop === null)
}
