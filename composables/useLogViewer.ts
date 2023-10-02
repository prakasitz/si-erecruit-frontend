import { LogData, LogPaging, LogResponse } from '~/utils/types/logTypes'

export default function useLogViewer() {
    return { fetchLogPaging, LogTableHandler }
}

const fetchLogPaging = (data: LogPaging) => {
    return useApi('/api/external/logs/paging', {
        headers: {
            Accept: 'application/json',
        },
        method: 'POST',
        body: data,
        transform(data: LogResponse) {
            data.rows.map((row) => {
                row.timestamp_str = dateToString(row.timestamp, DateFormatEnum.DATE_TIME_BUDDHIST_1)
                return row
            })
            return data
        },
        key: 'fetchLogPaging',
        server: false,
    })
}

const LogTableHandler = () => {
    const serverItems = ref<LogData[]>([])
    const loading = ref(true)
    const totalItems = ref(0)
    const itemsPerPage = ref(25)

    const loadItems = async ({ page, itemsPerPage, sortBy, ...args }: any) => {
        console.log(args)
        sortBy = 'DESC'
        loading.value = true
        const { data, error, pending } = await fetchLogPaging({
            page_count: page,
            item_per_page: itemsPerPage,
            sort_by: sortBy,
        })

        watchPostEffect(() => {
            serverItems.value = data.value?.rows ?? []
            totalItems.value = data.value?.count ?? 0
            loading.value = false
        })
    }

    return {
        serverItems,
        loading,
        totalItems,
        itemsPerPage,
        loadItems,
    }
}
