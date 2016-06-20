import * as expect from "expect";

import { createEntry } from "../Entry";

describe("Entry creator", () => {
  describe("New entry", () => {
    const entry = createEntry();

    it("should have an ID", () => {
      expect(entry.id).toBe(0);
    });

    it("should have a name", () => {
      expect(entry.name).toBe("");
    });

    it("should have content", () => {
      expect(entry.content).toBe("");
    });
  });

  describe("New entry from API data", () => {
    let entry;
    let item;

    before(() => {
      item = {
        definition: "test",
        id: 1,
        word: "test",
      };

      entry = createEntry(item);
    });

    it("should have an ID", () => {
      expect(entry.id).toBe(item.id);
    });

    it("should have a name", () => {
      expect(entry.name).toBe(item.word);
    });

    it("should have content", () => {
      expect(entry.content).toBe(item.definition);
    });
  });
});