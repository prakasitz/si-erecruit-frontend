export const useActiveMenu = (toUrl: any) => {
    const routeUrl = useRoute().path.replace(/\/$/, '')
    const url = toUrl.replace(/\/$/, '')
    return url == routeUrl
}
