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

    const [isAdmin, isHR, isCandidate] = [canAccessAdmin(user), canAccessHR(user), canAccessCandidate(user)]
    console.log('hasPermission: Checking permission', permission, {
        isAdmin,
        isHR,
        isCandidate,
    })
    const permissions = {
        'can-access-admin': isAdmin,
        'can-access-hr': isHR,
        'can-access-candidate': isCandidate,
        'can-access-hr-candidate': isHR || isCandidate,
        'can-access-admin-hr-candidate': isAdmin || isHR || isCandidate,
        'can-access-admin-hr': isAdmin || isHR,
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
