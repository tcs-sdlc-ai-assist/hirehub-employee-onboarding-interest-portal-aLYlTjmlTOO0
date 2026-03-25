const SESSION_KEY = 'hirehub_admin_session';

export function isAdminAuthenticated() {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}

export function loginAdmin(username, password) {
  if (username === 'admin' && password === 'admin') {
    sessionStorage.setItem(SESSION_KEY, 'true');
    return { success: true };
  }
  return { success: false, error: 'Invalid credentials.' };
}

export function logoutAdmin() {
  sessionStorage.removeItem(SESSION_KEY);
}