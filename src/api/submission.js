import ApiService from "./api";

const baseURL = "/submissions";

const submissionApi = {
  getAllSubmissions: (param) => ApiService.get(baseURL, param),

  createSubmission: (param) => ApiService.post(baseURL, param),

  getSubmissionById: (param) =>
    ApiService.get(`${baseURL + "/" + param.id}`, param),

  updateSubmission: (param) =>
    ApiService.put(`/submissions/${param.id}`, param),

  submitSubmission: (param) =>
    ApiService.post(`/submissions/${param.id}/submit`, param),
};

export default submissionApi;
