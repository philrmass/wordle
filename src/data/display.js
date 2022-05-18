import LetterPositions from '../components/LetterPositions';
import LetterSearch from '../components/LetterSearch';
import MatchWords from '../components/MatchWords';
import PatternSearch from '../components/PatternSearch';

export const wordsDefault = 'answers';
export const wordNames = {
  answers: 'Possible Answers',
  all: 'All Valid Guesses'
};

export const displayDefault = 'letterPositions';
export const displayNames = {
  letterPositions: 'Letter Counts Per Position',
  letterSearch: 'Letter Pattern Search',
  matchWords: 'Best Start Words',
  patternSearch: 'Letter Pattern Search',
}
export const displayElements = {
  letterPositions: LetterPositions,
  letterSearch: LetterSearch,
  matchWords: MatchWords,
  patternSearch: PatternSearch,
};
export const displayDescriptions = {
  letterPositions: (total) => `The times each letter appears in each positions in the ${total} words. 
  Greens appear in that position at least 10% of the time, yellows at least 3%, and grays at least 1%. 
  Enter a word to see its values.`,
  letterSearch: (total) => `letterSearch ${total}`,
  matchWords: () => 'match Words',
  patternSearch: (total) => `patternSearch ${total}`,
};
