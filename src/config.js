const host = process.env.NODE_ENV === 'dev' ? 'http://localhost:3000' : window.location.origin;

export const apiUrl = `${host}/api`;