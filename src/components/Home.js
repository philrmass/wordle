import { useState } from 'preact/hooks';

import answerWords from '../data/answerWords.txt';
import allWords from '../data/allWords.txt';
import {
  wordsDefault,
  wordNames,
  displayDefault,
  displayNames,
  displayElements,
  displayDescriptions,
} from '../data/display.js';
import styles from './Home.module.css';

const answers = answerWords.split('\n');
const all = allWords.split('\n');

export default function Home() {
  const [display, setDisplay] = useState(displayDefault);
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
      <h1>Wordle Stats 1</h1>
      <div className={styles.dropdowns}>
        {buildDropdown(displayNames, displayDefault, changeDisplay)}
        <span className={styles.separator}>{'of'}</span>
        {buildDropdown(wordNames, wordsDefault, changeUseAll)}
      </div>
      <div className={styles.description}>
        {displayDescriptions[display](words.length)}
      </div>
      <div className={styles.display}>
        {displayElements[display]({ words })}
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
