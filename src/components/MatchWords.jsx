import { useState } from 'react';
import answerWords from '../data/answerWords.txt';
import { getMatches } from '../utilities/words';
import styles from './MatchWords.module.css';

export default function MatchWords({ words }) {
  const answers = answerWords.split('\n');
  const [matches, setMatches] = useState(getMatches(words, answers));
  const [ratio, setRatio] = useState(1.5);
  const bySum = (a, b) => {
    const sumA = a.yellow + ratio * a.green;
    const sumB = b.yellow + ratio * b.green;
    return sumB - sumA;
  };
  const sorted = [...matches].sort(bySum);

  console.log('ratio', ratio);
  return (
    <div className={styles.main}>
      <div className={styles.ratio}>
        <input
          className={styles.input}
          type="range"
          min="0.5"
          max="10"
          step="0.1"
          value={ratio}
          onChange={(e) => setRatio(e.target.value)}
        />
      </div>
      <div className={styles.matches}>
        {sorted.slice(0, 10).map(({ word, green, yellow }) => {
          return (
            <>
              <div>{word}</div>
              <div>{green.toFixed(2)}</div>
              <div>{yellow.toFixed(2)}</div>
            </>
          );
        })}
      </div>
    </div>
  );
}
