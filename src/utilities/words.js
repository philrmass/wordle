export function countLettersByPosition(index, words) {
  const a = 'a'.charCodeAt(0);
  const allLetters = Array.from(Array(26).keys(), (i) => String.fromCharCode(a + i));
  const zeros = allLetters.reduce((all, letter) => ({ ...all, [letter]: 0}), {});
  return words.reduce((counts, word) => {
    const letter = word[index];

    return {
      ...counts,
      [letter]: counts[letter] + 1,
    }
  }, zeros);
}

export function sortLetterCounts(byLetter) {
  const entries = Object.entries(byLetter);
  const byCount = (a, b) => {
    if (a[1] === b[1]) {
      return (a[0] > b[0] ? 1 : -1);
    }
    return b[1] - a[1];
  };

  return entries.sort(byCount);
}
