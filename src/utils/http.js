import axios from "axios";
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router";
const router=useRouter()
const http=axios.create({
    baseURL:'http://47.121.198.19:8888',
    timeout:5000
})

// axios请求拦截器
http.interceptors.request.use(config => {
  // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjkyMjMzNzIwMzY4NTQ3NzUsInN1YiI6IkxPR0lOX1VTRVIiLCJ1c2VySWQiOjE4OTA5OTM3NzQxNjExMDA4MDEsImFjY291bnQiOiIzNjY2MDA0MjI3In0.UGmHoccDYMliChQnz6ZkQApKI8YMkMm041Rqw-wOFdU'
  // if (token) {
  //   config.headers['Authorization'] = `Bearer ${token}`; // 假设使用的是 Bearer token
  // }
    return config
  }, e => Promise.reject(e))
  
  // axios响应式拦截器
  http.interceptors.response.use(res => res.data, e => {
    
    // 统一错误提示
    ElMessage({
      type: 'warning',
      // message: e.response.data.msg
      message:e.response
    })
  
   
    return Promise.reject(e)
  })
  

export default http