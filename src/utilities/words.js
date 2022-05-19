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

export function getMatches(words, answers) {
  if (words.length === 0) {
    return [];
  }

  return words.map((word) => {
    const wordSums = answers.reduce((sums, answer) => {
      const match = getMatch(word, answer);

      return {
        green: sums.green + match.green,
        yellow: sums.yellow + match.yellow,
      }
    }, { green: 0, yellow: 0 });

    const scale = 1 / words.length;
    return {
      word,
      green: scale * wordSums.green,
      yellow: scale * wordSums.yellow,
    };
  });
}

function getMatch(word, answer) {
  const matchChars = answer.split('');
  const chars = word.split('');

  const green = chars.reduce((sum, char, index) => {
    if (char === matchChars[index]) {
      matchChars[index] = null;
      return sum + 1;
    }
    return sum;
  }, 0);

  const yellow = chars.reduce((sum, char, index) => {
    const matchIndex = matchChars.indexOf(char);
    if (matchIndex >= 0) {
      matchChars[matchIndex] = null;
      return sum + 1;
    }
    return sum;
  }, 0);

  return { green, yellow };
}
