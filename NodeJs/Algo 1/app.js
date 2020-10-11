var performance = require("perf_hooks");

String.prototype.count = function (c) {
  var result = 0,
    i = 0;
  for (i; i < this.length; i++)
    if (this[i] == c) result++;
  return result;
};

function solve(input = "ababa", verb = "a", divisions = 3, log = false) {
  const chars = input.split("");
  const totalVerbs = chars.filter((x) => x == verb).length;
  const divisiblity = Math.round(totalVerbs / divisions);

  const allDivisions = [];
  for (let i0 = 1; i0 < chars.length; i0++) {
    const residue = input.substring(0, i0);
    const specimen = input.substring(i0);

    const solvedSpecimen = solveSpecimen(specimen);

    for (let i = 0; i < solvedSpecimen.length; i++) {
      const dotProduct = [residue, ...solvedSpecimen[i]];

      let isValid = true;
      for (let i2 = 0; i2 < dotProduct.length; i2++) {
        const ele = dotProduct[i2];

        if (ele.count(verb) != divisiblity) {
          isValid = false;
        } else {}
      }

      if (isValid) {
        allDivisions.push(dotProduct);
      }
    }

    // allDivisions.push(dotProduct);
  }

  return {
    count: allDivisions.length,
    solution: allDivisions
  };
}

function solveSpecimen(input) {
  const solved = [];
  for (let i = 1; i < input.length; i++) {
    solved.push([input.substring(0, i), input.substring(i)]);
  }
  return solved;
}

function solvePerformance(perfCount) {
  let currentAverage = 0;
  let total = 0;
  for (let i = 0; i < perfCount; i++) {
    var t0 = new Date().getTime();
    solve(process.argv[2], process.argv[3], process.argv[4], false);
    var t1 = new Date().getTime();

    let diff = t1 - t0;
    total += diff;
    currentAverage = (total + diff) / i + 1;
  }
  return currentAverage;
}

var start = new Date().getTime();
var result = solve(process.argv[2], process.argv[3], process.argv[4]);
console.log(result);
var end = new Date().getTime();
let differ = end - start;

var epochs = process.argv[5] ? process.argv[5] : 100000;

// solution('ababa') - 4 {'a', 'ba', 'ba'} {'ab', 'ab', 'a'} {'a', 'bab', 'a'} {'ab', 'a', 'ba'}
// solution('babaa') - 2 {'ba', 'ba', 'a'} {'bab', 'a', 'a'}