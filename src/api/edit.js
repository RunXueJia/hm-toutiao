import requset from '@/utils/request.js'

export const getUserProfileApi = () => requset({
    url: '/v1_0/user/profile',
})

export const EditUserProfileApi = (data) => requset({
    url: '/v1_0/user/profile',
    method: 'patch',
    data
})

export const EditUserPhotoApi = (data) => requset({
    url: '/v1_0/user/photo',
    method: 'patch',
    data
})