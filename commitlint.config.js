module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'refactor',
        'fix',
        'docs',
        'test',
        'chore',
        'style',
        'ci',
        'design',
        'performance',
        'security',
        'deps',
      ],
    ],
  },
}

// feat: A new feature for the user or a significant improvement to existing features.

// Example: feat: implement user authentication

// fix: A bug fix.

// Example: fix: resolve issue with data not loading

// docs: Documentation changes.

// Example: docs: update README with new instructions

// style: Changes that do not affect the meaning of the code (white-space, formatting, etc.).

// Example: style: format code according to coding standards

// refactor: Code changes that neither fix a bug nor add a feature.

// Example: refactor: improve code readability

// test: Adding or modifying tests.

// Example: test: add unit tests for user service

// chore: Regular maintenance tasks, build process, or tooling changes.

// Example: chore: update dependencies

// ci: Changes to your CI/CD configuration and scripts.

// Example: ci: configure deployment pipeline

// design: Changes related to UI/UX design.

// Example: design: update button styles

// performance: Code changes that improve the performance of the application.

// Example: performance: optimize database queries

// security: Changes addressing security vulnerabilities or improvements.

// Example: security: fix authentication bypass

// deps: Dependency updates and changes.

// Example: deps: update React to v17
