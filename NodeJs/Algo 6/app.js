function memo(func){
    let vals = []
    return (...ins) => {
        let cached = vals.find(x => x.ins.filter((y,i) => y == ins[i]).length == ins.length);
        if(cached) return cached.out;
        else {
            let val = { ins, out: func(...ins) }
            vals.push(val)
            return val.out
        }
    }
}

function sum(a, b) {
    console.log('Summing...');
    return a + b
}

const sumMemo = memo(sum);

console.log(sumMemo(5,5));
console.log(sumMemo(5,6));
console.log(sumMemo(5,5));
console.log(sumMemo(5,6));
console.log(sumMemo(5,9));
console.log(sumMemo(5,5));
console.log(sumMemo(5,9));
console.log(sumMemo(5,6));