import { useState } from 'preact/hooks';
import answerWords from './data/answerWords.txt';
import allWords from './data/allWords.txt';
import './style';

const answers = answerWords.split('\n');
const all = allWords.split('\n');

export default function App() {
  const [words, setWords] = useState(answers);
  const [display, setDisplay] = useState('yo');

  function changeDisplay(e) {
    setDisplay(e.target.value);
  }

  function changeWords(e) {
    setWords(e.target.value === 'all' ? all : answers);
  }

  return (
    <div>
      <h1>Wordle Stats</h1>
      <div>
        <select onchange={changeDisplay}>
          <option value="answers">Possible Answers</option>
          <option value="all">All Valid Guesses</option>
        </select>
        <span>{' of '}</span>
        <select onchange={changeWords}>
          <option value="answers">Possible Answers</option>
          <option value="all">All Valid Guesses</option>
        </select>
        <div>{`[${display}] [${words.length}]`}</div>
      </div>
    </div>
  );
}
