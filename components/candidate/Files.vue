<template>
    <CandidateBaseCard :candidate-form="props.candidateForm">
        <template #card-body>
            <v-alert
                border="start"
                type="info"
                variant="outlined"
                icon="mdi-information-outline"
                text="อัพโหลดไฟล์เอกสารเพิ่มเติม, ไฟล์จะต้องมีขนาดไม่เกิน 5MB และเป็นไฟล์ PDF เท่านั้น"
            >
            </v-alert>

            <v-label
                class="my-6 text-red-darken-1 text-h5"
                text="*** กรุณาแนบเอกสารเฉพาะไฟล์ PDF เท่านั้น ***"
            ></v-label>

            <p class="pb-4 text-h6">เอกสารแนบส่วนตัว</p>
            <v-divider></v-divider>
            <v-row class="px-2 mt-2" v-for="(detail, index) in attach_personal_list" :key="index">
                <v-col cols="6"> {{ detail.menu }}</v-col>
                <v-col cols="6">
                    <v-file-input
                        v-if="!detail.uploadedData"
                        clearable
                        chips
                        show-size
                        counter
                        type="file"
                        :rules="fileSizeRules"
                        :ref="`fileInput-${index}`"
                        :label="substrFilename(detail.filename)"
                        density="compact"
                        accept=".pdf, application/pdf"
                        :loading="detail.uploading"
                        @change="onFileInputChange($event, index, attach_personal_list)"
                        @click:clear="resetFileInput(index, attach_personal_list)"
                    >
                        <template #append>
                            <v-btn
                                @click="onHandlePreView(index, attach_personal_list)"
                                :color="!detail.file ? 'grey-darken-4' : 'blue'"
                                :icon="!detail.file ? 'mdi-eye-off' : 'mdi-eye'"
                                :disabled="!detail.file"
                                :loading="detail.uploading"
                                variant="text"
                            ></v-btn>
                            <v-btn
                                variant="text"
                                :color="!detail.file ? 'grey-darken-4' : 'success'"
                                :disabled="!detail.file"
                                :icon="'mdi-upload'"
                                :loading="detail.uploading"
                                @click="onClickUpload(index, attach_personal_list)"
                            ></v-btn>
                        </template>
                    </v-file-input>
                    <v-row v-else no-gutters>
                        <v-col cols="10" align-self="center">
                            <v-tooltip :location="'bottom center'">
                                <template v-slot:activator="{ props }">
                                    <v-chip
                                        v-bind="props"
                                        prepend-icon="mdi-download-circle"
                                        class="text-caption font-weight-black w-100"
                                        @click="downloadFile(detail.uploadedData.path)"
                                    >
                                        <template #>
                                            {{ substrFilename(detail.uploadedData.fileName, 39) }}
                                        </template>
                                    </v-chip>
                                </template>
                                <span>{{ detail.uploadedData.fileName }}</span>
                            </v-tooltip>
                        </v-col>
                        <v-col cols="2" align-self="center" class="d-flex justify-start">
                            <v-tooltip>
                                <template v-slot:activator="{ props }">
                                    <v-btn
                                        v-bind="props"
                                        class="ml-2"
                                        density="compact"
                                        :color="'error'"
                                        :icon="'mdi-close-circle'"
                                        variant="text"
                                        @click="onConfirmDeleteFile(detail)"
                                    ></v-btn>
                                </template>
                                <span>ลบไฟล์</span>
                            </v-tooltip>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <p class="pb-4 text-h6">เอกสารแนบวุฒิการศึกษา (เรียงจาก ระดับการศึกษาสูงสุด)</p>
            <v-divider></v-divider>
            <v-row v-for="(detail, index) in attach_education_list">
                <v-col cols="6">
                    <p class="mt-2 text-body-1 font-weight-black text-no-wrap">{{ detail.menu }}</p>
                    <v-row no-gutters class="py-2 px-6" v-for="menu in detail.sub_menu">
                        <v-col cols="12">{{ menu }}</v-col>
                    </v-row>
                </v-col>
                <v-col align-self="center">
                    <v-file-input
                        v-if="!detail.uploadedData"
                        clearable
                        chips
                        show-size
                        counter
                        type="file"
                        :rules="fileSizeRules"
                        :ref="`fileInput-${index}`"
                        :label="substrFilename(detail.filename)"
                        density="compact"
                        accept=".pdf, application/pdf"
                        :loading="detail.uploading"
                        @change="onFileInputChange($event, index, attach_education_list)"
                        @click:clear="resetFileInput(index, attach_education_list)"
                    >
                        <template #append>
                            <v-btn
                                @click="onHandlePreView(index, attach_education_list)"
                                :color="!detail.file ? 'grey-darken-4' : 'blue'"
                                :icon="!detail.file ? 'mdi-eye-off' : 'mdi-eye'"
                                :disabled="!detail.file"
                                :loading="detail.uploading"
                                variant="text"
                            ></v-btn>
                            <v-btn
                                variant="text"
                                :color="!detail.file ? 'grey-darken-4' : 'success'"
                                :disabled="!detail.file"
                                :icon="'mdi-upload'"
                                :loading="detail.uploading"
                                @click="onClickUpload(index, attach_education_list)"
                            ></v-btn>
                        </template>
                    </v-file-input>
                    <v-row v-else no-gutters>
                        <v-col cols="10" align-self="center">
                            <v-tooltip :location="'bottom center'">
                                <template v-slot:activator="{ props }">
                                    <v-chip
                                        v-bind="props"
                                        prepend-icon="mdi-download-circle"
                                        class="text-caption font-weight-black w-100"
                                        append-icon="mdi-pdf"
                                        @click="downloadFile(detail.uploadedData.path)"
                                    >
                                        {{ substrFilename(detail.uploadedData.fileName, 35) }}
                                    </v-chip>
                                </template>
                                <span>{{ detail.uploadedData.fileName }}</span>
                            </v-tooltip>
                        </v-col>
                        <v-col cols="2" align-self="center" class="d-flex justify-start">
                            <v-tooltip>
                                <template v-slot:activator="{ props }">
                                    <v-btn
                                        v-bind="props"
                                        class="ml-2"
                                        density="compact"
                                        :color="'error'"
                                        :icon="'mdi-close-circle'"
                                        variant="text"
                                        @click="onConfirmDeleteFile(detail)"
                                    ></v-btn>
                                </template>
                                <span>ลบไฟล์</span>
                            </v-tooltip>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <p class="pb-4 text-h6">เอกสารแนบข้อมูลญาติ</p>
            <v-divider></v-divider>
            <v-row v-for="(detail, index) in attach_family_list">
                <v-col cols="6">
                    <p class="mt-2 text-body-1 font-weight-black text-no-wrap">{{ detail.menu }}</p>
                    <v-row no-gutters class="py-2 px-6" v-for="menu in detail.sub_menu">
                        <v-col cols="12">{{ menu }}</v-col>
                    </v-row>
                </v-col>
                <v-col align-self="center">
                    <v-file-input
                        v-if="!detail.uploadedData"
                        clearable
                        chips
                        show-size
                        counter
                        type="file"
                        :rules="fileSizeRules"
                        :ref="`fileInput-${index}`"
                        :label="substrFilename(detail.filename)"
                        density="compact"
                        accept=".pdf, application/pdf"
                        :loading="detail.uploading"
                        @change="onFileInputChange($event, index, attach_family_list)"
                        @click:clear="resetFileInput(index, attach_family_list)"
                    >
                        <template #append>
                            <v-btn
                                @click="onHandlePreView(index, attach_family_list)"
                                :color="!detail.file ? 'grey-darken-4' : 'blue'"
                                :icon="!detail.file ? 'mdi-eye-off' : 'mdi-eye'"
                                :disabled="!detail.file"
                                :loading="detail.uploading"
                                variant="text"
                            ></v-btn>
                            <v-btn
                                variant="text"
                                :color="!detail.file ? 'grey-darken-4' : 'success'"
                                :disabled="!detail.file"
                                :icon="'mdi-upload'"
                                :loading="detail.uploading"
                                @click="onClickUpload(index, attach_family_list)"
                            ></v-btn>
                        </template>
                    </v-file-input>
                    <v-row v-else no-gutters>
                        <v-col cols="10" align-self="center">
                            <v-tooltip :location="'bottom center'">
                                <template v-slot:activator="{ props }">
                                    <v-chip
                                        v-bind="props"
                                        prepend-icon="mdi-download-circle"
                                        class="text-caption font-weight-black w-100"
                                        append-icon="mdi-pdf"
                                        @click="downloadFile(detail.uploadedData.path)"
                                    >
                                        {{ substrFilename(detail.uploadedData.fileName, 36) }}
                                    </v-chip>
                                </template>
                                <span>{{ detail.uploadedData.fileName }}</span>
                            </v-tooltip>
                        </v-col>
                        <v-col cols="2" align-self="center" class="d-flex justify-start">
                            <v-tooltip>
                                <template v-slot:activator="{ props }">
                                    <v-btn
                                        v-bind="props"
                                        class="ml-2"
                                        density="compact"
                                        :color="'error'"
                                        :icon="'mdi-close-circle'"
                                        variant="text"
                                        @click="onConfirmDeleteFile(detail)"
                                    ></v-btn>
                                </template>
                                <span>ลบไฟล์</span>
                            </v-tooltip>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <p class="pb-4 text-h6">เอกสารแนบส่วนบุคคล</p>
            <v-divider></v-divider>
            <v-row class="px-2 mt-2" v-for="(detail, index) in attach_private_list" :key="index">
                <v-col cols="6"> {{ detail.menu }}</v-col>
                <v-col cols="6">
                    <v-file-input
                        v-if="!detail.uploadedData"
                        clearable
                        chips
                        show-size
                        counter
                        type="file"
                        :rules="fileSizeRules"
                        :ref="`fileInput-${index}`"
                        :label="substrFilename(detail.filename)"
                        density="compact"
                        accept=".pdf, application/pdf"
                        :loading="detail.uploading"
                        @change="onFileInputChange($event, index, attach_private_list)"
                        @click:clear="resetFileInput(index, attach_private_list)"
                    >
                        <template #append>
                            <v-btn
                                @click="onHandlePreView(index, attach_private_list)"
                                :color="!detail.file ? 'grey-darken-4' : 'blue'"
                                :icon="!detail.file ? 'mdi-eye-off' : 'mdi-eye'"
                                :disabled="!detail.file"
                                :loading="detail.uploading"
                                variant="text"
                            ></v-btn>
                            <v-btn
                                variant="text"
                                :color="!detail.file ? 'grey-darken-4' : 'success'"
                                :disabled="!detail.file"
                                :icon="'mdi-upload'"
                                :loading="detail.uploading"
                                @click="onClickUpload(index, attach_private_list)"
                            ></v-btn>
                        </template>
                    </v-file-input>
                    <v-row v-else no-gutters>
                        <v-col cols="10" align-self="center">
                            <v-tooltip :location="'bottom center'">
                                <template v-slot:activator="{ props }">
                                    <v-chip
                                        v-bind="props"
                                        prepend-icon="mdi-download-circle"
                                        class="text-caption font-weight-black w-100"
                                        append-icon="mdi-pdf"
                                        @click="downloadFile(detail.uploadedData.path)"
                                    >
                                        {{ substrFilename(detail.uploadedData.fileName, 38) }}
                                    </v-chip>
                                </template>
                                <span>{{ detail.uploadedData.fileName }}</span>
                            </v-tooltip>
                        </v-col>
                        <v-col cols="2" align-self="center" class="d-flex justify-start">
                            <v-tooltip>
                                <template v-slot:activator="{ props }">
                                    <v-btn
                                        v-bind="props"
                                        class="ml-2"
                                        density="compact"
                                        :color="'error'"
                                        :icon="'mdi-close-circle'"
                                        variant="text"
                                        @click="onConfirmDeleteFile(detail)"
                                    ></v-btn>
                                </template>
                                <span>ลบไฟล์</span>
                            </v-tooltip>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-label class="text-red-darken-1 font-weight-black" text="หมายเหตุ"></v-label>
            <div class="px-2 py-2">
                <v-label
                    class="py-1 d-block"
                    text="-ผู้สมัครต้องลงลายมือชื่อรับรองสำเนาถูกต้องในเอกสารแนบทุกฉบับ"
                ></v-label>
                <v-label class="py-1 d-block text-" text="-เอกสารแนบอัพโหลดได้เฉพาะไฟล์ PDF เท่านั้น"></v-label>
                <v-label class="py-1 d-block" text="-การแนบเอกสารไฟล์ควรมีขนาดไม่เกิน 5 MB "></v-label>
                <v-label
                    class="py-1 d-block"
                    text="-การอัพโหลดไฟล์เอกสารไม่รองรับการทำงานบน Smartphone ขอแนะนำให้ดำเนินการผ่านคอมพิวเตอร์"
                ></v-label>
            </div>
        </template>
    </CandidateBaseCard>
</template>

<script setup lang="ts">
import { CandidateForm, AttachFile, CandidateFile } from '~/utils/types'
import { substrFilename } from '~/utils/string'
import { FetchError } from 'ofetch'

const attach_personal_list = ref<AttachFile[]>([
    {
        menu: 'สำเนาบัตรประจำตัวประชาชนตนเอง *',
        tag: '01-id_card',
        filename: 'สำเนาบัตรประจำตัวประชาชนตนเอง.pdf',
        file: undefined,
        uploading: false,
        uploaded: false,
    },
    {
        menu: 'สำเนาทะเบียนบ้านตนเอง *',
        filename: 'สำเนาทะเบียนบ้านตนเอง.pdf',
        tag: '02-reg',
        file: undefined,
        uploading: false,
        uploaded: false,
    },
    {
        menu: 'สำเนาหนังสือสำคัญแสดงการเปลี่ยนชื่อตนเอง(ถ้ามีการเปลี่ยน)',
        filename: 'สำเนาหนังสือสำคัญแสดงการเปลี่ยนชื่อตนเอง.pdf',
        tag: '03-change_name',
        file: undefined,
        uploading: false,
        uploaded: false,
    },
    {
        menu: 'สำเนาใบทะเบียนการสมรส/หย่าสมรสตนเอง',
        filename: 'สำเนาใบทะเบียนการสมรส/หย่าสมรสตนเอง.pdf',
        tag: '04-marriage',
        file: undefined,
        uploading: false,
        uploaded: false,
    },
    {
        menu: 'สำเนาเลขที่บัญชีธนาคารไทยพาณิชย์ ประเภทออมทรัพย์ (สาขาศิริราชเท่านั้น) *',
        filename: 'สำเนาเลขที่บัญชีธนาคารไทยพาณิชย์ ประเภทออมทรัพย์.pdf',
        tag: '05-bank_acc',
        file: undefined,
        uploading: false,
        uploaded: false,
    },
])

const attach_education_list = ref<AttachFile[]>([
    {
        menu: 'เรียงลำดับเอกสารดังนี้',
        tag: '06-education',
        sub_menu: [
            '1. สำเนาระเบียนแสดงผลการศึกษา หรือ Transcript',
            '2. สำเนาใบประกาศนียบัตรสำเร็จการศึกษา /หนังสือรับรองการสำเร็จการศึกษา',
            '3. สำเนาใบปริญญาบัตร (กรณีปริญญาตรีขึ้นไปบังคับมี)',
            '4. สำเนาหนังสือรับรองคุณวุฒิ (กรณีปริญญาตรีขึ้นไปบังคับมี)',
            '5. สำเนาใบอนุญาตประกอบโรคศิลปะ',
            '6. สำเนาวุฒิบัตรฯ สำเนาประกาศนียบัตรชั้นสูงฯ ฯลฯ',
            '7. สำเนาเอกสารผลคะแนนสอบภาษาอังกฤษ(กรณีปริญญาตรีขึ้นไปบังคับมี)',
        ],
        filename: 'เอกสารแนบวุฒิการศึกษา.pdf',
        uploaded: false,
        uploading: false,
        file: undefined,
    },
])

const attach_family_list = ref<AttachFile[]>([
    {
        menu: 'ข้อมูลญาติสายตรง-บิดา/มารดา เรียงลำดับเอกสารดังนี้',
        tag: '07-parent',
        sub_menu: [
            '1. สำเนาบัตรประจำตัวประชาชน บิดาผู้ให้กำเนิด',
            '2. สำเนาทะเบียนบ้าน บิดาผู้ให้กำเนิด',
            '3. สำเนาหนังสือสำคัญแสดงการเปลี่ยนชื่อ-ชื่อสกุลบิดาผู้ให้กำเนิด (ถ้ามี)',
            '4. สำเนาบัตรประจำตัวประชาชน มารดาผู้ให้กำเนิด',
            '5. สำเนาทะเบียนบ้าน มารดาผู้ให้กำเนิด',
            '6. สำเนาหนังสือสำคัญแสดงการเปลี่ยนชื่อ-ชื่อสกุลมารดาผู้ให้กำเนิด (ถ้ามี)',
            '7. สำเนาทะเบียนสมรส/หย่า บิดา-มารดาผู้ให้กำเนิด',
            '8. สำเนาใบมรณะบัตร (กรณี บิดา/มารดาผู้ให้กำเนิด เสียชีวิต) (ถ้ามี)',
        ],
        filename: 'ข้อมูลญาติสายตรงบิดาและมารดา.pdf',
        file: undefined,
        uploading: false,
        uploaded: false,
    },
    {
        menu: 'ข้อมูลญาติสายตรง-คู่สมรส/ข้อมูลหย่า เรียงลำดับเอกสารดังนี้',
        tag: '08-marriage',
        sub_menu: [
            '1. สำเนาทะเบียนสมรส',
            '2. สำเนาบัตรประจำตัวประชาชนคู่สมรส (ถ่ายสำเนาเฉพาะด้านหน้าเท่านั้น) (ถ้ามี)',
            '3. สำเนาใบมรณะบัตรคู่สมรส (กรณีคู่สมรสถึงแก่กรรม) (ถ้ามี)',
        ],
        filename: 'ข้อมูลญาติสายตรงคู่สมรสและข้อมูลหย่า.pdf',
        file: undefined,
        uploaded: false,
        uploading: false,
    },
    {
        menu: 'ข้อมูลญาติสายตรง-บุตร เรียงลำดับเอกสารดังนี้',
        tag: '09-child',
        sub_menu: [
            '1. สำเนาสูติบัตรบุตร/บัตรประชาชน',
            '2. สำเนาทะเบียนบ้านบุตร',
            '3. สำเนาหนังสือสำคัญแสดงการเปลี่ยนชื่อ-ชื่อสกุลบุตร',
            '4. สำเนาหนังสือสำคัญแสดงการเปลี่ยนชื่อ-ชื่อสกุลบุตร',
        ],
        filename: 'ข้อมูลญาติสายตรงและบุตร.pdf',
        file: undefined,
        uploading: false,
        uploaded: false,
    },
])

const attach_private_list = ref<AttachFile[]>([
    {
        menu: 'ใบผ่านการเกณฑ์ทหาร',
        tag: '10-military',
        filename: 'ใบผ่านการเกณฑ์ทหาร.pdf',
        file: undefined,
        uploaded: false,
        uploading: false,
    },
    {
        menu: 'ใบตรวจสุขภาพ/รับรองแพทย์',
        tag: '11-health',
        filename: 'ใบตรวจสุขภาพ-รับรองแพทย์.pdf',
        file: undefined,
        uploaded: false,
        uploading: false,
    },
])

const props = defineProps<{
    candidateForm: CandidateForm
}>()

const { handlePreview, uploadFile, getDetails, deleteFile, downloadFile } = useCandidateFile()
const { dialogInfo, dialogError, dialogConfirm, showDialog } = useDialog()
const { data: fileDetailData, error: fileDetailError, refresh: fileDetailRefresh } = await getDetails()

const mappingFileDetailWithAttachList = () => {
    const attachList = [attach_personal_list, attach_education_list, attach_family_list, attach_private_list]
    const fileDetail = fileDetailData.value
    if (!fileDetail) return

    const traverseAttachList = (attachList: AttachFile[]) => {
        attachList.forEach((attach) => {
            let cnt = 0
            attach.uploadedData = fileDetail.files.find((file) => {
                cnt++
                if (file.tag === attach.tag) {
                    console.log('This is cnt: ', cnt, attach.tag)
                    return file.tag === attach.tag
                }
            })
        })
    }

    attachList.forEach((list) => {
        traverseAttachList(list.value)
    })
}

//on mounted
mappingFileDetailWithAttachList()

watch(
    () => fileDetailData.value,
    (newVal, oldVal) => {
        if (newVal) {
            mappingFileDetailWithAttachList()
        }
    }
)

const fileSizeRules = [
    (files: File[]) => !files || !files.some((file: File) => file.size > 5e6) || 'ไฟล์ต้องมีขนาดไม่เกิน 5 MB!',
    (files: File[]) =>
        !files || !files.some((file: File) => file.type != 'application/pdf') || 'ไฟล์ต้องเป็น pdf เท่านั้น!',
]

const onConfirmDeleteFile = (attachFileData: AttachFile) => {
    const { menu, uploadedData } = attachFileData
    const dialog = dialogConfirm()
    showDialog(
        {
            title: `Confirm to delete file, ${menu}`,
            dialogColor: 'amber',
            message: `ต้องการลบไฟล์ <br>• <b>${menu || ''}</b><br> ออกจากระบบ ใช่หรือไม่?`,
            item: {
                id: {
                    tag: attachFileData.tag,
                    refreshDataCallBack: fileDetailRefresh,
                },
            },
            actionButtons: [
                {
                    text: `Delete`,
                    variant: 'elevated',
                    color: 'red-darken-1',
                    cb: deleteFile,
                },
                {
                    text: 'Cancel',
                    color: 'gray',
                },
            ],
            persistent: true,
        },
        dialog
    )
}

async function onClickUpload(index: number, list: AttachFile[]) {
    let dialog = null
    const section = list[index]
    section.uploaded = false
    section.uploading = false
    try {
        section.uploading = true
        const { data, error } = await uploadFile(index, list)
        if (error.value) throw error.value

        console.log(data.value)

        section.uploaded = true
        dialog = dialogInfo()
        showDialog(
            {
                title: 'Upload Success',
                message: `Upload successfully!.`,
                actionButtons: [
                    {
                        text: 'Cancel',
                        color: 'indigo',
                    },
                ],
                persistent: false,
            },
            dialog
        )
        fileDetailRefresh()
    } catch (error: FetchError | any) {
        section.uploaded = false
        console.log('This is error: ', error)
        let errMsg = 'Api error: ' + (error.data?.message || error || 'Unexpected error: ' + error.message)
        dialog = dialogError()
        showDialog(
            {
                title: 'Upload Error',
                message: `Upload failed, please try again later!, <br> ${errMsg}`,
                actionButtons: [
                    {
                        text: 'Cancel',
                        color: 'grey',
                    },
                ],
                persistent: false,
            },
            dialog
        )
    } finally {
        section.uploading = false
    }
}

//function to check if there is change in the file input area to receive file
function onFileInputChange(event: Event, index: number, list: AttachFile[]) {
    console.log('This is list: OnFileInputChange', list, index)
    const fileRef = (event.target as HTMLInputElement)?.files // Access the FileList from the input event
    const fileIndex = fileRef?.[0] || null
    console.log('this is fileIndex', fileIndex)
    if (fileIndex && fileIndex.type == 'application/pdf') {
        list[index].file = fileIndex
    } else {
        console.log('File does not exist')
    }
}

//function to handle the preview: handlePreview -->> previewFile
function onHandlePreView(index: number, list: AttachFile[]) {
    console.log('This is list: OnHandlePreview', list)
    const fileIndex = list[index].file
    console.log('This is fileIndex: OnHandlePreview', fileIndex)
    if (!fileIndex) {
        console.log('There is no file attached. Cannot preview.')
        return
    }

    if (fileIndex.name.length === 0) {
        console.log('The file name is missing. Cannot preview.')
        return
    }

    const fileSize = fileIndex.size

    if (fileSize > 5e6) {
        console.log('File size exceeds the limit. Cannot preview.')
        return
    }

    handlePreview(fileIndex)
}

//reset file input at the index position
function resetFileInput(index: number, list: AttachFile[]) {
    list[index].file = undefined
}

// const { data } = await useFetch('/api/delay', { server: false }) //ใช้ await เมื่อต้องการ ssr
</script>
