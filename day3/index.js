import { promises as fs } from "fs";

const data = await fs.readFile("input.txt", "utf-8");

const regex = /mul\(\d+,\d+\)/g;

// 1

const matches = data.match(regex);

const sum = matches
  .map((match) => {
    const [a, b] = match
      .replace("mul(", "")
      .replace(")", "")
      .split(",")
      .map(Number);

    return a * b;
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log(sum);

// 2

const regexDo = /do\(\)/g;
const regexDont = /don't\(\)/g;

const sum2 = data
  .split(regexDo)
  .map((m) => m.split(regexDont)[0])
  .flatMap((m) => m.match(regex))
  .map((m) => m.replace("mul(", "").replace(")", "").split(",").map(Number))
  .map(([a, b]) => a * b)
  .reduce((acc, curr) => acc + curr, 0);

console.log(sum2);
