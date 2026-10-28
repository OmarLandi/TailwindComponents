import { describe, it, expect } from 'vitest';

import { yup } from '../src/lib/validation';
import {
  commonSchemas,
  validateWithSchema,
  validateWithSchemaSync,
  toFieldErrors,
  createYupResolver,
} from '../src/lib/validation';

describe('validation', () => {
  it('validates an email schema', async () => {
    const schema = commonSchemas.email;
    const valid = await validateWithSchema(schema, 'test@example.com');
    expect(valid.success).toBe(true);

    const invalid = await validateWithSchema(schema, 'not-an-email');
    expect(invalid.success).toBe(false);
    expect(invalid.errors[0].path).toBe('');
  });

  it('returns nested field errors', async () => {
    const schema = yup.object({
      email: yup.string().email().required(),
      age: yup.number().min(18).required(),
    });

    const result = await validateWithSchema(schema, { email: 'bad', age: 10 });
    expect(result.success).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);

    try {
      await schema.validate({ email: 'bad', age: 10 }, { abortEarly: false });
    } catch (error) {
      const fields = toFieldErrors(error);
      expect(fields.email).toBeTruthy();
      expect(fields.age).toBeTruthy();
    }
  });

  it('validates synchronously', () => {
    const schema = commonSchemas.requiredString('Name');
    const result = validateWithSchemaSync(schema, 'Omar');
    expect(result.success).toBe(true);
    expect(result.data).toBe('Omar');
  });

  it('creates a resolver compatible with form libraries', async () => {
    const schema = yup.object({
      name: yup.string().required('Name is required'),
    });

    const resolver = createYupResolver(schema);
    const invalid = await resolver({ name: '' });
    expect(invalid.errors.name?.message).toBe('Name is required');
    expect(invalid.values).toEqual({});

    const valid = await resolver({ name: 'Omar' });
    expect(valid.errors).toEqual({});
    expect(valid.values).toEqual({ name: 'Omar' });
  });
});
