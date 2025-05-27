import assert from "node:assert"
import { test } from "node:test"
import { fromAsyncShim } from "../from-async-shim.js"

test("converts async iterable to array", async () => {
	async function* generator() {
		yield 1
		yield 2
		yield 3
	}

	const result = await fromAsyncShim(generator())
	assert.deepStrictEqual(result, [1, 2, 3])
})

test("converts sync iterable to array", async () => {
	function* generator() {
		yield 1
		yield 2
		yield 3
	}

	const result = await fromAsyncShim(generator())
	assert.deepStrictEqual(result, [1, 2, 3])
})

test("handles empty iterable", async () => {
	async function* emptyGenerator() {
		// no yields
	}

	const result = await fromAsyncShim(emptyGenerator())
	assert.deepStrictEqual(result, [])
})

test("handles iterable with promises", async () => {
	function* generator() {
		yield Promise.resolve(1)
		yield Promise.resolve(2)
		yield Promise.resolve(3)
	}

	const result = await fromAsyncShim(generator())
	assert.deepStrictEqual(result, [1, 2, 3])
})
