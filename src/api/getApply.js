import http from "../utils/http";


// 验证验证码
export const getApply = (target) => {
    return http({
      url: '/user/apply/admin/selectAll',
      method: 'GET',
      params: {
        target: target
      }
    });
  }