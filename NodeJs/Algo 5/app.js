function solveObvious(A){
  A = A.filter(x => x > 0).sort((a,b) => a - b);
  
  let n = 0;
  for (let i = 0; i < A.length; i++) {
    if(n < A[i]) return n
    n++
  }
}
let input = JSON.parse(process.argv[2] || '[5,7,9,2,1,-4,0,7]') 
console.log('INPUT', input);
let res = solveObvious(input)
console.log('-> RESULT:', res);

let start = new Date().getTime();
for (let i = 0; i < 10000; i++) {
  solveObvious(input)
}
let end = new Date().getTime();
console.log("-> Time Taken:", end - start, "ms")

// CONSTRAINTS!
// input -> [-10000,...,10000], max size: 10,000

// EXAMPLE!
// [5,7,9,2,1,-4,0] -> 3

// FUNCTION!
// smallest number greater than 0 NOT in the input
