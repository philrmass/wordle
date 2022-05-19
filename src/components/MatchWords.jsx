import { useEffect, useState } from 'react';
import answerWords from '../data/answerWords.txt';
import { getMatches } from '../utilities/words';
import CountBoxes from './CountBoxes';
import styles from './MatchWords.module.css';

const answers = answerWords.split('\n');

export default function MatchWords({ words }) {
  const [matches, setMatches] = useState(() => getMatches(words, answers));
  const [scale, setScale] = useState(0);
  const ratio = Math.pow(15, scale);
  const bySum = (a, b) => {
    const sumA = a.yellow + ratio * a.green;
    const sumB = b.yellow + ratio * b.green;
    return sumB - sumA;
  };
  const sorted = [...matches].sort(bySum);

  useEffect(() => {
    setMatches(getMatches(words, answers));
  }, [words]);

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
        {sorted.slice(0, 100).map(({ word, green, yellow }) => {
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
