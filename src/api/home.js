import requset from '@/utils/request.js'

export const getChannelsApi = () => requset({
    url: '/v1_0/user/channels'
})
export const getArticleListApi = (params) => requset({
    url: '/v1_0/articles',
    params
})