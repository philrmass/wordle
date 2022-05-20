import { useEffect, useState } from 'react';
import MatchedWord from './MatchedWord';
import styles from './LetterSearch.module.css';

export default function LetterSearch({ words }) {
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
  const matches = generateMatches(haveMatches, allMatches, words, shownCount);

  return (
    <>
      {matches.map(match => {
        const colors = findMatchedColors(match.indices);

        return <MatchedWord word={match.word} colors={colors}/>;
      })}
    </>
  );
}

function findMatches(search, words) {
  if (search === '') {
    return null;
  }

  const pattern = filterNonWords(search);
  const patternLetters = pattern.split('');

  return words.reduce((found, word) => {
    const letters = word.split('');
    const indices = [];

    const matches = patternLetters.every(patternLetter => {
      const index = letters.indexOf(patternLetter);

      if (index >= 0) {
        letters[index] = '_';
        indices.push(index);
        return true;
      }
      return false;
    });

    if (matches) {
      return [...found, { word, indices }];
    }
    return found;
  }, []);
}

function generateMatches(haveMatches, matches, words, count) {
  if (haveMatches) {
    return matches.slice(0, count);
  }
  return words.slice(0, count).map(word => ({ word, indices: [] }));
}

function findMatchedColors(indices) {
  const letters = Array(5).fill(' ');
  return letters;

  for (index of indices) {
    letters[index] = 'g';
  }
  
  return letters;
}

function filterNonWords(input) {
  const nonWords = /[^A-Za-z]/ig;
  return input.replace(nonWords, '');
}
