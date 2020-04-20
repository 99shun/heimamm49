// 保存 token 
function setToken(val,name='token') {
    window.localStorage.setItem(name,val);
}

// 获取 token
function getToken(name='token') {
    return window.localStorage.getItem(name);
}

// 删除 token
function removeToken(name='token') {
    window.localStorage.removeItem(name);
}

export { setToken, getToken, removeToken }
