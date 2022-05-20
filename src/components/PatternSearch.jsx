import { useState } from 'react';
import styles from './PatternSearch.module.css';

export default function PatternSearch({ words }) {
  const [search, setSearch] = useState('R.E');
  const [matches, setMatches] = useState(null);
  const haveMatches = Boolean(matches);
  const count = haveMatches ? matches.length : words.length;

  //??? complete description with example
  //??? useEffect to find matches

  const onSearch = (text) => {
    const found = findMatches(text, words);

    setSearch(text);
    setMatches(found);
  }

  return (
    <div className={styles.main}>
      <input
        tabindex='0'
        className={styles.input}
        type="text"
        value={search}
        onInput={(e) => onSearch(e.target.value)}
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
  const pattern = replaceNonWords(search);
  const matches = generateMatches(haveMatches, allMatches, words, shownCount);

  return (
    <div className={styles.matches}>
      {matches.map(match => {
        const letters = findMatchedLetters(pattern, match.index);
        console.log(`${match.word} (${match.index}) (${pattern}) (${letters})`);
        //??? make these look good showing the match

        return (
          <div className={styles.match}>
            {match?.word}
            <div>{match.index}</div>
          </div>
        );
      })}
    </div>
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

function findMatchedLetters(pattern, index) {
  return [];
}

function replaceNonWords(input) {
  const nonWords = /[^A-Za-z]/ig;
  return input.replaceAll(nonWords, '.');
}
