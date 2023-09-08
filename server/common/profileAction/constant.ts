import { ActionConstructor, ActionStatusIdMappingType, QuickActionsTableType } from '../../../utils/types'
import {
    CancelBtn,
    DeleteBtn,
    PublishableBtn,
    SuspendedBtn,
    VerifedBtn,
    VerifyBtn,
    ViewBtn,
    WaiveBtn,
} from './quick_action'

// Mapping from action strings to their respective classes
export const actionClassMapping: { [key: string]: ActionConstructor } = {
    Vi: ViewBtn,
    C: CancelBtn,
    W: WaiveBtn,
    P: PublishableBtn,
    S: SuspendedBtn,
    V: VerifyBtn,
    Ve: VerifedBtn,
    D: DeleteBtn,
    // ... add other mappings as needed
}

export const actionStatusIdMapping: ActionStatusIdMappingType = {
    publishable: [1, 3, 9, 6],
    suspend: [1, 2, 5],
    cancel: [1, 2, 5],
    waive: [1, 2],
    verify: [4],
    verified: [5],
    delete: [1],
}

export const quickActionsTable: QuickActionsTableType = {
    Imported: {
        Imported: ['Vi', 'P/S', 'C/W', 'C', 'W', 'P', 'S', 'D'],
        Publishable: ['Vi', 'S'],
        Submitted: [],
        Verified: [],
        Suspended: ['Vi', 'P'],
        Cancelled: ['Vi', 'P'],
        Waived: ['Vi', 'P'],
    },
    Published: {
        Imported: ['Vi', 'S', 'C/W', 'C', 'W'],
        Publishable: ['Vi', 'S', 'C/W', 'C', 'W'],
        Submitted: ['Vi'],
        Verified: [],
        Suspended: ['Vi', 'P'],
        Cancelled: ['Vi', 'P'],
        Waived: ['Vi', 'P'],
    },
    Verifying: {
        Imported: ['Vi', 'S', 'C'],
        Publishable: ['Vi', 'V'],
        Submitted: ['Vi', 'Ve'],
        Verified: ['Vi', 'P'],
        Suspended: ['Vi', 'P'],
        Cancelled: ['Vi', 'P'],
        Waived: ['Vi', 'P'],
    },
    Approved: {
        Imported: ['Vi'],
        Publishable: ['Vi'],
        Submitted: ['Vi'],
        Verified: ['Vi'],
        Suspended: ['Vi'],
        Cancelled: ['Vi'],
        Waived: ['Vi'],
    },
    Closed: {
        Imported: ['Vi'],
        Publishable: ['Vi'],
        Submitted: ['Vi'],
        Verified: ['Vi'],
        Suspended: ['Vi'],
        Cancelled: ['Vi'],
        Waived: ['Vi'],
    },
    Cancelled: {
        Imported: ['Vi'],
        Publishable: ['Vi'],
        Submitted: ['Vi'],
        Verified: ['Vi'],
        Suspended: ['Vi'],
        Cancelled: ['Vi'],
        Waived: ['Vi'],
    },
    Suspended: {
        Imported: ['Vi'],
        Publishable: ['Vi', 'S', 'C/W', 'C', 'W'],
        Submitted: ['Vi'],
        Verified: ['Vi'],
        Suspended: ['Vi', 'P'],
        Cancelled: ['Vi', 'P'],
        Waived: ['Vi', 'P'],
    },
}
