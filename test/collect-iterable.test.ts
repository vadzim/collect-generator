import assert from "node:assert"
import { test } from "node:test"
import { collectIterable } from "../index.js"

test("collects values and return result from  generator", () => {
	function* generator() {
		const n = 42
		yield n
		yield n + 1
		yield n + 2
		return "text"
	}

	const ret = collectIterable(generator())

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
