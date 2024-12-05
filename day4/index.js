import { promises as fs } from "fs";

const data = await fs.readFile("input.txt", "utf-8");

const content = data.split("\n").map((line) => line.split(""));

const isXmas = (x, y) => {
  let counter = 0;
  if (content[x][y] !== "X") return 0;

  //can check back horizontally
  content[x - 1]?.[y] === "M" &&
  content[x - 2]?.[y] === "A" &&
  content[x - 3]?.[y] === "S"
    ? counter++
    : null;

  //can check forward horizontally
  content[x + 1]?.[y] === "M" &&
  content[x + 2]?.[y] === "A" &&
  content[x + 3]?.[y] === "S"
    ? counter++
    : null;

  //can check up vertically
  content[x]?.[y - 1] === "M" &&
  content[x]?.[y - 2] === "A" &&
  content[x]?.[y - 3] === "S"
    ? counter++
    : null;

  //can check down vertically
  content[x]?.[y + 1] === "M" &&
  content[x]?.[y + 2] === "A" &&
  content[x]?.[y + 3] === "S"
    ? counter++
    : null;

  //can check back up diagonally
  content[x - 1]?.[y - 1] === "M" &&
  content[x - 2]?.[y - 2] === "A" &&
  content[x - 3]?.[y - 3] === "S"
    ? counter++
    : null;

  //can check forward down diagonally
  content[x + 1]?.[y + 1] === "M" &&
  content[x + 2]?.[y + 2] === "A" &&
  content[x + 3]?.[y + 3] === "S"
    ? counter++
    : null;

  //can check back down diagonally
  content[x - 1]?.[y + 1] === "M" &&
  content[x - 2]?.[y + 2] === "A" &&
  content[x - 3]?.[y + 3] === "S"
    ? counter++
    : null;

  //can check forward up diagonally
  content[x + 1]?.[y - 1] === "M" &&
  content[x + 2]?.[y - 2] === "A" &&
  content[x + 3]?.[y - 3] === "S"
    ? counter++
    : null;

  return counter;
};

let counter = 0;
for (let i = 0; i < content.length; i++) {
  for (let j = 0; j < content[i].length; j++) {
    counter += isXmas(j, i);
  }
}

console.log(counter);

const isMasX = (x, y) => {
  const current = content[y][x];
  if (current !== "A") return false;

  const topLeft = content[y - 1][x - 1];
  const bottomRight = content[y + 1][x + 1];
  const topRight = content[y - 1][x + 1];
  const bottomLeft = content[y + 1][x - 1];

  const forwardDiagonal = `${topLeft}${content[y][x]}${bottomRight}`;
  const backwardDiagonal = `${topRight}${content[y][x]}${bottomLeft}`;

  if (
    (forwardDiagonal === "MAS" && backwardDiagonal === "SAM") ||
    (forwardDiagonal === "SAM" && backwardDiagonal === "MAS") ||
    (forwardDiagonal === "MAS" && backwardDiagonal === "MAS") ||
    (forwardDiagonal === "SAM" && backwardDiagonal === "SAM")
  ) {
    return true;
  }
  return false;
};

let counter2 = 0;
for (let i = 1; i < content.length - 1; i++) {
  for (let j = 1; j < content[i].length - 1; j++) {
    isMasX(j, i) ? counter2++ : null;
  }
}

console.log(counter2);
