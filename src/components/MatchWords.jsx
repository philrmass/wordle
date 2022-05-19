import { useEffect, useState } from 'react';
import answerWords from '../data/answerWords.txt';
import { getMatches } from '../utilities/words';
import CountBoxes from './CountBoxes';
import styles from './MatchWords.module.css';

const answers = answerWords.split('\n');

export default function MatchWords({ words }) {
  const [matches, setMatches] = useState(() => getMatches(words, answers));
  const [ratio, setRatio] = useState(1.5);
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
