# CLAUDE.md - AI Assistant Guide for jsim01 Repository

> **Last Updated**: 2025-11-16
> **Repository**: jsim01/jsim01
> **Purpose**: Guide for AI assistants working on this codebase

## Table of Contents
- [Repository Overview](#repository-overview)
- [Codebase Structure](#codebase-structure)
- [Development Workflows](#development-workflows)
- [Key Conventions](#key-conventions)
- [AI Assistant Guidelines](#ai-assistant-guidelines)
- [Common Tasks](#common-tasks)
- [Maintaining This File](#maintaining-this-file)

---

## Repository Overview

### Current State
This repository is currently in its initial setup phase. As the codebase develops, this section should be updated with:
- Project purpose and goals
- Tech stack and frameworks
- Key dependencies
- Architecture overview

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd jsim01

# Install dependencies (update once package manager is chosen)
# npm install / pip install -r requirements.txt / etc.

# Run tests (update once testing framework is chosen)
# npm test / pytest / etc.

# Start development server (update once applicable)
# npm run dev / python manage.py runserver / etc.
```

---

## Codebase Structure

### Recommended Directory Structure

As the project grows, consider organizing with this structure:

```
jsim01/
├── src/                    # Source code
│   ├── components/        # Reusable components
│   ├── services/          # Business logic and services
│   ├── utils/             # Utility functions
│   └── config/            # Configuration files
├── tests/                 # Test files
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── fixtures/         # Test fixtures and mocks
├── docs/                  # Documentation
│   ├── api/              # API documentation
│   └── guides/           # User guides and tutorials
├── scripts/              # Build and deployment scripts
├── .github/              # GitHub workflows and templates
├── CLAUDE.md             # This file
├── README.md             # Project README
├── .gitignore           # Git ignore rules
└── [config files]       # package.json, requirements.txt, etc.
```

### Key Directories (Update as they are created)

- **`src/`**: Main application code
- **`tests/`**: All test files (mirror src/ structure)
- **`docs/`**: Documentation beyond code comments
- **`scripts/`**: Automation and utility scripts

---

## Development Workflows

### Git Workflow

#### Branch Naming Convention
- **Feature branches**: `feature/<description>` or `claude/<session-id>`
- **Bug fixes**: `fix/<issue-description>`
- **Hotfixes**: `hotfix/<issue-description>`
- **Documentation**: `docs/<description>`

#### Commit Message Guidelines
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add user authentication system

Implements JWT-based authentication with refresh tokens.
Includes login, logout, and token refresh endpoints.

Closes #123

---

fix(api): resolve race condition in data fetching

Adds proper mutex locking to prevent concurrent access issues.

---

docs(readme): update installation instructions
```

#### Pull Request Process
1. Create feature branch from main
2. Make changes with clear, atomic commits
3. Write/update tests for new functionality
4. Update documentation as needed
5. Push to remote branch
6. Create PR with descriptive title and summary
7. Address review feedback
8. Merge when approved

### Testing Strategy

#### Test Coverage Goals
- **Unit tests**: Test individual functions/components in isolation
- **Integration tests**: Test component interactions
- **End-to-end tests**: Test complete user workflows

#### Test Writing Guidelines
- Each test should test one specific behavior
- Use descriptive test names: `test_user_login_with_invalid_credentials_returns_401`
- Follow AAA pattern: Arrange, Act, Assert
- Mock external dependencies
- Keep tests fast and independent

---

## Key Conventions

### Code Style

#### General Principles
- **Consistency**: Follow existing patterns in the codebase
- **Readability**: Code is read more than written; optimize for clarity
- **Simplicity**: Prefer simple solutions over clever ones
- **DRY**: Don't Repeat Yourself, but don't over-abstract
- **YAGNI**: You Aren't Gonna Need It - don't add premature features

#### Naming Conventions
- **Variables/Functions**: Use descriptive, meaningful names
- **Constants**: UPPER_SNAKE_CASE
- **Classes**: PascalCase
- **Files**: Follow language conventions (snake_case for Python, kebab-case for configs)

#### Documentation
- Document "why", not "what" (code should be self-documenting for "what")
- Add docstrings/JSDoc for public APIs
- Keep comments up-to-date with code changes
- Use TODO comments sparingly with issue references

### Security Best Practices

⚠️ **Critical Security Guidelines:**

1. **Never commit secrets**: Use environment variables or secret management
2. **Validate all input**: Never trust user input
3. **Sanitize output**: Prevent XSS and injection attacks
4. **Use parameterized queries**: Prevent SQL injection
5. **Keep dependencies updated**: Regularly check for security vulnerabilities
6. **Implement proper authentication**: Use established libraries/frameworks
7. **Practice least privilege**: Grant minimum necessary permissions
8. **Log security events**: But never log sensitive data

#### Common Vulnerabilities to Avoid
- **SQL Injection**: Always use parameterized queries
- **XSS (Cross-Site Scripting)**: Sanitize user input before rendering
- **CSRF**: Implement CSRF tokens for state-changing operations
- **Command Injection**: Never pass user input directly to shell commands
- **Path Traversal**: Validate and sanitize file paths
- **Insecure Deserialization**: Validate serialized data sources

### Error Handling

```
# Good: Specific error handling
try:
    result = risky_operation()
except SpecificException as e:
    logger.error(f"Operation failed: {e}")
    return error_response()

# Bad: Catching all exceptions silently
try:
    result = risky_operation()
except:
    pass
```

---

## AI Assistant Guidelines

### When Starting a New Task

1. **Understand the request**: Ask clarifying questions if ambiguous
2. **Review existing code**: Check for similar implementations
3. **Plan the approach**: Use TodoWrite to break down complex tasks
4. **Search before creating**: Check if functionality already exists
5. **Consider implications**: Think about edge cases and security

### Code Implementation

#### Before Writing Code
- [ ] Read relevant existing files
- [ ] Understand the current architecture
- [ ] Check for existing similar implementations
- [ ] Verify the tech stack and dependencies
- [ ] Plan the changes using TodoWrite for complex tasks

#### While Writing Code
- [ ] Follow existing code style and patterns
- [ ] Write clear, self-documenting code
- [ ] Add appropriate error handling
- [ ] Consider edge cases
- [ ] Validate and sanitize inputs
- [ ] Check for security vulnerabilities (OWASP Top 10)

#### After Writing Code
- [ ] Write/update tests
- [ ] Update documentation
- [ ] Review for security issues
- [ ] Verify no sensitive data is exposed
- [ ] Run tests to ensure nothing breaks
- [ ] Commit with clear message

### Communication Style

- **Be concise**: Provide clear, actionable information
- **Be specific**: Reference file paths with line numbers (e.g., `src/auth.py:42`)
- **Be honest**: Admit uncertainty rather than guessing
- **Be proactive**: Suggest improvements when appropriate
- **Ask questions**: Clarify ambiguous requirements
- **Avoid emojis**: Unless specifically requested by the user

### Tool Usage Best Practices

1. **Prefer specialized tools**: Use Read/Edit/Write over bash cat/sed/echo
2. **Use Task tool for exploration**: When searching for patterns or understanding code structure
3. **Parallel execution**: Call independent tools in parallel when possible
4. **Search efficiently**: Use Grep for content, Glob for files
5. **Read before editing**: Always read files before making changes

### Common Mistakes to Avoid

❌ **Don't:**
- Create files without reading existing codebase first
- Commit without running tests
- Guess at implementation details
- Ignore security implications
- Over-engineer solutions
- Create documentation files (.md) proactively without request
- Use bash for file operations (use Read/Edit/Write instead)
- Forget to mark todos as completed
- Batch todo completions (mark each as done immediately)

✅ **Do:**
- Search for existing implementations
- Follow established patterns
- Ask clarifying questions
- Test changes thoroughly
- Consider edge cases
- Update documentation when changing behavior
- Use TodoWrite for complex, multi-step tasks
- Mark todos in_progress before starting work
- Mark todos completed immediately after finishing

---

## Common Tasks

### Adding a New Feature

1. **Research**
   ```bash
   # Search for similar features
   # Use Grep/Glob or Task tool with subagent_type=Explore
   ```

2. **Plan**
   - Use TodoWrite to create task breakdown
   - Identify files to modify
   - Consider test requirements

3. **Implement**
   - Write code following conventions
   - Add error handling
   - Validate inputs
   - Check security implications

4. **Test**
   - Write unit tests
   - Write integration tests if needed
   - Run full test suite

5. **Document**
   - Update relevant documentation
   - Add code comments for complex logic
   - Update CLAUDE.md if needed

6. **Commit & Push**
   ```bash
   git add .
   git commit -m "feat(scope): description"
   git push -u origin branch-name
   ```

### Debugging an Issue

1. **Reproduce**: Understand the exact issue
2. **Locate**: Use Grep/Task to find relevant code
3. **Analyze**: Read surrounding context
4. **Fix**: Implement solution with tests
5. **Verify**: Ensure fix works and doesn't break anything
6. **Document**: Add comments explaining the fix if not obvious

### Refactoring Code

1. **Ensure tests exist**: Write tests first if they don't exist
2. **Make incremental changes**: Small, safe refactoring steps
3. **Run tests frequently**: After each change
4. **Maintain behavior**: Don't change functionality while refactoring
5. **Update documentation**: If interfaces change

---

## Maintaining This File

### When to Update CLAUDE.md

Update this file when:
- [ ] New tech stack components are added
- [ ] Project structure changes significantly
- [ ] New conventions are established
- [ ] Common patterns emerge
- [ ] Security guidelines need updates
- [ ] Development workflow changes
- [ ] New tools or frameworks are adopted

### Update Checklist

When updating this file:
1. Update the "Last Updated" date at the top
2. Keep information accurate and current
3. Remove outdated sections
4. Add examples for new patterns
5. Keep it concise - link to detailed docs rather than duplicating
6. Test that all commands and examples still work
7. Commit with message: `docs(claude): update CLAUDE.md`

### Structure Guidelines

- Keep sections focused and scannable
- Use code examples where helpful
- Include both what to do and what to avoid
- Link to external resources when appropriate
- Prioritize information AI assistants need most frequently

---

## Project-Specific Notes

<!-- Add project-specific information here as the codebase develops -->

### Tech Stack
> Update this section once technologies are chosen

**Frontend**: [TBD]
**Backend**: [TBD]
**Database**: [TBD]
**Testing**: [TBD]
**Deployment**: [TBD]

### Key Dependencies
> List major dependencies once added

### Known Issues
> Document any known issues or technical debt

### Performance Considerations
> Document any performance-critical areas or optimization strategies

### External Integrations
> Document any third-party services or APIs

---

## Resources

### Internal Documentation
- README.md - Project overview and setup
- docs/ - Detailed documentation (when created)

### External Resources
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Security vulnerabilities
- [Conventional Commits](https://www.conventionalcommits.org/) - Commit message format
- [Semantic Versioning](https://semver.org/) - Version numbering

---

## Feedback and Improvements

This document is a living guide. If you notice:
- Outdated information
- Missing important conventions
- Opportunities for improvement
- Common questions not addressed

Please update this file to help future contributors (both human and AI) work more effectively.

---

**Remember**: The goal is to write maintainable, secure, well-tested code that solves real problems. When in doubt, prioritize simplicity, security, and clarity.
