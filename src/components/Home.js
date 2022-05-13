import { useState } from 'preact/hooks';

import answerWords from '../data/answerWords.txt';
import allWords from '../data/allWords.txt';
import LetterPositions from './LetterPositions';
import Search from './Search';
import styles from './Home.module.css';

const answers = answerWords.split('\n');
const all = allWords.split('\n');
const defaultWords = 'answers';
const wordNames = {
  [defaultWords]: 'Possible Answers',
  all: 'All Valid Guesses'
};
const defaultDisplay = 'positionCounts';
const displayNames = {
  [defaultDisplay]: 'Letter Counts Per Position',
  search: 'Word Search',
}
const displays = {
  [defaultDisplay]: LetterPositions,
  search: Search,
};

export default function Home() {
  const [display, setDisplay] = useState(defaultDisplay);
  const [useAll, setUseAll] = useState(false);
  const words = useAll ? all : answers;

  function changeDisplay(e) {
    setDisplay(e.target.value);
  }

  function changeUseAll(e) {
    setUseAll(e.target.value === 'all');
  }

  return (
    <div className={styles.main}>
      <h1>Wordle Stats</h1>
      <div className={styles.dropdowns}>
        {buildDropdown(displayNames, defaultDisplay, changeDisplay)}
        <span className={styles.separator}>{'of'}</span>
        {buildDropdown(wordNames, defaultWords, changeUseAll)}
      </div>
      <div className={styles.display}>
        {displays[display]({ words })}
      </div>
    </div>
  );
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
