const API_BASE_URL = "/api";

function getToken() {
  return localStorage.getItem("pms_token");
}

async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Something went wrong while contacting the server.");
  }

  return data;
}

export function storeToken(token) {
  localStorage.setItem("pms_token", token);
}

export function clearToken() {
  localStorage.removeItem("pms_token");
}

export function hasToken() {
  return Boolean(getToken());
}

export const login = (email, password) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const getMe = () => request("/users/me");
export const updateMe = (payload) =>
  request("/users/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

export const getProjects = (search = "") =>
  request(`/projects${search ? `?search=${encodeURIComponent(search)}` : ""}`);

export const createProject = (payload) =>
  request("/projects", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const applyToProject = (projectId) =>
  request(`/projects/${projectId}/apply`, {
    method: "POST",
  });

export const getProjectApplications = (projectId) =>
  request(`/projects/${projectId}/applications`);

export const updateProjectApplication = (projectId, applicationId, status) =>
  request(`/projects/${projectId}/applications/${applicationId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

export const getAdvisors = (search = "") =>
  request(`/advisors${search ? `?search=${encodeURIComponent(search)}` : ""}`);

export const getAdvisorAccounts = () => request("/advisors/accounts");

export const sendAdvisorRequest = (advisorId, projectId, message = "") =>
  request(`/advisors/${advisorId}/request`, {
    method: "POST",
    body: JSON.stringify({ projectId, message }),
  });

export const getRequests = () => request("/requests");
export const updateRequest = (id, status) =>
  request(`/requests/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

export const getAnnouncements = () => request("/announcements");
export const createAnnouncement = (payload) =>
  request("/announcements", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getStudents = () => request("/users/students");
