import { useState } from 'react';
import { validateName, validateEmail, validateMobile, validateDepartment } from '../utils/validation.js';
import { updateSubmission } from '../utils/storage.js';

const DEPARTMENTS = [
  'Engineering',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Operations',
  'Design',
  'Product',
  'Legal',
  'Support',
];

export default function EditModal({ submission, onClose, onSave }) {
  const [formData, setFormData] = useState({
    fullName: submission.fullName || '',
    email: submission.email || '',
    mobile: submission.mobile || '',
    department: submission.department || '',
  });
  const [errors, setErrors] = useState({});
  const [errorBanner, setErrorBanner] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  function validateForm() {
    const newErrors = {};
    const nameError = validateName(formData.fullName);
    if (nameError) newErrors.fullName = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const mobileError = validateMobile(formData.mobile);
    if (mobileError) newErrors.mobile = mobileError;

    const departmentError = validateDepartment(formData.department);
    if (departmentError) newErrors.department = departmentError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSave() {
    setErrorBanner('');

    if (!validateForm()) {
      return;
    }

    const updatedData = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      mobile: formData.mobile.trim(),
      department: formData.department.trim(),
    };

    const result = updateSubmission(submission.id, updatedData);

    if (result.success) {
      onSave();
    } else {
      setErrorBanner(result.error || 'Something went wrong. Please try again.');
    }
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <h2>Edit Submission</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          {errorBanner && (
            <div className="banner banner-error">
              <span>{errorBanner}</span>
              <button
                className="banner-dismiss"
                onClick={() => setErrorBanner('')}
              >
                ×
              </button>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="edit-fullName">
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="edit-fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              className={errors.fullName ? 'input-error' : ''}
            />
            {errors.fullName && (
              <div className="field-error">{errors.fullName}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="edit-email">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="edit-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && (
              <div className="field-error">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="edit-mobile">
              Mobile Number <span className="required">*</span>
            </label>
            <input
              type="text"
              id="edit-mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter 10-digit mobile number"
              className={errors.mobile ? 'input-error' : ''}
            />
            {errors.mobile && (
              <div className="field-error">{errors.mobile}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="edit-department">
              Department of Interest <span className="required">*</span>
            </label>
            <select
              id="edit-department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={errors.department ? 'input-error' : ''}
            >
              <option value="">Select a department</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <div className="field-error">{errors.department}</div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}