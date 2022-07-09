import requset from '@/utils/request.js'
export const getUserInfo = () => requset({
    url: '/v1_0/user',
})