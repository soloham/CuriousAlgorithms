
///////

let nCombinations = function(list, numItems) {
  // Requesting more items than the list isn't possible.
  if (list.length < numItems) {
      return [];
  }
  // If requesting 1 item per combination, quickly return a list
  // of single item lists.
  if (numItems == 1) {
      let result = [];
      for (let i = 0; i < list.length; i++) {
          result.push([list[i]]);
      }
      return result;
  }
  // Loop through the list, combining each element with all the
  // permutations of the remaining elements.
  let result = [];
  for (let i = 0; i < list.length; i++) {
      let currentElement = list.slice(i, i + 1);
      let restList = list.slice(0, i).concat(list.slice(i + 1));
      let restCombinations = nCombinations(restList, numItems - 1);
      for (let j = 0; j < restCombinations.length; j++) {
          result.push(
              currentElement.concat(restCombinations[j]));
      }
  }
  return result;
}

let combinations = function(list) {
  let result = [];
  // Loop through the "1 to n" combinations
  for (let i = 1; i <= list.length; i++) {
      i_combinations = nCombinations(list, i);
      for (let j = 0; j < i_combinations.length; j++) {
          result.push(i_combinations[j]);
     }
  }
  return result;
}


const getAllSubsets = 
theArray => theArray.reduce(
  (subsets, value) => subsets.concat(
    subsets.map(set => [value,...set])
  ),
  [[]]
);

exports.combinations = combinations;
exports.getAllSubsets = getAllSubsets;
