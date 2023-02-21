export var passwordValidator = function (password) {
  //declaring const values
  const REPEAT = 3;
  const MIN_LEN = 6;
  const MAX_LEN = 20;
  let outputArr = [];
  //checking the input in sequential order for repeated values

  password
    .match(/(.)\1*/g)
    .map((s) => s.length)
    .filter((leng) => leng >= REPEAT)
    .forEach((leng) => {
      //if the value repeated one time and pushed to an array by taking mod %  else it will be checking for number of repeated same character and pushed by value of base repeat value 3
      outputArr.push((leng % REPEAT) + 1);
      for (let i = 2 * REPEAT; i <= leng; i += REPEAT) {
        outputArr.push(REPEAT);
      }
    });
  //rearrage the order of the array in ascending order
  outputArr.sort();
  // to check the maximum length 20, subtracted the input value by max_length
  let toDelete = password.length - MAX_LEN;
  //checking the condition by number of maximum character contains in the input value til the value shifted by number of array value
  while (outputArr.length && outputArr[0] <= toDelete) {
    toDelete -= outputArr.shift(); //remove first element from the array for each time
  }
  //checking the conditions for isUpper / isLower / isDigit if its satisfied returns 0 else for each missing it will return sum of 1
  const finalUpdate = Math.max(
    outputArr.length,
    [/[a-z]/, /[A-Z]/, /[0-9]/].map((r) => r.test(password)).filter((x) => !x)
      .length
  );
  //finally compare the values to return max value
  return Math.max(
    MIN_LEN - password.length,
    finalUpdate,
    password.length - MAX_LEN + finalUpdate
  );
};
