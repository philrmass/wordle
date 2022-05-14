import styles from './LetterSearch.module.css';

export default function LetterSearch({ words }) {
  return (
    <div className={styles.main}>
      <div>{`LetterSearch [${words.length}]`}</div>
    </div>
  );
}
