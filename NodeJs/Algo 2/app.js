String.prototype.count=function(c) { 
  var result = 0, i = 0;
  for(i;i<this.length;i++)if(this[i]==c)result++;
  return result;
};

function solve(input = "AABBDDBBB", consecutivity = 3){
  let individual = input.split('')
  let uniques = [];
  let newConsecutive = true;
  let curConsecutiveIndex = null;
  let prevInd = null;
  individual.forEach((ind, i) => {
      let count = uniques.filter(x => x.char == ind).length;
      if(count == 0) uniques.push({ char: ind, count: 0,consecutives: []})//, lastConsecutiveIndices: []});
        
      let uniquei = uniques.filter(x => x.char == ind)[0];
      uniquei.count++;
      if(prevInd == ind) {
        if(newConsecutive) {
          curConsecutiveIndex = i-1
          uniquei.consecutives.push({ start: curConsecutiveIndex, count: 2});
        }
        else{
          let consecs = uniquei.consecutives.filter(x => x.start == curConsecutiveIndex);
          if(consecs.length)
            consecs[0].count++;
        }
        newConsecutive = false;
      }
      else { 
        console.log(prevInd, ind, i);
        newConsecutive = true;
      }

      prevInd = ind;
  });
  
  let multiples = uniques.filter(x => x.consecutives.length > 1)

  uniques.forEach((unq, i) => {
    unq.consecsString = JSON.stringify(unq.consecutives);


  })

  console.log("Individuals: ", individual);
  console.log("Uniques: ", uniques);
  console.log("Multiples: ", multiples);
  let splitables = []

  multiples.forEach((mul, i) => {
    let lastConsecutive = null;
    mul.consecutives.forEach((con, i1) => {
      if(lastConsecutive)
      {
        let lastEnd = lastConsecutive.start + lastConsecutive.count;
        for (let i2 = 0; i2 < lastConsecutive.count; i2++) {
          let curLast = lastEnd + i2;
          let diff = con.start - curLast;
          console.log(diff, curLast, lastEnd, i2);
          if(diff == consecutivity-1)
          {
            splitables.push({start: curLast, end: con.start-1})
          }
        }
      } 
      lastConsecutive = con
    })
    console.log("Splitables: ", splitables);
  });

  let leader = null; 
  splitables.forEach((able, i) => {
    let splitted = input.slice(0, able.start-1) + input.slice(able.end+1)
    console.log('splitted', splitted);
    let result = ''
    let lastX = { count: 0, char: '' };
    splitted.split('').forEach(x => {
      if(x == lastX) {
        lastX.count++;
        result.slice(0, result.length-3);
        result += lastX.count + lastX.char;
      }
      else{
        lastX = {char: x, count: 1};
        result += lastX.count + lastX.char;
      }

    })
    let individuals = splitted.split('');
    let uniques = [];
    individuals.forEach(ind => 
    {
      if(uniques.filter(x => x == ind).length == 0)
        uniques.push(ind);
    })
    console.log('uniques', uniques);
    let compressed = uniques.map(x => { return { char: x, count: individuals.filter(y => y == x).length }});
    console.log('compressed', compressed);

    if(!leader) leader = compressed;
    else{
      if(compressed.length <= leader.length)
      {
        let reducer = (prev, cur) => prev.count + cur.count;
        if(compressed.reduce(reducer).count > leader.reduce(reducer).count)
          leader = compressed;
      }
    }
  })
  console.log('leader', leader);
  let result = "none"
  if(leader){
    result = ''
    leader.forEach(x => {
      result += x.count + x.char;
    })
  }
  console.log('result', { input, result } );
}

solve(process.argv[2], process.argv[3]);

//solution("AABBDDBBB", 3) // 2A4B