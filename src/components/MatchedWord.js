import classnames from 'classnames';

import styles from './MatchedWord.module.css';

export default function MatchedWord({ word, colors }) {
  const letters = word.split('');

  return (
    <div className={styles.main}>
      {letters.map((letter, index) => {
        const color = colors[index];
        const classes = classnames({
          [styles.letter]: true,
          'yellow': color === 'y',
          'green': color === 'g',
        });

        return <div className={classes}>{letter}</div>
      })}
    </div>
  );
}
