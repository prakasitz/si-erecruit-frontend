<template>
    <v-dialog :model-value="props.dialog" width="auto" persistent>
        <v-form ref="userForm">
            <v-card class="mb-5" width="800">
                <v-toolbar density="compact" :color="'main-color'">
                    <v-icon class="ml-2" :icon="'mdi-information-outline'"></v-icon>
                    <v-card-title class="pl-2" :style="{ 'font-size': '16px !important' }">
                        <div v-if="props.formType == 'edit'">
                            <span class="text-h6 ml-0"> แก้ไขข้อมูลผู้ใช้ </span>
                        </div>
                        <div v-else><span class="text-h6 ml-0"> สร้างข้อมูลผู้ใช้ </span></div>
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
                                class="mt-1 sap-id"
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
                                class="mt-1"
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
                                class="mt-1"
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
                                <v-card-text>
                                    <v-row no-gutters>
                                        <v-col>
                                            <v-switch v-model="userLock">
                                                <template #label>
                                                    <v-icon
                                                        :icon="userLock ? 'mdi-account-lock' : 'mdi-account-lock-open'"
                                                    >
                                                    </v-icon>
                                                    <div class="ml-2 text-h7 font-weight-bold">
                                                        {{ userLock ? 'Lock' : 'Unlock' }}
                                                    </div>
                                                </template>
                                            </v-switch>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col>
                                            <v-switch v-model="userLocal">
                                                <template #label>
                                                    <v-icon :icon="userLocal ? 'mdi-account-tie' : 'mdi-account'">
                                                    </v-icon>
                                                    <div class="ml-2 text-h7 font-weight-bold">
                                                        {{ userLocal ? 'Local' : 'Non-local' }}
                                                    </div>
                                                </template>
                                            </v-switch>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-divider vertical></v-divider>
                        <v-col offset="1" cols="5">
                            <v-textarea label="Note" counter="255" class="mt-1" variant="outlined" density="compact">
                            </v-textarea>
                        </v-col>
                    </v-row>
                    <v-row></v-row>
                    <v-row></v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn variant="flat" color="blue" text="Save" @click="emit('update:dialog', false)" />
                    <v-btn variant="outlined" text="close" @click="emit('update:dialog', false)" />
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<style scoped>
.v-input.sap-id:deep() .v-field__input {
    font-size: 1.5em;
    font-weight: bold;
}
</style>

<script lang="ts" setup>
const { fieldRules } = useFillRules()

const userLock = ref(false)
const userLocal = ref(false)
const rulesConfig = reactive({})

const emit = defineEmits(['update:dialog'])

const props = defineProps({
    dialog: {
        type: Boolean,
        required: true,
    },
    formType: {
        type: String as PropType<'create' | 'edit' | ''>,
        required: true,
    },
})

const dialog = ref(false)
</script>
