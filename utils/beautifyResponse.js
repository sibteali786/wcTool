import chalk from "chalk";

function boldRes(input) {
  return chalk.yellow.bold(input);
}

function fileNameBeautify(input) {
  return chalk.green.underline.bold(input);
}

export { boldRes, fileNameBeautify };
