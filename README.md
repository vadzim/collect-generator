# collect-generator

> Collects all yielded items as well as the return result from a generator or an async generator.

A tiny utility that runs a generator or async generator and gives you both:

- the full array of yielded values
- the final return value from the generator (`return ...`)

Useful when you care about both data and outcome.

---

## ✨ Features

- Supports both **generators** and **async generators**
- Preserves the final return value (`return`)
- Fully typed (JSDoc + TypeScript support)
- **Fully tested** using the built-in `node:test` module

---

## 📦 Installation

```bash
npm install collect-generator
```

## 📘 Usage

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
