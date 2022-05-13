//import { useState } from 'preact/hooks';
import classnames from 'classnames';
import { countLettersByPosition, sortLetterCounts } from '../utilities/words';

import styles from './LetterPositions.module.css';

export default function LetterPositions({ words }) {
  const indices = Array.from(Array(5).keys());
  const byLetter = indices.map(index => countLettersByPosition(index, words));
  const sortedCounts = byLetter.map(byLetter => sortLetterCounts(byLetter));

  //const [selected, setSelected] = useState(null);
  const percents = sortedCounts[4].map(sc => 100 * (sc[1] / words.length));

  return (
    <div className={styles.main}>
      <div className={styles.columns}>
        {sortedCounts.map(counts => buildColumn(counts, words.length))}
      </div>
    </div>
  );
}

function buildColumn(counts, total) {
  return (
    <div className={styles.column}>
      <div className={styles.box} />
      {counts.map(count => buildLetter(count, total))}
    </div>
  );
}

function buildLetter(count, total) {
  const letter = count[0];
  const value = count[1];
  const percent = 100 * (value / total);
  const green = percent >= 10;
  const yellow = !green && percent >= 3;
  const gray = !green && !yellow && percent > 1;
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
