import http from "../utils/http";
export const accessManagement=(pageNum,sizeNum)=>{
    return http({
        url:`/auth/admin?pageNum=${pageNum}&sizeNum=${sizeNum}`,
        method:'GET',

    })
}