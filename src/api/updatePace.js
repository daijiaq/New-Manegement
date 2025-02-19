import http from "../utils/http";
export const updatePace= (data) => {
    return http({
      url: '/user/pace/admin/updatePace',
      method: 'PUT',
      data
    });
  }
