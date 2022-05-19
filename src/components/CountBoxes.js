import classnames from 'classnames';
import styles from './CountBoxes.module.css';

export default function CountBoxes({ count, className }) {
  const whole = Math.floor(count);
  const part = count - whole;
  const indices = Array.from(Array(whole).keys());
  const wholeClasses = classnames(styles.box, styles.whole, className);
  const partClasses = classnames(styles.box, className);
  const partStyle = { width: `calc(${part} * var(--box-size))` };

  return (
    <div className={styles.main}>
      <div className={styles.boxes}>
        {indices.map(() => <div className={wholeClasses} />)}
        <div className={partClasses} style={partStyle}/>
      </div>
      <div className={styles.count}>{count.toFixed(2)}</div>
    </div>
  );
}
