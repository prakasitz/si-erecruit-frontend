import { useUserStore } from '~/stores/user.store'

export default function useBreadcrumb() {
    const appBaseUrl = useRuntimeConfig().app.baseURL
    const { isCandidate } = useUserStore()
    const prefixUrlCandidate = `candidate/`

    const defaultState = [
        {
            title: 'หน้าหลัก',
            disabled: true,
            href: `${appBaseUrl}${isCandidate ? prefixUrlCandidate : ''}`,
        },
    ]

    const state = useState('breadcrumb', () => {
        return defaultState
    })

    const setBreadcrumbs = (data: any = undefined) => {
        state.value = defaultState
        if (data && data.length > 0) {
            state.value[0].disabled = false
            data = data.map((item: any) => {
                return {
                    ...item,
                    href: `${appBaseUrl}${item.href}`,
                }
            })
            state.value.push(...data)
        }
    }

    return {
        breadcrumbState: state,
        setBreadcrumbs,
    }
}
