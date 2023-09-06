import { Profile, Profilez } from './profileTypes'
import { QuickActionEnum } from '../enum'

export interface IQuickAction {
    name: string
    url?: string
    text: string
    color: string
    icon?: string
    actions?: IQuickAction[]
}

export type QuickActionName = `${QuickActionEnum}`

// Define a type for action constructors
export type ActionConstructor = new (params: ActionParams) => IQuickAction

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

export type ProfileWithQuickAction = Profilez & { quickActions: IQuickAction[] }
