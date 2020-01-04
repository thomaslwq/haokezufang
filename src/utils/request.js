import axios from "axios"
import  { API_URL } from "./urls"
import { Toast } from 'antd-mobile';
//1. 配置統一的URL
//2. 配置一下攔截器 a. 在請求之前和之後加Loading b.對返回的數據進行轉換

const Axios = axios.create({
    baseURL: API_URL,
  });

// 請求的攔截 
Axios.interceptors.request.use(function (config) {
  Toast.loading("loading...",60*60*60,null);
  return config;
}, function (error) {

  return Promise.reject(error);
});

// 返回攔截
Axios.interceptors.response.use(function (response) {
  Toast.hide();
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default Axios