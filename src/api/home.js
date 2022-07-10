import requset from '@/utils/request.js'

export const getChannelsApi = () => requset({
    url: '/v1_0/user/channels'
})
export const getArticleListApi = (params) => requset({
    url: '/v1_0/articles',
    params
})

export const getAllChannelsApi = (params) => requset({
    url: '/v1_0/channels',
    params
})
//获取所有频道
///v1_0/channels
///v1_0/user/channels