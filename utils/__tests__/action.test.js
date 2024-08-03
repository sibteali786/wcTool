import fs, { statSync } from "fs";
import { jest } from "@jest/globals";
import { execSync } from "child_process";
import * as beautifulResponse from "../beautifyResponse";
import { countBytes, countCharacters, countLines, countWords } from "../action";

// Mock the fs module
const fileContent = fs.readFileSync("test.txt", "utf-8");
test("counts no of characters", () => {
  const output = countCharacters(fileContent);
  const count = fileContent.length;
  expect(output).toBe(count);
});

// Counting words
describe("Count words", () => {
  test("counts no of words", () => {
    const input = "hello 1212aa world";
    const output = countWords(input);
    expect(output).toBe(3);
  });

  test("counts the number of words in a string with multiple spaces", () => {
    const input = "  hello   world  ";
    const output = countWords(input);
    expect(output).toBe(2);
  });

  test("counts the number of words in an empty string", () => {
    const input = "";
    const output = countWords(input);
    expect(output).toBe(0);
  });
});

describe("counts the no of lines", () => {
  test("counts the number of lines in a string with multiple lines", () => {
    const input = "line1\nline2\nline3";
    const output = countLines(input);
    expect(output).toBe(2);
  });

  test("counts the number of lines in a single-line string", () => {
    const input = "line1";
    const output = countLines(input);
    expect(output).toBe(0);
  });

  test("counts the number of lines in an empty string", () => {
    const input = "";
    const output = countLines(input);
    expect(output).toBe(0);
  });
});

// Test for countBytes
describe("countBytes", () => {
  let consoleSpy;
  beforeEach(() => {
    // Capture console output
    consoleSpy = jest.spyOn(console, "log").mockImplementation();	// allows to intercept the console.log() so that we know what it was called with
  });

  afterEach(() => {
    // Restore the original console.log implementation
    consoleSpy.mockRestore();
  });

  test("counts the number of bytes in a file", () => {
    jest.spyOn(fs, "statSync");
    // Mock the fs.statSync implementation
    fs.statSync.mockReturnValue({ size: 1024 });

    const filePath = "/path/to/file";
    const fileName = "file.txt";

    // Call the function
    countBytes(filePath, fileName);
    // Verify the console output
    expect(consoleSpy).toHaveBeenCalledWith(
      `${beautifulResponse.boldRes(1024)} ${beautifulResponse.fileNameBeautify(
        fileName,
      )}`,
    );
  });

  test("handles different file sizes", () => {
    fs.statSync.mockReturnValue({ size: 2048 });

    const filePath = "/path/to/another-file";
    const fileName = "another-file.txt";

    countBytes(filePath, fileName);

    expect(consoleSpy).toHaveBeenCalledWith(
      `${beautifulResponse.boldRes(2048)} ${beautifulResponse.fileNameBeautify(
        fileName,
      )}`,
    );
  });
});
