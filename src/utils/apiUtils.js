const BASE = 'http://localhost:3000';
const API_BASE = `${BASE}/api`;

export const getApiUrl = path => `${API_BASE}/${path}`
export const getSectionUrl = (parent, child) => child.endsWith('pdf') ?
  `${BASE}/${parent}/${child}` :
  `ms-word:ofe|u|${BASE}/${parent}/${child}`
