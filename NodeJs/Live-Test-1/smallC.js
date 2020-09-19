const smallestCommons = (arr) => {
  let primeFactors = {};
  for (let i = Math.max(Math.min(...arr), 2); i <= Math.max(...arr); i++) {
    let primes = getPrimeFactors(i);
    for (let j in primes) {
      if (!primeFactors[j] || primes[j] > primeFactors[j]) {
        primeFactors[j] = primes[j]
      }
    }
  }
  let result = 1;
  for (let i in primeFactors) {
    result *= i ** primeFactors[i]
  }
  return result;
}

const getPrimeFactors = (num) => {
  const primes = {};
  for (let factor = 2; factor <= num; factor++) {
    while ((num % factor) === 0) {
      primes[factor] = (primes[factor]) ? primes[factor] + 1 : 1;
      num /= factor;
    }
  }
  return primes;
}

let res;
let start = new Date().getTime();
res = smallestCommons([23,18])
let end = new Date().getTime();

console.log('Result', res, 'Time:', end - start, 'ms'); //60