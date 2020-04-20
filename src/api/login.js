
// 导入 axios 副本 instance
import instance from '@/utils/request.js'

function toLogin(data) {
    return instance({
        url: "/login",
        method: "post",
        data,
    })
}

export { toLogin }