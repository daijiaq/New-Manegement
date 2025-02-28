import http from "../utils/http";
export const unifiedPaces = () => {
  return http({
    url: "/user/pace/admin/unifiedPaces",
    method: "GET",
  });
};
