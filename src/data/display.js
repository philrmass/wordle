import LetterPositions from '../components/LetterPositions';
import Search from '../components/Search';

export const wordsDefault = 'answers';
export const wordNames = {
  answers: 'Possible Answers',
  all: 'All Valid Guesses'
};

export const displayDefault = 'positionCounts';
export const displayNames = {
  positionCounts: 'Letter Counts Per Position',
  search: 'Word Search',
}
export const displayElements = {
  positionCounts: LetterPositions,
  search: Search,
};
export const displayDescriptions = {
  [displayDefault]: (total) => `Shows the number of times each letter appears in
  each of the positions in the ${total} words. Greens appear in that position at 
  least 10% of the time, yellows 3% of the time, and grays at least 1% of the 
  time. Click on a letter to see the percentages`, 
  search: (total) => `hey ${total}`,
};
