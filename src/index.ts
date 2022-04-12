// Validate that a switch/case is exhaustive
export function exhaustive(x: never, ty?: string): never {
  const prefix = ty === undefined || ty === null ? 'Unrecognized tag' : `Unrecognized tag for ${ty}`
  throw new Error(`${prefix}: ${saferStringify(x)}`)
}

// Validate that a reducer switch/case is exhaustive
//
// In the failing case the provided state will be returned
//
export function exhaustiveReducer<T>(_x: never, state: T): T {
  return state
}

// JSON.stringify ignores undefined and throws on circular objects
function saferStringify(root: unknown): string {
  if (root === undefined) {
    return 'undefined'
  }
  try {
    return JSON.stringify(root)
  } catch (e) {
    if (e instanceof TypeError) {
      return '{...Circular object or BigInt...}'
    }
    throw e
  }
}
