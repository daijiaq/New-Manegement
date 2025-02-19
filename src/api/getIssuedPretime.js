import http from "../utils/http";
export const getIssuedPretime=(target)=>{
    return http({
        url:'/user/preTime/admin/{target}',
        method:'GET',

    })
}