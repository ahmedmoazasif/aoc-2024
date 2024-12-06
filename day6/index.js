import { promises as fs } from "fs";

// const data = await fs.readFile("sample.txt", "utf-8");
const data = await fs.readFile("input.txt", "utf-8");

const mapinit = data.split("\n").map((row) => row.split(""));

const startIndexY = mapinit.findIndex((row) => row.includes("^"));
const startIndexX = mapinit[startIndexY].indexOf("^");

const width = mapinit[0].length;
const height = mapinit.length;

let direction = "up";

console.log({ startIndexX, startIndexY, width, height });
function solve(startIndexX, startIndexY, width, height, map, direction) {
  function getNextStep(x, y, direction) {
    switch (direction) {
      case "up":
        return [x, y - 1];
      case "down":
        return [x, y + 1];
      case "left":
        return [x - 1, y];
      case "right":
        return [x + 1, y];
    }
  }

  function isObstacle(x, y) {
    return map[y]?.[x] === "#" || map[y]?.[x] === "O";
  }

  function getTurnDirection(direction) {
    switch (direction) {
      case "up":
        return "right";
      case "right":
        return "down";
      case "down":
        return "left";
      case "left":
        return "up";
    }
  }

  function turnedNextStep(x, y, direction) {
    const [nx, ny] = getNextStep(x, y, direction);
    if (isObstacle(nx, ny)) {
      direction = getTurnDirection(direction);
      return turnedNextStep(x, y, direction);
    }
    return [nx, ny, direction];
  }

  let currentX = startIndexX;
  let currentY = startIndexY;
  const locations = new Set();

  const yUp = new Set();
  const yDown = new Set();
  const xLeft = new Set();
  const xRight = new Set();

  function isClear(x, y, d) {
    if (x < 0 || y < 0 || x >= width || y >= height) {
      return false;
    }
    if (isObstacle(x, y)) {
      return false;
    }

    switch (d) {
      case "up":
        return (
          (locations.has(formatXY(x, y)) && yUp.has(formatXY(x, y))) ||
          isClear(x, y - 1, d)
        );
      case "down":
        return (
          (locations.has(formatXY(x, y)) && yDown.has(formatXY(x, y))) ||
          isClear(x, y + 1, d)
        );
      case "left":
        return (
          (locations.has(formatXY(x, y)) && xLeft.has(formatXY(x, y))) ||
          isClear(x - 1, y, d)
        );
      case "right":
        return (
          (locations.has(formatXY(x, y)) && xRight.has(formatXY(x, y))) ||
          isClear(x + 1, y, d)
        );
    }
  }

  const formatXY = (x, y) => `${x},${y}`;
  const obstacles = new Set();
  let loops = false;
  while (true) {
    locations.add(formatXY(currentX, currentY));

    switch (direction) {
      case "up":
        if (yUp.has(formatXY(currentX, currentY))) {
          loops = true;
          break;
        }
        yUp.add(formatXY(currentX, currentY));
        map[currentY][currentX] = map[currentY][currentX] === "-" ? "+" : "|";
        break;
      case "down":
        if (yDown.has(formatXY(currentX, currentY))) {
          loops = true;
          break;
        }
        yDown.add(formatXY(currentX, currentY));
        map[currentY][currentX] = map[currentY][currentX] === "-" ? "+" : "|";
        break;
      case "left":
        if (xLeft.has(formatXY(currentX, currentY))) {
          loops = true;
          break;
        }
        xLeft.add(formatXY(currentX, currentY));
        map[currentY][currentX] = map[currentY][currentX] === "|" ? "+" : "-";
        break;
      case "right":
        if (xRight.has(formatXY(currentX, currentY))) {
          loops = true;
          break;
        }
        xRight.add(formatXY(currentX, currentY));
        map[currentY][currentX] = map[currentY][currentX] === "|" ? "+" : "-";
        break;
    }

    if (loops) {
      break;
    }

    [currentX, currentY, direction] = turnedNextStep(
      currentX,
      currentY,
      direction
    );

    if (
      currentX >= width ||
      currentY >= height ||
      currentX < 0 ||
      currentY < 0
    ) {
      break;
    }
  }
  return loops;
}
let count = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const map = JSON.parse(JSON.stringify(mapinit));
    if (map[y][x] === "#" || map[y][x] === "^") {
      continue;
    }
    map[y][x] = "O";
    if (solve(startIndexX, startIndexY, width, height, map, direction)) {
      count++;
    }
    // console.table(map);
    map[y][x] = ".";
  }
}

console.log(startIndexX, startIndexY);
console.log(count);
