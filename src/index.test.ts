import {exhaustive, exhaustiveReducer} from './index.js'

describe('exhaustive', () => {
  it('throws with the unhandled tag', () => {
    expect(() => exhaustive('unhandled' as never)).toThrow('Unrecognized tag: "unhandled"')
  })

  it('names the type when one is given', () => {
    expect(() => exhaustive('unhandled' as never, 'Status')).toThrow(
      'Unrecognized tag for Status: "unhandled"'
    )
  })

  it('omits the type name when it is null', () => {
    // The runtime guards against null even though the signature does not allow it
    expect(() => exhaustive('unhandled' as never, null as unknown as string)).toThrow(
      'Unrecognized tag: "unhandled"'
    )
  })

  it('reports undefined, which JSON.stringify drops', () => {
    expect(() => exhaustive(undefined as never)).toThrow('Unrecognized tag: undefined')
  })

  it('reports circular objects instead of throwing on them', () => {
    const circular: {self?: unknown} = {}
    circular.self = circular

    expect(() => exhaustive(circular as never)).toThrow(
      'Unrecognized tag: {...Circular object or BigInt...}'
    )
  })

  it('reports BigInt instead of throwing on it', () => {
    expect(() => exhaustive(1n as never)).toThrow(
      'Unrecognized tag: {...Circular object or BigInt...}'
    )
  })

  it('propagates non-TypeError failures from JSON.stringify', () => {
    const hostile = {
      toJSON() {
        throw new RangeError('boom')
      }
    }

    expect(() => exhaustive(hostile as never)).toThrow(RangeError)
  })
})

describe('exhaustiveReducer', () => {
  it('returns the state unchanged', () => {
    const state = {todos: ['write tests']}

    expect(exhaustiveReducer('unhandled' as never, state)).toBe(state)
  })
})
