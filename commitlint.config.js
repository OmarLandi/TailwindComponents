export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // Nueva característica
        'fix', // Corrección de bug
        'docs', // Documentación
        'style', // Formateo
        'refactor', // Refactorización
        'test', // Tests
        'chore', // Mantenimiento
        'perf', // Rendimiento
        'ci', // CI/CD
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
  },
};
