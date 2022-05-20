import { useEffect, useState } from 'react';
import MatchedWord from './MatchedWord';
import styles from './PatternSearch.module.css';

export default function PatternSearch({ words }) {
  const [search, setSearch] = useState('');
  const [matches, setMatches] = useState(null);
  const haveMatches = Boolean(matches);
  const count = haveMatches ? matches.length : words.length;

  useEffect(() => {
    setMatches(findMatches(search, words));
  }, [words, search]);

  return (
    <div className={styles.main}>
      <input
        tabindex='0'
        className={styles.input}
        type="text"
        value={search}
        onInput={(e) => setSearch(e.target.value)}
      />
      <div className={styles.count}>
        {`Found ${count} matches`}
      </div>
      {buildMatches(haveMatches, matches, words, search)}
    </div>
  );
}

function buildMatches(haveMatches, allMatches, words, search) {
  const shownCount = 100;
  const patternLetters = replaceNonWords(search).split('');
  const matches = generateMatches(haveMatches, allMatches, words, shownCount);

  return (
    <>
      {matches.map(match => {
        const colors = findMatchedColors(patternLetters, match.index);

        return <MatchedWord word={match.word} colors={colors}/>;
      })}
    </>
  );
}

function findMatches(text, words) {
  if (text === '') {
    return null;
  }

  const pattern = replaceNonWords(text);
  const find = new RegExp(pattern, 'i');

  return words.reduce((found, word) => {
    const index = word.search(find);
    if (index >= 0) {
      return [...found, { word, index }];
    }
    return found;
  }, []);
}

function generateMatches(haveMatches, matches, words, count) {
  if (haveMatches) {
    return matches.slice(0, count);
  }
  return words.slice(0, count).map(word => ({ word, index: -1 }));
}

function findMatchedColors(patternLetters, offset) {
  const letters = Array(5).fill(' ');

  if (offset < 0) {
    return letters;
  }
  
  const matched = letters.map((letter, index) => {
    const patternIndex = index - offset;
    if (patternIndex >= 0 && patternIndex < patternLetters.length) {
      return patternLetters[patternIndex] === '.' ? 'y' : 'g';
    }
    return letter;
  });

  return matched;
}

function replaceNonWords(input) {
  const nonWords = /[^A-Za-z]/ig;
  return input.replace(nonWords, '.');
}
