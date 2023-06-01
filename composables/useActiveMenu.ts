export const useActiveMenu = (toUrl: any) => {
    return toUrl == useRoute().path
}
