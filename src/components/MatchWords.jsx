import { useState } from 'react';
import { getMatches } from '../utilities/words';
import CountBoxes from './CountBoxes';
import styles from './MatchWords.module.css';

export default function MatchWords({ words, matches, useBest = true }) {
  const shownCount = 200;
  const [scale, setScale] = useState(0);
  const ratio = Math.pow(15, useBest ? scale : -scale);
  const bySum = (a, b) => {
    const sumA = a.yellow + ratio * a.green;
    const sumB = b.yellow + ratio * b.green;
    return useBest ? sumB - sumA : sumA - sumB;
  };
  const sorted = [...matches].sort(bySum);

  return (
    <div className={styles.main}>
      <div className={styles.scale}>
        <span>Prefer yellow</span>
        <input
          className={styles.input}
          type="range"
          min="-1"
          max="1"
          step="0.01"
          value={scale}
          onChange={(e) => setScale(e.target.value)}
        />
        <span>Prefer green</span>
      </div>
      <div className={styles.matches}>
        {sorted.slice(0, shownCount).map(({ word, green, yellow }) => {
          return (
            <>
              <div>
                <div className={styles.word}>{word}</div>
                <div className={styles.wordSpacer}> </div>
              </div>
              <CountBoxes count={yellow} className='yellow' />
              <CountBoxes count={green} className='green' />
            </>
          );
        })}
      </div>
    </div>
  );
}
