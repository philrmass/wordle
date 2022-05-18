export const wordsDefault = 'answers';
export const wordNames = {
  answers: 'Possible Answers',
  all: 'All Valid Guesses'
};

//export const displayDefault = 'letterPositions';
export const displayDefault = 'matchWords';
export const displayNames = {
  letterPositions: 'Letter Counts Per Position',
  letterSearch: 'Letter Pattern Search',
  matchWords: 'Best Start Words',
  patternSearch: 'Letter Pattern Search',
}
export const displayDescriptions = {
  letterPositions: (total) => `The times each letter appears in each positions in the ${total} words. 
  Greens appear in that position at least 10% of the time, yellows at least 3%, and grays at least 1%. 
  Enter a word to see its values.`,
  letterSearch: (total) => `letterSearch ${total}`,
  matchWords: () => `Find the words that match the most answers, depending on your preference for
  more green or yellow squares`,
  patternSearch: (total) => `patternSearch ${total}`,
};
