export const useNavigateTo = (role: any) => {
    let url = ''
    switch (role) {
        case 'admin':
            url = '/'
            break
        case 'candidate':
            url = '/candidate/'
            break
        default:
            url = '/'
            break
    }

    return navigateTo(url, { replace: true })
}
