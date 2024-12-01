import { promises as fs } from "fs";

//extract input
const [list1, list2] = await fs.readFile("input.txt", "utf-8").then((data) =>
  data
    .split("\n")
    .map((line) => line.split(/\s+/).map(Number))
    .reduce(
      ([l1, l2], [i1, i2]) => {
        l1.push(i1);
        l2.push(i2);
        return [l1, l2];
      },
      [[], []]
    )
);

const sort1 = list1.sort();
const sort2 = list2.sort();

let sumDifference = 0;

for (let i = 0; i < sort1.length; i++) {
  sumDifference += Math.abs(sort1[i] - sort2[i]);
}

console.log({ sumDifference });

let i1 = 0;
let i2 = 0;

let sumSimilarity = 0;
let counter = 0;

while (true) {
  let val1 = sort1[i1];
  let val2 = sort2[i2];

  if (val1 === undefined || val2 === undefined) {
    break;
  }

  if (val1 === val2) {
    console.log({ val1 });
    counter++;
    i2++;
  } else if (val1 < val2) {
    do {
      console.log({ counter });
      sumSimilarity += counter * val1;
      i1++;
    } while (sort1[i1] === sort1[i1 + 1]);
    counter = 0;
  } else if (val1 > val2) {
    i2++;
  }
}

console.log({ sumSimilarity });
