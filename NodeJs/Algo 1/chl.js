function solution(S, X, Y) {
    let allDsts = []
    let N = S.length;
    let maxDs = 0;
    for (let i = 0; i < N; i++) {
        let idx = S.indexOf(S[i]);
        if (idx != i) {
            let dst = Math.max(Math.sqrt((X[i] * X[i]) + (Y[i] * Y[i])), allDsts[idx])
            maxDs = Math.max(maxDs, dst);
            allDsts.push(dst)
        } else {
            allDsts.push(Math.sqrt((X[i] * X[i]) + (Y[i] * Y[i])))
        }
    }
    let result = 0;
    for (let i = 0; i < N; i++) {
        let dst = allDsts[i];
        if (maxDs > dst)
            result++
    }
    return result
}

let res = solution('CD', [1, -1], [1])
let start = new Date().getTime();
for (let i = 0; i < 1000000; i++) {
    solution('ABB', [1, -2, -2], [1, -2, 2])
}
let end = new Date().getTime();
console.log('Result', res);
console.log(end - start, 'ms');