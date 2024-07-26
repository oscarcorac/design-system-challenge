let largestNonRepeatedString: string[] = [];

function findNoneRepeatedChar(value: string) {
  const array = value.split('');

  array.forEach((_char, index) => {
    const relativeString = array.slice(index);

    let noneRepeatedString: string[] = [];

    relativeString.forEach((relativeChar) => {
      if (!noneRepeatedString.includes(relativeChar)) {
        noneRepeatedString.push(relativeChar);
      } else {
        if (noneRepeatedString.length > largestNonRepeatedString.length) {
          largestNonRepeatedString = noneRepeatedString;
        }
        noneRepeatedString = [relativeChar];
      }
    });
  });
}

findNoneRepeatedChar('repiteestomuchasveces');
console.log(largestNonRepeatedString);
