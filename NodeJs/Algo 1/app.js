var performance = require('perf_hooks');

String.prototype.count=function(c) { 
  var result = 0, i = 0;
  for(i;i<this.length;i++)if(this[i]==c)result++;
  return result;
};
function solve(input = 'ababa', verb = 'a', divisions = 3, log = false){
  if(log) console.log('------------------------------- STARTED -------------------------------');
  const chars = input.split('');
  const totalVerbs = chars.filter(x => x == verb).length;
  const divisiblity = Math.round(totalVerbs / divisions);

  if(log) console.log('------- INITIAL INFO -------');
  if(log) console.log('---- PROVIDED ----');
  if(log) console.log('Input: ', input);
  if(log) console.log('Verb: ', verb);
  if(log) console.log('Divisions: ', divisions);
  if(log) console.log('---- OBSERVATIONS ----');
  if(log) console.log('Verb Count: ', totalVerbs);
  if(log) console.log('Verb Divisibility (As per Divisions): ', divisiblity);
  if(log) console.log('-----------------------------');


  if(log) console.log('\n--------------------- SOLUTION BEGINS ---------------------');
  const allDivisions = [];
  for (let i0 = 1; i0 < chars.length; i0++) {
    if(log) console.log(`--------- Processing Combinations for ${i0} ---------`);
    const residue = input.substring(0, i0);
    const specimen = input.substring(i0);

    if(log) console.log('Residue: ', residue, '\nSpecimen: ', specimen)
    const solvedSpecimen = solveSpecimen(specimen);

    if(log) console.log(`-------- Solving Specimen --------`);
    if(log) console.log(`Solved Specimen: ` + solvedSpecimen)
    if(log) console.log(`------------------------------------`);

    if(log) console.log(`\n----------- Combining w/ Residue -----------\n`);
    for (let i = 0; i < solvedSpecimen.length; i++) {
      if(log) console.log(`------- With Specimen ${i+1}: ${solvedSpecimen[i]} -------`);
      const dotProduct = [residue, ...solvedSpecimen[i]]
      if(log) console.log('Dot Product:', dotProduct);

      if(log) console.log(`\n---- Verifying Constraints ----`);
      let isValid = true;
      for (let i2 = 0; i2 < dotProduct.length; i2++) {
        const ele = dotProduct[i2];
        if(log) console.log('Verifying: ', ele);
        if(ele.count(verb) != divisiblity){
          isValid = false;
          if(log) console.log('Invalid!');
        }
        else{
          if(log) console.log('Verified!');
        }
      }
      if(log) console.log(`\n---- Verification Complete ----\n`);
      if(isValid){
        allDivisions.push(dotProduct)
      }
      if(log) console.log(`------- Specimen ${i+1} Completed ${isValid? 'Successfully' : 'Unsuccessfully'} -------n`);
    }
    if(log) console.log(`\n----------- Combination Completed -----------`);


    if(log) console.log(`------------- Processing: ${i0} Completed -------------`);
    // allDivisions.push(dotProduct);
  }
  if(log) console.log('\n--------------------- SOLUTION FINISHED ---------------------');
  if(log) console.log('\n------------------------------- FINISHED -------------------------------\n');

  return {count: allDivisions.length, solution: allDivisions};
}

function solveSpecimen(input)
{
  const solved = [];
  for (let i = 1; i < input.length; i++) {
    solved.push([input.substring(0, i), input.substring(i)]);
  }
  return solved;
}
function solvePerformance(perfCount){
  let currentAverage = 0;
  let total = 0;
  for (let i = 0; i < perfCount; i++) {
    var t0 = new Date().getTime();
    solve(process.argv[2], process.argv[3], process.argv[4], false);
    var t1 = new Date().getTime();

    let diff = (t1 - t0);
    total += diff;
    currentAverage = (total + diff) / i+1;
  }
  return currentAverage;
}

var start = new Date().getTime();
var result = solve(process.argv[2], process.argv[3], process.argv[4]);
var end = new Date().getTime();
let differ = end - start;
console.log('RESULT: ', result, "-> Time Taken:", differ, "ms")

var epochs = process.argv[5] ?? 100000
console.log('\n-----------------------------------------------------');
console.log(` ||| PERFORMANCE (x${epochs}):`, solvePerformance(epochs), "ms", "|||");
console.log('-----------------------------------------------------');

// solution('ababa') - 4 {'a', 'ba', 'ba'} {'ab', 'ab', 'a'} {'a', 'bab', 'a'} {'ab', 'a', 'ba'}
// solution('babaa') - 2 {'ba', 'ba', 'a'} {'bab', 'a', 'a'}