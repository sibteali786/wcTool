#!/usr/bin/env node
import yargs from "yargs";
import path from "path";
import fs from "fs";
import chalk from "chalk";
import { boldRes, fileNameBeautify } from "../utils/beautifyResponse.js";

function wc(filePath, options) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const counts = {
      lines: content.split("\n").length,
      words: content.split(/\s+/).filter(Boolean).length,
      characters: content.length,
    };

    if (options.lines) console.log(`${boldRes(counts.lines)} ${fileNameBeautify(fileName)}`);
    if (options.words) console.log(`${boldRes(counts.words)} ${fileNameBeautify(fileName)}`);
    if (options.characters) console.log(`${boldRes(counts.characters)} ${fileNameBeautify(fileName)}`);
    if (options.bytes) {
      fs.stat(filePath, (err, stats) => {
        console.log(`${boldRes(stats.size)} ${fileNameBeautify(fileName)}`);
      });
    }
  } catch (error) {
    console.error(chalk.white.bgRed("Error reading the file:", error.message));
    process.exit(1);
  }
}

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
  .example("$0 test.txt -c", "Count characters in test.txt")
  .help()
  .demandCommand(1, "Please provide a file name.");

const fileName = argv._[0];
if (!fileName) {
  console.error(chalk.red("Please provide a file name."));
  process.exit(1);
}

const filePath = path.join(process.cwd(), fileName);

const options = {
  lines: argv.lines,
  words: argv.words,
  characters: argv.characters,
  bytes: argv.bytes,
};

wc(filePath, options);
