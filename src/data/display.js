import LetterPositions from '../components/LetterPositions';
import PatternSearch from '../components/PatternSearch';
import LetterSearch from '../components/LetterSearch';

export const wordsDefault = 'answers';
export const wordNames = {
  answers: 'Possible Answers',
  all: 'All Valid Guesses'
};

export const displayDefault = 'positionCounts';
export const displayNames = {
  letterSearch: 'Letter Pattern Search',
  patternSearch: 'Letter Pattern Search',
  positionCounts: 'Letter Counts Per Position',
}
export const displayElements = {
  letterSearch: LetterSearch,
  patternSearch: PatternSearch,
  positionCounts: LetterPositions,
};
export const displayDescriptions = {
  letterSearch: (total) => `letterSearch ${total}`,
  patternSearch: (total) => `patternSearch ${total}`,
  positionCounts: (total) => `Shows the number of times each letter appears in
  each of the positions in the ${total} words. Greens appear in that position at 
  least 10% of the time, yellows at least 3% of the time, and grays at least 1% 
  of the time. Click on a letter to see the percentages`, 
};
