//import { useState } from 'preact/hooks';

import styles from './LetterPositions.module.css';

export default function LetterPositions({ words }) {
  //const [display, setDisplay] = useState(defaultDisplay);

  return (
    <div className={styles.main}>
      <div>{`LetterPositions [${words.length}]`}</div>
    </div>
  );
}
