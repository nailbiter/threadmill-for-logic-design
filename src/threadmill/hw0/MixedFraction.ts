type MixedFraction = {
  integerPart:number,
  fractionPart:{
    enumerator:number,
    denominator:number,
  }
};

export default MixedFraction;
const _ALPHABET = "0123456789" + "abcdefghijklmnopqrstuvwxyz";

function StringToNumber(s:string,base:number):number {
  let res:number = 0;
  for(let i = 0; i<s.length;i++) {
    const index = _ALPHABET.indexOf(s.substr(i,1).toLowerCase());
    if(index<0) {
      throw JSON.stringify({i,s,_ALPHABET,ss:s.substr(i,1).toLowerCase()},null,2);
    }
    res = res*base + index;
  }
  return res;
}
export function FromString(s:string,base:number):MixedFraction {
  const split = s.split(".");
  console.log("split: %s",JSON.stringify(split));
  if(split.length === 1) {
    return {
      integerPart:StringToNumber(split[0],base),
      fractionPart:{
        enumerator:0,
        denominator:0,
      }
    };
  } else {
    return {
      integerPart:StringToNumber(split[0],base),
      fractionPart:{
        enumerator:StringToNumber(split[1],base),
        denominator:Math.pow(base,split[1].length),
      }
    };
  }
}
function NumToString(num:number,base:number):string {
  let res:string = "";
  for(let num_ = num;num_>0;num_=Math.floor(num_/base)) {
    const rem = num_ % base;
    res += _ALPHABET.substr(rem,1);
  }
  return res.split("").reverse().join("");
}
export function ToString(frac:MixedFraction,base:number):string {
  let res:string = NumToString(frac.integerPart,base);
  if( frac.fractionPart.enumerator>0 ) {
    let fracPart:string = "";
    let {enumerator,denominator} = frac.fractionPart;
    let enumerators:number[] = [enumerator];
    while( enumerator!=0 ) {
      enumerator*=base;
      fracPart += _ALPHABET.substr(Math.floor(enumerator/denominator),1);
      enumerator = enumerator % denominator;
      if( enumerators.indexOf(enumerator) > 0 ) {
        enumerators.push(enumerator);
        break;
      } else {
        enumerators.push(enumerator);
      }
    }
    if( enumerator === 0) {
      res += `.${fracPart}`;
    } else {
      const index = enumerators.indexOf(enumerators[enumerators.length-1]);
      res += `.${fracPart.substr(0,index)}(${fracPart.substr(index,fracPart.length-index-1)})`;
    }
  }
  return res;
}
