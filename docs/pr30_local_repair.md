# PR30 local repair evidence

PR: https://github.com/Dobeu-tech-eco/lastplateprod/pull/30
Original head: 4c20c8577813820a0bfe22aa05f265524ed87e08
Base: d9c1ef8dc8dd2967236ce87a096be939635aa1e3
CI log: https://github.com/Dobeu-tech-eco/lastplateprod/actions/runs/42466634807

Clean base archive in /tmp/pr30-base and isolated PR checkout each received npm ci and npx tsc --noEmit. Diagnostics were identical after checkout-path normalization: all 34 original errors predate this dependency-only PR.

## Repairs

Signup clears validation keys without assigning undefined to a string record. Inventory restores missing component, client and domain type imports. Intercom uses the auth context's waste-types User.full_name and command-specific boot/update/event overloads; optional business attributes are runtime-checked rather than asserted into the profile schema. The checked-in database/schema.sql describes a different legacy user shape from waste-auth, so it was not used to invent profile columns or migrate production. Existing company segmentation defaults are retained.

Docs use native anchors because the app has no router dependency/provider, restore the named logo import, and provide the missing layout and copyable escaped code block. This does not add application routes for the existing docs URLs; routing/deployment reachability remains outside local compiler verification. Trial CTAs now call the supplied signup handler. Photo paths are string-or-null. Vendor directory uses its existing zero-argument global-directory hook; performance filtering by location remains intact.

## Final verification

Fresh npm ci: exit 0.
npx tsc --noEmit: exit 0 (no diagnostics).
npm run build: exit 0. Existing --noCheck remains; independent typecheck above establishes types.
npm run lint: exit 0, 35 warnings, 0 errors.
npm test: exit 0, 5 passing tests.
git diff --check: exit 0.
Local runtime: Node v26.13.1, npm 11.20.0. CI specifies Node 18; no claim of CI runtime verification or hosted checks.

## Separate security failure

In the actual run log the setup-trivy installer found v0.76.2 for Linux/64bit, then exited 1 during installation before the scanner ran. No lower-level download/extraction error was printed. The unconditional upload subsequently reported `Path does not exist: trivy-results.sarif`. The missing artifact is downstream of installer failure, not evidence of an empty/clean vulnerability scan. Exact upstream installer cause remains unresolved from the available log. No scan, severity threshold, workflow permission, credential, or security setting was changed. Hosted rerun/security verification remains unperformed.

## Original exact diagnostics

```text
src/components/signup/BusinessInfoStep.tsx(95,25): error TS2345: Argument of type '(prev: Record<string, string>) => { firstName: undefined; }' is not assignable to parameter of type 'SetStateAction<Record<string, string>>'.
src/components/signup/BusinessInfoStep.tsx(113,25): error TS2345: Argument of type '(prev: Record<string, string>) => { lastName: undefined; }' is not assignable to parameter of type 'SetStateAction<Record<string, string>>'.
src/components/signup/BusinessInfoStep.tsx(132,23): error TS2345: Argument of type '(prev: Record<string, string>) => { businessName: undefined; }' is not assignable to parameter of type 'SetStateAction<Record<string, string>>'.
src/components/signup/BusinessInfoStep.tsx(147,23): error TS2345: Argument of type '(prev: Record<string, string>) => { cuisineType: undefined; }' is not assignable to parameter of type 'SetStateAction<Record<string, string>>'.
src/components/signup/BusinessInfoStep.tsx(172,23): error TS2345: Argument of type '(prev: Record<string, string>) => { locationsCount: undefined; }' is not assignable to parameter of type 'SetStateAction<Record<string, string>>'.
src/components/views/inventory-view.tsx(114,10): error TS2304: Cannot find name 'CardHeader'.
src/components/views/inventory-view.tsx(137,11): error TS2304: Cannot find name 'CardHeader'.
src/hooks/useInventory.ts(125,40): error TS2304: Cannot find name 'InventoryLevel'.
src/hooks/useInventory.ts(136,49): error TS2304: Cannot find name 'supabase'.
src/hooks/useInventory.ts(155,52): error TS2304: Cannot find name 'InventoryTransaction'.
src/hooks/useInventory.ts(166,49): error TS2304: Cannot find name 'supabase'.
src/hooks/useInventory.ts(182,57): error TS2304: Cannot find name 'InventoryTransaction'.
src/hooks/useInventory.ts(183,48): error TS2304: Cannot find name 'supabase'.
src/lib/intercom.tsx(74,27): error TS2339: Property 'username' does not exist on type 'User'.
src/lib/intercom.tsx(80,29): error TS2339: Property 'business_name' does not exist on type 'User'.
src/lib/intercom.tsx(81,29): error TS2339: Property 'subscription_plan' does not exist on type 'User'.
src/lib/intercom.tsx(83,38): error TS2339: Property 'locations_count' does not exist on type 'User'.
src/lib/intercom.tsx(90,9): error TS2353: Object literal may only specify known properties, and 'app_id' does not exist in type 'IntercomUpdateData'.
src/lib/intercom.tsx(96,9): error TS2353: Object literal may only specify known properties, and 'custom_launcher_selector' does not exist in type 'IntercomUpdateData'.
src/lib/intercom.tsx(101,9): error TS2353: Object literal may only specify known properties, and 'app_id' does not exist in type 'IntercomUpdateData'.
src/lib/intercom.tsx(165,51): error TS2554: Expected 1-2 arguments, but got 3.
src/lib/intercom.tsx(174,53): error TS2554: Expected 1-2 arguments, but got 3.
src/lib/intercom.tsx(183,53): error TS2554: Expected 1-2 arguments, but got 3.
src/lib/intercom.tsx(193,54): error TS2554: Expected 1-2 arguments, but got 3.
src/lib/intercom.tsx(202,55): error TS2554: Expected 1-2 arguments, but got 3.
src/pages/docs/getting-started.tsx(2,22): error TS2307: Cannot find module 'react-router-dom' or its corresponding type declarations.
src/pages/docs/getting-started.tsx(8,24): error TS2307: Cannot find module '@/components/docs/DocsLayout' or its corresponding type declarations.
src/pages/docs/getting-started.tsx(9,23): error TS2307: Cannot find module '@/components/docs/CodeBlock' or its corresponding type declarations.
src/pages/docs/index.tsx(2,22): error TS2307: Cannot find module 'react-router-dom' or its corresponding type declarations.
src/pages/docs/index.tsx(8,8): error TS2613: Module '"/Users/amywilliams/worktrees/lastplateprod/codex-fix-lastplate30-t-3b832dfa9bbb8004/src/components/SavePlateLogo"' has no default export. Did you mean to use 'import { SavePlateLogo } from "/Users/amywilliams/worktrees/lastplateprod/codex-fix-lastplate30-t-3b832dfa9bbb8004/src/components/SavePlateLogo"' instead?
src/pages/index.tsx(88,11): error TS2322: Type 'string' is not assignable to type 'null'.
src/pages/marketing-home.tsx(31,20): error TS2322: Type '{ onGetStarted: () => void; }' is not assignable to type 'IntrinsicAttributes'.
src/pages/marketing-home.tsx(38,24): error TS2322: Type '{ onGetStarted: () => void; }' is not assignable to type 'IntrinsicAttributes'.
src/pages/vendors.tsx(23,92): error TS2554: Expected 0 arguments, but got 1.
```
