
// 导入 axios 副本 instance

import instance from '@/utils/request.js'

function getPhoneCode(data) {
    return instance({
        url: "/sendsms",
        method: "post",
        data,
    })
}
function register(data) {
    return instance({
        url: "/register",
        method: "post",
        data,
    })
}

// export default getPhoneCode
// export default我们看不出来页面用了些什么接口，它一个js只能使用一个export default
export { getPhoneCode, register }

