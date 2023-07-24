export default function useSettings() {
    return {
        fetchSettings,
        fetchBySettings,
        updateSetting
    }
}
const fetchSettings = () => {
    /*
     */
    return useFetch('/api/external/master/settings', {
        headers: {
            Accept: 'application/json',
        },
        method: 'GET',
        transform(data: any) {
            const result = data.map(({ setting_key, value }: any): any => {
                const _value = value.length > 50 ? value.substr(0, 50) + '...' : value
                return {
                    setting_key,
                    value: _value
                }
            }
            )
            return result
        },
        server: false,
    })
}

const fetchBySettings = (setting_keys: string[]) => {
    /*
     */
    return useFetch('/api/external/master/settings', {
        headers: {
            Accept: 'application/json',
        },
        method: 'POST',
        body: { setting_keys },
        transform(data: any) {
            return data
        },
        server: false,
    })
}


const updateSetting = (setting: { setting_key: string, value: string }) => {
    /*
     */
    return useFetch('/api/external/master/setting', {
        headers: {
            Accept: 'application/json',
        },
        method: 'PUT',
        body: setting,
        transform(data: any) {
            return data
        },
        server: false,
    })
}
