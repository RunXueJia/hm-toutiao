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

export const setUserChannelsApi = (data) => requset({
    method: 'patch',
    url: '/v1_0/user/channels',
    data
})

export const delUserChannelsApi = (id) => requset({
    method: 'delete',
    url: '/v1_0/user/channels/' + id,
})
///v1_0/user/channels
///v1_0/channels
///v1_0/user/channels