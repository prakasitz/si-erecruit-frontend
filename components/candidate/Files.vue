<template>
    <CandidateBaseCard :candidate-form="props.candidateForm">
        <template #card-body>
            <v-alert
                border="start"
                type="info"
                variant="outlined"
                icon="mdi-information-outline"
                text="อัพโหลดไฟล์เอกสารเพิ่มเติม"
            >
            </v-alert>

            <v-label
                class="my-6 text-red-darken-1 text-h5"
                text="*** กรุณาแนบเอกสารเฉพาะไฟล์ PDF เท่านั้น ***"
            ></v-label>

            <p class="pb-4 text-h6">เอกสารแนบส่วนตัว</p>
            <v-divider></v-divider>

            <!-- <v-list lines="two" density="compact">
                <v-list-item v-for="detail in attach_personal_list" :title="detail.menu">
                    <template v-slot:append>
                        <v-file-input label="File input" density="compact"></v-file-input>
                    </template>
                </v-list-item>
            </v-list> -->

            <v-row class="px-2" v-for="(detail, index) in attach_personal_list" :key="index" :title="detail.menu">
                <v-col cols="6">
                    {{ detail.menu }}
                </v-col>
                <v-col cols="5">
                    <v-file-input
                        clearable
                        chips
                        show-size
                        counter
                        type="file"
                        :rules="fileSizeRules"
                        :ref="`fileInput-${index}`"
                        label="File input"
                        density="compact"
                        accept=".pdf, application/pdf"
                        @change="onFileInputChange($event, index, attach_personal_list)"
                        @click:clear="resetFileInput(index, attach_personal_list)"
                    ></v-file-input>
                </v-col>
                <v-col cols="1">
                    <v-btn
                        @click="onHandlePreView(index, attach_personal_list)"
                        color="grey-lighten-1"
                        icon="mdi-eye"
                        variant="text"
                    ></v-btn>
                    <v-btn @click="uploadFile(index, attach_personal_list)"> Upload</v-btn>
                </v-col>
            </v-row>
            <p class="pb-4 text-h6">เอกสารแนบวุฒิการศึกษา (เรียงจาก ระดับการศึกษาสูงสุด)</p>
            <v-divider></v-divider>

            <v-list lines="two" density="compact">
                <v-list-item v-for="detail in attach_education_list" :title="detail.menu">
                    <v-list-item-subtitle class="py-2 px-6" v-for="i in detail.sub_menu"> {{ i }}</v-list-item-subtitle>

                    <template v-slot:append>
                        <v-label :text="substrFilename(detail.filename)"></v-label>
                        <v-col cols="5">
                            <v-file-input
                                clearable
                                chips
                                show-size
                                counter
                                type="file"
                                :rules="fileSizeRules"
                                :ref="`fileInput-${0}`"
                                label="File input"
                                density="compact"
                                accept=".pdf, application/pdf"
                                @change="onFileInputChange($event, 0, attach_education_list)"
                                @click:clear="resetFileInput(0, attach_education_list)"
                            ></v-file-input>
                        </v-col>
                        <v-col cols="1">
                            <v-btn
                                @click="onHandlePreView(0, attach_education_list)"
                                color="grey-lighten-1"
                                icon="mdi-eye"
                                variant="text"
                            ></v-btn>
                        </v-col>
                    </template>
                </v-list-item>
            </v-list>

            <p class="pb-4 text-h6">เอกสารแนบข้อมูลญาติ</p>
            <v-divider></v-divider>

            <v-list lines="two" density="compact">
                <v-list-item v-for="(detail, index) in attach_family_list" :key="index" :title="detail.menu">
                    <v-list-item-subtitle class="py-2 px-6" v-for="i in detail.sub_menu"> {{ i }}</v-list-item-subtitle>
                    <template v-slot:append>
                        <v-label :text="substrFilename(detail.filename)"></v-label>

                        <v-col cols="5">
                            <v-file-input
                                clearable
                                chips
                                show-size
                                counter
                                type="file"
                                :rules="fileSizeRules"
                                :ref="`fileInput-${index}`"
                                label="File input"
                                density="compact"
                                accept=".pdf, application/pdf"
                                @change="onFileInputChange($event, index, attach_family_list)"
                                @click:clear="resetFileInput(index, attach_family_list)"
                            ></v-file-input>
                        </v-col>
                        <v-col cols="1">
                            <v-btn
                                @click="onHandlePreView(index, attach_family_list)"
                                color="grey-lighten-1"
                                icon="mdi-eye"
                                variant="text"
                            ></v-btn>
                        </v-col>
                    </template>
                </v-list-item>
            </v-list>
            <p class="pb-4 text-h6">เอกสารแนบส่วนบุคคล</p>
            <v-divider></v-divider>

            <v-list lines="two" density="compact">
                <v-list-item v-for="(detail, index) in attach_private_list" :key="index" :title="detail.menu">
                    <template v-slot:append>
                        <v-label :text="substrFilename(detail.filename)"></v-label>
                        <v-col cols="5">
                            <v-file-input
                                clearable
                                chips
                                show-size
                                counter
                                type="file"
                                :rules="fileSizeRules"
                                :ref="`fileInput-${index}`"
                                label="File input"
                                density="compact"
                                accept=".pdf, application/pdf"
                                @change="onFileInputChange($event, index, attach_private_list)"
                                @click:clear="resetFileInput(index, attach_private_list)"
                            ></v-file-input>
                        </v-col>
                        <v-col cols="1">
                            <v-btn
                                @click="onHandlePreView(index, attach_private_list)"
                                color="grey-lighten-1"
                                icon="mdi-eye"
                                variant="text"
                            ></v-btn>
                        </v-col>
                    </template>
                </v-list-item>
            </v-list>
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
import { CandidateForm } from '~/utils/types'
import { substrFilename } from '~/utils/string'
import usePreviewFiles from '@/composables/usePreviewFiles'
const props = defineProps<{
    candidateForm: CandidateForm
}>()

const { handlePreview, uploadFile } = usePreviewFiles()

const fileSizeRules = [
    (files: any) => !files || !files.some((file: any) => file.size > 5e6) || 'ไฟล์ต้องมีขนาดไม่เกิน 5 MB!',
    (files: any) =>
        !files || !files.some((file: any) => file.type != 'application/pdf') || 'ไฟล์ต้องเป็น pdf เท่านั้น!',
]

//function to check if there is change in the file input area to receive file
function onFileInputChange(event: Event, index: number, list: any) {
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
function onHandlePreView(index: number, list: any) {
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
function resetFileInput(index: number, list: any) {
    list[index].file = null
}

const { data } = await useFetch('/api/delay', { server: false }) //ใช้ await เมื่อต้องการ ssr

const attach_personal_list = ref([
    {
        menu: 'สำเนาบัตรประจำตัวประชาชนตนเอง *',
        filename: 'สำเนาบัตรประจำตัวประชาชนตนเอง.pdf',
        file: null as File | null,
    },
    { menu: 'สำเนาทะเบียนบ้านตนเอง *', filename: 'สำเนาทะเบียนบ้านตนเอง.pdf', file: null as File | null },
    {
        menu: 'สำเนาหนังสือสำคัญแสดงการเปลี่ยนชื่อตนเอง(ถ้ามีการเปลี่ยน)',
        filename: 'สำเนาหนังสือสำคัญแสดงการเปลี่ยนชื่อตนเอง.pdf',
        file: null as File | null,
    },
    {
        menu: 'สำเนาใบทะเบียนการสมรส/หย่าสมรสตนเอง',
        filename: 'สำเนาใบทะเบียนการสมรส/หย่าสมรสตนเอง',
        file: null as File | null,
    },
    {
        menu: 'สำเนาเลขที่บัญชีธนาคารไทยพาณิชย์ ประเภทออมทรัพย์ (สาขาศิริราชเท่านั้น) *',
        filename: 'สำเนาเลขที่บัญชีธนาคารไทยพาณิชย์ ประเภทออมทรัพย์.pdf',
        file: null as File | null,
    },
])

const attach_education_list = ref([
    {
        menu: 'เรียงลำดับเอกสารดังนี้',
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
        file: null as File | null,
    },
])

const attach_family_list = ref([
    {
        menu: 'ข้อมูลญาติสายตรง-บิดา/มารดา เรียงลำดับเอกสารดังนี้',
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
        file: null as File | null,
    },
    {
        menu: 'ข้อมูลญาติสายตรง-คู่สมรส/ข้อมูลหย่า เรียงลำดับเอกสารดังนี้',
        sub_menu: [
            '1. สำเนาทะเบียนสมรส',
            '2. สำเนาบัตรประจำตัวประชาชนคู่สมรส (ถ่ายสำเนาเฉพาะด้านหน้าเท่านั้น) (ถ้ามี)',
            '3. สำเนาใบมรณะบัตรคู่สมรส (กรณีคู่สมรสถึงแก่กรรม) (ถ้ามี)',
        ],
        filename: 'ข้อมูลญาติสายตรงคู่สมรสและข้อมูลหย่า.pdf',
        file: null as File | null,
    },
    {
        menu: 'ข้อมูลญาติสายตรง-บุตร เรียงลำดับเอกสารดังนี้',
        sub_menu: [
            '1. สำเนาสูติบัตรบุตร/บัตรประชาชน',
            '2. สำเนาทะเบียนบ้านบุตร',
            '3. สำเนาหนังสือสำคัญแสดงการเปลี่ยนชื่อ-ชื่อสกุลบุตร',
            '4. สำเนาหนังสือสำคัญแสดงการเปลี่ยนชื่อ-ชื่อสกุลบุตร',
        ],
        filename: 'ข้อมูลญาติสายตรงและบุตร.pdf',
        file: null as File | null,
    },
])

const attach_private_list = ref([
    { menu: 'ใบผ่านการเกณฑ์ทหาร', filename: 'ใบผ่านการเกณฑ์ทหาร.pdf', file: null as File | null },
    { menu: 'ใบตรวจสุขภาพ/รับรองแพทย์', filename: 'ใบตรวจสุขภาพ/รับรองแพทย์.pdf', file: null as File | null },
])
</script>
