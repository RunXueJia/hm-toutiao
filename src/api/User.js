import requset from '@/utils/request.js'
import store from '@/store'
export const getUserInfo = () => requset({
    url: '/v1_0/user',
    headers: {
        Authorization: `Bearer ${store.getters.token}`
    }
})