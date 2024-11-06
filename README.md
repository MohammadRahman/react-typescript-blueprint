# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


# Project Git Workflow Documentation

## Table of contents
🚀 [Branch Structure](#branch-structure)<br/>
🚀 [Getting Started](#getting-started)<br/>
    1. [Cloning the Repository](#cloing-the-repository)
    2. [Checking Out the Development Branch](#checking-out-the-development-branch)
💡 [Feature Branch Workflow](#feature-branch-workflow)<br/>
  💾 1. [Creating a Feature Branch](#creating-a-feature-branch)<br/>
  ⚙️  2. [Making and Committing Changes](#making-and-committing-changes)<br/>
  ❔ 3. [Pushing the Feature Branch](#pushing-the-feature-branch)<br/>
🛠️ [Pull Request Process](#pull-request-process)<br/>
  🚀 1. [Creating a Pull Request (PR)](#creating-a-pull-request-(PR))<br/>
  🚀 2. [Code Review and Feedback](#code-review-and-feedback)<br/>
  🚀 3. [Merging the Pull Request](#merging-the-pull-request)<br/>
🛠️ [Deployment Process](#deployment-process)<br/>
🚀 [Additional Best Practices](#additional-best-practices)<br>

## Branch Structure
  Our Git project follows a straightforward branching structure:
    1. master: The main branch for production deployment.
    2. dev: The development branch, used for testing and feature integration.

## Getting Started
  ## Cloning the Repository
    Clone the repository to your local environment to get started:
  ```bash
  $ git clone https://basilinq@dev.azure.com/basilinq/BasilinqSend/_git/BasilinqSendFE
  $ cd BasilinqSendFE
  ```
## Checking Out the Development Branch
  Make sure you’re working with the latest version of dev before creating a new feature branch:
```bash
$ git checkout dev
$ git pull origin dev
```

## Feature Branch Workflow
  ## Creating a Feature Branch
    Each new feature or bug fix should be developed on a separate branch created from dev. Use a descriptive branch name reflecting the feature or issue:
  ```bash
  git checkout -b feature/short-feature-name
  ```
  Note: Use prefixes like feature/, fix/, or hotfix/ to indicate the type of branch.

## Making and Committing Changes
  Commit frequently with clear, concise messages:
  ```bash
 $ git add .
 $ git commit -m "Descriptive commit message"
  ```
## Pushing the Feature Branch
  When your changes are ready, push the feature branch to the remote repository:
  ```bash
  $ git push origin feature/short-feature-name

  ```

## Pull Request Process
  ## Creating a Pull Request (PR)
  Once the branch is pushed, create a pull request from your feature branch to dev. In the PR:
    1. Add a descriptive title and summary.
    2. Tag relevant team members for review.

## Code Review and Feedback
  Team members will review the PR. Be ready to:
    1. Respond to feedback and make any necessary changes.
    2. Push updates if changes are requested.
## Merging the Pull Request
  After approval, merge the PR into the dev branch. After merging:
    1. Delete the feature branch from the remote repository.
## Deployment Process
  1. Deploy the dev branch to the testing environment to verify functionality.
  2. Once testing is complete, create a PR from dev to master for final review.
  2  Merge dev to master after approval to initiate production deployment.

## Additional Best Practices
  1. Branch Naming Convention: Use prefixes (feature/, fix/, hotfix/) for clarity.
  2. Commit Messages: Include meaningful messages explaining each change.
  3. Squash Commits: For a cleaner history, consider squashing commits when merging PRs.
  4. Rebasing: To keep feature branches updated, consider rebasing against dev instead of merging.
 By adhering to this workflow, you’ll ensure a clean, organized Git history and reduce potential merge conflicts, leading to a reliable deployment process.
🤝 [Creator](#creator)