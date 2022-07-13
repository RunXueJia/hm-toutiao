import requset from '@/utils/request.js'
export const getSearchSugApi = (params) => requset({
    url: '/v1_0/suggestion',
    params
})
export const getSearchrResApi = (params) => requset({
    url: '/v1_0/search',
    params
})