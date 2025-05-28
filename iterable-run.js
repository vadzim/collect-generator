/**
 * Collects all yielded items from an iterable and returns the final result.
 *
 * @template T The type of yielded items.
 * @template R The type of the final return value.
 * @param {Iterable<T, R>} iterable - The iterable to read.
 * @returns {{ items: T[]; result: R }} An object containing the collected items and the final result.
 */
export function iterableRun(iterable) {
	let result = /** @type {R} */ (undefined)

	const items = Array.from(
		(function* () {
			result = yield* iterable
		})(),
	)

	return {
		items,
		result,
	}
}
