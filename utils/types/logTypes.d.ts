export type LogPaging = {
    page_count: number
    item_per_page: number
    sort_by?: string
}

export type LogResponse = {
    num_of: number
    count: number
    rows: LogData[]
}

export type LogData = {
    log_ID: number
    log_type: string
    requester: string
    object?: string
    ip: string
    timestamp: Date
    timestamp_str?: string
    msg: string
}
