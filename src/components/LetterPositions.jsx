import { useState } from 'preact/hooks';
import classnames from 'classnames';

import { countLettersByPosition, sortLetterCounts } from '../utilities/words';
import styles from './LetterPositions.module.css';

//??? rearrange by column using indices
//??? implement graph
export default function LetterPositions({ words }) {
  const indices = [0, 1, 2, 3, 4];
  const byLetter = indices.map(index => countLettersByPosition(index, words));
  const sortedCounts = byLetter.map(byLetter => sortLetterCounts(byLetter));
  const total = words.length;

  const [selected, setSelected] = useState('');
  const percents = sortedCounts[4].map(sc => 100 * (sc[1] / total));

  return (
    <div className={styles.main}>
      {buildBoxes(indices, selected, setSelected)}
      {buildGraphs(byLetter, total, selected)}
      {buildColumns(sortedCounts, total, selected)}
    </div>
  );
}

function buildBoxes(indices, selected, setSelected) {
  return (
    <label className={styles.label}> 
      <div className={styles.boxes}>
        {indices.map((index) => {
          const letter = selected[index] ?? '';
          return (
            <div className={styles.box}>
              {letter}
            </div>
          );
        })}
      </div>
      <input
        type='text'
        className={styles.input}
        value={selected}
        maxLength={5}
        onKeyDown={onlyLetters}
        onKeyPress={onlyLetters}
        onInput={(e) => setSelected(e.target.value)}
      />
    </label>
  );
}

function onlyLetters(e) {
  const code = e.keyCode;
  const ok = code < 28 || (code >= 65 && code <= 90) || (code >= 97 && code <= 122);

  if (!ok) {
    e.preventDefault();
    return false;
  }
}

function buildColumns(sortedCounts, total, selected) {
  return (
    <div className={styles.columns}>
      {sortedCounts.map(counts => buildColumn(counts, total))}
    </div>
  );
}

function buildColumn(counts, total) {
  return (
    <div className={styles.column}>
      {counts.map(count => buildLetter(count, total))}
    </div>
  );
}

function buildLetter(count, total) {
  const letter = count[0];
  const value = count[1];
  const { green, yellow, gray } = getColors(value, total);
  const classes = classnames({
    [styles.letterCount]: true,
    [styles.gray]: gray,
    [styles.yellow]: yellow,
    [styles.green]: green,
  });

  return (
    <div className={classes}>
      <div className={styles.letter}>
        {letter}
      </div>
      <div className={styles.count}>
        {value}
      </div>
    </div>
  );
}

function buildGraphs(byLetter, total, selected) {
  //const { percent, green, yellow, gray } = getColors(value, total);
  //console.log('GR', byLetter, total, selected);

  return (
    <div></div>
    /*
    <div
      className={styles.graph}
      onClick={() => onClick('')}
    >
      GRAPH
    </div>
    */
  );
}

function getColors(value, total) {
  const percent = 100 * (value / total);
  const green = percent >= 10;
  const yellow = !green && percent >= 3;
  const gray = !green && !yellow && percent > 1;

  return { percent, green, yellow, gray };
}
