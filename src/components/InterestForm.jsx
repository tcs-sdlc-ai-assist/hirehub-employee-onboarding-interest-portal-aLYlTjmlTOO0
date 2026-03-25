import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { validateName, validateEmail, validateMobile, validateDepartment } from '../utils/validation.js';
import { addSubmission } from '../utils/storage.js';

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

const INITIAL_FORM = {
  fullName: '',
  email: '',
  mobile: '',
  department: '',
};

export default function InterestForm() {
  const [formData, setFormData] = useState({ ...INITIAL_FORM });
  const [errors, setErrors] = useState({});
  const [successBanner, setSuccessBanner] = useState('');
  const [errorBanner, setErrorBanner] = useState('');

  useEffect(() => {
    let timer;
    if (successBanner) {
      timer = setTimeout(() => {
        setSuccessBanner('');
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [successBanner]);

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

  function handleSubmit(e) {
    e.preventDefault();
    setSuccessBanner('');
    setErrorBanner('');

    if (!validateForm()) {
      return;
    }

    const submission = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      mobile: formData.mobile.trim(),
      department: formData.department.trim(),
    };

    const result = addSubmission(submission);

    if (result.success) {
      setFormData({ ...INITIAL_FORM });
      setErrors({});
      setSuccessBanner('Your interest has been submitted successfully! We will get in touch with you soon.');
    } else {
      setErrorBanner(result.error || 'Something went wrong. Please try again.');
    }
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Express Your Interest</h2>
        <p className="form-subtitle">
          Fill out the form below to let us know you're interested in joining HireHub. All fields are required.
        </p>

        {successBanner && (
          <div className="banner banner-success">
            <span>{successBanner}</span>
            <button
              className="banner-dismiss"
              onClick={() => setSuccessBanner('')}
            >
              ×
            </button>
          </div>
        )}

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

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="fullName">
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.fullName ? 'input-error' : ''}
            />
            {errors.fullName && (
              <div className="field-error">{errors.fullName}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && (
              <div className="field-error">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="mobile">
              Mobile Number <span className="required">*</span>
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your 10-digit mobile number"
              className={errors.mobile ? 'input-error' : ''}
            />
            {errors.mobile && (
              <div className="field-error">{errors.mobile}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="department">
              Department of Interest <span className="required">*</span>
            </label>
            <select
              id="department"
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

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Submit Interest
            </button>
            <Link to="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}