# Vue 3 + TypeScript + Vite

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm or Yarn

## Folder structure

```

project-root/
│
├── src/                # Main project folder
│   ├── components/     # React/Vue components
│   ├── styles/         # CSS/SCSS files
│   ├── utils/          # Utility functions
│   └── index.ts        # Entry point
│
├── packages/           # Packages
│   └── core-ui         # Core-ui package
│       └── src
│           │── components
│           │    │── cards
│           │    │── inputs
│           │    └── list
│           └── icons
│
├── README.md           # Project documentation
├── package.json        # Project metadata and dependencies
└── tsconfig.json       # TypeScript configuration
```

## Commands

### Development

---

#### Starts the development server using Vite.

`npm run serve:dev`

#### Starts the Storybook server.

`npm run serve:storybook: `

### Linting

---

#### Lints the main application code (./src) with ESLint and automatically fixes issues.

`npm run check:lint`

#### Lints the Storybook packages (./packages) with ESLint and automatically fixes issues.

`npm run check:storybook:lint: `

### Type Checking

---

#### Checks TypeScript types for the main application using vue-tsc with tsconfig.app.json.

`npm run check:ts`

#### Checks TypeScript types for the Storybook packages using vue-tsc with tsconfig.storybook.json.

`npm run check:storybook:ts`

### Combined Checks

---

#### Runs linting and type checking for the main application (check:lint and check:ts).

`npm run check:code`

#### Runs linting and type checking for the Storybook packages (check:storybook:lint and check:storybook:ts).

`npm run check:storybook:code`

### Building

---

#### Builds the production version of the main application after running code checks (check:code).

`npm run build:prod`

#### Builds the Storybook after running code checks (check:storybook:code).

`npm run build:storybook`

#### Builds all packages managed by Lerna in parallel.

`npm run build:packages`

### Publishing

---

#### Publishes the packages managed by Lerna from the existing package versions.

`npm run publish:packages`
