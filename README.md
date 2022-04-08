# @freckle/exhaustive-js

Provides a helper function for checking exhaustiveness. Exhaustiveness checking is a feature of a language where the type checker guarantees that all cases were covered.

## Usage

```js
import {exhaustive} from '@freckle/exhaustive-js'

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
import {exhaustiveReducer} from '@freckle/exhaustive-js'

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
