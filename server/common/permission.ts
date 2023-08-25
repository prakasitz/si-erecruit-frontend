import { ContextUser, Permission, jwtAdfs, jwtCandidate } from '../../utils/types'

export function canAccessAdmin(user: ContextUser<jwtAdfs>): boolean {
    if (user.role.some((role) => role === 'SUPER_ADMIN' || role === 'ADMIN')) return true
    return false
}

export function canAccessHR(user: ContextUser<jwtAdfs>): boolean {
    if (user.role.some((role) => role === 'HR')) return true
    return false
}

export function canAccessCandidate(user: ContextUser<jwtCandidate>): boolean {
    if (user.role.some((role) => role === 'CANDIDATE')) return true
    return false
}

export function hasPermission(user: ContextUser<any>, permission: Permission): boolean {
    // Check if user has the permission
    const permissions = {
        'can-access-admin': canAccessAdmin(user),
        'can-access-hr': canAccessHR(user),
        'can-access-candidate': canAccessHR(user),
        'can-access-hr-candidate': canAccessHR(user) || canAccessCandidate(user),
    }

    // If permission does not exist, return false
    if (permission in permissions === false) {
        console.log(`hasPermission: No such permission as "${permission}"`)
        return false
    } else {
        // @ts-ignore
        return permissions[permission]
    }
}
