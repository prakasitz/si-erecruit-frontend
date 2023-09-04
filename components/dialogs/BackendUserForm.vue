<template>
    <v-dialog :model-value="props.dialog" width="auto" persistent>
        <v-form ref="userForm">
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
                                :rules="
                                    fieldRules({
                                        length: 8,
                                        type: 'string',
                                    })
                                "
                                label="SAP ID"
                                variant="outlined"
                                counter="8"
                                :readonly="props.formType == 'edit'"
                                class="sap-id"
                            ></v-text-field>
                        </v-col>
                        <v-spacer></v-spacer>
                    </v-row>

                    <v-row>
                        <v-col cols="5">
                            <v-text-field
                                :rules="
                                    fieldRules({
                                        length: 50,
                                        type: 'string',
                                    })
                                "
                                counter="50"
                                label="SAP Name"
                                variant="outlined"
                                density="compact"
                            ></v-text-field>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-divider vertical></v-divider>
                        <v-col offset="1" cols="5">
                            <v-select
                                :rules="
                                    fieldRules({
                                        type: 'string',
                                    })
                                "
                                :items="['Super Admin', 'General Admin', 'HR Officer', 'Department Officer']"
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
                                                v-model="userLock"
                                                hide-details
                                                :color="userLock ? 'main-color' : 'success'"
                                            >
                                                <template #label>
                                                    <v-icon
                                                        :icon="userLock ? 'mdi-account-lock' : 'mdi-account-lock-open'"
                                                    >
                                                    </v-icon>
                                                    <div class="ml-2 text-h7 font-weight-bold">
                                                        {{ userLock ? 'Lock' : 'Active' }}
                                                    </div>
                                                </template>
                                            </v-switch>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col cols="12">
                                            <v-switch
                                                v-model="userLocal"
                                                hide-details
                                                :color="userLocal ? 'main-color' : ''"
                                            >
                                                <template #label>
                                                    <v-icon :icon="userLocal ? 'mdi-account-tie' : 'mdi-account'">
                                                    </v-icon>
                                                    <div class="ml-2 text-h7 font-weight-bold">
                                                        {{ userLocal ? 'Local' : 'Non-local' }}
                                                    </div>
                                                </template>
                                            </v-switch>
                                        </v-col>
                                        <v-expand-transition>
                                            <v-col cols="12" v-if="userLocal">
                                                <v-text-field
                                                    v-if="userLocal"
                                                    :rules="
                                                        fieldRules({
                                                            length: 100,
                                                            type: 'string',
                                                        })
                                                    "
                                                    type="password"
                                                    counter="12"
                                                    label="Local-Password"
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
                            <v-textarea label="Note" counter="255" variant="outlined" density="compact"> </v-textarea>
                            <v-checkbox
                                hide-details
                                :rules="fieldRules({})"
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
                            @click="emit('update:dialog', false)"
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
import { SRC_User } from '~/utils/types';

/*
	   [SAP_ID] -- INPUT
      ,[SAP_name] -- INPUT
      ,[role_ID] -- INPUT
      ,[locked_user] -- INPUT CREATE is 0
      ,[last_login]
      ,[note] -- INPUT
	   ,[local_password] -- INPUT
      ,[local_user] -- INPUT
      ,[created_at]
      ,[created_by]
      ,[name]
      ,[lastname]
      */

const currentBgColor = ref('')
const currentContext = ref(
    reactive({
        title: '',
        btnSubmit: '',
    })
)

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

const { fieldRules } = useFillRules()

const check_accept = ref(false)
const userLock = ref(false)
const userLocal = ref(false)
const rulesConfig = reactive({})

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

</script>
