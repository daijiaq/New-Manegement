import http from "../utils/http";

export const getApply = (target, paceNum) => {
  return http({
    url: "/user/apply/admin/selectAll",
    method: "GET",
    params: {
      target: target,
      paceNum,
    },
  });
};
