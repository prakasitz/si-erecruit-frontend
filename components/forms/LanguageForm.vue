<template>
    <slot name="prepend"></slot>
    <v-col>
        <v-row v-for="skill in skillsRadio">
            <v-col cols="2">{{ skill.label }}</v-col>
            <v-col cols="10">
                <v-radio-group
                    hide-details
                    :rules="mandatory ? rules_fieldEmpty : undefined"
                    inline
                    v-model="skill.selected"
                >
                    <v-radio v-for="level in levels" :label="level.label" :value="level.value"></v-radio>
                    <v-text-field
                        class="pl-3"
                        hide-details
                        v-model="skill.others"
                        variant="outlined"
                        density="compact"
                        :rules="skill.selected ? rules_fieldEmpty : undefined"
                        :disabled="skill.selected != 'other'"
                    ></v-text-field>
                </v-radio-group>
            </v-col>
        </v-row>
    </v-col>
</template>

<style scoped>
.v-input--error.v-radio-group {
    color: rgb(176, 0, 32);
}
</style>

<script setup lang="ts">
import { language } from '~/stores/interface/personal_information.interface'
import { LanguageLevelOption, Skill } from '~/utils/types'

export interface Props {
    languageFormModel: language
    mandatory: boolean
}

const { rules_fieldEmpty } = useFillRules()
const props = withDefaults(defineProps<Props>(), {
    mandatory: false,
})

const skillsRadio: Ref<Skill[]> = ref([
    {
        label: 'พูด',
        selected: '',
        others: '',
    },
    {
        label: 'อ่าน',
        selected: '',
        others: '',
    },
    {
        label: 'เขียน',
        selected: '',
        others: '',
    },
])

const levels: Ref<LanguageLevelOption[]> = ref([
    { label: 'ดี', value: 'good' },
    { label: 'พอใช้', value: 'fair' },
    { label: 'อื่นๆ โปรดระบุ', value: 'other' },
])

watch(
    skillsRadio,
    (newSkills) => {
        console.log(newSkills)
        for (const skill of newSkills) {
            if (skill.selected != 'other') {
                skill.others = ''
            }

            switch (skill.label) {
                case 'พูด':
                    props.languageFormModel.language_read = skill.selected
                    props.languageFormModel.txt_language_read = skill.others
                    break
                case 'อ่าน':
                    props.languageFormModel.language_speak = skill.selected
                    props.languageFormModel.txt_language_speak = skill.others
                    break
                case 'เขียน':
                    props.languageFormModel.language_write = skill.selected
                    props.languageFormModel.txt_language_write = skill.others
                    break
                default:
                    break
            }
        }
    },
    { deep: true }
)
</script>
