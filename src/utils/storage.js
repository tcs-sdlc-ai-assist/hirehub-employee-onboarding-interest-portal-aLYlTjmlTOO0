const STORAGE_KEY = 'hirehub_submissions';

function generateId() {
  return Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 9);
}

export function getSubmissions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) throw new Error('Not array');
    return arr;
  } catch (e) {
    localStorage.setItem(STORAGE_KEY, '[]');
    return [];
  }
}

export function addSubmission(submission) {
  try {
    const arr = getSubmissions();
    const duplicateEmail = arr.find(
      (s) => s.email.toLowerCase() === submission.email.toLowerCase()
    );
    if (duplicateEmail) {
      return { success: false, error: 'Duplicate email submission.' };
    }
    const newSubmission = {
      ...submission,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    arr.push(newSubmission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    return { success: true };
  } catch (e) {
    return { success: false, error: 'Storage error.' };
  }
}

export function updateSubmission(id, updatedData) {
  try {
    const arr = getSubmissions();
    const index = arr.findIndex((s) => s.id === id);
    if (index === -1) {
      return { success: false, error: 'Submission not found.' };
    }
    if (updatedData.email) {
      const duplicateEmail = arr.find(
        (s) =>
          s.id !== id &&
          s.email.toLowerCase() === updatedData.email.toLowerCase()
      );
      if (duplicateEmail) {
        return { success: false, error: 'Duplicate email submission.' };
      }
    }
    arr[index] = { ...arr[index], ...updatedData };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    return { success: true };
  } catch (e) {
    return { success: false, error: 'Storage error.' };
  }
}

export function deleteSubmission(id) {
  try {
    const arr = getSubmissions();
    const index = arr.findIndex((s) => s.id === id);
    if (index === -1) {
      return { success: false, error: 'Submission not found.' };
    }
    arr.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    return { success: true };
  } catch (e) {
    return { success: false, error: 'Storage error.' };
  }
}

export function resetSubmissions() {
  localStorage.setItem(STORAGE_KEY, '[]');
}