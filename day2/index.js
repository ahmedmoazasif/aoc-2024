import { promises as fs } from "fs";

const data = await fs.readFile("input.txt", "utf-8");

/**
 *
 * @param {Number[]} report
 * @param {Boolean} isTerminal
 * @param {Number} direction
 * @returns {Boolean}
 */
function validateReport(report, isTerminal = false) {
  let direction;
  for (let i = 1; i < report.length; i++) {
    const current = report[i];
    const previous = report[i - 1];
    const diff = current - previous;

    if (0 < Math.abs(diff) && Math.abs(diff) < 4) {
      continue;
    }

    if (diff === 0) {
      return isTerminal
        ? false
        : validateReport([...report.slice(0, i - 1), ...report.slice(i)], true);
    }

    if (!direction) {
      direction = diff > 0 ? 1 : -1;
    }

    if (Math.abs(diff) > 3) {
      return isTerminal
        ? false
        : validateReport(
            [...report.slice(0, i - 1), ...report.slice(i)], // remove the previous element
            true
          ) ||
            validateReport(
              [...report.slice(0, i), ...report.slice(i + 1)], // remove the current element
              true
            );
    }

    if (direction !== 0 && direction !== (diff > 0 ? 1 : -1)) {
      return isTerminal
        ? false
        : validateReport(
            [...report.slice(0, i - 1), ...report.slice(i)], // remove the previous element
            true
          ) ||
            validateReport(
              [...report.slice(0, i), ...report.slice(i + 1)], // remove the current element
              true
            );
    }
  }
  return true;
}

const reports = data
  .split("\n")
  .map((line) => line.split(/\s+/).map(Number))
  .filter((list) => validateReport(list));

console.log({ reports: reports.length });
