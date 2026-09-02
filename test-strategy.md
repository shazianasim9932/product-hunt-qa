# Product Hunt Test Strategy

## Scope

The assessment covers the Product Hunt web application and GraphQL API, focusing on critical user journeys, API behavior, validation, authentication, and basic security observations.

## Test Approach

Testing combines exploratory testing, functional testing, negative testing, API testing, and automated end-to-end testing.

### Web Application

Key areas:
- Homepage availability
- Header navigation
- Product search
- Search results
- Empty search results
- Product/category navigation

### GraphQL API

Key areas:
- Post retrieval
- Pagination and cursor-based navigation
- Invalid GraphQL queries
- Invalid authentication
- Response structure and required fields

## Automation Strategy

Playwright with TypeScript is used for E2E automation. Tests use:
- Page Object Model for maintainability
- Stable `data-test` and accessible-role locators
- Playwright auto-waiting instead of hard-coded delays
- Screenshots, video, and traces for failures
- Chromium, Firefox, and WebKit execution

Bun with TypeScript and `graphql-request` is used for API automation. API tests use a reusable GraphQL client, environment-based credentials, and typed response models.

## Test Data & Environment

API credentials are stored in environment variables and are not committed to the repository. Tests use independent requests and avoid relying on state created by other tests.

## Risks / Out of Scope

This is a time-boxed assessment. Full performance/load testing, extensive accessibility testing, deep authorization testing across user roles, and comprehensive penetration testing are outside the current scope.