const BASE = 'http://localhost:4000';
const API_BASE = `${BASE}/api`;

export const getApiUrl = path => `${API_BASE}/${path}`
export const getSectionUrl = (parent, child) => `${API_BASE}/sections/view/${parent}/${child}`
