import styles from './BoxesInput.module.css';

export default function BoxesInput({ selected, setSelected }) {
  const indices = [0, 1, 2, 3, 4];

  console.log('sel', selected);
  return (
    <label className={styles.label}> 
      <div className={styles.boxes}>
        {indices.map((index) => {
          const letter = selected[index] ?? '';
          return (
            <div className={styles.box}>
              {letter}
            </div>
          );
        })}
      </div>
      <input
        type='text'
        maxLength={5}
        value={selected}
        onInput={(e) => setSelected(e.target.value.toLowerCase())}
      />
    </label>
  );
}
