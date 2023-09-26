import { Roles } from '~/utils/types'

export const usePageLayout = (layout: string | null) => {
    if (!layout) return
    setPageLayout(layout)
}
