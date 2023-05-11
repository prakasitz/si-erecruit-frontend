<template>
    <div class="box-detail">
        <div class="pb-6 text-h6"> ข้อมูลบุตรคนที่ {{ prop.index }} </div>
        <div class="px-6">
            <v-row>
                <v-col cols="4">
                    <p> คำนำหน้า <span class="text-red-darken-1"> *</span> </p>
                </v-col>
                <v-col>
                    <v-select density="compact" variant="outlined" label="Select"
                        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
                </v-col>

            </v-row>
            <v-row>
                <v-col cols="4">ชื่อ-นามสกุล (ภาษาไทย) <span class="text-red-darken-1"> *</span></v-col>
                <v-col cols="4">
                    <v-text-field label="ชื่อ" density="compact" variant="outlined" maxLength="50">
                    </v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field label="นามสกุล" hint="ไม่ต้องใส่ - " density="compact" variant="outlined" maxLength="50">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4"> หมายเลขบัตรประชาชน <span class="text-red-darken-1"> *</span></v-col>
                <v-col cols="6">
                    <v-text-field hint="ไม่ต้องใส่ - " density="compact" variant="outlined" maxLength="13">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="3"> วัน/เดือน/ปี เกิด <span class="text-red-darken-1"> *</span></v-col>
                <v-col cols="3"> วัน/เดือน/ปี เกิด จังหวัดที่เกิด <span class="text-red-darken-1"> *</span></v-col>
                <v-col cols="3"> จังหวัดที่เกิด <span class="text-red-darken-1"> *</span></v-col>
                <v-col cols="3"> <v-select density="compact" variant="outlined" label="Select"
                        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select></v-col>
            </v-row>

            <v-row>
                <v-col cols="3"> สัญชาติ <span class="text-red-darken-1"> *</span></v-col>
                <v-col cols="3"><v-select label="Select" density="compact" variant="outlined"
                        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select></v-col>
                <v-col cols="3"> ชื้อชาติ <span class="text-red-darken-1"> *</span></v-col>
                <v-col cols="3"> <v-select label="Select" density="compact" variant="outlined"
                        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select></v-col>
            </v-row>
            <v-row>
                <v-col cols="3"> ศาสนา <span class="text-red-darken-1"> *</span></v-col>
                <v-radio-group inline>
                    <v-radio label="พุทธ" value="พุทธ"></v-radio>
                    <v-radio label="คริสต์ " value="คริสต์ "></v-radio>
                    <v-radio label="อิสลาม  " value="อิสลาม  "></v-radio>
                    <v-radio label="ฮินดู  " value="ฮินดู  "></v-radio>
                    <v-radio label="ไม่ระบุ" value="ไม่ระบุ"></v-radio>
                </v-radio-group>
            </v-row>
            <v-row>
                <v-col cols="3"> สวัสดิการบุตร <span class="text-red-darken-1"> *</span></v-col>
                <v-col>
                    <v-radio-group>
                        <v-radio label="ไม่มี" value="ไม่มี"></v-radio>
                        <v-radio label="บุตรเป็นคนไร้ความสามารถ " value="บุตรเป็นคนไร้ความสามารถ "></v-radio>
                        <v-radio label="เบิกสวัสดิการกับท่านเอง " value="เบิกสวัสดิการกับท่านเอง "></v-radio>
                        <v-radio label="เบิกสวัสดิการกับคู่สมรส " value="เบิกสวัสดิการกับคู่สมรส "></v-radio>
                    </v-radio-group>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script setup lang="ts">
const prop = defineProps(['index']);
</script>