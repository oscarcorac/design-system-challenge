var largestNonRepeatedString = [];
function findNoneRepeatedChar(value) {
  var array = value.split('');
  array.forEach(function (_char, index) {
    var relativeString = array.slice(index);
    var noneRepeatedString = [];
    relativeString.forEach(function (relativeChar) {
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
