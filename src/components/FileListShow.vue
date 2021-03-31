<template>
<v-row>
    <v-col cols="12" class="mt-2">
        <v-card flat>
            <v-card-title
                class="purple lighten-3 py-2 px-3 white--text"
                primary-title
            >
                <h5>{{ title }}</h5>
            </v-card-title>

            <v-row class="py-2 px-4">
                <v-col cols="12" sm="6" md="3"
                    v-for="item in fileList"
                    :key="item.FileName"
                >
                    <a :href="item.FileFullPath" :download="item.FileName">
                        <v-card>
                            <v-img
                                contain
                                min-width="100%"
                                height="158"
                                :src="(['png', 'jpeg', 'jpg', 'gif'].includes(item.FileType))? item.FileFullPath : '/images/file.jpg'"
                                class="grey lighten-2"
                            ></v-img>

                            <v-card-actions
                                class="my-1 mx-2 d-flex justify-space-between align-start"
                            >
                                <div style="width: calc(100% - 36px);">{{ item.FileName }}</div>
                            </v-card-actions>
                        </v-card>
                    </a>
                </v-col>
            </v-row>
        </v-card>
    </v-col>
</v-row>
</template>

<script>
export default {
    props: ['fileList', 'title'],
}
</script>