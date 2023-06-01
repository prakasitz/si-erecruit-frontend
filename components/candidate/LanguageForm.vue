<template>
    <v-row v-for="skill in skillsRadio">
        <v-col cols="2">{{ skill.label }}</v-col>
        <v-col>
            <v-radio-group hide-details inline v-model="skill.selected">
                <v-radio v-for="level in levels" :label="level.label" :value="level.value"></v-radio>
                <v-text-field
                    class="pl-3"
                    hide-details
                    v-model="skill.others"
                    variant="outlined"
                    density="compact"
                    :disabled="skill.selected != 'others'"
                ></v-text-field>
            </v-radio-group>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
interface Skill {
    label: string
    selected: string | null
    others?: string
}

const skillsRadio: Ref<Skill[]> = ref([
    {
        label: 'พูด',
        selected: null,
    },
    {
        label: 'อ่าน',
        selected: null,
    },
    {
        label: 'เขียน',
        selected: null,
    },
])
const levels = ref([
    { label: 'ดี', value: 'good' },
    { label: 'พอใช้', value: 'fair' },
    { label: 'อื่นๆ โปรดระบุ', value: 'others' },
])

watch(
    skillsRadio,
    (newSkills) => {
        console.log(newSkills)
        for (const skill of newSkills) {
            if (skill.selected != 'others') {
                skill.others = undefined
            }
        }
    },
    { deep: true }
)
</script>
