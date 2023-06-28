const defaultStorage = process.env.NODE_ENV !== 'production' ? 'cache' : undefined

export async function getItemStorage(key: string) {
    return useStorage(defaultStorage).getItem(key)
}

export async function setItemStorage({ key, values }: { key: string; values: any }) {
    return useStorage(defaultStorage).setItem(key, values, {
        ttl: 10000,
    })
}
