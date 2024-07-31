# Vue 3 + TypeScript + Vite + Storybook

## Prerequisites

Make sure you have the following installed:

- Node.js >= 18
- npm >= 10

## Folder structure

```

project-root/
│
├── src/                                # Main project folder with Core-ui package installed
│   │── views/
│   │    │── Animals.vue                # Implementation of the Select component with Animals data route (/animals)
│   │    │── Cars.vue                   # Implementation of the Select component with Cars data route (/cars)
│   │    └── Countries.vue              # Implementation of the Select component with Countries data route (home | /countries)
│   └── index.ts                        # Entry point
│
├── packages/                           # Packages project with Storybook
│   └── core-ui                         # Core-ui package
│       └── src
│           │── components              # Components folder including stories
│           │    │── cards
│           │    │   └── Pane           # Pane card component
│           │    │── inputs
│           │    │   │── Select         # Select input component
│           │    │   └── FormRow        # Form row input component
│           │    └── list
│           │        │── List           # List component
│           │        └── ListItem       # List item component
│           │── icons                   # Icons folder including stories
│           └── index.ts                # Entry point
│
└── README.md                           # Project documentation
```

## Commands

### Development

---

Starts the development server using Vite.

`npm run serve:dev`

Starts the Storybook server.

`npm run serve:storybook: `

### Linting

---

Lints the main application code (./src) with ESLint and automatically fixes issues.

`npm run check:lint`

Lints the Storybook packages (./packages) with ESLint and automatically fixes issues.

`npm run check:storybook:lint: `

### Type Checking

---

Checks TypeScript types for the main application using vue-tsc with tsconfig.app.json.

`npm run check:ts`

Checks TypeScript types for the Storybook packages using vue-tsc with tsconfig.storybook.json.

`npm run check:storybook:ts`

### Combined Checks

---

Runs linting and type checking for the main application (check:lint and check:ts).

`npm run check:code`

Runs linting and type checking for the Storybook packages (check:storybook:lint and check:storybook:ts).

`npm run check:storybook:code`

### Building

---

Builds the production version of the main application after running code checks (check:code).

`npm run build:prod`

Builds the Storybook after running code checks (check:storybook:code).

`npm run build:storybook`

Builds all packages managed by Lerna in parallel.

`npm run build:packages`

### Publishing

---

Publishes the packages managed by Lerna from the existing package versions.

`npm run publish:packages`

> Note: For publishing you need to perform a NPM login and have proper crendentials with access to @oscarcorac scope
