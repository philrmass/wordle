import { useState } from 'preact/hooks';
import classnames from 'classnames';

import { countLettersByPosition, sortLetterCounts } from '../utilities/words';
import BoxesInput from './BoxesInput';
import styles from './LetterPositions.module.css';

const indices = [0, 1, 2, 3, 4];

export default function LetterPositions({ words }) {
  const byLetter = indices.map(index => countLettersByPosition(index, words));
  const total = words.length;
  const [selected, setSelected] = useState('');

  return (
    <div className={styles.main}>
      <BoxesInput selected={selected} setSelected={setSelected} />
      <div className={styles.columns}>
        {buildColumns(selected, byLetter, total)}
      </div>
    </div>
  );
}

function buildColumns(selected, byLetter, total) {
  return indices.map(index => {
    const letter = selected[index];
    if (letter) {
      return buildGraph(index, letter, byLetter, total);
    }

    const sortedCounts = byLetter.map(byLetter => sortLetterCounts(byLetter));
    return buildLetterCounts(sortedCounts[index], total);
  });
}

function buildGraph(index, letter, byLetter, total) {
  const allCount = indices.reduce((sum, index) => sum + byLetter[index][letter], 0);
  const positionCount = byLetter[index][letter];
  const allPercent = (100 * allCount / total).toFixed(1);
  const positionPercent = (100 * positionCount / total).toFixed(1);
  const allLabel = `${allPercent}%\ntotal`;
  const positionLabel = `${positionPercent}%\nhere`;

  const allClasses = classnames(styles.bar, 'yellow');
  const positionClasses = classnames(styles.bar, 'green');
  const allStyle = { height: `${allPercent}%` };
  const positionStyle = { height: `${positionPercent}%` };

  return (
    <div className={styles.graph}>
      <div className={styles.graphBars}>
        <div className={allClasses} style={allStyle} />
        <div className={positionClasses} style={positionStyle} />
      </div>
      <div className={styles.graphText}>{allLabel}</div>
      <div className={styles.graphText}>{positionLabel}</div>
    </div>
  );
}

function buildLetterCounts(counts, total) {
  return (
    <div className={styles.letterCounts}>
      {counts.map(count => buildLetterCount(count, total))}
    </div>
  );
}

function buildLetterCount(count, total) {
  const letter = count[0];
  const value = count[1];
  const { green, yellow, gray } = getColors(value, total);
  const classes = classnames({
    [styles.letterCount]: true,
    ['gray']: gray,
    ['yellow']: yellow,
    ['green']: green,
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

function getColors(value, total) {
  const percent = 100 * (value / total);
  const green = percent >= 10;
  const yellow = !green && percent >= 3;
  const gray = !green && !yellow && percent > 1;

  return { percent, green, yellow, gray };
}
