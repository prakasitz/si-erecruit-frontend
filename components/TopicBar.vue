<template>
    <v-sheet elevation="2" style="margin-bottom: 30px">
        <v-row no-gutters>
            <v-col cols="12">
                <v-sheet class="ma-1 pa-5" max-height="120px">
                    <span
                        :style="['font-family: \'Krub-Bold\' !important']"
                        class="text-h5 font-weight-bold text-main-color"
                    >
                        เมนูทั่วไป
                    </span>
                    <v-breadcrumbs divider=">" :items="['Foo', 'Bar', 'Fizz']"></v-breadcrumbs>
                </v-sheet>
            </v-col>
        </v-row>
    </v-sheet>
</template>
