import requset from '@/utils/request.js'

export const getCommentApi = (params) => requset({
    url: '/v1_0/comments',
    params
})

//点赞
export const LikeCommentApi = (id) => requset({
    method: 'post',
    url: '/v1_0/comment/likings',
    data: {
        target: id
    }
})

export const ReLikeCommentApi = (id) => requset({
    method: 'DELETE',
    url: '/v1_0/comment/likings/' + id,
})
//发布评论/回复
export const AddCommentApi = (data) => requset({
    method: 'POST',
    url: '/v1_0/comments',
    data
})