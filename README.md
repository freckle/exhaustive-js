# @freckle/exhaustive-js

Provides a helper function for checking exhaustiveness. Exhaustiveness checking is a feature of a language where the type checker guarantees that all cases were covered.

## Install

```sh
pnpm add @freckle/exhaustive
```

This package is ESM-only.

## Usage

```js
import {exhaustive} from '@freckle/exhaustive'

type Status = 'success' | 'failure'

function getStatusMessage(status: Status): string {
  switch (status) {
    case 'success':
      return 'The operation completed successfully.'
    case 'failure':
      return 'The operation failed.'
    default:
      return exhaustive(status)
  }
}
```

Usage in a reducer where returning the state itself in the default case is a common pattern:
```js
import {exhaustiveReducer} from '@freckle/exhaustive'

type TodoState = {...}
type TodoAction = {type: 'todoAdded', ...} | {type: 'todoToggled', ...}

const defaultTodoState = {...}

function todoReducer(
  state: TodoState = defaultTodoState,
  action: TodoAction
): TodoState {
  switch (action.type) {
    case 'todoAdded':
      return {...}
    case 'todoToggled':
      return {...}
    default:
      return exhaustiveReducer(action.type, state)
  }
}
```

## Development

- **Package manager**: pnpm (Node version pinned in `.nvmrc`)
- `pnpm build` — `tsc` via `tsconfig.build.json`, then `gen-flow.cjs`; emits to `dist/`
- `pnpm test` — Vitest
- `pnpm coverage` — Vitest with coverage, gated at 70% (lines/branches/functions/statements)
- `pnpm typecheck` — `tsc --noEmit`, includes test files
- `pnpm lint` — ESLint
- `pnpm format` / `pnpm format-check` — Prettier
- `pnpm knip` — unused files/dependencies/exports
- CI runs all of the above on every PR, plus a check that `dist/` is up to date

`dist/` is committed. Run `pnpm build` before pushing.

## Release

See [RELEASE.md](./RELEASE.md) for more details.
