import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutAdmin } from '../utils/session.js';
import { getSubmissions, deleteSubmission } from '../utils/storage.js';
import SubmissionTable from './SubmissionTable.jsx';
import EditModal from './EditModal.jsx';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [editingSubmission, setEditingSubmission] = useState(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  function loadSubmissions() {
    const data = getSubmissions();
    setSubmissions(data);
  }

  function handleLogout() {
    logoutAdmin();
    navigate('/');
  }

  function handleEdit(submission) {
    setEditingSubmission(submission);
  }

  function handleEditSave() {
    setEditingSubmission(null);
    loadSubmissions();
  }

  function handleEditClose() {
    setEditingSubmission(null);
  }

  function handleDelete(id) {
    const confirmed = window.confirm('Are you sure you want to delete this submission?');
    if (!confirmed) return;

    const result = deleteSubmission(id);
    if (result.success) {
      loadSubmissions();
    }
  }

  function getTotalCount() {
    return submissions.length;
  }

  function getUniqueDepartments() {
    const departments = new Set(submissions.map((s) => s.department));
    return departments.size;
  }

  function getLatestDate() {
    if (submissions.length === 0) return '—';
    try {
      const sorted = [...submissions].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      const latest = new Date(sorted[0].createdAt);
      return latest.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      return '—';
    }
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <div className="dashboard-actions">
            <button className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-label">Total Submissions</div>
            <div className="stat-card-value primary">{getTotalCount()}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-label">Unique Departments</div>
            <div className="stat-card-value warning">{getUniqueDepartments()}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-label">Latest Submission</div>
            <div className="stat-card-value success">{getLatestDate()}</div>
          </div>
        </div>

        <div className="table-container">
          <div className="table-header">
            <h2>All Submissions</h2>
          </div>
          <SubmissionTable
            submissions={submissions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {editingSubmission && (
          <EditModal
            submission={editingSubmission}
            onClose={handleEditClose}
            onSave={handleEditSave}
          />
        )}
      </div>
    </div>
  );
}