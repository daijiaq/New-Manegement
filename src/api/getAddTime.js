import http from "../utils/http";
export const getAddTime = (target, timePace) => {
  return http({
    url: `/user/preTime/admin/${target}?paceTime=${timePace}`,
    method: "GET",
    data: {
      target,
      timePace,
    },
  });
};
