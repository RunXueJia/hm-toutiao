import requset from '@/utils/request.js'

export const getArticleInfoApi = (article_id) => requset({
    url: '/v1_0/articles/' + article_id
})