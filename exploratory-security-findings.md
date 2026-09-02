# Exploratory Testing & Security Assessment

## Scope

Time-boxed exploratory testing was performed on the Product Hunt web application and GraphQL API.

Areas explored:
- Homepage and navigation
- Product search
- Search results
- Empty search results
- Product/category navigation
- GraphQL post retrieval
- GraphQL pagination
- Authentication behavior
- GraphQL validation/error handling

## Functional Findings

No critical functional defects were confirmed during the time-boxed exploratory assessment.

Observed behaviors were consistent with the expected user flows tested through the automated E2E suite:
- Homepage loads successfully.
- Product search returns results for valid searches.
- Search displays an appropriate empty-results state.
- Header navigation redirects successfully.
- Product/category navigation works.

## API & Security Observations

### 1. Invalid authentication token is rejected

**Test:** Send a GraphQL request using an invalid access token.

**Expected:** The API should reject the request.

**Observed:** The request was rejected with an HTTP 401 error.

**Assessment:** Expected secure behavior. No authentication bypass was identified.

Automated test:
`api/authentication.spec.ts`

### 2. Invalid GraphQL field is rejected

**Test:** Request a non-existent GraphQL field (`invalidField`).

**Expected:** GraphQL validation should reject the invalid query.

**Observed:** The request failed and the error referenced `invalidField`.

**Assessment:** Expected GraphQL validation behavior. No issue identified.

Automated test:
`api/error-handling.spec.ts`

### 3. Pagination behavior

The API was tested for:
- First-page retrieval
- Pagination metadata
- Fetching the next page using `endCursor`

The automated tests successfully validated these flows.

Automated tests:
- `api/pagination.spec.ts`
- `api/pagination-next-page.spec.ts`

## Security Conclusion

No critical security vulnerability was confirmed during the time-boxed assessment.

The assessment specifically verified invalid-token rejection and GraphQL query validation. Further security testing could include authorization testing across different user roles, rate-limit boundary testing, input validation/fuzzing, and broader API abuse scenarios.