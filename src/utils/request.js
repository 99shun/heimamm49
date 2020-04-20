/*
接口调用；
1：安装axios   npm i axios
2:导入axios    import axios from 'axios
3:使用axios调用接口
*/

import axios from 'axios'

// 导入 element 中的 消息提示
import { Message } from 'element-ui';

// var instance = axios.create({})  创建 axios 的副本，
// 创建副本后就把axios 替换成 instance ，不然这个副本创建的就没有意义(之前这个出过错被批)
var instance = axios.create({
    baseURL: process.env.VUE_APP_URL,   // 设置基地址
    // 跨域是不会携带 coolie的，有这个就照样携带
    withCredentials: true
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.code == 200) {
        // 成功处理
        // axios 自动在外面加了一层data ，在这里处理下
        return response.data;
    } else {
        // 错误提示
        Message.error(response.data.message);
        // 错误后就不用再返回数据
        //  return Promise.reject(error);  抛出错误让后面的代码无法进行比如.then
        return Promise.reject("error");
    }

}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance