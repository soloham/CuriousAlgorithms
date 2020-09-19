
function smallestCommons(arr) {

    //Get the max number
    //Loop from the max number & check the divisibility 
    // O(n)

    let max = arr[0] < arr[1] ? arr[1] : arr[0]
    let min = arr[0] > arr[1] ? arr[1] : arr[0]
    
    let commonDivisibleNumber = max;

    while(true)
    {
        for(let i = min; i <= max; i++){
            if(commonDivisibleNumber % i != 0 ) break;
            if(i == max) return commonDivisibleNumber;
        }
        commonDivisibleNumber++;
    }
}

let res;
let start = new Date().getTime();
res = smallestCommons([23,18])
let end = new Date().getTime();

console.log('Result', res, 'Time:', end - start, 'ms'); //60