export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export interface ImageValidationError {
  file: File;
  message: string;
}

export const validateImage = (file: File): string | null => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Invalid file type. Only JPG, PNG, and WEBP are supported.';
  }

  if (file.size > MAX_FILE_SIZE) {
    return 'File is too large. Maximum size is 10MB.';
  }

  return null;
};
