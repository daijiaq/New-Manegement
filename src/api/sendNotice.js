import http from "../utils/http";
export const sendNotice= (content,receivers,type) => {
    return http({
      url: '/notice/admin/sendNotice',
      method: 'POST',
      data:{
        content,
        receivers,
        type
    }
    });
  }


  export const getNotice= (type) => {
    return http({
      url: `/notice/admin/getNotice/${type}`,
      method: 'GET'
    });
  }

