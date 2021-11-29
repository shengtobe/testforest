<template>
<v-row no-gutters>
    <template v-for="item in items">
        <!-- 文字 -->
        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC"
            :key="item.title"
            v-if="item.dataType == 'text'"
        >
            <v-row no-gutters>
                <v-col class="gradual-bg-wood pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <!-- 若無小圖示，icon 屬性的值為 none -->
                        <v-icon class="mr-1 mb-1" v-if="item.icon != 'none'">{{ item.icon }}</v-icon>
                        {{ item.title }}
                    </span>
                </v-col>

                <!-- 若是多行文字(有換行)，online 屬性的值為 false。反之，單行文字為 true -->
                <v-col class="light-white-wood pa-3" v-if="item.oneline">{{ item.text }}</v-col>
                <v-col class="light-white-wood pa-3" v-else v-html="item.text"></v-col>
            </v-row>
        </v-col>

        <!-- 超連結 -->
        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC"
            :key="item.title"
            v-if="item.dataType == 'link'"
        >
            <v-row no-gutters>
                <v-col class="gradual-bg-wood pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-ungroup</v-icon>{{ item.title }}
                    </span>
                </v-col>

                <v-col class="light-white-wood pa-3">
                    <v-chip small label color="teal" class="mr-2 mb-2 mb-sm-0"
                        v-for="link in item.links"
                        :key="link.id"
                        :to="link.link"
                        target="_blank"
                        rel="noopener norefferrer"
                        dark
                    >
                        <v-avatar left>
                            <v-icon>mdi-link-variant</v-icon>
                        </v-avatar>
                        {{ link.id }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-col>

        <!-- 危害通報備註 -->
        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC"
            :key="item.title"
            v-if="item.dataType == 'notifyMemo'"
        >
            <v-row no-gutters>
                <v-col class="gradual-bg-wood pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <!-- 若無小圖示，icon 屬性的值為 none -->
                        <v-icon class="mr-1 mb-1" v-if="item.icon != 'none'">{{ item.icon }}</v-icon>
                        {{ item.title }}
                    </span>
                </v-col>

                <!-- 若是多行文字(有換行)，online 屬性的值為 false。反之，單行文字為 true -->
                <v-col class="light-white-wood pa-3" v-if="item.oneline" v-html="changeText(item.text)"></v-col>
                <v-col class="light-white-wood pa-3" v-else v-html="item.text"></v-col>
            </v-row>
        </v-col>
    </template>
</v-row>
</template>

<script>
export default {
    props: ['items'],
    methods: {
        changeText(text) {
            let spArr = text.split("、")
            let rtnArr = []
            for( let item of spArr ) {
                let srcType = item.slice(2,6)
                let flowId = item.slice(item.indexOf('(')+1,item.indexOf(')'))
                let src = ""
                switch(srcType) {
                    case "行車事故":
                    case "行安事故":
                        src = `smis/car-accident-event/${flowId}/show`
                        break;
                    case "行車危害":
                    case "行安危害":
                        src = `smis/car-harmdb/harms/${flowId}/show`
                        break;
                    case "職災事故":
                    case "職安事故":
                        src = `smis/jobsafety/disaster-survey/${flowId}/show`
                        break;
                    case "職災危害":
                    case "職安危害":
                        src = `smis/jobsafety/disasterdb/${flowId}/show`
                        break;
                    default:
                        src = ""
                        break;
                }
                if(src!=""){
                  rtnArr.push(item.slice(0,item.indexOf('(')+1)+`<a target="_blank" href="#/${src}">`+item.slice(item.indexOf('(')+1,item.indexOf(')'))+'</a>'+item.slice(item.indexOf(')')))
                }else{
                  rtnArr.push(item)  
                }
            }
            return rtnArr.join("、")
        }
    }
}
</script>