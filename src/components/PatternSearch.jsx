import styles from './PatternSearch.module.css';

export default function PatternSearch({ words }) {
  return (
    <div className={styles.main}>
      <div>{`PatternSearch [${words.length}]`}</div>
    </div>
  );
}
