function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function solve( validator = 'W3C', input = `
<div>
  <section>
  </p>
</div>
`) {
  let isFaulty = false; let result = {}; let tagOpenings = []; let tagClosings = []; let errorIn;
  let curParent;
  let DOM = [];
  let errors = [];

  for (let i = 0; i < input.length; i++) {
    const curChar = input[i];
    const nextChar = input[i+1];
    if(curChar == '<' && nextChar == '/') { 
      let cls = { name: input.slice(i+2, input.indexOf('>', i+2)), index: i}
      console.log("Closing: ", cls.name);
      // tagClosings.push(cls);
      if((curParent && !curParent.selfClosing) || !curParent){
        let opener = DOM.filter(x => x.id == curParent.id)[0];
        if(validator == 'W3C'){
          let curChecker = curParent.parent;
          let checksCount = 1;
          while (opener.name.replace(' ', '') != cls.name.replace(' ', '')) {
            if(checksCount == DOM.length)
              break;
            opener = DOM.filter(x => x.id == curChecker.id)[0];
            curChecker = curChecker.parent;
            checksCount++;
          }
        }
        if(opener){
          if(opener.name.replace(' ', '') == cls.name.replace(' ', '')){
            opener.closing = cls;
            if(curParent.parent)
            {
              curParent = curParent.parent;
              console.log("Cur Parent:", curParent.name);
            }
          }
          else{
            errors.push({msg: "Tag has no openings", ele: { ...cls, name: cls.name.replace(' ', '')}})
          }
        }
        else{
          errors.push({msg: "Tag has no openings", ele: { ...cls, name: cls.name.replace(' ', '')}})
        }
      }
    }
    else if(curChar == '<')
    {
      let elName = input.slice(i+1, input.indexOf('>', i+1));
      let isSC = false
      if(elName[elName.length-1] == '/') { elName = elName.slice(0, elName.length-1); isSC = true;}
      let opn = { id: uuidv4(), name: elName, index: i, selfClosing: isSC, parent: {...curParent}, closing: null};
      console.log("Opening: ", opn.name);
      // tagOpenings.push(opn);
      DOM.push(opn)
      if(!isSC){
        curParent = opn;
        console.log("Cur Parent:", curParent.name);
      }
      if(opn.name.includes('>') || opn.name.includes('<'))
        errors.push({msg: "Invalid characters in element name", ele: opn})
    }
  }
  let unClosed = DOM.filter(x => x.closing == null && x.selfClosing == false)
  unClosed.forEach(x => {
    errors.push({msg: "tag has no closing", ele: x})
  })
  result.tagOpenings = tagOpenings;
  result.tagClosings = tagClosings;
  result.correct = !isFaulty;
  result.errorIn = errorIn;

  console.log('DOM', DOM);
  console.log('Errors', errors);
  return result;
}

var start = new Date().getTime();
let res;
let validator = process.argv[2];
let input = process.argv[3];
for (let i = 0; i < 1; i++) {
  res = solve(validator, input)  
}
var end = new Date().getTime();
let differ = end - start;

// console.log('RESULT: ', res, "-> Time Taken:", differ, "ms")
console.log("-> Time Taken:", differ, "ms")

// solution(`
//     <div>
//         <section>
//             <img/>
//         </div>
//         <a>
//             <b></b>
//         </a>
//     </div>
// `) // section

// 1

{/* 
  <div>
  <section>
<section>
</section>
</section>
</div>
<div>
<sdfsdf>
</div> */}