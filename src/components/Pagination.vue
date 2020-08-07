<template>
    <div v-if="footer.props.pagination.pageCount != 0">
        <v-divider></v-divider>

        <p class="py-2 text-center">
            <v-btn icon class="mr-1" color="indigo"
                @click="first"
                :disabled="(footer.props.pagination.page == 1)? true : false"
            >
                <v-icon>mdi-page-first</v-icon>
            </v-btn>

            <v-btn icon class="mr-1" color="indigo"
                @click="prev"
                :disabled="(footer.props.pagination.page == 1)? true : false"
            >
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>

            {{ footer.props.pagination.page }} / {{ footer.props.pagination.pageCount }}

            <v-btn icon class="ml-1" color="indigo"
                @click="next"
                :disabled="(footer.props.pagination.page == footer.props.pagination.pageCount)? true : false"
            >
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>

            <v-btn icon class="ml-1" color="indigo"
                @click="last"
                :disabled="(footer.props.pagination.page == footer.props.pagination.pageCount)? true : false"
            >
                <v-icon>mdi-page-last</v-icon>
            </v-btn>
        </p>
    </div>
</template>

<script>
export default {
    props: ['footer', 'pageOpt'],
    methods: {
        // 第一頁
        first() {
            this.$emit('chPage', 1)
        },
        // 最後一頁
        last() {
            this.$emit('chPage', this.footer.props.pagination.pageCount)
        },
        // 上一頁
        prev() {
            if(this.pageOpt.page > 1) {
                this.$emit('chPage', this.footer.props.pagination.page - 1)
            }
        },
        // 下一頁
        next() {
            if(this.pageOpt.page < this.footer.props.pagination.pageCount) {
                this.$emit('chPage', this.footer.props.pagination.page + 1)
            }
        },
    },
}
</script>