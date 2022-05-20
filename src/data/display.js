export const wordsDefault = 'answers';
export const wordNames = {
  answers: 'Possible Answers',
  all: 'All Valid Guesses'
};

//??? restore
export const displayDefault = 'patternSearch';
//export const displayDefault = 'letterPositions';
export const displayNames = {
  letterPositions: 'Letter Counts Per Position',
  bestMatch: 'Best Matching Words',
  worstMatch: 'Worst Matching Words',
  patternSearch: 'Letter Pattern Search',
  letterSearch: 'Included Letter Search',
}
export const displayDescriptions = {
  letterPositions: (total) => `The times each letter appears in each positions in the ${total} words. 
  Greens appear in that position at least 10% of the time, yellows at least 3%, and grays at least 1%. 
  Enter a word to see its values.`,
  bestMatch: () => `Find the words that best match with the answer words, depending on your preference
  for more green or yellow squares. Shows the average number of yellow and green squares`,
  worstMatch: () => `Find the words that least match with the answer words, depending on your preference
  for more green or yellow squares. Shows the average number of yellow and green squares`,
  patternSearch: (total) => `Search the ${total} words for letter patterns. Include a period in
  your pattern to match any letter at that position. For instance '' will match , , and `,
  letterSearch: (total) => `letterSearch ${total}`,
};
