export const buildPrompt = (code, language) => {
  return `
You are a senior software engineer.

Review the following ${language} code and provide:

1. Code Quality Feedback
2. Bugs or Logical Issues
3. Performance Improvements
4. Security Concerns
5. Rating out of 10

Code:
${code}

Respond in structured markdown format.
`;
};
