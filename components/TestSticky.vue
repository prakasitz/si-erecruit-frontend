<template>
    <div id="app">
        <v-row>
            <v-col cols="12">
                <v-card class="mx-auto sticky-card" max-width="344" color="primary">
                    <v-card-text>
                        <b>This should be sticky top 90px</b>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="mx-auto after-sticky" max-width="344">
                    <v-card-text> Card with much content - past large text inside of it </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<style>
.sticky-card {
    width: 344px;
    position: fixed;
    top: 500px;
    z-index: 10000;
    /* centering */
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
}

.after-sticky {
    margin-top: 90px;
}
</style>
