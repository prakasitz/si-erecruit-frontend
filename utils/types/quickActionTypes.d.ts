// Define a type for action constructors
export type ActionConstructor = new (params: ActionParams) => QuickAction

export type StatusActions = {
    [key: string]: string[]
}

export type QuickActionsTableType = {
    [key: string]: StatusActions
}

export interface ActionParams {
    job_id?: number // Making it optional in case some actions don't require it
    profile_id: number
}
