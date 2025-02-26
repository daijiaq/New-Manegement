import http from "../utils/http";
export const getTimeChoiceDetail = (id) => {
  return http({
    url: `/user/preTime/admin/getPreTime/choice?id=${id}`,
    method: "POST",
    data: {
      id: id,
    },
  });
};
