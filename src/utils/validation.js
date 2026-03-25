const ALLOWED_DEPARTMENTS = [
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

export function validateName(name) {
  if (!name || !name.trim()) {
    return 'Full name is required.';
  }
  const trimmed = name.trim();
  if (trimmed.length > 100) {
    return 'Full name must be 100 characters or less.';
  }
  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(trimmed)) {
    return 'Full name must contain only alphabets and spaces.';
  }
  return '';
}

export function validateEmail(email) {
  if (!email || !email.trim()) {
    return 'Email is required.';
  }
  const trimmed = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return 'Please enter a valid email address.';
  }
  return '';
}

export function validateMobile(mobile) {
  if (!mobile || !mobile.trim()) {
    return 'Mobile number is required.';
  }
  const trimmed = mobile.trim();
  const mobileRegex = /^\d{10}$/;
  if (!mobileRegex.test(trimmed)) {
    return 'Mobile number must be exactly 10 digits.';
  }
  return '';
}

export function validateDepartment(department) {
  if (!department || !department.trim()) {
    return 'Department selection is required.';
  }
  const trimmed = department.trim();
  if (!ALLOWED_DEPARTMENTS.includes(trimmed)) {
    return 'Please select a valid department.';
  }
  return '';
}