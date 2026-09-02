# Product Hunt QA Automation Assessment

QA automation assessment for Product Hunt covering web UI testing, GraphQL API testing, exploratory testing, and security assessment.

## Tech Stack

- Playwright
- TypeScript
- Bun
- GraphQL
- graphql-request
- GitHub Actions

## Project Structure

```text
product-hunt-qa/
├── api/
│   ├── client/
│   │   └── productHuntClient.ts
│   ├── types/
│   │   └── productHunt.ts
│   ├── posts.spec.ts
│   ├── pagination.spec.ts
│   ├── pagination-next-page.spec.ts
│   ├── error-handling.spec.ts
│   └── authentication.spec.ts
├── e2e/
│   ├── home.spec.ts
│   ├── search.spec.ts
│   ├── best-products.spec.ts
│   ├── empty-search.spec.ts
│   └── category.spec.ts
├── pages/
│   └── HomePage.ts
├── test-data/
├── utils/
├── playwright.config.ts
├── test-strategy.md
└── exploratory-security-findings.md
```

## Test Coverage
### E2E Tests — Playwright

5 scenarios covering:

Homepage loads successfully
Product search returns results
Header navigation works
Empty search displays the appropriate message
Product category navigation works

### API Tests — Bun + GraphQL

5 scenarios covering:

Fetch Product Hunt posts
Post pagination
Fetch the next page using a cursor
Invalid GraphQL field handling
Invalid authentication token handling

## Prerequisites

- Bun 1.4+
- Git
- Playwright browsers

## Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/shazianasim9932/product-hunt-qa.git
cd product-hunt-qa
bun install
bunx playwright install
```

Create a .env file in the project root:

PRODUCT_HUNT_TOKEN=your_product_hunt_token

The API token is required only for GraphQL API tests.

Run Tests
Run all E2E tests
bunx playwright test
Run E2E tests with a visible browser
bunx playwright test --headed
Run API tests
bun test api
Run a specific E2E test
bunx playwright test e2e/search.spec.ts
Run a specific API test
bun test api/posts.spec.ts
TypeScript validation
bunx tsc --noEmit
View the Playwright report
bunx playwright show-report

### Important

Don't put your real token into the README.

Use only:

```env
PRODUCT_HUNT_TOKEN=your_product_hunt_token
```

Your real .env stays local and is protected by .gitignore

## Architecture Decisions

### Page Object Model

The web automation uses Page Object Model to keep locators and page-level actions separate from test cases.

For example, search-related locators and actions are maintained in:

`pages/HomePage.ts`

This keeps test cases readable and makes locator maintenance easier.

### API Client

A reusable GraphQL client is maintained in:

`api/client/productHuntClient.ts`

The access token is supplied through the `PRODUCT_HUNT_TOKEN` environment variable rather than being hard-coded in the test code.

### API Types

Shared TypeScript interfaces are maintained in:

`api/types/productHunt.ts`

These types describe the GraphQL response structures used by the API tests.

### Test Isolation

API tests create their own client/request and do not depend on data created by another test.

E2E tests start from the Product Hunt homepage and perform their own user flow.

## Exploratory & Security Findings

A time-boxed exploratory assessment was performed covering the Product Hunt web application and GraphQL API.

No critical functional or security defect was confirmed during the assessment.

Security-related checks included:
- Invalid access token rejection
- Invalid GraphQL field validation
- Pagination behavior
- Basic API response validation

Detailed observations are documented in:

`exploratory-security-findings.md`

## Test Strategy

The overall testing approach is documented in:

`test-strategy.md`

## CI/CD

The project is intended to run automatically in CI using GitHub Actions.

The CI pipeline will execute:
- TypeScript validation
- API tests
- Playwright E2E tests

## What I Would Do With More Time

With additional time, I would extend the assessment with:

- Broader authorization and access-control testing
- Additional GraphQL validation and input-boundary testing
- Rate-limit and abuse-behavior testing
- Accessibility testing
- More negative E2E scenarios
- API schema/contract validation
- Test data management improvements
- GitHub Actions reporting and test artifacts
