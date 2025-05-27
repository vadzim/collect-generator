/**
 * Collects all yielded items from an async generator and returns the final result.
 *
 * @template T The type of yielded items.
 * @template R The type of the final return value.
 * @param {() => Iterable<T, R>} generator - The async generator function to run.
 * @returns {{ items: T[]; result: R }} A promise that resolves to an object containing the collected items and the final result.
 */
export function collectGenerator(generator) {
	let result = /** @type {R} */ (undefined)

	const items = Array.from(
		(function* () {
			result = yield* generator()
		})(),
	)

	return {
		items,
		result,
	}
}
