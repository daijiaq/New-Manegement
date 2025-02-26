import http from "../utils/http";
export const updatePaceInterview = (paceId, paceStatus) => {
  return http({
    url: "/user/pace/admin/updatePace",
    method: "PUT",
    data: {
      id: paceId,
      interview: paceStatus,
    },
  });
};

export const updatePaceStatusOne = (paceId, paceStatus) => {
  return http({
    url: "/user/pace/admin/updatePace",
    method: "PUT",
    data: {
      id: paceId,
      statusOne: paceStatus,
    },
  });
};

export const updatePaceStatusTwo = (paceId, paceStatus) => {
  return http({
    url: "/user/pace/admin/updatePace",
    method: "PUT",
    data: {
      id: paceId,
      statusTwo: paceStatus,
    },
  });
};

export const updatePaceStatusThree = (paceId, paceStatus) => {
  return http({
    url: "/user/pace/admin/updatePace",
    method: "PUT",
    data: {
      id: paceId,
      success: paceStatus,
    },
  });
};
