import http from "../utils/http";
// 获取验证码
export const getConfirmWord=(tel)=>{
    return http({
        url:'/get/code',
        method:'POST',
        data:{
            tel
        }
    })
}

// 验证验证码
export const verifyConfirmCode=(data)=>{
    return http({
        url:'/user/authentication',
        method:'POST',
        data
    })
}