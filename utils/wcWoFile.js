import readline from "readline";
import { countCharacters, countLines, countWords } from "./action.js";
import { boldRes } from "../utils/beautifyResponse.js";
import chalk from "chalk";

export function wcWithOutFileName(options) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });
  let inputData = "";
  let byteCount = 0;
  rl.on("line", (input) => {
    inputData += input + "\n";
  });
  process.stdin.on("data", (chunk) => {
    // Calculate bytes for each chunk received
    byteCount += Buffer.byteLength(chunk);
  });
  rl.on("close", () => {
    // readline is async operation
    if (!inputData) {
      console.error(
        chalk.bgRed.red(
          `Please provide a file name or file stream using cat command like \n${chalk.green.bgWhite(" cat test.txt | myWc -l")}`,
        ),
      );
    } else {
      if (options.lines) {
        const result = countLines(inputData);
        console.log(`${boldRes(result)}`);
      }
      if (options.words) {
        const result = countWords(inputData);
        console.log(`${boldRes(result)}`);
      }
      if (options.characters) {
        const result = countCharacters(inputData);
        console.log(`${boldRes(result)}`);
      }
      if (options.bytes) {
        console.log(`${boldRes(byteCount)}`);
      }
    }
  });
}
