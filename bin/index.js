#!/usr/bin/env node
import yargs from "yargs";
import path from "path";
import { wc } from "../utils/wc.js";
import { wcWithOutFileName } from "../utils/wcWoFile.js";
import fs from 'fs';

const { argv } = yargs(process.argv.slice(2))
  .scriptName("wcTool")
  .usage("$0 [file] [-l] [-w] [-c]")
  .option("lines", {
    alias: "l",
    describe: "Print the number of lines",
    type: "boolean",
  })
  .option("words", {
    alias: "w",
    describe: "Print the number of words",
    type: "boolean",
  })
  .option("bytes", {
    alias: "c",
    describe: "Print the number of bytes",
    type: "boolean",
  })
  .option("characters", {
    alias: "m",
    describe: "Print the number of characters",
    type: "boolean",
  })
  .example("$0 -c test.txt", "Count bytes in test.txt")
  .help();
let fileName = argv._[0];
const options = {
  lines: argv.l,
  words: argv.w,
  characters: argv.m,
  bytes: argv.c,
};
// If filename is not provided in the command, read from stdin
if (!fileName) {
  wcWithOutFileName(options);
} else {
  const content = fs.readFileSync(fileName, "utf8");
  if (content) {
    wc(fileName, options, fileName);
  } else {
    const filePath = path.join(process.cwd(), fileName);
    wc(filePath, options, fileName);
  }
}
