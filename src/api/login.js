import requset from '@/utils/request.js';
export const sendSms = (mobile) => requset({
    url: `/v1_0/sms/codes/` + mobile
})
export const loginIn = (data) => requset({
    method: 'POST',
    // ContentType: 'application/json',
    url: '/v1_0/authorizations',
    data
}) 