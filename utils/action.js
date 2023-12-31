import fs from "fs";
import { boldRes, fileNameBeautify } from "./beautifyResponse.js";

export function countCharacters(input) {
  return input.length;
}

export function countLines(input) {
  return input.split("\n").length - 1;
}

export function countWords(input) {
  return input.split(/\s+/).filter(Boolean).length;
}

export function countBytes(filePath, fileName) {
  const stats = fs.statSync(filePath);
  console.log(`${boldRes(stats.size)} ${fileNameBeautify(fileName)}`);
}
