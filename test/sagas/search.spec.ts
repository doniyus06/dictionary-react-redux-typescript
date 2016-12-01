import * as expect from "expect"
import { delay } from "redux-saga"
import { call, CallEffect, fork, put, PutEffect, take } from "redux-saga/effects"
import { search } from "../../src/api/DictionaryAPI"
import { searchSaga, searchTask } from "../../src/sagas/search"

import {
  SEARCH_START,
  searchDone,
  searchError,
  searchStart,
} from "../../src/actions/search"

describe("Search saga", () => {
  const sagaIterator = searchSaga()

  it("is started by a SEARCH_START action", () => {
    const result = sagaIterator.next()
    expect(result.value).toEqual(take(SEARCH_START))
    expect(result.done).toBe(false)
  })

  it("forks a fetch result function generator", () => {
    const result = sagaIterator.next()
    expect(result.value).toEqual(fork(searchTask, undefined))
    expect(result.done).toBe(false)
  })

  describe("worker", () => {

    it(`executes with success`, () => {
      const prefix = "a"
      const fetchIterator = searchTask(searchStart(prefix))
      let result: IteratorResult<CallEffect | PutEffect<any>>

      result = fetchIterator.next()
      expect(result.value).toEqual(call(delay, 200))
      expect(result.done).toBe(false)

      result = fetchIterator.next()
      expect(result.value).toEqual(call(search, prefix))
      expect(result.done).toBe(false)

      result = fetchIterator.next()
      expect(result.value).toEqual(put(searchDone()))
      expect(result.done).toBe(false)

      result = fetchIterator.next()
      expect(result.done).toBe(true)
    })

    it(`executes with error`, () => {
      const prefix = "a"
      const fetchIterator = searchTask(searchStart(prefix))
      let result: IteratorResult<CallEffect | PutEffect<any>>

      result = fetchIterator.next()
      expect(result.value).toEqual(call(delay, 200))
      expect(result.done).toBe(false)

      result = fetchIterator.next()
      expect(result.value).toEqual(call(search, prefix))
      expect(result.done).toBe(false)

      const error = new Error()
      result = fetchIterator.throw!(error)
      expect(result.value).toEqual(put(searchError(error)))
      expect(result.done).toBe(false)

      result = fetchIterator.next()
      expect(result.done).toBe(true)
    })

    const ignoredPrefixes = ["", " "]

    ignoredPrefixes.forEach((prefix) => {
      it(`executes with a "${prefix}" prefix, ignoring it`, () => {
        const fetchIterator = searchTask(searchStart(prefix))
        let result: IteratorResult<CallEffect | PutEffect<any>>

        result = fetchIterator.next()
        expect(result.value).toEqual(put(searchDone([])))
        expect(result.done).toBe(false)

        result = fetchIterator.next()
        expect(result.done).toBe(true)
      })
    })
  })
})
