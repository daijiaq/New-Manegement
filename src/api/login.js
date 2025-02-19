import http from "../utils/http";
export const login=(userName,passWord)=>{
    return http({
        url:'/login',
        method:'POST',
        data:{
            userName,
            passWord
        }
    })
}