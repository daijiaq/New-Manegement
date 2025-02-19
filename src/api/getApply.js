import http from "../utils/http";



export const getApply = (target) => {
    return http({
      url: '/user/apply/admin/selectAll',
      method: 'GET',
      params: {
        target: target
      }
    });
  }