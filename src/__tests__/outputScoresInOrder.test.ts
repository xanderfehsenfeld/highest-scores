import * as path from "path";
import * as fs from "fs";
import { outputScoresInOrder } from "../outputScoresInOrder";

describe("outputScoresInOrder", () => {
  const fileContentWithoutError = fs.readFileSync(
    path.join(__dirname, "./dataWithoutError.data"),
    "utf-8"
  );
  describe("file length is greater than or equal to selection", () => {
    it("returns selection number of scores ", () => {
      const result = outputScoresInOrder(fileContentWithoutError, 1);
      expect(result).toHaveLength(1);
    });
  });
  describe("file length is less than selection", () => {
    const result = outputScoresInOrder(fileContentWithoutError, 10);
    it("returns the file length number of scores", () => {
      expect(result).toHaveLength(5);
    });
    it("matches snapshot", () => {
      expect(result).toMatchSnapshot();
    });
  });

  it("returns correctly structured JSON", () => {
    const [first] = outputScoresInOrder(fileContentWithoutError, 10);
    expect(first).toHaveProperty("score");
    expect(first).toHaveProperty("id");

    const { score, id } = first;

    expect(typeof score).toBe("number");
    expect(typeof id).toBe("string");
  });

  describe("malformed json", () => {
    const fileContentWithError = fs.readFileSync(
      path.join(__dirname, "./dataWithError.data"),
      "utf-8"
    );
    it("returns selection if error line is excluded", () => {
      const result = outputScoresInOrder(fileContentWithError, 3);
      expect(result).toHaveLength(3);
    });

    it("throws error if error line is included", () => {
      const testWithError = () => outputScoresInOrder(fileContentWithError, 10);
      expect(testWithError).toThrow();
    });
  });

  it("returns empty for empty file", () => {
    const result = outputScoresInOrder(" ", 2);
    expect(result).toHaveLength(0);
  });

  it("returns scores in descending order, highest first", () => {
    const [first, second] = outputScoresInOrder(fileContentWithoutError, 10);
    expect(first.score).toBeGreaterThan(second.score);
  });

  describe("repeated scores", () => {
    const fileContentWithRepeatedScores = fs.readFileSync(
      path.join(__dirname, "./repeatedScores.data"),
      "utf-8"
    );

    const result = outputScoresInOrder(fileContentWithRepeatedScores, 10);
    it("matches snapshot", () => {
      expect(result).toMatchSnapshot();
    });
    it("orders the last occurence first", () => {
      const [first] = result;
      expect(first.id).toEqual("last");
    });
  });
});
