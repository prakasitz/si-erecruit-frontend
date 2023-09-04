<template>
    <v-dialog v-model="dialog" width="auto" :persistent="context.persistent">
        <template v-slot:activator="{ props }">
            <dev-only>
                <v-row justify="center" class="ma-2">
                    <v-btn :color="context.dialogColor" v-bind="props"> Open Dialog Confirm </v-btn>
                </v-row>
            </dev-only>
        </template>
        <v-card class="mb-5">
            <v-toolbar density="compact" :color="context.dialogColor">
                <v-icon class="ml-2" :icon="'mdi-information-outline'"></v-icon>
                <v-card-title class="pl-2" :style="{ 'font-size': '16px !important' }">
                    <span class="text-h6 ml-0">{{ context.title }}</span
                    ><br />
                </v-card-title>
            </v-toolbar>
            <v-card-text>
                <v-sheet class="mx-4 d-flex justify-center">
                    <template v-if="context.message && !loading && !success && !error">
                        <div v-html="context.message"></div>
                    </template>
                    <template v-if="loading">
                        <v-progress-circular indeterminate size="100" :width="'6'"></v-progress-circular>
                    </template>
                    <template v-else-if="success">
                        <v-icon :icon="'mdi-checkbox-marked-circle-outline'" color="success" size="20vh"></v-icon>
                    </template>
                    <template v-else-if="error">
                        <v-icon :icon="'mdi-alert-circle-outline'" color="red" size="20vh"></v-icon>
                    </template>
                </v-sheet>
                <h3 class="d-flex justify-center" v-html="context.callbackMessage"></h3>
            </v-card-text>
            <v-card-actions v-if="context.actionButtons && context.actionButtons.length > 0">
                <v-spacer></v-spacer>
                <!-- Redirect or Upload again -->
                <template v-for="button in context.actionButtons" v-if="!success && !error">
                    <v-btn
                        :variant="'outlined'"
                        v-bind="button"
                        @click.once="simpleActionHandler($event, button)"
                        :disabled="loading"
                    />
                </template>
                <template v-else>
                    <v-btn
                        v-if="context.callbackActionBtn && context.callbackActionBtn.length > 0"
                        v-for="button in context.callbackActionBtn"
                        v-bind="button"
                        @click="closeDialog"
                    ></v-btn>
                    <v-btn v-else :variant="'outlined'" @click="closeDialog">cancel </v-btn>
                </template>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
interface BtnActionCallBack {
    status: boolean
    message: unknown
    callbackActionBtn: any[]
}

const { dialogConfirm, dialogContext } = await useDialog()
const dialog = dialogConfirm()
const context = dialogContext()
const success = ref(false)
const error = ref(false)
const loading = ref(false)

const simpleActionHandler = async (event: unknown, buttonAction: any) => {
    loading.value = true
    //delay 1 sec
    if (typeof buttonAction.cb == 'function') {
        console.log('simpleActionHandler', context.value)
        let itemId = context.value.item!.id
        const { status, message, callbackActionBtn }: BtnActionCallBack = await buttonAction.cb(event, itemId)
        loading.value = false

        success.value = status
        error.value = !status

        context.value.callbackMessage = message
        if (callbackActionBtn) {
            context.value.callbackActionBtn = callbackActionBtn
        }
    } else {
        closeDialog()
    }
}

const closeDialog = async () => {
    dialog.value = false
    loading.value = false

    //after close dialog delay 0.5 sec for reset context
    await setTimeout(() => {
        context.value = defaultDialogContext
        success.value = false
        error.value = false
    }, 500)
}
</script>
