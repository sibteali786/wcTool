import chalk from "chalk";

export const boldRes = (input) => {
  return chalk.yellow.bold(input);
};

export const fileNameBeautify = (input) => {
	return chalk.green.underline.bold(input);
}
