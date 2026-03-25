import { isAdminAuthenticated } from '../utils/session.js';
import AdminLogin from './AdminLogin.jsx';

export default function ProtectedRoute({ children }) {
  if (!isAdminAuthenticated()) {
    return <AdminLogin />;
  }

  return children;
}