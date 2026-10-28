import * as yup from 'yup';

export { yup };

export type YupSchema<T = unknown> = yup.Schema<T>;

export const commonSchemas = {
  email: yup.string().trim().email('Enter a valid email address').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must include an uppercase letter')
    .matches(/[a-z]/, 'Password must include a lowercase letter')
    .matches(/[0-9]/, 'Password must include a number')
    .required('Password is required'),
  phone: yup
    .string()
    .trim()
    .matches(/^[+]?[\d\s()-]{7,}$/, 'Enter a valid phone number')
    .required('Phone number is required'),
  url: yup.string().trim().url('Enter a valid URL').required('URL is required'),
  requiredString: (label = 'This field') => yup.string().trim().required(`${label} is required`),
  positiveNumber: (label = 'This field') =>
    yup.number().typeError(`${label} must be a number`).positive(`${label} must be positive`),
  nonNegativeNumber: (label = 'This field') =>
    yup.number().typeError(`${label} must be a number`).min(0, `${label} cannot be negative`),
};

export interface ValidationIssue {
  path: string;
  message: string;
}

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors: ValidationIssue[];
}

export async function validateWithSchema<T>(
  schema: yup.Schema<T>,
  values: unknown
): Promise<ValidationResult<T>> {
  try {
    const data = await schema.validate(values, { abortEarly: false });
    return { success: true, data, errors: [] };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return {
        success: false,
        errors: (error.inner.length ? error.inner : [error]).map(issue => ({
          path: issue.path ?? '',
          message: issue.message,
        })),
      };
    }
    throw error;
  }
}

export function validateWithSchemaSync<T>(
  schema: yup.Schema<T>,
  values: unknown
): ValidationResult<T> {
  try {
    const data = schema.validateSync(values, { abortEarly: false });
    return { success: true, data, errors: [] };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return {
        success: false,
        errors: (error.inner.length ? error.inner : [error]).map(issue => ({
          path: issue.path ?? '',
          message: issue.message,
        })),
      };
    }
    throw error;
  }
}

export function toFieldErrors(error: unknown): Record<string, string> {
  const result: Record<string, string> = {};

  if (error instanceof yup.ValidationError) {
    for (const issue of error.inner.length ? error.inner : [error]) {
      if (issue.path && !result[issue.path]) {
        result[issue.path] = issue.message;
      }
    }
  }

  return result;
}

export interface ResolverResult<TValues> {
  values: TValues | Record<string, never>;
  errors: Record<string, { type: string; message: string }>;
}

export function createYupResolver<TValues>(
  schema: yup.Schema<TValues>
): (values: TValues) => Promise<ResolverResult<TValues>> {
  return async (values: TValues) => {
    try {
      const data = await schema.validate(values, { abortEarly: false });
      return { values: data as TValues, errors: {} };
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors: Record<string, { type: string; message: string }> = {};
        for (const issue of error.inner.length ? error.inner : [error]) {
          const path = issue.path ?? 'root';
          if (!errors[path]) {
            errors[path] = { type: 'validation', message: issue.message };
          }
        }
        return { values: {}, errors };
      }
      throw error;
    }
  };
}

export function createFormSchema<T extends yup.AnyObjectSchema>(schema: T): T {
  return schema;
}

export function fieldSchema<T>(schema: yup.Schema<T>): yup.Schema<T> {
  return schema;
}
