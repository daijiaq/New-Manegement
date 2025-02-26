import http from "../utils/http";
export const getAllPace = (target, paceNumber) => {
  return http({
    url: "/user/pace/admin/getAllPace",
    method: "GET",
    data: {
      target,
      paceNumber,
    },
  });
};
