import * as expect from "expect";
import * as nock from "nock";
import * as path from "path";
import { readFileSync } from "fs";

import { search, define } from "../DictionaryAPI";
import { IEntry } from "../Entry";

function readFixture(filename: string): any {
  return JSON.parse(readFileSync(path.resolve(__dirname, "fixtures", filename)).toString());
}

describe("Dictionary API", () => {
  describe("search", () => {
    let mockRequest;

    beforeEach(() => {
      mockRequest = nock(/.*/)
        .get("/api/search-json");
    });

    it("returns a list of entries on success", (done) => {
      const mockResult = readFixture("search-a.json");

      mockRequest.query({prefix: "a"}).reply(200, mockResult);

      search("a")
        .then((results: IEntry[]) => {
          expect(results.length).toEqual(mockResult.list.length);
        })
        .then(done);
    });

    it("returns an error on failure", (done) => {
      mockRequest.query({prefix: "error"}).reply(500);

      search("error")
        .catch((error: Error) => {
          expect(error).toExist();
        })
        .then(done);
    });
  });

  describe("define", () => {
    let mockRequest;

    beforeEach(() => {
      mockRequest = nock(/.*/);
    });

    it("returns a single entry on success", (done) => {
      const word = "b";

      const mockResult = readFixture("define-b.json");

      mockRequest
        .get("/api/search-json/" + word)
        .reply(200, mockResult);

      define("b")
        .then((results: IEntry[]) => {
          results.forEach((result) => {
            expect(result.word).toEqual(word);
            expect(result.id).toEqual(mockResult.entry["@id"]);
            expect(result.content).toEqual(mockResult.entry);
          });
        })
        .then(done);
    });

    it("returns multiple entries on success", (done) => {
      const word = "a";

      const mockResult = readFixture("define-a.json");

      mockRequest
        .get("/api/search-json/" + word)
        .reply(200, mockResult);

      define("a")
        .then((results: IEntry[]) => {
          results.forEach((result, index) => {
            expect(result.word).toEqual(word);
            expect(result.id).toEqual(mockResult.superEntry[index].entry["@id"]);
            expect(result.content).toEqual(mockResult.superEntry[index].entry);
          });
        })
        .then(done);
    });

    it("returns an Not Found error on failure", (done) => {
      mockRequest
        .get("/api/search-json/error")
        .reply(404);

      define("error")
        .catch((error: Error) => {
          expect(error.message).toContain("Not Found");
        })
        .then(done);
    });
  });
});
