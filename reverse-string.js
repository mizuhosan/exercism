var RevString = function () {

};

RevString.prototype. = function (str) {
  // Step 1. Use the split() method to return a new array
  var splitString = str.split("");

  // Step 2. Use the reverse() method to reverse the new created array
  var reverseArray = splitString.reverse();

  // Step 3. Use the join() method to join all elements of the array into a string
  var joinArray = reverseArray.join("");

  //Step 4. Return the reversed string
  return joinArray;

};

module.exports = Year;
