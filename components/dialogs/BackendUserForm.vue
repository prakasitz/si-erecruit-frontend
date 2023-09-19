<template>
    <v-dialog v-model="props.dialog" width="auto" persistent>
        <v-form validate-on="submit lazy" @submit.prevent="submit" ref="userForm">
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
                                :rules="
                                    fieldRules({
                                        length: 8,
                                        //regex for english and number only
                                        formatRequired: /^[a-zA-Z0-9]*$/,
                                        type: 'string',
                                    })
                                "
                                hint="ใช้ 0-9 เท่านั้น"
                                label="SAP ID"
                                variant="outlined"
                                counter="8"
                                :readonly="props.formType == 'edit'"
                                class="sap-id"
                            ></v-text-field>
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
                                        :rules="
                                            fieldRules({
                                                length: 50,
                                                type: 'string',
                                            })
                                        "
                                        counter="50"
                                        label="สกุล (ไม่บังคับ)"
                                        variant="outlined"
                                        density="compact"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="userModel.lastname"
                                        :rules="
                                            fieldRules({
                                                length: 50,
                                                type: 'string',
                                            })
                                        "
                                        counter="50"
                                        label="ชื่อ (ไม่บังคับ)"
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
                                :rules="fieldRules({})"
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
import { SRC_User } from '~/utils/types'

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
const { fetchSRCUserById, createSRCUserById, updateSRCUserById } = useUserManagement()
const { fetchRoles } = useMaster()

const userModel: Ref<SRC_User> = ref(deepCopy(defaultSRCUserForm))

const loading = ref(false)
const submit = async (event: SubmitEventPromise) => {
    loading.value = true

    const results = await event

    loading.value = false

    alert(JSON.stringify(results, null, 2))

    if (results.valid) emit('update:dialog', false)
}

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

const { data: rolesData } = await fetchRoles()

watchEffect(() => {
    if (props.user && props.formType === 'edit' && props.dialog) {
        userModel.value = props.user
    }
})

watchPostEffect(() => {
    if (!props.dialog) {
        setTimeout(() => {
            check_accept.value = false
            currentBgColor.value = ''
            currentContext.value = {
                title: '',
                btnSubmit: '',
            }
            userModel.value = deepCopy(defaultSRCUserForm)
        }, 200)
    }
})
</script>
