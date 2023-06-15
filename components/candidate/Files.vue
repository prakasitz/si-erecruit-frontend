<template>
    <CandidateBaseCard :title="'เอกสารอื่นๆ'">
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

            <v-row class="px-2" v-for="detail in attach_personal_list" :title="detail.menu">
                <v-col cols="6">
                    {{ detail.menu }}
                </v-col>
                <v-col cols="5">
                    <v-file-input chips label="File input" density="compact"></v-file-input>
                </v-col>
                <v-col cols="1">
                    <v-btn color="grey-lighten-1" icon="mdi-eye" variant="text"></v-btn>
                </v-col>
            </v-row>
            <p class="pb-4 text-h6">เอกสารแนบวุฒิการศึกษา (เรียงจาก ระดับการศึกษาสูงสุด)</p>
            <v-divider></v-divider>

            <v-list lines="two" density="compact">
                <v-list-item v-for="detail in attach_education_list" :title="detail.menu">
                    <v-list-item-subtitle class="py-2 px-6" v-for="i in detail.sub_menu"> {{ i }}</v-list-item-subtitle>
                    <template v-slot:append>
                        <v-label :text="substrFilename(detail.filename)"></v-label>
                        <v-btn color="grey-lighten-1" icon="mdi-upload" variant="text"></v-btn>
                        <v-btn color="grey-lighten-1" icon="mdi-eye" variant="text"></v-btn>
                    </template>
                </v-list-item>
            </v-list>
            <p class="pb-4 text-h6">เอกสารแนบข้อมูลญาติ</p>
            <v-divider></v-divider>

            <v-list lines="two" density="compact">
                <v-list-item v-for="detail in attach_family_list" :title="detail.menu">
                    <v-list-item-subtitle class="py-2 px-6" v-for="i in detail.sub_menu"> {{ i }}</v-list-item-subtitle>
                    <template v-slot:append>
                        <v-label :text="substrFilename(detail.filename)"></v-label>
                        <v-btn color="grey-lighten-1" icon="mdi-upload" variant="text"></v-btn>
                        <v-btn color="grey-lighten-1" icon="mdi-eye" variant="text"></v-btn>
                    </template>
                </v-list-item>
            </v-list>
            <p class="pb-4 text-h6">เอกสารแนบส่วนบุคคล</p>
            <v-divider></v-divider>

            <v-list lines="two" density="compact">
                <v-list-item v-for="detail in attach_private_list" :title="detail.menu"
                    ><template v-slot:append>
                        <v-label :text="substrFilename(detail.filename)"></v-label>
                        <v-btn color="grey-lighten-1" icon="mdi-upload" variant="text"></v-btn>
                        <v-btn color="grey-lighten-1" icon="mdi-eye" variant="text"></v-btn>
                    </template>
                </v-list-item>
            </v-list>
            <v-label class="text-red-darken-1 font-weight-black" text="หมายเหตุ"></v-label>
            <div class="px-2 py-2">
                <v-label
                    class="py-1 d-block"
                    text="-ผู้สมัครต้องลงลายมือชื่อรับรองสำเนาถูกต้องในเอกสารแนบทุกฉบับ"
                ></v-label>
                <v-label class="py-1 d-block text-" text="-เอกสารแนบอะพโหลดได้เฉพาะไฟล์ PDF เท่านั้น"></v-label>
                <v-label class="py-1 d-block" text="-การแนบเอกสารไฟล์ควรมีขนาดไม่เกิน 5 MB "></v-label>
                <v-label
                    class="py-1 d-block"
                    text="-การอัพโหลดไฟล์เอกสารไม่รองรับการทำงานบน Smartphone ขอแนะนำให้ดำเนินการผ่านคอมพิวเตอร์"
                ></v-label>
            </div>
        </template>
    </CandidateBaseCard>
</template>

<script setup>
const attach_personal_list = ref([
    { menu: 'สำเนาบัตรประจำตัวประชาชนตนเอง *', filename: 'สำเนาบัตรประจำตัวประชาชนตนเอง.pdf' },
    { menu: 'สำเนาทะเบียนบ้านตนเอง *', filename: '' },
    { menu: 'สำเนาหนังสือสำคัญแสดงการเปลี่ยนชื่อตนเอง(ถ้ามีการเปลี่ยน)', filename: '' },
    { menu: 'สำเนาใบทะเบียนการสมรส/หย่าสมรสตนเอง', filename: '' },
    {
        menu: 'สำเนาเลขที่บัญชีธนาคารไทยพาณิชย์ ประเภทออมทรัพย์ (สาขาศิริราชเท่านั้น) *',
        filename: 'สำเนาเลขที่บัญชีธนาคารไทยพาณิชย์ ประเภทออมทรัพย์.pdf',
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
        filename: 'สำเนาบัตรประจำตัวประชาชนตนเอง.pdf',
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
        filename: 'สำเนาบัตรประจำตัวประชาชนตนเอง.pdf',
    },
    {
        menu: 'ข้อมูลญาติสายตรง-คู่สมรส/ข้อมูลหย่า เรียงลำดับเอกสารดังนี้',
        sub_menu: [
            '1. สำเนาทะเบียนสมรส',
            '2. สำเนาบัตรประจำตัวประชาชนคู่สมรส (ถ่ายสำเนาเฉพาะด้านหน้าเท่านั้น) (ถ้ามี)',
            '3. สำเนาใบมรณะบัตรคู่สมรส (กรณีคู่สมรสถึงแก่กรรม) (ถ้ามี)',
        ],
        filename: 'สำเนาบัตรประจำตัวประชาชนตนเอง.pdf',
    },
    {
        menu: 'ข้อมูลญาติสายตรง-บุตร เรียงลำดับเอกสารดังนี้',
        sub_menu: [
            '1. สำเนาสูติบัตรบุตร/บัตรประชาชน',
            '2. สำเนาทะเบียนบ้านบุตร',
            '3. สำเนาหนังสือสำคัญแสดงการเปลี่ยนชื่อ-ชื่อสกุลบุตร',
            '4. สำเนาหนังสือสำคัญแสดงการเปลี่ยนชื่อ-ชื่อสกุลบุตร',
        ],
        filename: 'สำเนาบัตรประจำตัวประชาชนตนเอง.pdf',
    },
])

const attach_private_list = ref([
    { menu: 'ใบผ่านการเกณฑ์ทหาร', filename: 'สำเนาบัตรประจำตัวประชาชนตนเอง.pdf' },
    { menu: 'ใบตรวจสุขภาพ/รับรองแพทย์', filename: '' },
    { menu: 'ใบตรวจสุขภาพ/รับรองแพทย์', filename: '' },
])

function substrFilename(_str) {
    if (_str != '') {
        let lst = _str.split('.')
        if (lst[0].length > 15) {
            _str = `${lst[0].substr(0, 13)}.. .${lst[1]}`
        }
    } else {
        _str = 'ไม่พบการแนบไฟล์'
    }
    return _str
}
</script>
