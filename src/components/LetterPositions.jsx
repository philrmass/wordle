import { useState } from 'preact/hooks';
import classnames from 'classnames';

import { countLettersByPosition, sortLetterCounts } from '../utilities/words';
import styles from './LetterPositions.module.css';

export default function LetterPositions({ words }) {
  const indices = Array.from(Array(5).keys());
  const byLetter = indices.map(index => countLettersByPosition(index, words));
  const sortedCounts = byLetter.map(byLetter => sortLetterCounts(byLetter));

  const [selected, setSelected] = useState('');
  const percents = sortedCounts[4].map(sc => 100 * (sc[1] / words.length));

  const onKeyDown = (key) => {
    // ??? separate function, use below
    if (key === 'Backspace') {
      const input = selected;
      const output = input.slice(0, -1);
      setSelected(output);
    } else {
      const input = selected;
      const lowered = key.toLowerCase();
      const match = lowered.match(/^[a-z]$/);
      const added = `${input}${lowered}`;
      const output = added.slice(0, 5);
      setSelected(output);
    }
  };

  const onClick = (key) => {
    // ??? use function, move to Home?
    setSelected(key);
  };

  return (
    <div className={styles.main}>
      {buildBoxes(indices, selected, onKeyDown)}
      {buildGraphs(sortedCounts, words.length, selected, onClick)}
      {buildColumns(sortedCounts, words.length, selected, onClick)}
    </div>
  );
}

function buildBoxes(indices, selected, onKeyDown) {
  return (
    <>
      <div
        tabindex='0'
        className={styles.boxes}
        onKeyDown={(e) => onKeyDown(e.key)}
      >
        {indices.map((index) => {
          const letter = selected?.[index] ?? '';
          return (
            <div className={styles.box}>
              {letter}
            </div>
          );
        })}
      </div>
      <label className={styles.input}> 
        <input type='text' value='yo' />
        hello
      </label>
    </>
  );
}

function buildColumns(sortedCounts, total, selected, onClick) {
  console.log('BUILD-COLS', selected);
  return (
    <div className={styles.columns}>
      {sortedCounts.map(counts => buildColumn(counts, total, onClick))}
    </div>
  );
}

function buildColumn(counts, total, onClick) {
  return (
    <div className={styles.column}>
      {counts.map(count => buildLetter(count, total, onClick))}
    </div>
  );
}

function buildLetter(count, total, onClick) {
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
    <div
      className={classes}
      onClick={() => onClick(letter)}
    >
      <div className={styles.letter}>
        {letter}
      </div>
      <div className={styles.count}>
        {value}
      </div>
    </div>
  );
}

function buildGraphs(sortedCounts, total, selected, onClick) {
  //const { percent, green, yellow, gray } = getColors(value, total);
  console.log('GR', sortedCounts, total, selected);

  return (
    <div
      className={styles.graph}
      onClick={() => onClick('')}
    >
      GRAPH
    </div>
  );
}

function getColors(value, total) {
  const percent = 100 * (value / total);
  const green = percent >= 10;
  const yellow = !green && percent >= 3;
  const gray = !green && !yellow && percent > 1;

  return { percent, green, yellow, gray };
}
