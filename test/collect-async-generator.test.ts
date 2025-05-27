import assert from "node:assert"
import { test } from "node:test"
import { collectAsyncGenerator } from "../index.js"

test("collects values and return result from async generator", async () => {
	async function* generator() {
		const n = 42
		yield n
		yield n + 1
		yield n + 2
		return "text"
	}

	true satisfies typeof generator extends () => AsyncIterable<number, string> ? true : false

	const ret = await collectAsyncGenerator(generator)

	assert.deepStrictEqual(ret, { items: [42, 43, 44], result: "text" })

	true satisfies { items: number[]; result: string } extends typeof ret ? true : false
	true satisfies typeof ret extends { items: number[]; result: string } ? true : false

	// items is an array of numbers
	true satisfies number extends (typeof ret)["items"][number] ? true : false
	true satisfies (typeof ret)["items"][number] extends number ? true : false
	false satisfies unknown extends (typeof ret)["items"][number] ? true : false
	false satisfies (typeof ret)["items"][number] extends never ? true : false

	// result is a string
	true satisfies string extends (typeof ret)["result"] ? true : false
	true satisfies (typeof ret)["result"] extends string ? true : false
	false satisfies unknown extends (typeof ret)["result"] ? true : false
	false satisfies (typeof ret)["result"] extends never ? true : false
})

test("collects values and return result from  generator", async () => {
	function* generator() {
		const n = 1
		yield Promise.resolve(n)
		yield Promise.resolve(n + 1)
		yield Promise.resolve(n + 2)
		return Promise.resolve("sync")
	}

	true satisfies typeof generator extends () => Iterable<Promise<number>, Promise<string>> ? true : false

	const ret = await collectAsyncGenerator(generator)

	assert.deepStrictEqual(ret, { items: [1, 2, 3], result: "sync" })

	true satisfies { items: number[]; result: string } extends typeof ret ? true : false
	true satisfies typeof ret extends { items: number[]; result: string } ? true : false

	// items is an array of numbers
	true satisfies number extends (typeof ret)["items"][number] ? true : false
	true satisfies (typeof ret)["items"][number] extends number ? true : false
	false satisfies unknown extends (typeof ret)["items"][number] ? true : false
	false satisfies (typeof ret)["items"][number] extends never ? true : false

	// result is a string
	true satisfies string extends (typeof ret)["result"] ? true : false
	true satisfies (typeof ret)["result"] extends string ? true : false
	false satisfies unknown extends (typeof ret)["result"] ? true : false
	false satisfies (typeof ret)["result"] extends never ? true : false
})
