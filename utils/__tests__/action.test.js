import fs from "fs";
import { execSync } from "child_process";
import { countCharacters } from "../action";

test("should count characters", () => {
  const fileContent = fs.readFileSync("test.txt", "utf-8");
  const output = countCharacters(fileContent);
  const count = fileContent.length;
  expect(output).toBe(count);
});
