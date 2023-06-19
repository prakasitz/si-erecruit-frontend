export const useNavigateTo = (role: any) => {
    console.log('role', role)
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
