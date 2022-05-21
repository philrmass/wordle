export const wordsDefault = 'answers';
export const wordNames = {
  answers: 'Possible Answers',
  all: 'All Valid Guesses'
};

export const displayDefault = 'letterPositions';
export const displayNames = {
  letterPositions: 'Letter Counts Per Position',
  bestMatch: 'Best Starting Words',
  worstMatch: 'Worst Starting Words',
  patternSearch: 'Letter Pattern Search',
  letterSearch: 'Included Letter Search',
}
export const displayDescriptions = {
  letterPositions: (total) => `The times each letter appears in each positions in the ${total} words. 
  Greens appear in that position at least 10% of the time, yellows at least 3%, and grays at least 1%. 
  Enter a word to see its values.`,
  bestMatch: () => `Find the words that will get the most green and yellow matches, depending on your
  preference for more greens or yellows. Shows the average number of yellow and green squares for that
  word when matched with all of the possible answers`,
  worstMatch: () => `Find the words that will get the fewest green and yellow matches, depending on
  your preference for more greens or yellows. Shows the average number of yellow and green squares
  for that word when matched with all of the possible answers`,
  patternSearch: (total) => `Search the ${total} words for letter patterns. Include a period in
  your pattern to match any letter at that position. For instance K.E will match ANKLE, KNEAD, and SKIER`,
  letterSearch: (total) => `Search the ${total} words for ones that contain all of the entered 
  letters. For instance, if you enter ZZY, you'll match DIZZY, FIZZY, FUZZY, and JAZZY`
};
