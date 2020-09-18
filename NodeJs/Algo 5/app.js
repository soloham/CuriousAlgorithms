let set = [];
function find(n){
  let ind = 0;
  let res = input.indexOf(n) == -1
  if(res) input = input.splice(ind, 1)
  return res;
}

function solveObvious(){
  if(set.length == 0) return 1;
  for (let i = 1; i < 100001; i++) {
    if(find(i)) return i
  }
}
let input = JSON.parse(process.argv[2] || '[5,7,9,2,1,-4,0,7]') 
set = [...input];
console.log('INPUT', input);
let res = solveObvious()
console.log('-> RESULT:', res);

let start = new Date().getTime();
for (let i = 0; i < 10000; i++) {
  solveObvious()
}
let end = new Date().getTime();
console.log("-> Time Taken:", end - start, "ms")

// CONSTRAINTS!
// input -> [-10000,...,10000], max size: 10,000

// EXAMPLE!
// [5,7,9,2,1,-4,0] -> 3

// FUNCTION!
// smallest number greater than 0 NOT in the input