import { useState } from 'preact/hooks';
import classnames from 'classnames';

import { countLettersByPosition, sortLetterCounts } from '../utilities/words';
import styles from './LetterPositions.module.css';

//??? rearrange by column using indices
//??? implement graph
export default function LetterPositions({ words }) {
  const indices = Array.from(Array(5).keys());
  const byLetter = indices.map(index => countLettersByPosition(index, words));
  const sortedCounts = byLetter.map(byLetter => sortLetterCounts(byLetter));
  const total = words.length;

  const [selected, setSelected] = useState('');
  const percents = sortedCounts[4].map(sc => 100 * (sc[1] / total));

  const onKeyDown = (key) => {
    setSelected((last) => {
      if (key === 'Backspace') {
        return last.slice(0, -1);
      } else {
        const lowKey = key.toLowerCase();

        if (lowKey.match(/^[a-z]$/)) {
          const added = `${last}${lowKey}`;
          return added.slice(0, 5);
        }
        return last;
      }
    });
  };

  return (
    <div className={styles.main}>
      {buildBoxes(indices, selected, onKeyDown)}
      {buildGraphs(byLetter, total, selected)}
      {buildColumns(sortedCounts, total, selected)}
    </div>
  );
}

function buildBoxes(indices, selected, onKeyDown) {
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
        onKeyDown={(e) => onKeyDown(e.key)}
      />
    </label>
  );
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
  console.log('GR', byLetter, total, selected);

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
