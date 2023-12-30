#!/usr/bin/env node
const yargs = require("yargs");
const path = require("path");
const fs = require("fs");

function wc(filePath, options) {
  const content = fs.readFileSync(filePath, "utf8"); 
  const counts = {
    lines: content.split("\n").length,
    words: content.split(/\s+/).filter(Boolean).length,
    characters: content.length,
  };

  if (options.lines) console.log(`${counts.lines} ${fileName}`);
  if (options.words) console.log(`${counts.words} ${fileName}`);
  if (options.characters) console.log(`${counts.characters} ${fileName}`);
}

const { argv } = yargs
  .command("$0 [file] [-l] [-w] [-c]", "Count lines, words, or characters in a file", (yargs) => {
    return yargs
      .positional("file", {
        describe: "The file to count",
        type: "string",
      })
      .options({
        lines: {
          alias: "l",
          describe: "Print the number of lines",
          type: "boolean",
        },
        words: {
          alias: "w",
          describe: "Print the number of words",
          type: "boolean",
        },
        characters: {
          alias: "c",
          describe: "Print the number of characters",
          type: "boolean",
        },
      })
      .example("$0 test.txt -c", "Count characters in test.txt")
      .help();
  })
  .help();

const fileName = argv.file;
if (!fileName) {
  console.error("Please provide a file name.");
  process.exit(1);
}

const filePath = path.join(process.cwd(), fileName);

const options = {
  lines: argv.l,
  words: argv.w,
  characters: argv.c,
};

wc(filePath, options);