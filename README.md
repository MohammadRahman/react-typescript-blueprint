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
🚀 [Additional Best Practices]<br>

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



🤝 [Creator](#creator)