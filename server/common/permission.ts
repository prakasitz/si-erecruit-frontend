import { User } from '../../utils/types'

export function canAccessAdmin(user: User): boolean {
    if (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN') return true

    return false
}

export function canAccessHR(user: User): boolean {
    if (user.role === 'HR') return true

    return false
}

export function hasPermission(user: User, permission: string): boolean {
    // Check if user has the permission
    const permissions = {
        'can-access-admin': canAccessAdmin(user),
        'can-access-hr-user': canAccessHR(user),
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
