import readline from "readline";
import { countCharacters, countLines, countWords } from "./action.js";
import { boldRes } from "../utils/beautifyResponse.js";
import chalk from "chalk";

export async function wcWithOutFileName(options) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });
  let lineCount = 0;
  let wordCount = 0;
  let charCount = 0;
  let byteCount = 0;
  rl.on("line", (input) => {
    lineCount++;
    wordCount += countWords(input);
    charCount += countCharacters(input);
  });
  process.stdin.on("data", (chunk) => {
    byteCount += Buffer.byteLength(chunk);
  });
  rl.on("close", () => {
    if (options.lines) {
      console.log(`${boldRes(lineCount)}`);
    } else if (options.words) {
      console.log(`${boldRes(wordCount)}`);
    } else if (options.characters) {
      console.log(`${boldRes(charCount)}`);
    } else if (options.bytes) {
      console.log(`${boldRes(byteCount)}`);
    } else {
      console.log(
        `${boldRes(wordCount)} ${boldRes(lineCount)} ${boldRes(byteCount)}`,
      );
    }
  });
}
