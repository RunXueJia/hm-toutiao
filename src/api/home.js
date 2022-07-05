import requset from '@/utils/request.js'

export const getchannels = () => requset({
    url: '/v1_0/user/channels'
})