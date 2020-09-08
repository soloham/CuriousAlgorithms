function calculate(sets){
  let universal = [];
  let intersection = [];
  sets.forEach(s => {
    s.forEach(e => { 
      if(universal.filter(x => x == e).length == 0)
      universal.push(e)
    });
  });

  sets.forEach((s, i) => {
    if(i != sets.length-1){
      let nSet = sets[i+1];
      s.forEach(e => {
        if(nSet.filter(x => x == e).length > 0)
          intersection.push(e)
      })
    }
  });

  let result = [];
  universal.forEach(x => {
    if(intersection.filter(y => y == x).length == 0)
      result.push(x);
  })

  return result;
}
// console.log(JSON.parse('{ "input": [[1,2,3], [5,2,1,4]]}'))
let input = JSON.parse(`{ "input": ${process.argv[2] || '[[1,2,3], [5,2,1,4]]'} }`);
let res = calculate(input.input)
console.log(res);