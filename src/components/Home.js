import { useState } from 'preact/hooks';

import { version } from '../../package.json';
import answerWords from '../data/answerWords.txt';
import allWords from '../data/allWords.txt';
import answerMatches from '../data/answerMatches.json';
import allMatches from '../data/allMatches.json';
import {
  wordsDefault,
  wordNames,
  displayDefault,
  displayNames,
  displayElements,
  displayDescriptions,
} from '../data/display.js';
import LetterPositions from '../components/LetterPositions';
import LetterSearch from '../components/LetterSearch';
import MatchWords from '../components/MatchWords';
import PatternSearch from '../components/PatternSearch';
import styles from './Home.module.css';

const answers = answerWords.split('\n');
const all = allWords.split('\n');

export default function Home() {
  const [display, setDisplay] = useState(displayDefault);
  const [useAll, setUseAll] = useState(false);
  const words = useAll ? all : answers;
  const matches = useAll ? allMatches : answerMatches;

  function changeDisplay(e) {
    setDisplay(e.target.value);
  }

  function changeUseAll(e) {
    setUseAll(e.target.value === 'all');
  }

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <h1>Wordle Stats</h1>
        <span className={styles.version}>{version}</span>
      </div>
      <div className={styles.dropdowns}>
        {buildDropdown(displayNames, displayDefault, changeDisplay)}
        <span className={styles.separator}>{'of'}</span>
        {buildDropdown(wordNames, wordsDefault, changeUseAll)}
      </div>
      <div className={styles.description}>
        {displayDescriptions[display](words.length)}
      </div>
      <div className={styles.display}>
        {buildDisplay(display, words, matches)}
      </div>
    </div>
  );
}

function buildDisplay(display, words, matches) {
  switch (display) {
    case 'letterPositions':
      return <LetterPositions words={words} />;
    case 'bestMatch':
      return <MatchWords words={words} matches={matches} />;
    case 'worstMatch':
      return <MatchWords words={words} matches={matches} useBest={false} />;
    case 'letterSearch':
      return <LetterSearch words={words} />;
    case 'patternSearch':
      return <PatternSearch words={words} />;
  }
}

function buildDropdown(namesObj, selectedName, onChange) {
  const entries = Object.entries(namesObj);

  return (
    <select onchange={onChange}>
      {entries.map((entry) => {
        const selected = entry[0] === selectedName ? 'selected' : '';
        
        return (
          <option value={entry[0]} selected={selected}>
            {entry[1]}
          </option>
        );
      })}
    </select>
  );
}
