const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    let bin = [];
  let indexOfSpace = [];
  for(let i = 0; i < expr.length; i += 10){
    bin.push(expr.slice(i,i + 10));
    if(expr[i] === '*'){
      
      indexOfSpace.push(bin.lastIndexOf('**********', i / 10));
      
    }
  }

  let array = [];
  let myObj = {};

  for (const iterator in MORSE_TABLE) {
    let letter = iterator.split('');
    let str = '';
    letter.forEach(element => {
      if(element === '.'){
        str += '10';        
      }
      if(element === '-'){
        str += '11';
      }
    });
    array.push(str);
    let index = array.indexOf(str);
    myObj[array[index]] = MORSE_TABLE[iterator]
  }

  let decodedTable = [...array];

  array.map(item => {
    if(item.length < 10){
      const index = array.indexOf(item);
      const size = 10 - item.length;
      let letters = '';
      for(let i = 0; i < size; i++){
        letters += 0;
      }
      decodedTable[index] = letters + array[index];
    }
  })
  let indexes = [];
  for(let i = 0; i < bin.length; i++){
    if(bin[i] === '**********'){
      indexes.push(' ');
    }
    decodedTable.map(item => {
      if(item === bin[i]){
        indexes.push(decodedTable.indexOf(item));
      }      
    })
  }
  let finalString = '';
  for(let i = 0; i < indexes.length; i++){
    let iter = indexes[i];
    if(indexOfSpace.lastIndexOf(i) != -1) {
      finalString += ' ';
    }
    else {
      finalString += myObj[array[iter]];
    }
  }
  
  return finalString;
}

module.exports = {
    decode
}