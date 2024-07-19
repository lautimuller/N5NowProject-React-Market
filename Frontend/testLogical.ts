function reverseStringWithoutAffectingSpecialChars(str: string): string {
  let arr = str.split("");

  let left = 0;
  let right = arr.length - 1;

  const isLetter = (char: string): boolean => {
    return /[a-zA-Z]/.test(char);
  };

  while (left < right) {
    if (!isLetter(arr[left])) {
      left++;
    } else if (!isLetter(arr[right])) {
      right--;
    } else {
      let temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
      left++;
      right--;
    }
  }

  return arr.join("");
}

console.log(reverseStringWithoutAffectingSpecialChars("a,b$c")); // Output: "c,b$a"
console.log(reverseStringWithoutAffectingSpecialChars("Ab,c,de!$")); // Out: "ed,c,bA!$"
