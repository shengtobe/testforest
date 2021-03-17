import axios from '@/apis/axiosSetting'

// 層級因素列表列表清單
export function accidentResonQueryList(data) {
    return axios(
        {
            url: 'sms/sp/accidentresonquerylist',
            method: 'post',
            data,
        }
    )
}
