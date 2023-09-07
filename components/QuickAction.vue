<template>
    <!-- Button in Quick 
        Action:
        + View | Edit | 
        + Cancel (Waive) | Active |   
        + Publishable | Suspend | Delete

        Props: 
        + job: Job
        + profile: Profile
    -->

    <div class="d-flex justify-center flex-wrap">
        <div v-for="action in profile.quickActions" :key="`btn${action.name}-${profile.profile_ID}`">
            <div class="mx-1">
                <v-tooltip :text="action.name">
                    <template v-slot:activator="{ props }">
                        <v-btn
                            variant="text"
                            density="compact"
                            v-bind="{ ...props, ...action }"
                            @click="handleAction($event, action)"
                        >
                        </v-btn>
                    </template>
                </v-tooltip>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { DialogContext, Job, Profile, IQuickAction, QuickActionName } from '~/utils/types'
import { VBtn } from 'vuetify/lib/components/index.mjs'
import { QuickActionEnum } from '~/utils/enum'

type VBtnProps = VBtn['$props'] & ExtraProps
type ExtraProps = {
    id: string
    show?: boolean
    toggle?: {
        condition: (status: string) => boolean
        to: string
    }
    actionName?: QuickActionName
    dialogContext?: DialogContext.Context
    // action?: (event: Event, ...arg: any) => void | Promise<void>
}

type PropsProfile = {
    fullname: string
    job_ID: number
    phone: string
    pid: string
    profile_ID: number
    profile_status: number
    profile_status_code: string
    quickActions: IQuickAction[]
}

const props = defineProps({
    job: {
        type: Object as PropType<Job>,
        required: true,
    },
    profile: {
        type: Object as PropType<PropsProfile>,
        required: true,
    },
})

const { dialogConfirm, showDialog } = useDialog()
const { publishableProfile, suspendedProfile } = useProfile()

const dialog = dialogConfirm()

const fullNameWithId = (profile: PropsProfile) => {
    return `${profile.fullname} (${profile.profile_ID})`
}

const getProfileFullname = (profile: PropsProfile) => {
    return profile.fullname
}

const getProfileID = (profile: PropsProfile) => {
    return profile.profile_ID
}

const { cancelProfile } = useButtonAction()

const handleAction = (event: Event, action: IQuickAction) => {
    let p = props.profile
    let commonButtons = [
        {
            text: 'Close',
            color: 'gray',
        },
    ]
    let dialogContext: DialogContext.Context | undefined = {
        title: `${action.name} this profile`,
        dialogColor: action.color,
        message: `Are you sure to <b>${action.name}</b> this profile <br>
                    "${fullNameWithId(p)}" ?`,
        item: {
            id: {
                job_ID: p.job_ID,
                profile_IDs: [p.profile_ID],
            },
        },
        actionButtons: commonButtons,
        persistent: true,
    }

    switch (action.name) {
        case QuickActionEnum.CANCEL:
            dialogContext = {
                ...dialogContext,
                actionButtons: [
                    {
                        text: 'Cancel',
                        variant: 'elevated',
                        color: action.color,
                    },
                    ...commonButtons,
                ],
            }
            break
        case QuickActionEnum.WAIVE:
            dialogContext = {
                ...dialogContext,
                actionButtons: [
                    {
                        text: 'Waive',
                        variant: 'elevated',
                        color: action.color,
                    },
                    ...commonButtons,
                ],
            }
        case QuickActionEnum.PUBLISHABLE:
            dialogContext = {
                ...dialogContext,
                actionButtons: [
                    {
                        text: 'Publishable',
                        variant: 'elevated',
                        color: action.color,
                        cb: publishableProfile,
                    },
                    ...commonButtons,
                ],
            }
            break
        case QuickActionEnum.SUSPEND:
            dialogContext = {
                ...dialogContext,
                actionButtons: [
                    {
                        text: 'Suspend',
                        variant: 'elevated',
                        color: action.color,
                        cb: suspendedProfile,
                    },
                    ...commonButtons,
                ],
            }
            break
        case QuickActionEnum.VERIFY:
            dialogContext = {
                ...dialogContext,
                actionButtons: [
                    {
                        text: 'Verify',
                        variant: 'elevated',
                        color: action.color,
                    },
                    ...commonButtons,
                ],
            }
            break
        case QuickActionEnum.VERIFYED:
            dialogContext = {
                ...dialogContext,
                actionButtons: [
                    {
                        text: 'Revoke Verify',
                        variant: 'elevated',
                        color: action.color,
                    },
                    ...commonButtons,
                ],
            }
            break
        case QuickActionEnum.DELETE:
            dialogContext = {
                ...dialogContext,
                message: `Are you sure to <b>${action.name}</b> this profile<br>
                            "${fullNameWithId(p)}" ? <br>
                            System will Permanently <b>${action.name}</b> this profile.`,
                actionButtons: [
                    {
                        text: 'Delete',
                        variant: 'elevated',
                        color: action.color,
                    },
                    ...commonButtons,
                ],
            }
            break
        //special case
        case QuickActionEnum.S_CANCEL_OR_WAIVE:
            dialogContext = {
                ...dialogContext,
                message: `Please, choose <b>${action.name}</b> for <br>
                        "${fullNameWithId(p)}" ?`,
                actionsMeta: action.actions,
                actionButtons: [
                    {
                        text: 'Cancel',
                        variant: 'elevated',
                        color: action.color,
                    },
                    {
                        text: 'Waive',
                        variant: 'elevated',
                        color: action.color,
                    },
                    ...commonButtons,
                ],
            }
            break
        case QuickActionEnum.VIEW:
        default:
            dialogContext = undefined
            break
    }

    if (dialogContext) showDialog(dialogContext, dialog)
}

onMounted(() => {
    // console.log('job', props.job.job_ID)
    // console.log('profile', props.profile.profile_ID)
})
</script>
