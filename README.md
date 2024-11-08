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
🚀 [Cloning the Repository](#cloing-the-repository)<br/>
🚀 [Checking Out the Development Branch](#checking-out-the-development-branch)<br/>
💡 [Feature Branch Workflow](#feature-branch-workflow)<br/>
🚀 [Creating a Feature Branch](#creating-a-feature-branch)<br/>
🚀 [Making and Committing Changes](#making-and-committing-changes)<br/>
🚀 [Pushing the Feature Branch](#pushing-the-feature-branch)<br/>
🛠️ [Pull Request Process](#pull-request-process)<br/>
🚀 [Creating a Pull Request (PR)](#creating-a-pull-request-(PR))<br/>
🚀 [Code Review and Feedback](#code-review-and-feedback)<br/>
🚀 [Merging the Pull Request](#merging-the-pull-request)<br/>
🛠️ [Deployment Process](#deployment-process)<br/>
🚀 [Additional Best Practices](#additional-best-practices)<br>

## Branch Structure
  Our Git project follows a straightforward branching structure:
   -  master: The main branch for production deployment.
   -  dev: The development branch, used for testing and feature integration.

# Getting Started
  ## Cloning the Repository
    Clone the repository to your local environment to get started:
  ```bash
  $ git clone https://basilinq@dev.azure.com/basilinq/BasilinqSend/_git/BasilinqSendFE
  $ cd BasilinqSendFE
  ```
# Checking Out the Development Branch
  Make sure you’re working with the latest version of `dev` before creating a new feature branch:
```bash
$ git checkout dev
$ git pull origin dev
```

# Feature Branch Workflow
  ## Creating a Feature Branch
    Each new feature or bug fix should be developed on a separate branch created from `dev`. Use a descriptive branch name reflecting the feature or issue:
  ```bash
  git checkout -b feature/short-feature-name
  ```
  Note: Use prefixes like `feature/`, `fix/`, or `hotfix/ `to indicate the type of branch.

# Making and Committing Changes
  Commit frequently with clear, concise messages:
```bash
 $ git add .
 $ git commit -m "Descriptive commit message"
```
# Pushing the Feature Branch
  When your changes are ready, push the feature branch to the remote repository:
  ```bash
  $ git push origin feature/short-feature-name

  ```

# Pull Request Process
  ## Creating a Pull Request (PR)
  Once the branch is pushed, create a pull request from your feature branch to `dev`. In the PR:
  -  Add a descriptive title and summary.
  -  Tag relevant team members for review.

# Code Review and Feedback
  Team members will review the PR. Be ready to:
   - Respond to feedback and make any necessary changes.
   - Push updates if changes are requested.
# Merging the Pull Request
  After approval, merge the PR into the `dev`branch. After merging:
    - Delete the feature branch from the remote repository.
# Deployment Process
  - Deploy the `dev` branch to the testing environment to verify functionality.
  - Once testing is complete, create a PR from `dev` to `master` for final review.
  - Merge `dev` to `master` after approval to initiate production deployment.

# Additional Best Practices
  1. Branch Naming Convention: Use prefixes (`feature/, fix/, hotfix/`) for clarity.
  2. Commit Messages: Include meaningful messages explaining each change.
  3. Squash Commits: For a cleaner history, consider squashing commits when merging PRs.
  4. Rebasing: To keep feature branches updated, consider rebasing against `dev` instead of merging.
 By adhering to this workflow, you’ll ensure a clean, organized Git history and reduce potential merge conflicts, leading to a reliable deployment process.



# Frontend Documentation
  ## App Overview
  This app is built using modern technologies to ensure high performance, scalability, and maintainability. Below is an overview of the technologies used, the folder structure, best practices, and guidelines for contributing to the project.
## Tech Stack
  The frontend is developed with the following technologies:
   - React: A popular JavaScript library for building user interfaces, specifically for single-page applications (SPA).
   - TypeScript: A superset of JavaScript that adds static typing, making the code more robust and maintainable.
   - Vite: A fast build tool and development server for modern web projects.
   - Styled-Components: A CSS-in-JS library for writing scoped and dynamic styles directly in JavaScript.
   - Axios: A promise-based HTTP client for making requests to external APIs.
   - Date-fns: A modern library for working with dates and times.
   - React Hook Form: A library for managing forms and validation in React.
   - React Hot Toast: A library for showing toast notifications in React applications.
   - React Icons: A library for including customizable icons in React applications.
   - Recharts: A library for building charts and visualizations in React.
   - React Router DOM: A standard library for routing in React, used for navigating between different pages or components.

## Folder Structure
  The project follows a modular folder structure to keep it organized and scalable. Below is a typical structure for the frontend app:


### Explanation

- **`/apis`**: Centralizes API-related code.
  - `http-common`: Configures and exports a reusable Axios instance.
  - `routes`: Contains route constants that can be imported and used consistently across the app.
  - `<endpoint>`: Each API endpoint has its own directory to organize logic for different resources (e.g., `users`, `products`).

- **`/assets`**: Stores static assets (images, fonts) used across the application.

- **`/components`**: Holds UI components that can be used globally, like buttons, input fields, and modal dialogs.

- **`/features`**: Contains all feature-specific code in a self-contained structure.
  - `<feature>`: Each feature (like `auth`, `dashboard`) has a dedicated directory.
    - `hooks`: Custom hooks for data fetching and state handling within the feature.
    - `forms`: Form components related to the feature.
    - `components`: Other components specific to the feature, which may be combined in `pages`.

- **`/hooks`**: Holds reusable hooks that apply across multiple features, promoting code reuse.

- **`/mocks`**: Contains mock data used for testing or offline development.
  - `<endpoint>`: Organizes mock data files by endpoint to mirror the structure in `/apis`.

- **`/pages`**: Includes page components assembled from `features` and `layouts`, like `Home`, `Dashboard`, or `Profile`.

- **`/services`**: Manages business logic functions and API service calls shared across the app.

- **`/store`**: Centralizes state management, whether using Context API, Redux, or other libraries.

- **`/styles`**: Contains global styles, theme configuration, and `styled-components` files.

- **`/utils`**: Holds utility functions and helper methods used across the app, like data formatting.

- **`App.tsx`**: Initializes global settings, routes, and providers like context or state providers.

- **`index.tsx`**: Renders the app in the DOM using ReactDOM.

- **`routes.tsx`**: Defines all routes of the app using `react-router-dom`.

This structure is designed for scalability, where each feature is self-contained, making the app organized and easy to maintain.


## Component Structure
Components are organized by functionality, with reusable UI elements stored in the `components` folder. Larger pages are placed in the `pages` folder. Each component should have:


# Do's and Don'ts
## Do's
  - Use TypeScript for Type Safety: Always define types for props, states, and other variables. Use TypeScript interfaces and types to ensure type safety.
  - Follow the Folder Structure: Maintain the folder structure for consistency and scalability. Organize components, hooks, services, and styles in their respective directories.
  - Use Styled-Components for Styling: Use `styled-components` for creating scoped and dynamic styles in your components. Avoid using global CSS files unless necessary.
  - Write Reusable and Modular Components: Components should be designed to be as reusable as possible. Avoid hard-coding logic and styles inside components.
  - Use React Hook Form for Forms: For form handling and validation, use `react-hook-form`. It is lightweight and minimizes re-renders.
  - Optimize API Requests with Axios: Use `axios` to handle API calls. Keep API logic in a separate file (e.g., `services/api.ts`) to maintain separation of concerns.
  - Handle Date and Time with Date-fns: Use `date-fns` to handle any date or time manipulation in the app. It's lightweight and easy to use.
  - Add Proper Routing with React Router DOM: Use `react-router-dom` to manage the app’s routes. Define routes centrally and make sure to use `Link` for navigation instead of traditional anchor tags.
  - Use React Icons for Icons: Use the `react-icons` library to add scalable and customizable icons to your components. Avoid using external images for icons.
  - Add Proper Error Handling: Implement error handling for API calls and user actions. Use `react-hot-toast` to display error or success notifications to users.

## Don'ts
  - Don’t Use Inline Styles: Avoid inline styles in JSX. Instead, use `styled-components` for styling to maintain consistency and improve reusability.
  - Don’t Use Deprecated APIs: Avoid using deprecated React methods (like `componentWillMount`). Stick to hooks and functional components for consistency.
  - Don’t Directly Modify State: Always use `setState` or use the appropriate state updater function for changing state values. Never mutate state directly.
  - Don’t Make Unnecessary API Calls: Avoid making API calls in the component render method. Use `useEffect` to handle API calls after the component mounts.
  - Don’t Mix Concerns: Avoid mixing UI and business logic within a single component. Keep them separate for easier testing and maintenance.
  - Don’t Use Global Styles Too Much: Try to limit global styles and keep them in a global `theme.ts` or specific styled components. Overuse of global styles can lead to conflicts and harder maintenance.
  - Don’t Overuse Context API: If you're not managing global state across multiple components, don't overuse the Context API. It’s better to keep state local to components or use state management solutions like Redux for larger apps.
  - Don’t Ignore Accessibility: Ensure that your app is accessible by adding appropriate ARIA attributes and semantic HTML. Test your app with screen readers and ensure it is navigable via keyboard.

## Best Practices
  - Use Functional Components and Hooks: Always use functional components and React hooks instead of class components for better readability and performance.
  - Keep Components Small and Focused: Break down large components into smaller, reusable components with single responsibilities.
  - Optimize Performance: Use `React.memo`, `useMemo`, and `useCallback` for performance optimization where necessary, especially in large apps with many components.
  - Test Components: Write tests for components using a testing framework like Jest along with React Testing Library. Ensure all critical components have test coverage.
  - Documentation and Comments: Write clear documentation for each component, especially for public components or reusable hooks.
  - Version Control Best Practices: Follow standard Git practices. Create separate feature branches, use clear commit messages, and open pull requests for code reviews.
  - Add Prop Types and Default Props: Even when using TypeScript, defining `defaultProps` for your components is a good practice for maintaining defaults in case no values are passed in.

# Feature Overview:
  - [Email Delivery Rate](#email-delivery-rate)<br/>
 
 ## Email Delivery Rate
  The Email Delivery Rate feature provides insightful metrics on email performance by grouping data based on specific time frames—monthly, weekly, or daily. This feature enables users to quickly understand how emails are performing over time through visually organized and color-coded cards.

 ## Key Metrics Displayed
  - Sent Emails: The total number of emails sent within the selected time frame.
  - Delivery Rate: The percentage of successfully delivered emails out of those sent, indicating email deliverability.
  - Bounce Rate: The percentage of emails that failed to reach recipients' inboxes, which helps track any deliverability issues.
  - Open Rate: The percentage of delivered emails that were opened by recipients, showing engagement levels.
  - Click Rate: The percentage of opened emails that generated user clicks, a strong indicator of interaction and content effectiveness.
  ## Visual Representation
  Each metric is displayed in an individual card with distinct background colors for easy differentiation. This visual organization allows users to instantly identify key performance indicators and monitor trends or patterns in email engagement and delivery. see the example below.

  [View on Eraser![](https://app.eraser.io/workspace/xO9btO46QmM9gV0e4Un3/preview?elements=1nb0K9mEuMDKF69ObHaXFw&type=embed)](https://app.eraser.io/workspace/xO9btO46QmM9gV0e4Un3?elements=1nb0K9mEuMDKF69ObHaXFw)



🤝 [Mohammad](#creator)

# Introduction 
TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project. 

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1.	Installation process
2.	Software dependencies
3.	Latest releases
4.	API references

# Build and Test
TODO: Describe and show how to build your code and run the tests. 

# Contribute
TODO: Explain how other users and developers can contribute to make your code better. 

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:
- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)

# Introduction 
TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project. 

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1.	Installation process
2.	Software dependencies
3.	Latest releases
4.	API references

# Build and Test
TODO: Describe and show how to build your code and run the tests. 

# Contribute
TODO: Explain how other users and developers can contribute to make your code better. 

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:
- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)