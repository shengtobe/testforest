<template>
<v-row no-gutters>
    <template v-for="item in items">
        <!-- 文字 -->
        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC"
            :key="item.title"
            v-if="item.dataType == 'text'"
        >
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <!-- 若無小圖示，icon 屬性的值為 none -->
                        <v-icon class="mr-1 mb-1" v-if="item.icon != 'none'">{{ item.icon }}</v-icon>
                        {{ item.title }}
                    </span>
                </v-col>

                <!-- 若是多行文字(有換行)，online 屬性的值為 false。反之，單行文字為 true -->
                <v-col class="white pa-3" v-if="item.oneline">{{ item.text }}</v-col>
                <v-col class="white pa-3" v-else v-html="item.text"></v-col>
            </v-row>
        </v-col>

        <!-- 超連結 -->
    </template>
</v-row>
</template>

<script>
export default {
    props: ['items'],
}
</script>