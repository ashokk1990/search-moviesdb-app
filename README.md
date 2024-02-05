# CCM Migration Standards Documentation

## Introduction

This document outlines the standards and best practices for managing CCM migration issues. These standards are designed to support new subgraphs/tenants onboarding onto CCM and to ensure a smooth transition during migration.

## Best Practices

### 1. Market-Specific Runtime Config Overrides

- **Issue:** If CCM has issues or is down, the default runtimeConfig values will apply for all markets, which may not create the desired customer experience.
- **Resolution:** Set market-specific overrides that are tailored towards a specific market's customers.
- **References:** [setupRuntimeConfig.ts](https://gecgithub01.walmart.com/ce-orchestration/content-layout-enricher/blob/main/src/utils/ccm/setupRuntimeConfig.ts), [setup-runtime-config.ts](https://gecgithub01.walmart.com/ce-orchestration/item-service/blob/main/src/utils/ccm/setup-runtime-config.ts), [runtime-config-utils.ts](https://gecgithub01.walmart.com/ce-orchestration/search-service/blob/main/src/services/runtime-config-utils.ts)

### 2. Merging Default Runtime Config with Market-Specific Defaults

- **Issue:** lodash's merge function mutates the object, which can lead to issues when a market supports multiple banners.
- **Resolution:** If your code is already using lodash's merge function, merge the defaults onto a new Object.

### 3. Utilizing Native Boolean Function

- **Issue:** Utilizing the native Boolean function can lead to unexpected UI behavior.
- **Resolution:** Always use getString for flags set in Tunr of type Boolean or String and write utils to check against the string value.

### 4. Adhering to CCM Scope Rules

- **Issue:** Failure to adhere to CCM scope rules can result in build pipeline failure.
- **Resolution:** Double-check the scopes set in the CCM UI.

### 5. Use of getBoolean function

- **Suggestion:** When creating new flags in CCM, they should be boolean and not string. Use getBoolean function to fetch boolean values instead of getString to avoid checks like === "true" in the codebase.

## Recommendations

- Conduct an audit of the subgraphs that do not have the default runtime config set up right with market-specific overrides.
- Ensure all subgraphs follow consistent configuration practices.
- Set a standard for flag type creation in Tunr to avoid potential errors.
- Utilize the getBoolean method more effectively to fetch boolean values.

## Conclusion

Following these best practices will help to avoid common pitfalls during the CCM migration process and ensure a smoother onboarding experience for new subgraphs/tenants.
