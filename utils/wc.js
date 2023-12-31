import chalk from "chalk";
import path from "path";
import fs from "fs";
import { boldRes, fileNameBeautify } from "../utils/beautifyResponse.js";
import {
  countLines,
  countCharacters,
  countWords,
  countBytes,
} from "./action.js";
export function wc(filePath, options, fileName) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const counts = {
      lines: countLines(content),
      words: countWords(content),
      characters: countCharacters(content),
    };
    if (Object.values(options).every((value) => value === undefined)) {
      const res = fs.statSync(filePath);
      console.log(
        `${boldRes(counts.lines)} ${boldRes(counts.words)} ${boldRes(
          res.size,
        )} ${fileNameBeautify(fileName)}`,
      );
    } else {
      if (options.lines)
        console.log(`${boldRes(counts.lines)} ${fileNameBeautify(fileName)}`);
      if (options.words)
        console.log(`${boldRes(counts.words)} ${fileNameBeautify(fileName)}`);
      if (options.characters)
        console.log(
          `${boldRes(counts.characters)} ${fileNameBeautify(fileName)}`,
        );
      if (options.bytes) {
        countBytes(filePath, fileName);
      }
    }
    process.exit(0);
  } catch (error) {
    console.error(chalk.white.bgRed("Error reading the file:", error.message));
    process.exit(1);
  }
}
