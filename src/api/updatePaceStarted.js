import http from "../utils/http";
export const updatePaceStarted = (targetNum, turnNum, paceStatus) => {
  return http({
    url: "/user/pace/admin/updatePaces",
    method: "PUT",
    params: {
      target: targetNum,
      paceNum: turnNum,
      updatedPace: paceStatus,
    },
  });
};
