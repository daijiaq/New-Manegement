import http from "../utils/http";
export const addPreTime = (timeStart, timeEnd, target, timePace) => {
  return http({
    url: "/user/preTime/admin/add",
    method: "POST",
    data: {
      timeStart,
      timeEnd,
      target,
      timePace,
    },
  });
};
