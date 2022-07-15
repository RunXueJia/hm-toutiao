import requset from '@/utils/request.js'

export const getArticleInfoApi = (article_id) => requset({
    url: '/v1_0/articles/' + article_id
})

export const FollowUserApi = (data) => requset({
    method: 'post',
    url: '/v1_0/user/followings',
    data
})

export const ReFollowUserApi = (id) => requset({
    method: 'DELETE',
    url: '/v1_0/user/followings/' + id
})

//
export const ReCollectArticleApi = (id) => requset({
    method: 'DELETE',
    url: '/v1_0/article/collections/' + id
})
export const CollectArticleApi = (data) => requset({
    method: 'post',
    url: '/v1_0/article/collections',
    data
})

export const LikeArticleApi = (data) => requset({
    method: 'post',
    url: '/v1_0/article/likings',
    data
})
export const ReLikeArticleApi = (id) => requset({
    method: 'DELETE',
    url: '/v1_0/article/likings/' + id
})