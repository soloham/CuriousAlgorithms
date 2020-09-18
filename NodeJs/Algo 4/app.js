function solve(input) {
  input = input.replace(/\s+/g, '')
  console.log(input);
  let tags = [];
  let tagStarted = false;
  let tagClosing = false;
  let opened = false;

  let curTag = {name: '', isOk: false};

  let curTagie = '';
  for (let i = 0; i < input.length; i++) {
    const curChar = input[i];
    if(curChar == '<'){
      if(!opened){
        tags.push({ name: '', isOk: false, isStarted: true })
        tagClosing = false;
      }
      else{
        tagStarted = false;
        tagClosing = true;
      }
      continue;
    }
    if(curChar == '>'){
      if(tagStarted){
        opened = true;
        tagStarted = false
        tags.push(curTag);
        curTag = {name: ''};
        curTagie = ''
      }
      else if(tagClosing){
        let tag = tags[tags.length-1];
        console.log(curTagie);
        if(curTagie == '/' + tag.name){
          opened = false;

          tagClosing = false
          tag.isOk = true;
        }
        curTagie = ''

      }
      continue;
    }

    if(tagStarted)
      curTag.name += curChar;

    if(tagStarted || tagClosing)
      curTagie += curChar;
  }

  return tags;
}

let res = solve(`<a>
             <b></b>
         </a>`)
console.log('Tags:',res);
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