export const useDatePickerFlow = () => {
    return useState(
        'flow',
        () =>
            ['year', 'month', 'calendar'] as (
                | 'month'
                | 'year'
                | 'calendar'
                | 'time'
                | 'minutes'
                | 'hours'
                | 'seconds'
            )[]
    )
}
