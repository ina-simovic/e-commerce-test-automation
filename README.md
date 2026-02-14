# E-Commerce Test Automation

A comprehensive test automation framework for a dummy e-commerce web applications using `Playwright` and `TypeScript`. This project provides end-to-end testing for critical user workflows including authentication, product browsing, and shopping cart management.

## Project Overview

This test automation suite covers the [Sauce Demo](https://www.saucedemo.com) e-commerce application with a focus on:

- **User Authentication**: Login functionality with multiple test users and scenarios
- **Product Catalog**: Product listing, sorting, filtering, and details
- **Cart Management**: Add/remove items and checkout workflows
- **UI Components**: Header, footer, navigation, and filters

## Tech Stack

- **Test Framework**: Playwright
- **Language**: TypeScript
- **Reporting**: Allure Report
- **Code Formatter**: Prettier
- **Build Tool**: Node.js / npm

## Project Structure

```
├── tests/                    # Test files
├── components/               # Page component classes
│   ├── header/
│   ├── footer.component.ts
│   └── product.component.ts
├── pages/                    # Page Object Models
│   ├── login.page.ts
│   ├── product.page.ts
│   └── products.page.ts
├── playwright.config.ts      # Playwright configuration
├── package.json              # Project dependencies
└── test-cases.md             # Detailed test specifications
```

## Getting Started

### Installation

```bash
npm install
```

### Run Tests

```bash
# Run all tests headless
npm run test

# Run tests with browser visible
npm run test:headed

# Run tests with browser visible in a single-worker mode
npm run test:headed:single-worker
```

## Test Reporting

### Generate Allure Report

```bash
# Generate and open Allure report
npm run report:generate-open

# Generate report only (if reporter server is already running)
npm run report:generate
```

Reports are generated in the `allure-report/` directory.

## Test Coverage

See [test-cases.md](test-cases.md) for detailed test specifications.

## Available Commands

| Command                             | Description                                 |
| ----------------------------------- | ------------------------------------------- |
| `npm run test`                      | Run all tests (headless)                    |
| `npm run test:headed`               | Run tests with browser visible              |
| `npm run test:headed:single-worker` | Run tests sequentially with browser visible |
| `npm run clean`                     | Clean test results and reports              |
| `npm run report:generate`           | Generate Allure report                      |
| `npm run report:generate-open`      | Generate and open Allure report             |
| `npm run pretty`                    | Format code using Prettier                  |
