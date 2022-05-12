//import { useState } from 'preact/hooks';

import styles from './Search.module.css';

export default function Search({ words }) {
  //const [display, setDisplay] = useState(defaultDisplay);

  return (
    <div className={styles.main}>
      <div>{`Search [${words.length}]`}</div>
    </div>
  );
}
