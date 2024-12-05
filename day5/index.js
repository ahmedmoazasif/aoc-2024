import { promises as fs } from "fs";

// const data = await fs.readFile("sample.txt", "utf-8");
const data = await fs.readFile("input.txt", "utf-8");

const [rulesText, linesText] = data.split("\n\n");

const rules = rulesText
  .split("\n")
  .map((r) => r.split("|"))
  .map(([f, s]) => [new RegExp(f), new RegExp(s), new RegExp(`${f}.+${s}`)]);

// console.table(rules);

const ans1 = linesText
  .split("\n")
  .filter((l) => {
    for (const [f, s, r] of rules) {
      //   console.log(l);
      //   console.log({
      //     f,
      //     s,
      //     r,
      //     fm: l.match(f),
      //     sm: l.match(s),
      //     rm: l.match(r),
      //   });
      if (l.match(f) && l.match(s)) {
        if (l.match(r)) {
          continue;
        }
        return false;
      }
    }
    return true;
  })
  //   .map((l) => {
  //     console.log(l);
  //     return l;
  //   })
  .map((l) => l.split(",").map(Number))
  .map((l) => l[Math.floor(l.length / 2)])
  //   .map((l) => {
  //     console.log(l);
  //     return l;
  //   })
  .reduce((acc, curr) => acc + curr, 0);

console.log({ ans1 });

const ans2 = linesText
  .split("\n")
  .filter((l) => {
    for (const [f, s, r] of rules) {
      if (l.match(f) && l.match(s)) {
        if (l.match(r)) {
          continue;
        }
        return !false;
      }
    }
    return !true;
  })
  .map((l) => {
    let isOrdered = false;
    do {
      for (const [f, s, r] of rules) {
        const fm = l.match(f);
        const sm = l.match(s);
        if (fm && sm && !l.match(r)) {
          l = l.replace(f, "*").replace(s, fm[0]).replace("*", sm[0]);
        }
      }
      isOrdered = true;
      for (const [f, s, r] of rules) {
        if (l.match(f) && l.match(s) && !l.match(r)) {
          isOrdered = false;
          break;
        }
      }
    } while (!isOrdered);
    return l;
  })
  //   .map((l) => {
  //     console.log(l);
  //     return l;
  //   })
  .map((l) => l.split(",").map(Number))
  .map((l) => l[Math.floor(l.length / 2)])
  //   .map((l) => {
  //     console.log(l);
  //     return l;
  //   })
  .reduce((acc, curr) => acc + curr, 0);

console.log({ ans2 });
