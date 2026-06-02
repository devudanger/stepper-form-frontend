import ApiService from "./api";
const baseURL = "/configs";
const configApi = {
  getConfigs: (param) => ApiService.get(baseURL, param),
};

export default configApi;
