<template>
    <v-dialog v-model="props.dialog" width="auto" persistent>
        <!-- <v-form validate-on="submit lazy" @submit.prevent="submit" ref="userForm"> -->
        <v-form @submit.prevent="submit" ref="userForm">
            <v-card class="mb-5" width="800">
                <v-toolbar density="compact" :color="bgColor">
                    <v-icon class="ml-2" :icon="'mdi-information-outline'"></v-icon>
                    <v-card-title class="pl-2" :style="{ 'font-size': '16px !important' }">
                        <span class="text-h6 ml-0"> {{ context.title }} </span>
                    </v-card-title>
                </v-toolbar>
                <v-card-text>
                    <v-row>
                        <v-col cols="5">
                            <v-text-field
                                v-model="userModel.SAP_ID"
                                hint="ใช้ 0-9 เท่านั้น"
                                label="SAP ID"
                                counter="8"
                                ref="sap_id_input"
                                @keydown.space.prevent
                                :readonly="props.formType == 'edit'"
                                :hide-details="props.formType == 'edit'"
                                :variant="props.formType == 'edit' ? 'solo-filled' : 'outlined'"
                                :error="isSAPIDUnique === false"
                                :error-messages="isSAPIDUnique === false ? ['SAP ID นี้ถูกใช้แล้ว'] : []"
                                :rules="
                                    fieldRules({
                                        length: 8,
                                        //regex for number only
                                        formatRequired: /^[0-9]*$/,
                                        type: 'string',
                                    })
                                "
                                class="sap-id"
                            >
                                <template #append-inner>
                                    <v-progress-circular
                                        v-if="sap_id_input_loading"
                                        indeterminate
                                        color="grey"
                                        size="small"
                                    ></v-progress-circular>
                                    <div v-else>
                                        <v-tooltip size="small" :text="statusComputed?.tooltip">
                                            <template v-slot:activator="{ props }">
                                                <v-icon v-bind="{ props, ...statusComputed }" class="mx-1" />
                                            </template>
                                        </v-tooltip>
                                    </div>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="5">
                            <v-text-field
                                v-model="userModel.SAP_name"
                                :rules="
                                    fieldRules({
                                        length: 50,
                                        type: 'string',
                                    })
                                "
                                hint="ใช้ a-z, A-Z, 0-9 เท่านั้น"
                                counter="50"
                                label="SAP Name"
                                variant="outlined"
                                class="sap-id"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="5">
                            <v-row no-gutters>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="userModel.name"
                                        counter="50"
                                        label="ชื่อ (ไม่บังคับ)"
                                        variant="outlined"
                                        density="compact"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="userModel.lastname"
                                        validate-on="submit lazy"
                                        counter="50"
                                        label="สกุล (ไม่บังคับ)"
                                        variant="outlined"
                                        density="compact"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-divider vertical></v-divider>
                        <v-col offset="1" cols="5">
                            <v-select
                                v-model="userModel.role_ID"
                                :items="rolesData"
                                item-title="role_name"
                                item-value="role_ID"
                                label="Role"
                                variant="outlined"
                                density="compact"
                            >
                            </v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="5">
                            <v-card variant="outlined">
                                <v-card-title>User Config</v-card-title>
                                <v-card-text class="pb-0">
                                    <v-row no-gutters>
                                        <v-col cols="12">
                                            <v-switch
                                                v-model="userModel.locked_user"
                                                hide-details
                                                :color="userModel.locked_user ? 'main-color' : 'success'"
                                            >
                                                <template #label>
                                                    <v-icon
                                                        :icon="
                                                            userModel.locked_user
                                                                ? 'mdi-account-lock'
                                                                : 'mdi-account-lock-open'
                                                        "
                                                    >
                                                    </v-icon>
                                                    <div class="ml-2 text-h7 font-weight-bold">
                                                        {{ userModel.locked_user ? 'Lock' : 'Active' }}
                                                    </div>
                                                </template>
                                            </v-switch>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col cols="12">
                                            <v-switch
                                                v-model="userModel.local_user"
                                                hide-details
                                                :color="userModel.local_user ? 'main-color' : ''"
                                            >
                                                <template #label>
                                                    <v-icon
                                                        :icon="userModel.local_user ? 'mdi-account-tie' : 'mdi-account'"
                                                    >
                                                    </v-icon>
                                                    <div class="ml-2 text-h7 font-weight-bold">
                                                        {{ userModel.local_user ? 'Local' : 'Non-local' }}
                                                    </div>
                                                </template>
                                            </v-switch>
                                        </v-col>
                                        <v-expand-transition>
                                            <v-col cols="12" v-if="userModel.local_user">
                                                <v-text-field
                                                    v-if="userModel.local_user"
                                                    :rules="
                                                        fieldRules({
                                                            length: 100,
                                                            type: 'string',
                                                        })
                                                    "
                                                    v-model="userModel.local_password"
                                                    autocomplete="false"
                                                    type="password"
                                                    counter="12"
                                                    label="New Local-Password"
                                                    variant="outlined"
                                                    density="compact"
                                                ></v-text-field>
                                            </v-col>
                                        </v-expand-transition>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-divider vertical></v-divider>
                        <v-col offset="1" cols="5">
                            <v-textarea
                                v-model="userModel.note"
                                :rules="
                                    fieldRules({
                                        length: 255,
                                        type: 'string',
                                    })
                                "
                                label="Note"
                                validate-on="submit lazy"
                                counter="255"
                                variant="outlined"
                                density="compact"
                            >
                            </v-textarea>
                            <v-checkbox
                                hide-details
                                density="compact"
                                v-model="check_accept"
                                label="ยืนยันการบันทึกข้อมูล"
                            ></v-checkbox>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-col cols="3" align-self="center" class="text-right">
                        <v-btn
                            variant="flat"
                            :color="bgColor"
                            :text="context.btnSubmit"
                            :disabled="!check_accept"
                            type="submit"
                            :loading="loading"
                        />
                        <v-btn variant="outlined" text="close" @click="emit('update:dialog', false)" />
                    </v-col>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<style scoped>
.v-input.sap-id:deep() .v-field__input {
    font-size: 1.3em;
    font-weight: bold;
}
</style>

<script lang="ts" setup>
import { SubmitEventPromise } from 'vuetify/lib/framework.mjs'
import { VTextField } from 'vuetify/lib/components/VTextField/index.mjs'

import { SRC_User } from '~/utils/types'
import { NuxtError } from 'nuxt/app'

const emit = defineEmits(['update:dialog'])

const props = defineProps({
    dialog: {
        type: Boolean,
        required: true,
    },
    user: {
        type: Object as PropType<SRC_User>,
        required: false,
    },
    formType: {
        type: String as PropType<'create' | 'edit' | ''>,
        required: true,
    },
})

const { fieldRules } = useFillRules()
const { fetchSRCUserById, createSRCUser, updateSRCUserById } = useUserManagement()
const { fetchRoles } = useMaster()

const route = useRoute()

const userModel: Ref<SRC_User> = ref(deepCopy(defaultSRCUserForm))

const currentBgColor = ref('')
const currentContext = ref({
    title: '',
    btnSubmit: '',
})

const context = computed(() => {
    switch (props.formType) {
        case 'edit':
            currentContext.value = {
                title: 'แก้ไขข้อมูลผู้ใช้',
                btnSubmit: 'Save',
            }
            break
        case 'create':
            currentContext.value = {
                title: 'สร้างข้อมูลผู้ใช้',
                btnSubmit: 'Create',
            }
            break
        default:
            break
    }
    return currentContext.value
})

const bgColor = computed(() => {
    switch (props.formType) {
        case 'edit':
            currentBgColor.value = 'amber-darken-4'
            break
        case 'create':
            currentBgColor.value = 'main-color'
            break
        default:
            break
    }
    return currentBgColor.value
})

const check_accept = ref(false)

/**
- null = not check
- true = unique
- false = not unique
**/
const isSAPIDUnique = ref<boolean | null>(null)
const statusSAPID = reactive({
    success: {
        icon: 'mdi-check',
        color: 'success',
        tooltip: 'ใช้ SAP ID นี้ได้',
    },
    error: {
        icon: 'mdi-close',
        color: 'error',
        tooltip: 'SAP ID ถูกใช้แล้ว',
    },
})
const statusComputed = computed(() => {
    if (isSAPIDUnique.value === null) {
        return null
    } else if (isSAPIDUnique.value === true) {
        return statusSAPID.success
    } else if (isSAPIDUnique.value === false) {
        return statusSAPID.error
    }
})
const loading = ref(false)
const sap_id_input_loading = ref(false)

const debouncedSAP_ID = useDebouncedRef('', 500)
const sap_id_input = ref<VTextField>()
/*
    Watchers for SAP ID Field
    1. on create mode
    2. trigger loading icon
    3. model value change debounceSAP_ID
*/
watch(
    () => userModel.value.SAP_ID,
    (newValue) => {
        if (props.formType == 'create') {
            sap_id_input_loading.value = true
            debouncedSAP_ID.value = newValue
        }
    }
)
/*
    Watchers for debouncedSAP_ID
    1. on create mode
    2. check the value has String
    3. foroce validate the field
    4. if valid, check the SAP ID is unique
        -  SAP_ID unique, set isSAPIDUnique to true (change icon to success)
        -  SAP_ID not unique, set isSAPIDUnique to false (change icon to error)
        -  SAP_ID null or empty, set isSAPIDUnique to null (change icon to null)
    5. after valid set loading icon to false (hide loading icon)
*/
watch(debouncedSAP_ID, (newVal: string) => {
    //trim and check null or empty
    let hasString = newVal && newVal.trim() !== ''
    sap_id_input.value
        ?.validate()
        .then(async (v) => {
            if (checkObjectPropertiesNull(v) && hasString) {
                isSAPIDUnique.value = await checkSAPID(newVal)
                if (isSAPIDUnique.value == false) {
                    // sap_id_fieldRules.value.push(
                    //     (v: string) => `SAP ID ${newVal} ถูกใช้แล้ว กรุณาใช้ SAP ID อื่น` as any
                    // )
                }
            } else {
                isSAPIDUnique.value = null
            }
        })
        .finally(() => {
            sap_id_input_loading.value = false
        })
})

const checkSAPID = async (sap_id: string) => {
    const { error: userError } = await fetchSRCUserById(sap_id, 'chk_unique')
    if (userError.value === null) {
        return true
    } else {
        const { showTokenExpired } = useErrorHandler()
        const { statusCode } = userError.value

        if (statusCode === 401) {
            showTokenExpired(route)
        } else if (statusCode === 400) {
        }
        return false
    }
}

const { showDialog, dialogContext, dialogInfo, dialogError } = useDialog()

const submit = async (event: SubmitEventPromise) => {
    loading.value = true
    const results = await event
    loading.value = false

    if (results.valid) {
        const context = dialogContext()
        let dialog: Ref<boolean> | undefined
        try {
            if (props.formType == 'create') {
                const { data: respData, error } = await createSRCUser(userModel.value)
                if (error.value) throw error.value
                dialog = dialogInfo()
                context.value = {
                    title: 'สร้างข้อมูลผู้ใช้',
                    message: `สร้างข้อมูลผู้ใช้ ${userModel.value.SAP_ID} สำเร็จ`,
                    actionButtons: [
                        {
                            text: 'Close',
                        },
                    ],
                    persistent: true,
                }
            } else if (props.formType == 'edit') {
                const { data: respData, error } = await updateSRCUserById(userModel.value)
                if (error.value) throw error.value
                dialog = dialogInfo()
                context.value = {
                    title: 'แก้ไขข้อมูลผู้ใช้',
                    message: `แก้ไขข้อมูลผู้ใช้ ${userModel.value.SAP_ID} สำเร็จ`,
                    actionButtons: [
                        {
                            text: 'Close',
                        },
                    ],
                    persistent: true,
                }
            }

            if (dialog) showDialog(context.value, dialog)
        } catch (error: any) {
            let statusCode = isNuxtError(error) ? error.statusCode : 500
            dialog = dialogError()
            context.value = {
                title: 'เกิดข้อผิดพลาด',
                message: `เกิดข้อผิดพลาด (${statusCode}) <br> ${error.data?.message || error.message || error}`,
                actionButtons: [
                    {
                        text: 'Close',
                    },
                ],
                persistent: true,
            }
            showDialog(context.value, dialog)
        } finally {
            emit('update:dialog', false)
        }
    } else {
        check_accept.value = false
    }
}

const { data: rolesData } = await fetchRoles()

// Initialize user model for editing
const initializeUserForEdit = () => {
    if (props.user && props.formType === 'edit') {
        userModel.value = deepCopy(props.user)
    }
}

// Reset the state when the dialog is closed
const resetStateAfterDialogClose = () => {
    if (!props.dialog) {
        setTimeout(() => {
            check_accept.value = false
            isSAPIDUnique.value = null
            sap_id_input_loading.value = false
            currentBgColor.value = ''
            currentContext.value = {
                title: '',
                btnSubmit: '',
            }
            userModel.value = deepCopy(defaultSRCUserForm)
        }, 200)
    }
}

/**
 * Watchers for dialog
 * 1. Dialog just opened -> initializeUserForEdit()
 * 2. Dialog just closed -> resetStateAfterDialogClose()
 */
watch(
    () => props.dialog,
    (newDialog, oldDialog) => {
        if (newDialog) {
            // Dialog just opened
            initializeUserForEdit()
        } else if (!newDialog) {
            // Dialog just closed
            resetStateAfterDialogClose()
        }
    }
)

onBeforeUnmount(() => {
    sap_id_input.value = undefined
})
</script>
