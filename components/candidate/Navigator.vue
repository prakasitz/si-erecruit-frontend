<template>
    <v-col cols="12">
        <v-sheet rounded elevation="1" class="mx-auto" width="90%">
            <v-row justify="space-between" align="center">
                <v-col cols="1"> <v-btn variant="plain" icon="mdi-chevron-left" @click="prev"></v-btn></v-col>
                <v-col>
                    <v-item-group v-if="loading" v-model="onBoarding" class="text-center" mandatory>
                        <v-row no-gutters>
                            <v-item
                                v-for="item in candidateForms"
                                v-slot="{ isSelected, toggle, selectedClass }"
                                :key="item.id"
                                :value="item.id"
                                :selected-class="'btn-candidate'"
                            >
                                <v-col>
                                    <v-btn
                                        block
                                        class="px-lg-5 px-md-2 px-sm-1"
                                        :class="selectedClass"
                                        :variant="isSelected ? 'text' : 'text'"
                                        size="small"
                                        @click="toggle"
                                        ><span> {{ item.title }}</span>
                                    </v-btn>
                                </v-col>
                            </v-item>
                        </v-row>
                    </v-item-group>
                </v-col>
                <v-col cols="1">
                    <v-btn variant="plain" icon="mdi-chevron-right" @click="next"></v-btn>
                </v-col>
            </v-row>
        </v-sheet>
    </v-col>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useComponentStore } from '~/stores/component.store'

const componentStore = useComponentStore()
const { onBoarding, candidateForms } = storeToRefs(componentStore)
const { prev, next } = useWindowsNav()
const loading = ref(false)

onMounted(() => {
    console.log('onMounted--')
    loading.value = true
})
</script>
