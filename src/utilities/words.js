export function countLettersByPosition(index, words) {
  return words.reduce((counts, word) => {
    const letter = word[index];
    const current = counts[letter] ?? 0;

    return {
      ...counts,
      [letter]: current + 1,
    }
  }, {});
}

export function sortLetterCounts(byLetter) {
  const entries = Object.entries(byLetter);
  const byCount = (a, b) => b[1] - a[1];

  return entries.sort(byCount);
}
