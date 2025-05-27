<p align="center">
<b>collect-generator</b> is a tiny utility that collects all the <b>yielded</b> values as well as the <b>return</b> result<br>from a generator or an async generator.
</p>

# collect-generator

## Features

- Supports both **generators** and **async generators**
- Preserves the final return value (`return`)
- Fully typed
- Well tested

## Usage

### reading sync generator

```ts
import { collectGenerator } from "collect-generator"

function* deepThought() {
  yield "ultimate"
  yield "answer"
  return 42
}

const { items, result } = collectGenerator(deepThought)

console.log(items) // ["ultimate",  "answer"]
console.log(result) // 42
```

### reading async generator

```ts
import { collectAsyncGenerator } from "collect-generator"

async function* range(n: number) {
  for (let i = 0; i < n; i++) {
    yield await Promise.resolve(i)
  }
  return await Promise.resolve("finished")
}

const { items, result } = await collectAsyncGenerator(() => range(5))

console.log(items) // [0, 1, 2, 3, 4]
console.log(result) // "finished"
```
